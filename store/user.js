export default {
  namespaced: true,
  actions: {},
  mutations: {
    // 更新收货地址(参数时组件中传递)
    updateAddress(state, address) {
      state.address = address // 存储到Vuex(实现组件共享)
      this.commit('m_user/saveAddressToStorage') // 存储到本地存储
    },
    // 将收货地址持久化存储
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
  },
  state: {
    address: JSON.parse(uni.getStorageSync('address') || '{}'), // 收货地址
    token: '', // token
  },
  getters: {
    // 拼接收货地址
    Theaddress(state) {
      // 判断是否有收获地址,如果没有不做任何操作
      if (!state.address.provinceName) return ''
      // 拼接省,市,区,详细地址
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      )
    },
  },
}
