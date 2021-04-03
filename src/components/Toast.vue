<!-- <template>
  <div class="toast">{{ message }}</div>
</template> -->

<script>
import { ref, h } from 'vue'

export default {
  props: ['message'],
  setup (props, context) {
    return () => h('div', { class: 'toast' }, props.message)
  }
}

export const useToastEffect = () => {
  const showToast = ref(false)
  const toastMsg = ref('')
  const hideToastMsg = (str) => {
    showToast.value = true
    toastMsg.value = str
    setTimeout(() => {
      showToast.value = false
      toastMsg.value = ''
    }, 2000)
  }
  return { showToast, toastMsg, hideToastMsg }
}
</script>

<style lang="scss">
@import '../style/viriables.scss';
.toast {
  padding: .1rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: $bg-color;
}
</style>
