<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input type="text" v-model="username" placeholder="请输入用户名" class="wrapper__input__content" />
    </div>
    <div class="wrapper__input">
      <input type="password" v-model="password" placeholder="请输入密码" class="wrapper__input__content" autocomplete="new-password" />
    </div>
    <div class="wrapper__input">
      <input type="password" v-model="ensurement" placeholder="确认密码" class="wrapper__input__content" />
    </div>
    <div @click="handleRegister" class="wrapper__register--button">注册</div>
    <div class="wrapper__register--link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="showToast" :message="toastMsg" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { post } from '../../utils/requests'
import Toast, { useToastEffect } from '../../components/Toast'

// 注册逻辑
const useRegisterEffect = (hideToastMsg) => {
  const store = useStore()
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', { username: data.username, password: data.password })
      if (result?.errno === 0) {
        store.dispatch('changeUserName', data.username)
        store.dispatch('changePassWord', data.password)
        router.push({ name: 'Login' })
      } else {
        hideToastMsg('Register Error')
      }
    } catch (error) {
      hideToastMsg('Request Error')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const router = useRouter()
    const { showToast, toastMsg, hideToastMsg } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(hideToastMsg)
    const handleLoginClick = () => {
      router.push({ name: 'Login' })
    }
    return { username, password, ensurement, handleRegister, handleLoginClick, showToast, toastMsg }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    margin: 0 auto .4rem;
    display: block;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    margin: 0 .4rem .16rem;
    box-sizing: border-box;
    height: .48rem;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: .01rem solid rgba(0, 0, 0, 0.10);
    border-radius: .06rem;
    &__content {
      border: none;
      outline: none;
      width: 100%;
      height: .48rem;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__register--button {
    margin: .32rem .4rem .16rem;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: $bg-color;
    font-size: .16rem;
    text-align: center;
  }
  &__register--link {
    font-size: .14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}
</style>
