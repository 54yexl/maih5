<template>
  <van-nav-bar
    left-arrow
    title="操作完成"
    fixed
    @clickLeft="() => router.go(-1)"
  />
  <div class="content">
    <van-form label-width="6em" @submit="onSubmit">
      <van-field
        v-model="form.orderNo"
        placeholder="请输入淘宝订单编号"
        label="淘宝订单编号"
        :rules="[
          {
            required: true,
            message: '请输入淘宝订单编号'
          }
        ]"
      />
      <van-field
        v-model="form.payMoney"
        placeholder="请输入支付金额"
        label="支付金额"
        type="number"
        :rules="[
          {
            required: true,
            message: '请输入支付金额'
          }
        ]"
      />
      <van-field
        v-if="!routeQuery?.screenFlag"
        name="images"
        label="截图图片"
        :rules="[{ required: true, message: '请上传截图图片' }]"
      >
        <template #input>
          <maiUpload v-model="form.images" :max-count="5" />
        </template>
      </van-field>
      <van-field
        name="payPic"
        label="支付截图"
        :rules="[{ required: true, message: '请上传支付截图' }]"
      >
        <template #input>
          <maiUpload v-model="form.payPic" :max-count="1" />
        </template>
      </van-field>

      <div class="sub">
        <van-button
          block
          type="primary"
          native-type="submit"
          :loading="loading"
          loading-text="提交中..."
        >
          确认提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { orderFinishApi } from '@/api/home'
const router = useRouter()
const loading = ref(false)
const routeQuery = useRoute()?.query
const form = ref({
  images: undefined,
  orderNo: undefined,
  payMoney: null,
  payPic: undefined,
  id: routeQuery?.id
})
const onSubmit = async () => {
  loading.value = true
  const { code } = await orderFinishApi(form.value).catch(() => {
    loading.value = false
  })
  if (code !== 0) return
  router.go(-1)
}
</script>
<style lang="less" scoped>
.content {
  padding: 120px 40px 32px;
  .sub {
    padding: 60px 30px;
  }
}
</style>
