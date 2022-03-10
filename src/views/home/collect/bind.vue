<template>
  <van-nav-bar
    title="收款账户"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/home')"
  />
  <h2>*账户信息必填，银行卡信息与身份证一致！！！</h2>
  <van-cell
    title="*身份证"
    class="labelred"
    :value="
      info.realStatus === 0
        ? '未绑定'
        : info.realStatus === 1
        ? '待审核'
        : info.realStatus === 2
        ? '已审核'
        : info.realStatus === 3
        ? '审核失败'
        : '无'
    "
    :to="info.realStatus === 0 || info.realStatus === 3 ? '/collect/bindId' : ''"
  />
  <van-cell
    class="labelred"
    title="*银行卡"
    :value="bank ? '已绑定' : '未绑定'"
    to="/collect/bindBank"
  />
  <van-cell
    title="*支付宝"
    class="labelred"
    :value="alipay ? '已绑定' : '未绑定'"
    to="/collect/bindAlipay"
  />
  <van-cell
    class="labelred"
    title="*微信"
    :value="info.weChat"
    to="/collect/bindWechat"
  />
  <van-cell title="QQ号" :value="info.qq" />
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import { getBankApi, getAlipayApi, InfoApi } from '@/api/user'
import { getCookie } from '@/utils/user.js'
const router = useRouter()
const info = ref({})
const bank = ref(undefined)
const alipay = ref(undefined)
onBeforeMount(async () => {
  const { data: bankdt } = await getBankApi()
  const { data: alipaydt } = await getAlipayApi()
  const { data: infodata } = await InfoApi()
  bank.value = bankdt
  alipay.value = alipaydt
  info.value = infodata
})
</script>
<style lang="less" scoped>
h2 {
  font-size: 25px;
  padding: 20px 40px 32px;
  color: red;
  line-height: 1.5;
  background: #fff;
}
.labelred {
  color: #ff0036;
  // /deep/ .van-cell__value {
  //   color: #000;
  // }
}
</style>
