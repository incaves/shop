<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods, index) in cart" :key="index">
        <!-- goods -> 传递的数据  -->
        <!-- showRadio -> 是否展示选中按钮 -->
        <!-- radio-change -> 单选按钮的自定义事件  -->
        <!-- show-num -> 是否展示数字选择框 -->
        <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
          <my-goods
            :goods="goods"
            :showRadio="true"
            @radio-change="radioChangeHandler"
            @num-change="numChangeHandler"
            :show-num="true"
          ></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [badgeMix],
  data() {
    return {
      options: [
        {
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000', // 按钮的背景颜色
          },
        },
      ],
    }
  },
  computed: {
    ...mapState('m_cart', ['cart']),
  },
  methods: {
    ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
    // 单选按钮的自定义事件
    // 接收的是组件内传递来的选中状态和当前点击项的id
    radioChangeHandler(e) {
      console.log(e)
      this.updateGoodsState(e)
    },
    // 数字选择框的自定义事件
    // 接收的是组件内传递来的商品数量和当前点击项的id
    numChangeHandler(e) {
      this.updateGoodsCount(e)
    },
    // 滑动删除
    swipeActionClickHandler(goods) {
      this.removeGoodsById(goods.goods_id)
    },
  },
}
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
}
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
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
