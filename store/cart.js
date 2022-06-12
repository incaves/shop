export default {
  namespaced: true,
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
    // 更新购物车商品的勾选状态(前提是购物有数据,否则查找不到)
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 找到了对应的商品(该商品存在于购物车)
      if (findResult) {
        findResult.goods_state = goods.goods_state // 修改状态
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车商品数量(前提是购物有数据,否则查找不到)
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 该商品存在于购物车
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 滑动进行删除
    removeGoodsById(state, goods_id) {
      // 新数组中包含的是不需要被删除的条件
      // 不相等的过滤到新数组中,相等的过滤删除掉
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    // 更新所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      // newState是传递过来的布尔值 根据传递的布尔值来更新最新的状态
      state.cart.forEach(x => (x.goods_state = newState))
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
  },
  state: {
    // 从本地存储中读取数据
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  },
  getters: {
    // 统计购物车中商品的总数量
    total(state) {
      // 使用reduce进行累加
      return state.cart.reduce((total, item) => (total += item.goods_count), 0)
    },
    // 统计购物车已勾选商品的总数量
    checkedCount(state) {
      // 先使用 filter 方法,从购物车中过滤器已勾选的商品
      // 再使用 reduce 方法,将已勾选的商品总数量进行累加
      return state.cart
        .filter(x => x.goods_state)
        .reduce((total, item) => (total += item.goods_count), 0)
    },
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      // 先使用filter方法,从购物车中过滤器已勾选的商品
      // 再使用reduce方法,将已勾选的商品数量 * 单价之后,进行累加
      // reduce() 的返回值就是已勾选的商品的总价
      // 最后调用toFixed(2)方法,保留两位小数
      return state.cart
        .filter(x => x.goods_state)
        .reduce((total, item) => (total += item.goods_count * item.goods_price), 0)
        .toFixed(2)
    },
  },
}
