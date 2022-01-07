<template>
  <van-nav-bar
    title="收款账户"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/home')"
  />
  <van-cell
    class="account"
    title="账户信息"
    value="（账户信息必填，银行卡信息与身份证一致）"
  />
  <van-cell
    title="*身份证"
    style="color: #ff0036"
    value="已绑定"
    url="/#/collect/bindId"
  />
  <van-cell
    class="labelred"
    title="*银行卡"
    value="已绑定（可修改）"
    url="/#/collect/bindBank"
  />
  <van-cell
    title="*支付宝"
    class="labelred"
    value="已绑定（可修改）"
    url="/#/collect/bindAlipay"
  />
  <van-cell title="*微信" value="已绑定" url="/#/collect/bindWechat" />
  <van-cell title="QQ号" value="123456" />
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
const router = useRouter()
</script>
<style lang="less" scoped>
.labelred {
  color: #ff0036;
  /deep/ .van-cell__value {
    color: #000;
  }
}
.account {
  /deep/ .van-cell__value {
    color: #ff0036;
  }
}
</style>
