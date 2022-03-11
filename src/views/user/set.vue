<template>
  <van-nav-bar left-arrow title="设置" fixed @clickLeft="() => router.go(-1)" />

  <div class="content">
    <van-cell
      title="密码"
      is-link
      value="修改密码"
      @click="router.push('/user/modyPassword')"
    />
    <div class="sub">
      <van-button
        block
        type="primary"
        native-type="submit"
        :loading="loading"
        loading-text="退出中..."
        @click="onSubmit"
      >
        退出登录
      </van-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/utils/user'
import { memberOutApi } from '@/api/user'
const router = useRouter()

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  const { code } = await memberOutApi()
  if (code !== 0) return
  await logout().finally(() => {
    loading.value = false
    router.push('/user/login')
  })
}
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  background: #fff;
  padding: 100px 0 0;
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
