<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61f;</span>XX省XX市XX区XX小区11号楼 0-00-0<span class="iconfont position__notice">&#xe691;</span>
  </div>
  <div class="search"><span class="iconfont">&#xe607;</span><span class="search__text">请输入想搜索的商品</span></div>
  <div class="banner">
    <img v-if="showBanner" class="banner__img" src="../../assets/images/9087c20cb0aff1b7a0a57fb8e84d26ceeb3abf11.jpg" />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item of homeIconsList" :key="item.desc">
      <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${ item.imgName }.png`" />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'StaticPart',
  setup () {
    const store = useStore()
    const { homeIconsList } = toRefs(store.state)
    const showBanner = ref(true)
    // const handleBannerChange = () => {
    //   showBanner.value = !showBanner.value
    // }
    return { homeIconsList, showBanner }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.position {
  color: $content-fontcolor;
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    top: .01rem;
    margin-right: 0.02rem;
    font-size: .2rem;
  }
  .position__notice {
    position: absolute;
    top: .17rem;
    right: 0;
    font-size: .2rem;
  }
}
.search {
  margin-bottom: .12rem;
  vertical-align: middle;
  line-height: .32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: .16rem;
  .iconfont {
    position: relative;
    display: inline-block;
    font-size: .18rem;
    top: .02rem;
    padding: 0 .08rem 0 .16rem;
  }
  &__text {
    display: inline-block;
    font-size: .14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap:wrap;
  margin-top: .16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: .03rem;
  background: $content-bgcolor;
  margin: 0 -.18rem;
}
</style>
