<template>
  <van-nav-bar
    left-arrow
    title="绑定银行卡"
    fixed
    @clickLeft="() => router.push('/collect/bind')"
  />

  <div class="content">
    <h2>*银行卡与银行卡预留手机号以及姓名 必须都正确，不然无法转账！！！</h2>
    <van-form label-width="5em" @submit="onSubmit">
      <van-field
        v-model="form.bankName"
        placeholder="请选择提现银行"
        label="提现银行"
        is-link
        input-align="right"
        @click="showBank = true"
        readonly
        :rules="[{ required: true, message: '请选择提现银行' }]"
      />
      <!-- 银行弾框 -->
      <van-popup v-model:show="showBank" position="bottom">
        <van-picker
          show-toolbar
          :columns="bankJson()"
          @confirm="onBankConfirm"
          @cancel="showBank = false"
        />
      </van-popup>
      <van-field
        v-model="form.bankNum"
        placeholder="请输入银行卡号"
        label="银行卡号"
        input-align="right"
        :rules="[{ required: true, message: '请输入银行卡号' }]"
      />
      <van-field
        v-model="form.bankBranch"
        placeholder="请再次输入开户行名称"
        label="开户行名称"
        input-align="right"
        :rules="[{ required: true, message: '请再次输入开户行名称' }]"
      />
      <van-field
        v-model="form.name"
        placeholder="请输入开户行姓名"
        label="开户行姓名"
        input-align="right"
        :rules="[{ required: true, message: '请输入开户行姓名' }]"
      />
      <van-field
        v-model="form.bankAddress"
        placeholder="请选择开户行地"
        label="开户行地"
        input-align="right"
        :rules="[{ required: true, message: '请选择开户行地' }]"
      />
      <div class="sub">
        <van-button
          block
          type="primary"
          native-type="submit"
          :loading="loading"
          loading-text="修改中..."
        >
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { getBankApi, setBankApi } from '@/api/user'
import { bankJson } from '@/utils/staticJson.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()
const loading = ref(false)
const showBank = ref(false)
const form = ref({
  bankAddress: undefined,
  bankBranch: undefined,
  bankName: undefined,
  bankNum: undefined,
  name: undefined
})

const onBankConfirm = value => {
  console.log(value)
  form.bankName = value
  showBank.value = false
}
onMounted(async () => {
  const { data } = await getBankApi()
  data ? (form.value = data) : ''
})
const onSubmit = async () => {
  loading.value = true
  const params = form.value
  await setBankApi(params).finally(() => {
    loading.value = false
  })
  router.push({ path: '/collect/bind' })
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
