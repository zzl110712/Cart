<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__btn" @click="handleLogoutClick">退出登录</div>
    </div>
    <div class="top__photo">
      <img class="top__photo__img" src="../../../src/assets/images/src=http___b-ssl.duitang.com_uploads_item_201905_28_20190528143150_fETNW.thumb.700_0.jpeg&refer=http___b-ssl.duitang.jpg" />
    </div>
    <div class="icons">
      <div class="icons__title">拖拽图标</div>
      <div
        class="icons__item"
        :style="{ top: `${index <= 4 ? 36 : 111}px`, left: leftPosition(index) }"
        v-for="(item, index) of homeIconsList"
        :key="item.desc"
        @touchstart="handleTouchstart($event)"
        @touchmove="handleTouchMove($event, index)"
        @touchend="handleTouchend($event, index)"
      >
        <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${ item.imgName }.png`" />
        <p class="icons__item__desc">{{ item.desc }}</p>
      </div>
    </div>
    <div class="tags">
      <div class="tags__item">优惠券<div class="tags__item__right"><span class="tags__item__text">11</span>张可用<div class="iconfont tags__item__icon">&#xe65e;</div></div></div>
      <div class="tags__item">收货地址<div class="iconfont tags__item__icon">&#xe65e;</div></div>
      <div class="tags__item">意见反馈<div class="iconfont tags__item__icon">&#xe65e;</div></div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Docker from '../../components/Docker'

const useLogoutEffect = () => {
  const router = useRouter()
  const handleLogoutClick = () => {
    localStorage.removeItem('isLogin')
    router.push({ name: 'Login' })
  }
  return { handleLogoutClick }
}

export default {
  name: 'User',
  components: { Docker },
  setup () {
    const store = useStore()
    const client = reactive({
      left: 0,
      top: 0,
      x: 0,
      y: 0
    })
    const { homeIconsList } = toRefs(store.state)
    const { handleLogoutClick } = useLogoutEffect()
    const handleTouchstart = (e) => {
      const element = e.targetTouches[0]
      e.currentTarget.style.opacity = 0.5
      client.x = element.clientX // 鼠标落点初始位置
      client.y = element.clientY // 鼠标落点初始位置
      client.left = element.target.getBoundingClientRect().left // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
      client.top = element.target.getBoundingClientRect().top
    }
    const handleTouchMove = (e, index) => {
      const element = e.targetTouches[0]
      // 当前鼠标落点加上元素自身左边距上边距
      const left = element.clientX - 35
      const top = element.clientY - 270
      // 移动当前元素
      e.currentTarget.style.left = `${left}px`
      e.currentTarget.style.top = `${top}px`
    }
    const handleTouchend = (e, index) => {
      const end = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
      e.currentTarget.style.opacity = 1
      const width = document.getElementsByClassName('icons')[0].offsetWidth
      const positionX = parseInt(end.x / width * 10)
      let positionY = 1
      if (index <= 4) {
        if (end.y - client.y < 30) {
          positionY = 1
        } else {
          positionY = 2
        }
      } else if (index > 4) {
        if (end.y - client.y < 0) {
          positionY = 1
        } else {
          positionY = 2
        }
      }
      let position = 0
      if (positionX <= 1) {
        if (positionY === 1) {
          position = 0
        } else {
          position = 5
        }
      } else if (positionX <= 3) {
        if (positionY === 1) {
          position = 1
        } else {
          position = 6
        }
      } else if (positionX <= 5) {
        if (positionY === 1) {
          position = 2
        } else {
          position = 7
        }
      } else if (positionX <= 7) {
        if (positionY === 1) {
          position = 3
        } else {
          position = 8
        }
      } else if (positionX <= 9) {
        if (positionY === 1) {
          position = 4
        } else {
          position = 9
        }
      }
      const item = homeIconsList.value[index]
      homeIconsList.value.splice(index, 1)
      homeIconsList.value.splice(position, 0, item)
      store.commit('changeHomeIconsList', homeIconsList.value)
    }
    const leftPosition = (index) => {
      let left = '0%'
      if (index === 0) {
        left = '0%'
      } else if (index >= 5) {
        if (index === 5) {
          left = '0%'
        } else {
          left = `${20 * (index - 5)}%`
        }
      } else {
        left = `${20 * index}%`
      }
      return left
    }
    return { leftPosition, homeIconsList, handleLogoutClick, handleTouchMove, handleTouchend, handleTouchstart }
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
.top {
  width: 100%;
  height: 4rem;
  background: $btn-bgColor;
  border-radius: 50%;
  position: absolute;
  top: -2rem;
  &__btn {
    position: absolute;
    top: 2.2rem;
    right: .2rem;
    color: $bg-color;
    font-size: .14rem;
  }
  &__photo {
    width: .7rem;
    margin: 1.6rem auto 0;
    height: .7rem;
    position: relative;
    z-index: 1;
    border-radius: .09rem;
    overflow: hidden;
    &__img {
      width: 100%;
      height: 100%;
    }
  }
}
.icons {
  display: flex;
  flex-wrap:wrap;
  margin-top: .16rem;
  position: relative;
  height: 1.83rem;
  &__title {
    line-height: .3rem;
    margin: 0 auto;
    width: 20%;
    height: .3rem;
    border-bottom: .03rem solid $btn-bgColor;
    font-size: .14rem;
    text-align: center;
  }
  &__item {
    width: 20%;
    height: .75rem;
    position: absolute;
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
.tags {
  margin: 0 2%;
  width: 96%;
  padding-bottom: .1rem;
  background: $bg-color;
  border-radius: .16rem;
  &__item {
    line-height: .4rem;
    margin: 0 .06rem;
    border-bottom: .01rem solid $content-notice-fontcolor;
    padding: .1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__right {
      display: flex;
      flex-direction: row;
    }
    &__text {
      color: $btn-bgColor;
    }
    &__icon {
      transform: rotate(180deg);
      color: $medium-fontColor;
    }
  }
}
</style>
