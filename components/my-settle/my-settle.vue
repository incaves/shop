<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" />
      <text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations('m_cart', ['updateAllGoodsState']),
    // 全选或反选(Vuex)
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck)
    },
    // 点击了结算
    settlement() {
      // 1.判断勾选的商品(如果等于0,进行提醒)
      if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
      // 2.是否选择了收货地址
      if (!this.Theaddress) return uni.$showMsg('请选择收货地址')
      // 3.是否登陆
      if (!this.token) return uni.$showMsg('未登陆')
    },
  },
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    ...mapGetters('m_user', ['Theaddress']),
    ...mapState('m_user', ['token']),
    // 是否全选
    isFullCheck() {
      // checkedCount 是已勾选的总数量
      // total 是所有商品的总数量
      return this.total === this.checkedCount
    },
  },
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }
  .amount {
    color: #c00000;
  }
  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
