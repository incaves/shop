<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧商品名称滑动区域 -->
			<scroll-view scroll-y="true" :style="{ height: wh + 'px' }" class="left-scroll-view">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', index === active ? 'active' : '']" 
					@click="activeChanged(index)">{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			<!-- 右侧商品名称滑动区域 -->
			<scroll-view scroll-y="true" :style="{ height: wh + 'px' }" class="right-scroll-view" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<!-- 标题 -->
					<view class="cate-lv2-title">/ {{ item2.cat_name }} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!-- 图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 文本 -->
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wh: 0, // 当前设备可以用的高度
			cateList: [], // 分类列表数据
			active: 0, // 默认激活项
			cateLevel2: [] ,// 二级分类
			scrollTop: 0 // 滚动条距离顶部的距离
		};
	},
	onLoad() {
		const sysInfo = uni.getSystemInfoSync();
		this.wh = sysInfo.windowHeight;
		this.getCateList();
	},
	methods: {
		async getCateList() {
			// 发起请求
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			// 判断是否获取失败
			if (res.meta.status !== 200) return uni.$showMsg();
			// 存储数据
			this.cateList = res.message;
			// 区分二级分类
			this.cateLevel2 = res.message[0].children;
		},
		// 选中项改变的事件处理函数
		activeChanged(index) {
			this.active = index;
			// 切换选中名称 重新获取二级分类数据
			// this.cateList[index].children 切换项的数据 给到二级分类数组
			this.cateLevel2 = this.cateList[index].children;
			// 解决滚动条问题(应该切换时,在最顶端)(来回1和0来回切换,如果直接赋值为0会有问题)
			this.scrollTop = this.scrollTop === 0 ? 1 : 0
		},
        // 点击三级分类进行跳转
		gotoGoodsList(item3){
		  uni.navigateTo({
		      url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
		   })
		}
	}
};
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120px;
	}
	.left-scroll-view-item {
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		// 被选中时的高亮效果
		&.active {
			background-color: #ffffff;
			position: relative;
			// 被选中时的右侧红色
			&::before {
				content: ' ';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #c00000;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
.cate-lv2-title {
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
