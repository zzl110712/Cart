<template>
  <div class="dodker">
    <div :class="{ 'dodker__item': true, 'dodker__item--active': index === currentIndex }" v-for="(item, index) of dockerList" :key="item.icon">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="dodker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      {
        icon: '&#xe6d0;',
        text: '首页',
        to: { name: 'Home' }
      },
      {
        icon: '&#xe68a;',
        text: '购物车',
        to: { name: 'CartList' }
      },
      {
        icon: '&#xe61d;',
        text: '订单',
        to: { name: 'OrderList' }
      },
      {
        icon: '&#xe689;',
        text: '我的',
        to: { name: 'User' }
      }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/mixins.scss';
@import '../style/viriables.scss';
.dodker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: 1px solid $content-bgcolor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      @include linkTextDecoration;
      color: $content-fontcolor;
    }
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: center top;
  }
}
</style>
