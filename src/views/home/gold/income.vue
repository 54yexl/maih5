<template>
  <van-nav-bar left-arrow title="收益" fixed @clickLeft="() => router.go(-1)" />
  <div class="top martop">
    <van-row type="flex">
      <van-col span="12">
        <h3>{{ state.withdrawMoney || 0 }}</h3>
        <div>已经提现</div>
      </van-col>
      <van-col span="12">
        <h3>{{ state.commission || 0 }}</h3>
        <div>累计佣金</div>
      </van-col>
    </van-row>
  </div>
  <div class="link">
    <van-cell
      title="申请提现"
      style="color: #262E49"
      @click="router.replace('/gold/withdraw')"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { wmoneyTotalApi } from '@/api/gold'
const router = useRouter()
const state = ref({})
onMounted(async () => {
  const { data } = await wmoneyTotalApi()
  state.value = data
})
</script>

<style lang="less" scoped>
.martop {
  margin: 120px 0 0 0;
}
.top {
  background: linear-gradient(310deg, #0acffe 0%, #495aff 100%);
  box-shadow: 0px 4px 16px rgb(45, 142, 254);
  border-radius: 2px;
  padding: 30px;
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  color: rgba(255, 255, 255, 0.66);
  font-size: 30px;
  h3 {
    color: #fff;
    font-size: 40px;
    padding-bottom: 30px;
  }
}
.link {
  margin: 30px 30px;
}
</style>
