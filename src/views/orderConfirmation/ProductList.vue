<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list">
      <div v-for="item of productList" :key="item._id" class="products__item">
        <img class="products__item__img" :src="item.imgUrl" />
        <div class="products__item__detail">
          <h4 class="products__item__title">{{ item.name }}</h4>
          <p class="products__item__price">
            <span>
              <span class="products__item__yen">&yen; {{ item.price }} × {{ item.count }}</span>
            </span>
            <span class="products__item__price__total">
              <span class="products__item__yen">&yen; {{ (item.price * item.count).toFixed(2) }}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
// 购物车数量相关
import { useCommonCartEffect } from '../../effects/cartEffects'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.products {
  margin: .16rem .18rem .1rem;
  background: $bg-color;
  &__title {
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
    padding: .16rem .16rem 0;
  }
  &__list {
    max-height: 4.68rem;
    overflow-y: scroll;
  }
  &__item {
    display: flex;
    padding: .16rem;
    position: relative;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
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
      display: flex;
      line-height: .2rem;
      margin: .06rem 0 0 0;
      font-size: .14rem;
      color: $hightlight-fontColor;
      &__total {
        flex: 1;
        text-align: right;
        color: $dark-fontColor;
      }
    }
    &__yen {
      font-size: .12rem;
    }
  }
}
</style>
