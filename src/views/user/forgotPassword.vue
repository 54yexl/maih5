<template>
  <van-nav-bar
    left-arrow
    title="忘记密码"
    fixed
    @clickLeft="() => router.push('/user/login')"
  />

  <div class="content">
    <h2></h2>
    <van-form label-width="4.4em" @submit="onSubmit">
      <van-field
        v-model="form.mobile"
        placeholder="请输入手机号"
        label="手机号"
        :rules="[{validator: validatorPhone,required: true, message: '请填写正确的手机号'}]"
      >
        <template #button>
          <span class="code" v-if="!time" @click="sendCode">获取验证码</span>
          <van-count-down v-else :time="time" @finish="time = 0" />
        </template>
      </van-field>
      <van-field
        v-model="form.captcha"
        placeholder="请输入验证码"
        label="验证码"
        :rules="[{required: true,message: '请输入验证码'}]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入密码"
        label="新密码"
        :rules="[{required: true,message: '请输入密码'}]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请再次输入新密码"
        label="确认密码"
        :rules="[{required: true,message: '请再次输入新密码'}]"
      />
      <div class="sub">
        <van-button block type="primary" native-type="submit" :loading="loading" loading-text="修改中...">
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { sendCaptcha, login } from '@/api/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()

const time = ref(0)
const loading = ref(false)
const form = reactive({
  mobile: undefined,
  captcha: undefined
})


const onSubmit = async () => {
  loading.value = true
  const { data } = await login(form)
  router.push({ path: '/user/login' })
}

const sendCode = async () => {
  await sendCaptcha({
    mobile: form.mobile
  })
  time.value = 18000
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
  /deep/ .van-form .van-cell:first-child .van-field__control {
    border-right: solid 1px #ccc;
  }
}
</style>
