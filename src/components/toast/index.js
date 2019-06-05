import Vue from 'Vue'
import toast from './toast.vue'

let ToastConstructor = Vue.extend(toast)
let toastComponent

const $toast = (options) => {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  console.log(options)
  toastComponent = new ToastConstructor({
    data: options
  })
  toastComponent.vm = toastComponent.$mount()
  console.log(toastComponent, '--toastComponent')
  document.body.appendChild(toastComponent.vm.$el)
}

export default $toast
