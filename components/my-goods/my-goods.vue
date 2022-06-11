<template>
  <view class="goods-item">
    <!-- 左侧图片 -->
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic" />
    </view>
    <!-- 右侧的商品详情 -->
    <view class="goods-item-right">
      <!-- 商品名称 -->
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">${{ goods.goods_price | tofixed }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      // 如果图片失效,使用默认图片
      defaultPic:
        'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    }
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
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-right: 5px;
    // 左侧图片
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block; // 底部间隙
    }
  }
  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
    }
    .goods-price {
      color: #c00000;
      font-size: 16px;
    }
  }
}
</style>
