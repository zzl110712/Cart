<template>
  <div class="order">
    <div class="order__price">实付金额 <b>&yen;{{ calculations.price }}</b></div>
    <div class="order__btn" @click="() => handleShowConfrimChange(true)">提交订单</div>
  </div>
  <div class="mask" v-if="showConfirm" @click.self="() => handleShowConfrimChange(false)">
    <div class="mask__content">
      <h3 class="mask__content__title">确认离开收银台?</h3>
      <p class="mask__content__dsc">请尽快完成支付，否则订单将会被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { post } from '../../utils/requests'
// 购物车数量相关
import { useCommonCartEffect } from '../../effects/cartEffects'

// 和下单相关逻辑
const useMakeOrderEffect = (shopName, shopId, productList) => {
  const store = useStore()
  const router = useRouter()
  const handleConfirmOrder = async (isCanceled) => {
    // Iterator
    // const data = productList.value
    // data[Symbol.iterator] = () => {
    //   const keys = Reflect.ownKeys(data)
    //   let values = {}
    //   return {
    //     next () {
    //       if (keys.length) {
    //         values = data[keys[0]]
    //         keys.shift()
    //       }
    //       return {
    //         value: { id: parseInt(values._id, 10), num: values.count },
    //         done: !keys.length
    //       }
    //     }
    //   }
    // }
    // const products = []
    // for (const item of data) {
    //   products.push(item)
    // }
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return { handleConfirmOrder }
}

// 蒙层展示相关落基
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfrimChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfrimChange }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()

    const shopId = parseInt(route.params.id, 10)

    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopName, shopId, productList)
    const { showConfirm, handleShowConfrimChange } = useShowMaskEffect()

    return { calculations, showConfirm, handleConfirmOrder, handleShowConfrimChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.order {
  left: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bg-color;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    background: #4fb0f9;
    color: $bg-color;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  background: rgba(0, 0, 0, .5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 2rem;
    background: $bg-color;
    border-radius: .04rem;
    text-align: center;
    &__title {
      line-height: .26rem;
      margin: .24rem 0;
      color: $content-fontcolor;
      font-size: .18rem;
    }
    &__desc {
      margin: .8rem 0 0;
      color: $medium-fontColor;
      font-size: .14rem;
    }
    &__btns {
      margin: .24rem .58rem 0;
      display: flex;
    }
    &__btn {
      line-height: .32rem;
      width: .8rem;
      flex: 1;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .12rem;
        border: 1px solid #4fb0f9;
        color: #4fb0f9;
      }
      &--last {
        margin-left: .12rem;
        background: #4fb0f9;
        color: $bg-color;
      }
    }
  }
}
</style>
