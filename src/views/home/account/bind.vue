<template>
  <van-nav-bar
    title="收款账户"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/user/personal')"
  />
  <van-cell-group inset v-show="lists.length">
    <!-- 状态：0.待审核 1.已审核 3.审核失败 -->
    <van-cell
      center
      v-for="item in lists"
      :key="item.id"
      :value="
        item.status === 0
          ? item.account + '(待审核)'
          : item.status === 1
          ? item.account + '(已审核)'
          : item.account + '(审核失败)'
      "
      @click="gobind(item)"
    >
      <template #title>
        <img src="@/assets/taobao.png" />
        <span type="danger">淘宝账号</span>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group inset>
    <van-cell
      center
      value="点击绑定"
      v-for="item in nums"
      :key="item"
      @click="gobind()"
    >
      <template #title>
        <img src="@/assets/taobao.png" />
        <span type="danger">淘宝账号</span>
      </template>
    </van-cell>
  </van-cell-group>
</template>
<script setup>
import { BindAccountListApi, BindAccountNumApi } from '@/api/home'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Toast } from 'vant'
const router = useRouter()
const lists = ref([])
const nums = ref(null)
onMounted(async () => {
  const { data } = await BindAccountListApi({ page: 1, pageSize: 20 })
  data ? (lists.value = data) : ''
  const { data: num } = await BindAccountNumApi()
  nums.value = num
})
const gobind = async item => {
  if (item?.status === 1) {
    Toast.fail('已审核通过，不可修改')
    return
  }
  router.push({
    path: `/account/bindTaobao`,
    query: { id: item?.id }
  })
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
