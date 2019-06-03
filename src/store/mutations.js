import {
  UPDATE_NICK_NAME,
  UPDATE_CART_COUNT
} from './mutation-types'

const mutations = {
  [UPDATE_NICK_NAME]: ((state, payload) => {
    state.nickName = payload
  }),
  [UPDATE_CART_COUNT]: ((state, payload) => {
    state.cartCount += payload
    console.log(state.cartCount)
    window.localStorage.setItem('cartCount', state.cartCount)
  })
}
export default mutations
