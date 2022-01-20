<template>
  <van-nav-bar
    left-arrow
    title="绑定支付宝"
    fixed
    @clickLeft="() => router.push('/collect/bind')"
  />

  <div class="content">
    <h2>*支付宝账号必须和身份证绑定姓名一致 。</h2>
    <van-form label-width="6em" @submit="onSubmit">
      <van-field
        v-model="form.alipayAccount"
        placeholder="请输入您的支付宝账号"
        label="支付宝账号"
        input-align="right"
        :rules="[{ required: true, message: '请输入您的支付宝账号' }]"
      />
      <van-field
        name="uploader"
        label="支付宝收款码"
        :rules="[{ required: true, message: '请上传支付宝收款码' }]"
      >
        <template #input>
          <maiUpload v-model="form.alipayCode" :max-count="1"/>
        </template>
      </van-field>
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
import { getAlipayApi, setAlipayApi } from '@/api/user'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()
const loading = ref(false)
const form = ref({
  alipayAccount: undefined,
  alipayCode: undefined // 收款码
})

onBeforeMount(async () => {
  const { data } = await getAlipayApi()
  if (data) {
    form.value = data
  }
})
const onSubmit = async () => {
  loading.value = true
  const data = form.value
  await setAlipayApi(data).finally(() => {
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
