<template>
  <van-nav-bar
    title="收款账户"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/user/personal')"
  />
  <van-cell-group inset>
    <van-cell value="点击绑定" center @click="gobind()">
      <template #title>
        <img src="@/assets/taobao.png" />
        <span type="danger">标签</span>
      </template>
    </van-cell>
    <van-cell value="点击绑定" center>
      <template #title>
        <img src="@/assets/taobao.png" />
        <span type="danger">标签</span>
      </template>
    </van-cell>
    <van-cell value="点击绑定" center>
      <template #title>
        <img src="@/assets/taobao.png" />
        <span type="danger">标签</span>
      </template>
    </van-cell>
  </van-cell-group>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
const router = useRouter()
const gobind = async () => {
  router.push({ path: '/account/bindTaobao' })
}
</script>
<style lang="less" scoped>
.van-cell-group {
  margin: 30px;
  /deep/ .van-cell__title {
    margin-right: 4px;
    vertical-align: middle;
    display: flex;
    img {
      margin-right: 10px;
      width: 48px;
      height: 48px;
    }
  }
  /deep/ .van-cell__value {
    color: red;
  }
}
</style>
