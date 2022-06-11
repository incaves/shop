<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-for="(goods, index) in cart" :key="index">
      <my-goods :goods="goods"></my-goods>
    </block>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState } from 'vuex'
export default {
  mixins: [badgeMix],
  data() {
    return {}
  },
  computed: {
    ...mapState('m_cart', ['cart']),
  },
}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
</style>
