<template>
  <view>
    <!-- 搜索组件自定义 -->
    <view class="search-box">
      <my-search @clickSearch="gotoSearch"></my-search>
    </view>
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
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <!-- 跳转 -->
        <navigator
          class="swiper-item"
          :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"
        >
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="navClickHandler(item)"
      >
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层数据 -->
    <view class="floor-list">
      <!-- 每一个楼层 -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <!-- 标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 图标 -->
        <view class="floor-img-box">
          <!-- 大图 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            ></image>
          </navigator>
          <!-- 四张小图 -->
          <view class="right-img-box">
            <!-- 不需要第一张 -->
            <navigator
              class="right-img-box"
              :url="item2.url"
              v-for="(item2, index2) in item.product_list"
              :key="index2"
              v-show="index2 !== 0"
            >
              <image
                :src="item2.image_src"
                mode="widthFix"
                :style="{ width: item2.image_width + 'rpx' }"
              ></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [], // 轮播图
      navList: [], // 分类导航
      floorList: [], // 楼层数据
    }
  },
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },
  methods: {
    // 获取轮播图数据
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      // 请求失败
      if (res.meta.status !== 200) return uni.$showMsg()
      // 请求成功
      this.swiperList = res.message
    },
    // 获取分类导航
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.navList = res.message
    },
    // 点击分类进行跳转
    navClickHandler(item) {
      if (item.name == '分类') {
        uni.switchTab({
          url: '/pages/cate/cate',
        })
      }
    },
    // 获取楼层数据
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) return uni.$showMsg()
      // 对数据进行处理(url),原本的数据 /page/.. -> /subpkg/...
      res.message.forEach(floor => {
        // 拿到每一项再进行循环
        floor.product_list.forEach(prod => {
          // 挂载一个自定义属性,并截取出对应的参数
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
      console.log(this.floorList)
    },
    // 跳转到分包中的搜索组件
    gotoSearch() {
      console.log(123)
      uni.navigateTo({
        url: '/subpkg/search/search',
      })
    },
  },
}
</script>

<style lang="scss">
// 轮播图
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
// 分类导航
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
// 楼层
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
</style>
