<template>
  <view class="goods-item">
    <!-- 左侧图片 -->
    <view class="goods-item-left">
      <radio
        :checked="goods.goods_state"
        color="#C00000"
        v-if="showRadio"
        @click="radioClickHandler"
      ></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic" />
    </view>
    <!-- 右侧的商品详情 -->
    <view class="goods-item-right">
      <!-- 商品名称 -->
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">${{ goods.goods_price | tofixed }}</view>
        <!-- 数字选择框 -->
        <uni-number-box
          :min="1"
          :value="goods.goods_count"
          v-if="showNum"
          @change="numChangeHandler"
        ></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 传递的数据
    goods: {
      type: Object,
      default: {},
    },
    // 单选框的显示与隐藏
    showRadio: {
      type: Boolean,
      default: false,
    },
    // 数字选择框的显示与隐藏
    showNum: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 如果图片失效,使用默认图片
      defaultPic:
        'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    }
  },
  methods: {
    // 单选框的点击事件
    radioClickHandler() {
      this.$emit('radio-change', {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state,
      })
    },
    // 数字选择框的数字变化事件
    numChangeHandler(val) {
      this.$emit('num-change', {
        goods_id: this.goods.goods_id,
        goods_count: +val,
      })
    },
  },
  filters: {
    // 把数字处理为带两位小数点的数字
    tofixed(num) {
      return Number(num).toFixed(2)
    },
  },
}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  width: 750rpx;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 左侧图片
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block; // 底部间隙
    }
  }
  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .goods-price {
      color: #c00000;
      font-size: 16px;
    }
  }
}
</style>
