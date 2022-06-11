import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moduleCart from './cart.js' // 购物车
const store = new Vuex.Store({
  modules: {
    m_cart: moduleCart,
  },
})

export default store
