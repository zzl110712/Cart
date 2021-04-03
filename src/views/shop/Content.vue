<template>
  <div class="content">
    <div class="category">
      <div
        :class="{ 'category__item': true, 'category__item--active': currentTab === item.tab }"
        v-for="item of categories"
        :key="item.tab"
        @click="() => handleTabClick(item.tab)"
      >{{ item.name }}</div>
      <!-- <div class="category__item">休闲食品</div>
      <div class="category__item">时令蔬菜</div>
      <div class="category__item">肉蛋家禽</div> -->
    </div>
    <div class="product">
      <div class="product__item" v-for="item of list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售 {{ item.sales }} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span><span>{{ item.price }}</span><span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => changeCartItem(shopId, item._id, item, -1, shopName)">-</span>
          {{ getProductCartCount(shopId, item._id) }}
          <span class="product__number__plus" @click="() => changeCartItem(shopId, item._id, item, 1, shopName)">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { get } from '../../utils/requests'
// 购物车数量相关
import { useCommonCartEffect } from '../../effects/cartEffects'

const categories = [{ name: '全部商品', tab: 'all' }, { name: '秒杀', tab: 'seckill' }, { name: '新鲜水果', tab: 'fruit' }]

// Tab 切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useCurrentListEffect = (tab, id) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${id}/products`, { tab: tab.value })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { getProductCartCount, cartList, changeCartItem }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { getProductCartCount, cartList, changeCartItem } = useCartEffect()
    return { list, getProductCartCount, currentTab, cartList, categories, shopId, changeCartItem, handleTabClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  width: .76rem;
  height: 100%;
  overflow-y: scroll;
  background: $search-bgColor;
  &__item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontcolor;
    &--active {
      background: $bg-color;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01px solid $content-bgcolor;
    position: relative;
    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__title {
      @include ellipsis;
      line-height: .2rem;
      margin: 0;
      font-size: .14rem;
      color: $content-fontcolor;
    }
    &__sales {
      margin: .06rem 0;
      line-height: .16rem;
      font-size: .12rem;
      color: $content-fontcolor;
    }
    &__price {
      line-height: .2rem;
      margin: 0;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      line-height: .2rem;
      margin-left: .06rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: .0rem;
      bottom: .12rem;
      &__minus, &__plus {
        line-height: .2rem;
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        display: inline-block;
        font-size: .2rem;
        text-align: center;
      }
      &__minus {
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bg-color;
        margin-left: .05rem;
      }
    }
  }
}
</style>
