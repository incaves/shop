<template>
	<view>
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 cancelButton 不显示取消按钮 -->
			<uni-search-bar @input="inputSearch" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<!-- 列表项 -->
			<view class="sugg-item" v-for="(item, index) in searchResults" :key="index" @click="gotoDetail(item)">
				<!-- 列表名称 -->
				<view class="goods-name">{{ item.goods_name }}</view>
				<!-- 图标 -->
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: null, // 延时器
			kw: '', // 输入的值
			searchResults: [], // 搜索结果列表
			historyList: [] // 搜索关键词的历史记录
		};
	},
	onLoad() {
		// 页面一加载,读取存储的关键词(转换为对象)(可能不存在 '[]')
		this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
	},
	methods: {
		// 获取输入的值(并实现防抖)
		inputSearch(e) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.kw = e.value;
				this.getSearchList(); // 输入时调用获取搜索结果的数据
			}, 500);
		},
		// 获取搜索结果
		async getSearchList() {
			// 搜索框为空
			if (this.kw.length === 0) {
				this.searchResults = [];
				return;
			}
			// 发起请求
			const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw });
			if (res.meta.status !== 200) return uni.$showMsg();
			this.searchResults = res.message;
			// 调用搜索关键词方法
			this.saveSearchHistory()
		},
		// 搜索关键词(搜索历史)
		saveSearchHistory(){
		  // this.historyList.push(this.kw)
		  // 解决关键词重复的问题
		  const set = new Set(this.historyList)
		  set.delete(this.kw) // 如果出现重复的 移出原有的
		  set.add(this.kw)  // 添加新输入的关键词
		  this.historyList = Array.from(set) // 转换成数组
		  // 将搜索历史记录持久化存储到本地(本地存储只能存储字符串,转换成字符串)
		  uni.setStorageSync('kw', JSON.stringify(this.historyList))
		},
		// 清空搜索记录
		cleanHistory(){
			this.historyList = [] // 清空数组中的数据
			uni.setStorageSync('kw', '[]') // 清空本地存储中的数据
		},
		// 点击搜索记录跳转到商品列表页面
		gotoGoodsList(kw){
			uni.navigateTo({
			    url: '/subpkg/goods_list/goods_list?query=' + kw
			  })
		},
		// 点击搜索建议跳转到商品详情页
		gotoDetail(item) {
			uni.navigateTo({
				// 指定详情页面的 URL 地址，并传递 goods_id 参数
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			});
		}
	},
	computed:{
		// 让最新搜索的结果,放在第一位
		historys() {
			// reverse 会修改原数组,应该创建一个新数组
			return [...this.historyList].reverse()
		}
	}
};
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list {
	padding: 0 5px;

	.sugg-item {
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.goods-name {
			// 文字不允许换行（单行文本）
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
