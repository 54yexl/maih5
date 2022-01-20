<template>
  <van-nav-bar
    left-arrow
    title="修改密码"
    fixed
    @clickLeft="() => router.go(-1)"
  />

  <div class="content">
    <h2></h2>
    <van-form label-width="5em" @submit="onSubmit">
      <van-field
        v-model="form.oldPassword"
        placeholder="请输入原密码"
        label="原密码"
        :rules="[{ required: true, message: '请输入原密码' }]"
      />
      <van-field
        v-model="form.password"
        placeholder="请输入密码"
        label="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
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
import { modifyKeyApi } from '@/api/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const loading = ref(false)
const form = reactive({
  password: undefined,
  oldPassword: undefined
})

const onSubmit = async () => {
  loading.value = true
  const { data } = await modifyKeyApi(form)
  router.push({ path: '/user/login' })
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
}
</style>
