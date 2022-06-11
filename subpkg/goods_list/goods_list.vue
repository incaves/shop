<template>
  <view>
    <view class="goods-list">
      <!-- 每个数据项 -->
      <view v-for="(goods, index) in goodsList" :key="index" @click="gotoDetail(goods)">
        <!-- 传递给自定义组件 -->
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
import myGoods from '../../components/my-goods/my-goods.vue'
export default {
  components: { myGoods },
  data() {
    return {
      // 请求参数对象
      queryObj: {
        query: '', // 查询关键字
        cid: '', // 查询id
        pagenum: 1, // 当前第几页
        pagesize: 10, // 每页显示多少条数据
      },
      goodsList: [], //请求回来的数据
      total: 0, // 请求回来的总数据条数
      isloading: false, // 节流罚
    }
  },
  // option 可以获取到其他页面传递来的参数
  onLoad(option) {
    // 存储到请求参数中
    this.queryObj.query = option.query || ''
    this.queryObj.cid = option.cid || ''
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表数据
    async getGoodsList(cb) {
      this.isloading = true // 打开节流阀
      const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
      this.isloading = false // 关闭节流阀
      cb && cb() // 存在的话就调用
      if (res.meta.status !== 200) return uni.$showMsg()
      // 让新数据和旧数据进行合并
      this.goodsList = [...this.goodsList, ...res.message.goods]
      this.total = res.message.total
    },
    // 点击跳转到商品详情页面
    gotoDetail(goods) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id,
      })
    },
  },
  // 滑动加载数据
  onReachBottom() {
    // 判断是否还有下一页数据
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
      return uni.$showMsg('数据加载完毕!')
    }
    // 如果是true的话,表示在请求其他的数据不做任何操作
    if (this.isloading) return
    // 让页码值自增 +1
    this.queryObj.pagenum += 1
    // 重新获取列表数据
    this.getGoodsList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 1. 重置关键数据
    this.queryObj.pagenum = 1
    this.total = 0
    this.isloading = false
    this.goodsList = []
    // 2. 重新发起请求,并关闭下拉刷新效果
    this.getGoodsList(() => uni.stopPullDownRefresh())
  },
}
</script>

<style lang="scss"></style>
