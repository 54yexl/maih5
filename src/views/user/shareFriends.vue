<template>
  <van-nav-bar
    left-arrow
    title="分享好友"
    fixed
    @clickLeft="() => router.go(-1)"
  />

  <div class="content">
    <div class="share">
      注册时记得填邀请码:{{ routeQuery.inviteCoe }} 。请点击或复制链接
      {{ goRegistry }}
      到浏览器打开
    </div>
    <div class="sub">
      <van-button
        block
        type="primary"
        native-type="submit"
        @click="copy(goRegistry)"
      >
        点击复制
      </van-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { memberOutApi } from '@/api/user'
import useClipboard from 'vue-clipboard3'
import { Toast } from 'vant'
const router = useRouter()
const routeQuery = useRoute()?.query
const { toClipboard } = useClipboard()
const goRegistry = `${window?.location?.origin}/#/Register?inviteCoe=${routeQuery?.inviteCoe}`

const loading = ref(false)

const copy = async (val) => {
  try {
    await toClipboard(val)
    Toast.success('复制成功')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
//   background: #fff;
  padding: 100px 0 0;
  .share{
background: #fff;
margin: 30px;
border-radius: 2px;
    overflow: hidden;
    padding: 20px;
    font-size: 30px;
    line-height: 1.5;
  }
  .sub {
    padding: 60px 40px 0;
  }
  /deep/ .van-cell__value {
    color: red;
  }
  /deep/ .van-cell__right-icon {
    color: red;
  }
}
</style>
