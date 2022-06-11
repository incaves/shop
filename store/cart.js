export default {
  namespaced: true,
  actions: {},
  mutations: {
    // 添加到购物车
    addToCart(state, goods) {
      // 根据提交的商品的Id,查询购物车中是否存在这件商品
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 如果不存在,则findResult为undefined
      // 否则,为查找到的商品信息对象
      if (!findResult) {
        // 没有这件商品,添加到购物车
        state.cart.push(goods)
      } else {
        // 存在,更新数量即可
        findResult.goods_count++
      }
      // 不论有还还是没有都需要调用本地存储的方法
      this.commit('m_cart/saveToStorage')
    },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
  },
  state: {
    // 每个商品都会包含以下的属性
    // goods_id -> Id
    // goods_name -> 名称
    // goods_price -> 价格
    // goods_count -> 数量
    // goods_small_logo -> 图片
    // goods_state -> 选中状态
    // 从本地存储中读取数据
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  },
  getters: {
    // 统计购物车中商品的总数量
    total(state) {
      let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      state.cart.forEach(goods => (c += goods.goods_count))
      return c
    },
  },
}
