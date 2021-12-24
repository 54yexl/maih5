<template>
  <van-nav-bar
    left-arrow
    title="个人中心"
    @clickLeft="() => router.push('/home')"
  />
  <div class="middle">
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="less" scoped>
.middle {
  overflow: hidden;
}
</style>
