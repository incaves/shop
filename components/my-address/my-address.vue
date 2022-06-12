<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <!-- 没有数据展示 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">
        请选择收货地址+
      </button>
    </view>
    <!-- 选择收货地址信息的盒子 -->
    <!-- 有数据时展示 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username"
            >收货人:<text>{{ address.userName }}</text></view
          >
        </view>
        <view class="row1-right">
          <view class="phone"
            >电话:<text>{{ address.telNumber }}</text></view
          >
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址:</view>
        <view class="row2-right">{{ Theaddress }} </view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations('m_user', ['updateAddress']),
    // 选择收货地址
    async chooseAddress() {
      // 通过catch来捕获错误
      const [err, succ] = await uni.chooseAddress().catch(err => err)
      // 选择了收货地址
      if (err === null && succ.errMsg === 'chooseAddress:ok') {
        this.updateAddress(succ)
      }
      // 授权(安装和ios)
      if (
        (err && err.errMsg === 'chooseAddress:fail auth deny') ||
        err.errMsg === 'chooseAddress:fail authorize no response'
      ) {
        this.reAuth() // 重新授权
      }
    },
    // 地址授权
    async reAuth() {
      // 提示消息
      const [err2, confirmResult] = await uni.showModal({
        content: '检测到您没打开地址权限,是否去设置打开?',
        confirmText: '确认',
        cancelText: '取消',
      })
      if (err2) return // 遇到异常直接退出
      // 点击了取消
      if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权!')
      // 点击了确定
      if (confirmResult.confirm)
        // 进行授权
        return uni.openSetting({
          success: settingResult => {
            if (settingResult.authSetting['scope.address'])
              return uni.$showMsg('授权成功！请选择地址')
            if (!settingResult.authSetting['scope.address'])
              return uni.$showMsg('您取消了地址授权!')
          },
        })
    },
  },
  computed: {
    ...mapState('m_user', ['address']),
    ...mapGetters('m_user', ['Theaddress']),
  },
}
</script>

<style lang="scss">
// 底部边框线的样式
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
// 选择收货地址的盒子
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 渲染收货信息的盒子
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
