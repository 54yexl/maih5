<template>
  <van-nav-bar
    left-arrow
    title="绑定身份"
    fixed
    @clickLeft="() => router.push('/collect/bind')"
  />

  <div class="content">
    <h2>*银行卡信息与身份证一致</h2>
    <van-form label-width="6em" @submit="onSubmit">
      <van-field
        v-model="form.captcha"
        placeholder="请输入姓名"
        label="姓名"
        input-align="right"
        :rules="[{ required: true, message: '请输入姓名' }]"
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
      <van-field
        v-model="form.captcha"
        placeholder="请输入身份证号"
        label="身份证号"
        input-align="right"
        :rules="[{ required: true, message: '请输入身份证号' }]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请选择省份"
        label="省份"
        is-link
        input-align="right"
        readonly
        @click="state.showArea = true"
        :rules="[{ required: true, message: '请选择省份' }]"
      />
      <van-field
        v-model="form.captcha"
        placeholder="请输入详细地址"
        label="详细地址"
        input-align="right"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
      <van-field
        name="uploader"
        label="身份证照片"
        :rules="[{ required: true, message: '请上传身份证照片' }]"
      >
        <template #input>
          <van-uploader v-model="form.uploader" :max-count="1" />
        </template>
      </van-field>
      <van-field
        name="uploader"
        label="自拍照"
        :rules="[{ required: true, message: '请上传自拍照' }]"
      >
        <template #input>
          <van-uploader v-model="form.uploader" :max-count="1" />
        </template>
      </van-field>
      <van-field
        name="uploader"
        label="手持身份证照"
        :rules="[{ required: true, message: '请上传手持身份证照' }]"
      >
        <template #input>
          <van-uploader v-model="form.uploader" :max-count="1" />
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

  <!-- 性别弾框 -->
  <van-popup v-model:show="state.showSex" position="bottom">
    <van-picker
      show-toolbar
      :columns="['男', '女']"
      @confirm="onConfirm"
      @cancel="state.showSex = false"
    />
  </van-popup>
  <!-- 省弾框 -->
  <van-popup v-model:show="state.showArea" position="bottom">
    <van-picker
      show-toolbar
      :columns="['男', '女']"
      @confirm="onConfirm"
      @cancel="state.showArea = false"
    />
  </van-popup>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()

const loading = ref(false)
const form = reactive({
  sex: undefined
})
const state = reactive({
  showSex: false,
  showArea: false
})

const onSubmit = async () => {
  loading.value = true
  // const { data } = await login(form)
  router.push({ path: '/collect/bind' })
}
const onConfirm = value => {
  form.sex = value
  state.showSex = false
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
