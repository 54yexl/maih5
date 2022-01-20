<template>
  <!-- 常规登录 -->
  <div class="content">
    <h2>手机快捷登录</h2>
    <p>请输入您的手机号码登录账户，图形验证码5分钟内输入有效</p>
    <van-form label-width="4.4em" @submit="onSubmit">
      <van-field
        v-model="form.phone"
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
        v-model="form.password"
        placeholder="请输入密码"
        label="密码"
        :rules="[
          {
            required: true,
            message: '请输入密码'
          }
        ]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入验证码"
        label="验证码"
        :rules="[
          {
            required: true,
            message: '请输入验证码'
          }
        ]"
      >
        <template #button>
          <img
            class="yzmimg"
            :src="captchaUrl"
            @click="captchaUrl = captchaApi()"
          />
        </template>
      </van-field>
      <div class="sub">
        <van-button
          block
          type="primary"
          native-type="submit"
          :loading="loading"
          loading-text="登录中..."
        >
          立即登录
        </van-button>

        <van-row type="flex" justify="space-between">
          <van-col span="6">
            <router-link :to="{ name: 'Register' }">注册点这里</router-link>
          </van-col>
          <van-col span="6">
            <router-link :to="{ name: 'ForgotPassword' }"
              >忘记密码？</router-link
            >
          </van-col>
        </van-row>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { loginApi, captchaApi } from '@/api/user'
import { reactive, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { setCookie } from '@/utils/user.js'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()
const loading = ref(false)
const captchaUrl = ref(captchaApi())
const form = reactive({
  phone: undefined,
  password: undefined,
  captcha: undefined
})

// 免登
onBeforeMount(() => {})

const onSubmit = async () => {
  loading.value = true
  const { data } = await loginApi(form).finally(() => {
    loading.value = false
  })
  setCookie('accountInfo', JSON.stringify(data))
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
  .van-row a {
    margin: 50px 0 0;
    font-size: 30px;
    display: block;
    color: red !important;
  }
}
</style>
