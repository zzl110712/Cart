<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe65e;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__position">XX省XX市XX区XX小区11号楼 0-00-0</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">Sherry</span>
        <span class="top__receiver__info__phone">189XXXXXXXX</span>
      </div>
      <div class="iconfont top__receiver__icon">&#xe65e;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopPosition',
  setup () {
    const router = useRouter()
    const handleBackClick = () => { router.back() }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
  &__header {
    line-height: .24rem;
    position: relative;
    padding-top: .26rem;
    color: $bg-color;
    text-align: center;
    font-size: .16rem;
    &__back {
      left: .18rem;
      position: absolute;
      font-size: .22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bg-color;
    border-radius: .04rem;
    &__title {
      line-height: .22rem;
      padding: .16rem .16rem .14rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__position {
      @include ellipsis;
      line-height: .2rem;
      padding: 0rem .4rem 0rem .16rem;
      color: $content-fontcolor;
      font-size: .14rem;
    }
    &__info {
      padding: .06rem 0 0 .16rem;
      &__name {
        margin-right: .06rem;
        height: .19rem;
        color: $medium-fontColor;
        font-size: .12rem;
      }
      &__phone {
        height: .19rem;
        color: $medium-fontColor;
        font-size: .12rem;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: $medium-fontColor;
      font-size: .2rem;
    }
  }
}
</style>
