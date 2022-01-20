<template>
  <van-nav-bar left-arrow fixed @clickLeft="() => router.push('/user/login')" />

  <div class="content">
    <h2>手机快捷注册</h2>
    <van-form label-width="5em" @submit="onSubmit">
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
        v-model="form.captcha"
        placeholder="请输入图形验证码"
        label="图形验证码"
        :rules="[
          {
            required: true,
            message: '请输入图形验证码'
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
      <van-field
        v-model="form.smsCode"
        placeholder="请输入验证码"
        label="验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <span class="code" v-if="!time" @click="sendCode">获取验证码</span>
          <van-count-down v-else :time="time" @finish="time = 0" />
        </template>
      </van-field>
      <van-field
        v-model="form.password"
        placeholder="请输入密码"
        label="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
        v-model="form.qq"
        placeholder="请输入QQ"
        label="QQ"
        :rules="[{ required: true, message: '请输入QQ' }]"
      />
      <van-field
        v-model="form.weChat"
        placeholder="请输入您的微信"
        label="微信"
        :rules="[{ required: true, message: '请输入您的微信' }]"
      />
      <van-field
        v-model="form.inviteCoe"
        placeholder="请输入邀请口令"
        label="邀请口令"
      />
      <div class="sub">
        <van-button
          block
          type="primary"
          native-type="submit"
          :loading="loading"
          loading-text="注册中..."
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { sendCodeApi, registerApi, captchaApi } from '@/api/user'
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()
const time = ref(0)
const loading = ref(false)
const captchaUrl = ref(captchaApi())

const form = reactive({
  phone: undefined,
  smsCode: undefined,
  captcha: undefined,
  inviteCoe: undefined,
  password: undefined,
  qq: undefined,
  weChat: undefined
})

const onSubmit = async () => {
  loading.value = true
  const { data } = await registerApi(form)
  router.push({ path: '/user/login' })
}

const sendCode = async () => {
  const code = await sendCodeApi({
    phone: form.phone,
    captcha: form.captcha
  })
  code === 0 ? (time.value = 18000) : ''
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
  .code {
    color: #de424e;
    font-size: 28px;
  }
  /deep/ .van-form .van-cell:nth-child(3) .van-field__control {
    border-right: solid 1px #ccc;
  }
  .yzmimg {
    width: 120px;
  }
}
</style>
