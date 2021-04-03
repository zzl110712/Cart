<template>
  <div class="wrapper">
    <Topposition />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import Topposition from './TopPosition'
import ProductList from './ProductList'
import Order from './Order'

export default {
  name: 'OrderComfirmation',
  components: { Topposition, ProductList, Order }
}
</script>

<style lang="scss" scoped>
.wrapper {
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(249, 249, 249);
  overflow-y: scroll;
}
</style>
