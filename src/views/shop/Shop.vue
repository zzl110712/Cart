<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe65e;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe607;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'
import { get } from '../../utils/requests'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  margin: .14rem 0 .04rem;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    line-height: .32rem;
    background: $search-bgColor;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      width: 100%;
      display: block;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      color: $content-fontcolor;
      font-size: .14rem;
      &::placeholder {
        color: $content-fontcolor;
        font-size: .14rem;
      }
    }
  }
}
</style>
