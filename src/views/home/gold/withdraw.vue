<template>
  <van-nav-bar left-arrow title="提现" fixed @clickLeft="() => router.go(-1)" />

  <div class="content">
    <h2>*提现不满100，收2元手续费</h2>
    <van-form label-width="6em" @submit="onSubmit">
      <van-field
        v-model="form.money"
        placeholder="请输入提现金额（整数）"
        label="提现金额"
        input-align="right"
        type="digit"
        :rules="[{ required: true, message: '请输入提现金额' }]"
      />
      <van-field
        v-model="form.loginPassword"
        placeholder="请输入登录密码"
        label="密码"
        input-align="right"
        :rules="[{ required: true, message: '请输入登录密码' }]"
      />
      <van-cell
        title="*查看提现明细"
        style="color: #ff0036"
        @click="router.replace('/gold/withdraw/detail')"
      />
      <div class="sub">
        <van-button
          block
          type="primary"
          native-type="submit"
          :loading="loading"
          loading-text="提现中..."
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { withdrawApi } from '@/api/gold'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()

const loading = ref(false)
const form = reactive({
  loginPassword: undefined,
  money: null
})

const onSubmit = async () => {
  loading.value = true
  const { code } = await withdrawApi(form).finally(() => {
    loading.value = false
  })
  !code ? Toast.success('提现已提交，请耐心等待客服审核到账。') : ''
  router.push({ path: '/home' })
}
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  background: #fff;
  h2 {
    font-size: 25px;
    padding: 120px 40px 32px;
    color: red;
    line-height: 1.5;
  }
  .sub {
    padding: 60px 40px 0;
  }
}
</style>
