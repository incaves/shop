<template>
  <view>
    <!-- 根据有无token,来判断是否登陆 -->
    <!-- 未登陆 -->
    <my-login v-if="!token"></my-login>
    <!-- 已登陆 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState } from 'vuex'
export default {
  mixins: [badgeMix],
  data() {
    return {}
  },
  computed: {
    ...mapState('m_user', ['token']),
  },
}
</script>

<style lang="scss"></style>
