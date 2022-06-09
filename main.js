import Vue from 'vue'
import App from './App'
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http // 全局挂载
$http.baseUrl = 'https://api-hmugo-web.itheima.net' // 请求的根路径
// 请求拦截器
$http.beforeRequest = function(options) {
	// loding效果
	uni.showLoading({
		title: 'loading...',
	})
}
// 响应拦截器
$http.afterRequest = function () {
  uni.hideLoading() // 隐藏loading
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
