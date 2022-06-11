<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
	  <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
	    <uni-icons type="search" size="17"></uni-icons>
	    <text class="placeholder">搜索</text>
	  </view>
	</view>
</template>

<script>
export default {
	// 可以进行自定制
	props: {
	  // 背景颜色
	  bgcolor: {
	    type: String,
	    default: '#C00000' // 默认
	  },
	  // 圆角尺寸
	  radius: {
	    type: Number,
	    // 单位是 px
	    default: 18 // 默认
	  }
	},
	data() {
		return {};
	},
	methods:{
		// 触发定义事件
		searchBoxHandler(){
			this.$emit('clickSearch') //让组件触发
		}
	}
};
</script>

<style lang="scss">
.my-search-container {
	// background-color: #c00000;
	height: 50px;
	padding: 0 10px;
	display: flex;
	align-items: center;
}

.my-search-box {
	height: 36px;
	background-color: #ffffff;
	// border-radius: 15px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	.placeholder {
		font-size: 15px;
		margin-left: 5px;
	}
}
</style>
