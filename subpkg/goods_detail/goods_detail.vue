<template>
  <!-- 解决商品名称加载时会有1s undefined的情况 -->
  <!-- 有的话才展示 -->
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <!-- 轮播图区域 start-->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 轮播图 end -->
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{ goods_info.goods_price }}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品图文数据 -->
    <!-- 将数据中HTML结构渲染到页面 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav
        :fill="true"
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
    </view>
  </view>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      goods_info: {}, // 商品详情数据
      // 底部导航区域的配置信息
      options: [
        {
          icon: 'shop',
          text: '店铺',
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0,
        },
      ],
      // 右侧按钮组的配置对象
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff',
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff',
        },
      ],
    }
  },
  // options是其他页面传递来的参数
  onLoad(options) {
    const goods_id = options.goods_id
    this.getGoodsDetail(goods_id)
  },
  computed: {
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
    // 动态展示右上角的徽标数据
    // newValue是接收的数据
    total: {
      handler(newValue) {
        const findResult = this.options.find(x => x.text === '购物车')
        if (findResult) {
          findResult.info = newValue // 把最新的值传递
        }
      },
      immediate: true, // 页面加载,立即调用
    },
  },
  methods: {
    ...mapMutations('m_cart', ['addToCart']),
    // 根据id获取商品详情数据
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
      if (res.meta.status !== 200) return uni.$showMsg()
      // 解决图文数据下面的空白缝隙(此数据是HTML结构,需要用正则替换一下)
      // display:block 可以解决图片底部缝隙
      // 并解决图片在ios上不展示的问题 webp在ios上支持不是很好 需要替换为jpeg
      res.message.goods_introduce = res.message.goods_introduce
        .replace(/<img /g, '<img style="display:block;" ')
        .replace(/webp/g, 'jpg')
      // 赋值
      this.goods_info = res.message
    },
    // 实现图片的预览效果
    preview(index) {
      // 调用 uni.previewImage() 方法预览图片
      uni.previewImage({
        // 预览时，默认显示图片的索引
        current: index,
        // 所有图片 url 地址的数组
        urls: this.goods_info.pics.map(x => x.pics_big),
      })
    },
    // 点击购物车,跳转到购物车页面
    onClick(e) {
      if (e.content.text === '购物车') {
        // 切换到购物车页面
        uni.switchTab({
          url: '/pages/cart/cart',
        })
      }
    },
    // 将商品添加到购物车
    buttonClick(e) {
      if (e.content.text === '加入购物车') {
        const goods = {
          goods_id: this.goods_info.goods_id, // 商品的Id
          goods_name: this.goods_info.goods_name, // 商品的名称
          goods_price: this.goods_info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
          goods_state: true, // 商品的勾选状态
        }
        this.addToCart(goods)
      }
    },
  },
}
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}

.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
