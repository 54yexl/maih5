<template>
  <!-- 常规登录 -->
  <div class="content">
    <h2>手机快捷登录</h2>
    <p>请输入您的手机号码登录账户，短信验证码5分钟内输入有效</p>
    <van-form label-width="4.4em" @submit="onSubmit">
      <van-field
        v-model="form.mobile"
        placeholder="请输入手机号"
        label="账号"
        :rules="[
          {
            validator: validatorPhone,
            required: true,
            message: '请填写正确的手机号'
          }
        ]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入验证码"
        label="密码"
        :rules="[
          {
            required: true,
            message: '请输入验证码'
          }
        ]"
      >
      <template #button>
        <img class="yzmimg" src="data:image/png;base64,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"/>
      </template>
      </van-field>
      <div class="sub">
        <van-button block type="primary" native-type="submit" :loading="loading" loading-text="登录中...">
          立即登录
        </van-button>

        <van-row type="flex" justify="space-between">
          <van-col span="6">
            <router-link :to="{ name: 'Register' }">注册点这里</router-link>
          </van-col>
          <van-col span="6">
            <router-link :to="{ name: 'ForgotPassword' }">忘记密码？</router-link>
          </van-col>
        </van-row>
      </div>
    </van-form>

  </div>
</template>
<script setup>
import { login } from '@/api/user'
import { reactive, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { setCookie } from '@/utils/user.js'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()
const loading = ref(false)
const form = reactive({
  mobile: undefined,
  captcha: undefined
})

// 免登
onBeforeMount(() => {
})

const onSubmit = async () => {
  loading.value = true
  const { data } = await login(form)
  setCookie('accessToken', data.accessToken)
  router.push({ path: '/home' })
}
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  background: #fff;
  h2 {
    font-size: 48px;
    padding: 120px 40px 32px;
  }
  p {
    font-size: 24px;
    color: #666666;
    padding: 0 40px 60px;
  }
  .sub {
    padding: 60px 40px 0;
  }
  .yzmimg {
    width: 120px;
  }
  .van-row a{
    margin: 50px 0 0;
    font-size: 30px;
    color: red!important;
  }
}
</style>
