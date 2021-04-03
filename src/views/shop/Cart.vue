<template>
  <div class="mask" v-if="showCartDomCalculations" @click="handleCartShowChange" />
  <div class="cart">
    <div class="product" v-if="showCartDomCalculations">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe60a;' : '&#xe608;'"></span>
          全选
        </div>
        <div class="product__header__clear"><span class="product__header__clear__btn" @click="() => cleanCartProduct(shopId)">清空购物车</span></div>
      </div>
      <div v-for="item of productList" :key="item._id" class="product__item">
        <div class="product__item__checked iconfont" v-html="item.check ? '&#xe60a;' : '&#xe608;'" @click="() => changeCartItemChecked(shopId, item._id)"></div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span><span>{{ item.price }}</span><span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => changeItemInfo(shopId, item._id, item, -1)">-</span>
          {{ item.count || 0 }}
          <span class="product__number__plus" @click="() => changeItemInfo(shopId, item._id, item, 1)">+</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img class="check__icon__img" @click="handleCartShowChange" src="http://www.dell-lee.com/imgs/vue3/basket.png" />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// 购物车数量相关
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息
const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id

  const { calculations, productList, changeItemInfo } = useCommonCartEffect(shopId)

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProduct = (shopId) => {
    store.commit('cleanCartProduct', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }
  return { calculations, shopId, productList, changeCartItemChecked, changeItemInfo, cleanCartProduct, setCartItemsChecked }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { calculations, shopId, productList, changeItemInfo, changeCartItemChecked, cleanCartProduct, setCartItemsChecked } = useCartEffect()
    const showCartDomCalculations = computed(() => {
      return showCart.value && calculations.value.total > 0
    })
    return {
      calculations,
      shopId,
      productList,
      changeItemInfo,
      changeCartItemChecked,
      cleanCartProduct,
      setCartItemsChecked,
      handleCartShowChange,
      showCartDomCalculations
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.mask {
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
}
.cart {
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg-color;
}
.product {
  flex: 1;
  overflow-y: scroll;
  background: $bg-color;
  &__header {
    line-height: .52rem;
    height: .52rem;
    display: flex;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__all {
      width: .7rem;
      margin-left: .18rem;
      color: $content-fontcolor;
      font-size: .14rem;
    }
    &__icon {
      margin-right: .1rem;
      display: inline-block;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: .2rem;
    }
    &__clear {
      margin-right: .16rem;
      color: $content-fontcolor;
      text-align: right;
      flex: 1;
      font-size: .14rem;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01px solid $content-bgcolor;
    position: relative;
    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: $btn-bgColor;
      font-size: .2rem;
    }
    &__img {
      width: .46rem;
      height: .46rem;
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
    &__price {
      line-height: .2rem;
      margin: .06rem 0;
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
      bottom: .26rem;
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
.check {
  line-height: .49rem;
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgcolor;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
      display: block;
    }
    &__tag {
      min-width: .2rem;
      line-height: .2rem;
      height: .2rem;
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      font-size: .2rem;
      text-align: center;
      color: $bg-color;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price {
      line-height: .49rem;
      color: $hightlight-fontColor;
      font-size: .18rem;
    }
  }
  &__btn {
    width: .98rem;
    background-color: #4fb0f9;
    color: $bg-color;
    font-size: .14rem;
    text-align: center;
    a {
      color: $bg-color;
      @include linkTextDecoration;
    }
  }
}
</style>
