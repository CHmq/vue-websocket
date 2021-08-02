// 防快速多次点击，重复提交
import Vue from 'vue'

const preventReClick = Vue.directive('preventReClick', {
  inserted: (el, binding) => {
    el.addEventListener('click', () => {
      let clickDisabled = el.disabled
      if (!clickDisabled) {
        clickDisabled = true
        setTimeout(() => {
          clickDisabled = false
        }, binding.value || 2000)
      }
    })
  }
})

export default { preventReClick }
