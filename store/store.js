import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moduleCart from './cart.js' // 购物车
import moduleUser from './user.js' // 用户
const store = new Vuex.Store({
  modules: {
    m_cart: moduleCart,
    m_user: moduleUser,
  },
})

export default store
