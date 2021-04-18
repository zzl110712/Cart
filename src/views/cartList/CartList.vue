<template>
  <div class="wrapper">
    <div class="title">我的购物车</div>
  </div>
  <div v-if="showCartList" class="carts">
    <router-link class="cart" v-for="(item, index) of list" :key="index" :to="`/shop/${item._id}`">
      <div class="cart__title">
        {{ item.shopName }}
        <span class="cart__icon iconfont" :style="{ transform: item.showCartDetail ? 'rotate(90deg)': 'rotate(270deg)' }" @click.prevent="() => item.showCartDetail = !item.showCartDetail">&#xe65e;</span>
      </div>
      <div v-if="!item.showCartDetail" class="cart__content">
        <div class="cart__content__imgs">
          <template v-for="(innerItem, innerIndex) of item.products" :key="innerIndex">
            <img class="cart__content__img" v-if="innerIndex <= 3" :src="innerItem.imgUrl" />
          </template>
        </div>
        <span class="cart__content__info">
          <div class="cart__content__price">&yen;{{ item.totalPrice }}</div>
          <div class="cart__content__count">共{{ item.totalNumber }}件</div>
        </span>
      </div>
      <div v-else class="products__list">
        <div v-for="(productItem, index) of item.products" :key="index" class="products__item">
          <img class="products__item__img" :src="productItem.imgUrl" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ productItem.name }}</h4>
            <p class="products__item__price">
              <span>
                <span class="products__item__yen">&yen; {{ productItem.price }} × {{ productItem.count }}</span>
              </span>
              <span class="products__item__price__total">
                <span class="products__item__yen">&yen; {{ (productItem.price * productItem.count).toFixed(2) }}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else class="cartStatus">暂无商品</div>
  <Docker :currentIndex="1" />
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import Docker from '../../components/Docker'

export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const store = useStore()
    const { cartList } = toRefs(store.state)
    const showCartList = ref(false)
    const list = reactive([])

    for (let iii = 0; iii < Object.values(cartList.value).length; iii++) {
      const shopItem = Object.values(cartList.value)[iii]
      const shopKeys = Object.keys(cartList.value)

      const productItem = {
        _id: '',
        shopName: '',
        products: [],
        totalPrice: 0,
        totalNumber: 0,
        showCartDetail: false
      }
      if (Object.keys(shopItem.productList).length > 0) {
        productItem._id = shopKeys[iii]
        productItem.shopName = shopItem.shopName
        for (const product of Object.values(shopItem.productList)) {
          productItem.products.push(product)
          productItem.totalPrice += product.price * product.count
          productItem.totalNumber += product.count
        }

        showCartList.value = true
        list.push(productItem)
      }
    }

    return { cartList, showCartList, list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: .5rem;
  right: 0;
  background: rgb(249, 249, 249);
}
.title {
  line-height: .44rem;
  background: $bg-color;
  color: $content-fontcolor;
  text-align: center;
  font-size: .16rem;
}
.carts {
  width: 100%;
  position: absolute;
  overflow-y: auto;
  top: .5rem;
  left: 0;
  bottom: .6rem;
  right: 0;
}
.cartStatus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .14rem;
  position: absolute;
  top: .44rem;
  left: 0%;
  bottom: .5rem;
  right: 0%;
  color: $search-fontColor;
}
.cart {
  margin: .16rem .18rem 0;
  padding: .16rem;
  background: $bg-color;
  display: block;
  text-decoration: none;
  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    color: $content-fontcolor;
    font-size: .16rem;
  }
  &__icon {
    float: right;
    color: $light-fontColor;
    font-size: .14rem;
    transition: transform .3s;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      margin-right: .12rem;
      width: .4rem;
      height: .4rem;
    }
    &__info {
      width: .7rem;
    }
    &__price {
      line-height: .2rem;
      margin-bottom: .04rem;
      color: $hightlight-fontColor;
      font-size: .14rem;
      text-align: right;
    }
    &__count {
      line-height: .14rem;
      color: $content-fontcolor;
      font-size: .12rem;
      text-align: right;
    }
  }
}
.products {
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
