import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'
uni.$http = $http // 全局挂载
$http.baseUrl = 'https://api-hmugo-web.itheima.net' // 请求的根路径
// 请求拦截器
$http.beforeRequest = function (options) {
  // loding效果
  uni.showLoading({
    title: 'loading...',
  })
}
// 响应拦截器
$http.afterRequest = function () {
  uni.hideLoading() // 隐藏loading
}
// 封装的展示消息提示的方法(如果没有传递使用默认)
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
