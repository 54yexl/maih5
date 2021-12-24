<template>
  <van-popup
    v-model:show="state.show"
    teleport="#app"
    :style="{ 'border-radius': '10px', width: '77%' }"
    @confirm="emit('update:modelValue', false)"
    @close="emit('update:modelValue', false)"
  >
    <div class="middle">
      <van-radio-group v-model="state.checked">
        <van-cell-group>
          <!-- <van-cell
            icon="src/assets/user/pay_wx.png"
            title="微信支付"
            @click="state.checked = 1"
          >
            <template #right-icon>
              <van-radio :name="1" checked-color="#F12D48" />
            </template>
          </van-cell> -->
          <van-cell
            :icon="pay_zfb_img"
            title="支付宝支付"
            @click="state.checked = 2"
          >
            <template #right-icon>
              <van-radio :name="2" checked-color="#F12D48" />
            </template>
          </van-cell>
          <!-- <van-cell
            icon="src/assets/user/pay_zfb.png"
            title="银联支付"
            @click="state.checked = 3"
          >
            <template #right-icon>
              <van-radio :name="3" checked-color="#F12D48" />
            </template>
          </van-cell>
          <van-cell
            icon="src/assets/user/pay_zfb.png"
            title="工行e生活"
            @click="state.checked = 4"
          >
            <template #right-icon>
              <van-radio :name="4" checked-color="#F12D48" />
            </template>
          </van-cell> -->

          <van-cell>
            <van-button
              text="立即支付"
              color="#DE424E"
              @click="doSubmit"
            />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </van-popup>
</template>
<script setup>
import { defineProps, watch, defineEmits, reactive } from 'vue'
import { couponsPay } from '@/api/coupons'
import { inkindPay } from '@/api/inKind'
import { hotelPay } from '@/api/hotel'
import { ticketPay } from '@/api/ticket'
import pay_zfb_img from '@/assets/user/pay_zfb.png'

const props = defineProps({
  modelValue: Boolean,
  transferParams: { type: Object, default: () => {} }, // 支付参数：订单号&其他
  module: { type: Number, required: true } // 酒店1，卡券2，门票3，实物4
})
const emit = defineEmits(['update:modelValue'])

const state = reactive({
  show: props.modelValue || false,
  checked: 1
})

watch(
  () => props.modelValue,
  val => {
    state.show = val
  }
)

const doSubmit = async () => {
  const params = {
    payWay: state.checked,
    frontUrl: '/',
    ...props.transferParams
  }
  const module = props.module
  const { data } =
    module === 2
      ? await couponsPay(params)
      : module === 4
      ? await inkindPay(params)
      : module === 1
      ? await hotelPay(params)
      : module === 3
      ? await ticketPay(params)
      : ''
  document.write(data)
}
</script>
<style lang="less" scoped>
.middle {
  /deep/ .van-cell-group {
    .van-cell__left-icon {
      margin: 6px 34px 0 0;
      .van-icon__image {
        width: 40px;
        height: 40px;
      }
    }
    .van-button {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
