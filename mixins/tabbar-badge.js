import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('m_cart', ['total']),
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      // 调用uni.setTabBarBadge()方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2, // 索引(购物车的导航在2)
        text: this.total + '', // 文本内容
      })
    },
  },
  watch: {
    // 监听total值的变化
    total() {
      // 调用 methods中的setBadge 方法,重新为tabBar的数字徽章赋值
      this.setBadge()
    },
  },
}
