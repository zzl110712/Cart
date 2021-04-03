<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) of list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{ item.isCanceled ? '已下单' : '已取消' }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) of item.products" :key="innerIndex">
              <img class="order__content__img" v-if="innerIndex <= 3" :src="innerItem.product.img" />
            </template>
          </div>
          <span class="order__content__info">
            <div class="order__content__price">&yen;{{ item.totalPrice }}</div>
            <div class="order__content__count">共{{ item.totalNumber }}件</div>
          </span>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker'

import { get } from '../../utils/requests'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach(order => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach(productItem => {
          totalNumber += productItem?.orderSales || 0
          totalPrice += (productItem?.product?.price * productItem?.orderSales) || 0
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
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
.order {
  margin: .16rem .18rem 0;
  padding: .16rem;
  background: $bg-color;
  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    color: $content-fontcolor;
    font-size: .16rem;
  }
  &__status {
    float: right;
    color: $light-fontColor;
    font-size: .14rem;
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
</style>
