<template>
  <view>
    <!-- 轮播图区域 -->
    <!-- indicator-dots 小圆点  -->
    <!-- autoplay 自动轮播 -->
    <!-- interval 轮播的间隔 -->
    <!-- duration 总耗时 -->
    <!-- circular 衔接滚动 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [], // 轮播图
    }
  },
  onLoad() {
    this.getSwiperList()
  },
  methods: {
    // 获取轮播图数据
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      // 请求失败
      if (res.meta.status !== 200)
        return uni.showToast({
          title: '数据请求失败！',
          duration: 1500,
          icon: 'none',
        })
      // 请求成功
      this.swiperList = res.message
    },
  },
}
</script>

<style lang="scss">
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
