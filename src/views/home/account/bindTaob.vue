<template>
  <van-nav-bar
    left-arrow
    title="绑定淘宝"
    fixed
    @clickLeft="() => router.push('/collect/bind')"
  />

  <div class="content">
    <h2>
      1.请正确填写淘宝账号信息。<br />
      2.提交审核后平台预计24小时内完成审核。<br />
      3.审核通过后无法修改或删除。<br />
    </h2>
    <van-form label-width="5em" @submit="onSubmit">
      <van-field
        v-model="form.captcha"
        placeholder="请输入账号"
        label="账号"
        input-align="right"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="form.sex"
        placeholder="请选择性别"
        label="性别"
        input-align="right"
        is-link
        readonly
        @click="state.showSex = true"
        :rules="[{ required: true, message: '请选择性别' }]"
      />
      <!-- <van-field
        v-model="form.sex"
        placeholder="请选择年龄"
        label="年龄"
        input-align="right"
        is-link
        readonly
        @click="state.showSex = true"
        :rules="[{ required: true, message: '请选择年龄' }]"
      /> -->
      <van-field
        v-model="form.captcha"
        placeholder="请输入订单编号"
        label="订单号"
        input-align="right"
        :rules="[{ required: true, message: '请输入订单编号' }]"
      />
      <!-- <van-field
        v-model="form.sex"
        placeholder="请选择信用等级"
        label="信用等级"
        input-align="right"
        is-link
        readonly
        @click="state.showSex = true"
        :rules="[{ required: true, message: '请选择信用等级' }]"
      /> -->
      <van-field
        v-model="form.captcha"
        placeholder="手机APP-我的淘宝查看"
        label="淘气值"
        input-align="right"
        :rules="[{ required: true, message: '请输入淘气值' }]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入收货姓名"
        label="收货姓名"
        input-align="right"
        :rules="[{ required: true, message: '请输入收货姓名' }]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入收货手机"
        label="收货手机"
        input-align="right"
        :rules="[{ required: true, message: '请输入收货手机' }]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入详细地址"
        label="详细地址"
        input-align="right"
        :rules="[{ required: true, message: '请输入详细地址' }]"
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

  <!-- 性别弾框 -->
  <van-popup v-model:show="state.showSex" position="bottom">
    <van-picker
      show-toolbar
      :columns-field-names="{ text: 'label', values: 'key' }"
      :columns="sexJson()"
      @confirm="onConfirm"
      @cancel="state.showSex = false"
    />
  </van-popup>
</template>
<script setup>
import { sendCaptcha, login } from '@/api/user'
import { ceditJson, ageJson, sexJson } from '@/utils/staticJson.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()

const loading = ref(false)
const form = reactive({
  sex: null
})
const state = reactive({
  showSex: false,
  showArea: false
})
const onConfirm = value => {
  console.log(value)
  // form.sex = value
  state.showSex = false
}
const onSubmit = async () => {
  loading.value = true
  // const { data } = await login(form)
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
