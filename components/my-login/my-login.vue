<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- open-type="getUserInfo" 授权 固定写法 -->
    <!-- @getuserinfo 获取用户信息的回调 固定写法 后面函数名可以自定义 -->
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">
      一键登录
    </button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations('m_user', ['updateUserInfo']),
    // 获取用户信息(授权之后)
    getUserInfo(e) {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
      // 授权成功,进行存储
      this.updateUserInfo(e.detail.userInfo)
      // 需要根据用户信息获取对应的token
      this.getToken(e.detail)
    },
    // 获取token
    async getToken(info) {
      // 需要用到uni.login()获取到对应的token
      const [err, res] = await uni.login().catch(err => err)
      if (err || res.errMsg !== 'login:ok') return uni.showMsg('登陆失败')
      // 登陆成功 - info 中包含用户信息 res中包含用户token -> 请求数据
      // 参数对象
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      }
      console.log(query)
      // 请求数据
      const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
      console.log(loginResult)
      if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
      // 登陆成功
      uni.$showMsg('登录成功') // 提示消息
      // token存储
    },
  },
}
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
  // 半椭圆
  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 190px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
}
</style>
