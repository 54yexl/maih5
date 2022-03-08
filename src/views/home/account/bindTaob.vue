<template>
  <van-nav-bar
    left-arrow
    title="绑定淘宝"
    fixed
    @clickLeft="() => router.push('/account/bind')"
  />

  <div class="content">
    <h2>
      1.请正确填写淘宝账号信息。<br />
      2.提交审核后平台预计24小时内完成审核。<br />
      3.审核通过后无法修改或删除。<br />
    </h2>
    <van-form label-width="5em" @submit="onSubmit">
      <van-field
        v-model="form.account"
        placeholder="请输入账号"
        label="账号"
        input-align="right"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field label="淘宝验证" center>
        <template #button>
          <van-button
            size="small"
            type="success"
            @click="goTaobao"
          >
            点击登录验证
          </van-button>
        </template>
      </van-field>
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
      <!-- 性别弾框 -->
      <van-popup v-model:show="state.showSex" position="bottom">
        <van-picker
          show-toolbar
          :columns="['男', '女']"
          @confirm="onSexConfirm"
          @cancel="state.showSex = false"
        />
      </van-popup>
      <van-field
        v-model="form.age"
        placeholder="请输入年龄"
        label="年龄"
        type="digit"
        input-align="right"
        :rules="[{ required: true, message: '请输入年龄' }]"
      />
      <van-field
        v-model="form.orderNo"
        placeholder="请输入订单编号"
        label="订单号"
        input-align="right"
        :rules="[{ required: true, message: '请输入最近订单编号' }]"
      />
      <van-field
        v-model="form.gradeLable"
        placeholder="请选择信用"
        label="信用"
        input-align="right"
        is-link
        readonly
        @click="state.showCedit = true"
        :rules="[{ required: true, message: '请选择信用' }]"
      />
      <!-- 信用弾框 -->
      <van-popup v-model:show="state.showCedit" position="bottom">
        <van-picker
          show-toolbar
          :columns-field-names="{ text: 'label' }"
          :columns="ceditJson()"
          @confirm="onCeditConfirm"
          @cancel="state.showCedit = false"
        />
      </van-popup>
      <van-field
        v-model="form.creditLable"
        placeholder="请选择等级"
        label="等级"
        input-align="right"
        is-link
        readonly
        @click="state.showGrade = true"
        :rules="[{ required: true, message: '请选择等级' }]"
      />
      <!-- 等级弾框 -->
      <van-popup v-model:show="state.showGrade" position="bottom">
        <van-picker
          show-toolbar
          :columns-field-names="{ text: 'label' }"
          :columns="gradeJson()"
          @confirm="onGradeConfirm"
          @cancel="state.showGrade = false"
        />
      </van-popup>
      <van-field
        v-model="form.creditValue"
        placeholder="手机APP-我的淘宝查看"
        label="淘气值"
        input-align="right"
        :rules="[{ required: true, message: '请输入淘气值' }]"
      />
      <van-field
        v-model="form.receiver"
        placeholder="请输入收货姓名"
        label="收货姓名"
        input-align="right"
        :rules="[{ required: true, message: '请输入收货姓名' }]"
      />
      <van-field
        v-model="form.receivingPhone"
        placeholder="请输入收货手机"
        label="收货手机"
        input-align="right"
        :rules="[
          {
            validator: validatorPhone,
            required: true,
            message: '请填写正确的手机号'
          }
        ]"
      />
      <van-field
        v-model="areaname"
        placeholder="请选择地区"
        label="地区"
        input-align="right"
        is-link
        readonly
        @click="state.showArea = true"
        :rules="[{ required: true, message: '请选择地区' }]"
      />
      <address-poup v-model="state.showArea" @changeAdressVal="onAreaConfirm" />
      <van-field
        v-model="form.receivingAddress"
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
          loading-text="绑定中..."
        >
          绑定
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { BindAccountApi, BindAccountDetailApi } from '@/api/home'
import addressPoup from '@/components/address/index.vue'
import { ceditJson, gradeJson } from '@/utils/staticJson.js'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const validatorPhone = val => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
const router = useRouter()

const loading = ref(false)
const form = ref({
  sex: undefined,
  age: null,
  credit: null,
  creditLable: undefined,
  grade: null,
  gradeLable: undefined,
  creditValue: null,
  orderNo: undefined,
  account: undefined,
  receiver: undefined,
  receivingAddress: undefined,
  receivingRegion: undefined,
  receivingCity: undefined,
  receivingProvince: undefined,
  receivingPhone: undefined,
  receivingProvince: undefined,
  receivingCity: undefined,
  receivingRegion: undefined
})
const state = reactive({
  showSex: false,
  showCedit: false,
  showGrade: false,
  showArea: false
})
const onSexConfirm = value => {
  form.value.sex = value
  state.showSex = false
}
const onCeditConfirm = value => {
  form.value.grade = value.key
  form.value.gradeLable = value.label
  state.showCedit = false
}
const onGradeConfirm = value => {
  form.value.credit = value.key
  form.value.creditLable = value.label
  state.showGrade = false
}
const onAreaConfirm = ({ selectedOptions }) => {
  state.showArea = false
  form.value.receivingProvince = selectedOptions[0].name
  form.value.receivingCity = selectedOptions[1].name
  form.value.receivingRegion = selectedOptions[2].name
}

const areaname = computed(() => {
  if (form.value.receivingProvince) {
    return `${form.value.receivingProvince}/${form.value.receivingCity}/${form.value.receivingRegion}`
  }
  return ''
})

onMounted(async () => {
  const id = useRoute()?.query?.id
  if (id) {
    const { data } = await BindAccountDetailApi({ id })
    data.gradeLable = gradeJson().find(item => item.key === data.credit).label
    data.creditLable = ceditJson().find(item => item.key === data.grade).label
    data ? (form.value = { ...data }) : ''
  }
})
const onSubmit = async () => {
  loading.value = true
  const { data } = await BindAccountApi(form.value).finally(() => {
    loading.value = false
  })
  router.push({ path: '/account/bind' })
}
const goTaobao = () => {
  console.log(window)
  window?.local_obj?.begin()
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
    padding: 60px 40px 40px;
  }
}
</style>
