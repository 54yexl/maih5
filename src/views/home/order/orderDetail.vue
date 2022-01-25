<template>
  <van-nav-bar
    title="详情"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.replace('/home/order')"
  />
  <div class="middle">
    <div class="orderdetail-bg">
      <div class="goods">
        <van-image :src="detail.goodsPic" :width="85" :height="85" />
        <div class="goods-name">
          <div class="goods-name-txt">
            搜索展示价格：{{ detail.goodsMoney || 0 }}
          </div>
          <div class="price">
            <div>
              类型：{{
                detail.screenFlag === 1 ? '需要截图任务' : '无截图任务'
              }}
            </div>
          </div>
          <div>购买数量：{{ detail.num || 0 }}</div>
        </div>
      </div>
      <div class="goods-total">
        提示：请等待卖家确认，任务提交后一般会在一个工作日内完成
      </div>
    </div>

    <div class="orderdetail-bg">
      <div class="detail-title pd30">
        <div>操作状态</div>
        <div class="status">
          {{ detail.statusStr || '无' }}
        </div>
      </div>
      <div class="detail-title">
        <div>商品目标</div>
        <div class="status">
          {{ detail.returnType === 1 ? '平台返款' : '商家返款' }}
        </div>
      </div>
      <div class="color999">{{ detail.detail }}</div>
    </div>

    <div class="orderdetail-bg">
      <div class="butlist">
        <van-button
          plain
          type="primary"
          size="small"
          v-show="detail.statusStr === '待操作'"
          @click="
            router.push({
              path: `/home/operate/task`,
              query: { id: id }
            })
          "
        >
          操作任务
        </van-button>
        <van-button
          plain
          type="primary"
          size="small"
          @click="state.showComplaint = true"
          v-show="detail.exceptionStatus !== 1"
        >
          申诉任务
        </van-button>
        <van-button
          plain
          type="primary"
          size="small"
          @click="state.showCancel = true"
          >取消任务</van-button
        >
        <van-button
          plain
          type="primary"
          size="small"
          v-show="detail.statusStr === '待评价'"
          @click="
            router.push({
              path: `/home/evaluation/task`,
              query: { id: id, type: 1 }
            })
          "
          >评价任务</van-button
        >
        <van-button
          plain
          type="primary"
          size="small"
          v-show="detail.statusStr === '待追评'"
          @click="
            router.push({
              path: `/home/evaluation/task`,
              query: { id: id, type: 2 }
            })
          "
          >追评</van-button
        >
      </div>
      <!-- 0.全部 1.待审核 2.待操作 3.待返款 4.待好评 5.待确认 6.待追评 7.预售订单 10.已完成 -->
      <van-steps direction="vertical">
        <van-step>
          <h3>接受任务</h3>
          <p>接单日期：{{ detail.receiveTime }}</p>
          <p>订单编号：{{ detail.id }}</p>
          <p>买号：{{ detail.account }}</p>
        </van-step>
        <van-step>
          <h3>操作任务</h3>
          <p v-for="item in detail.publishTaskOptionList" :key="item.id">
            {{ item.optionName + '：' + item.optionValue }}
          </p>
          <!-- <p>
            目标商品图：
            <van-image
              src="http://qn.iwillyou.cn//static/upload/shoppicture/2021-12-25/aa5c6202112251051515781.jpg"
              :width="85"
              :height="85"
            />
          </p> -->
        </van-step>
        <van-step>
          <h3>商家确认</h3>
          <p>
            返款方式： {{ detail.returnType === 1 ? '平台返款' : '商家返款' }}
          </p>
          <p>返款金额：￥{{ detail.goodsMoney || 0 }}</p>
        </van-step>
        <!-- <van-step>
          <h3>签收好评</h3>
          <p>物流签收好评：{{ detail.goodsMoney || 0 }}</p>
        </van-step> -->
        <van-step>
          <h3>任务完成</h3>
          <p>获得佣金：{{ detail.commission }}元</p>
        </van-step>
      </van-steps>
    </div>
    <!-- 申诉弾框 -->
    <van-popup
      class="hotel-detail-dialog"
      :style="{ 'border-radius': '10px', width: '90%', top: '45%' }"
      v-model:show="state.showComplaint"
      @close="state.showComplaint = false"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div class="header">申诉任务</div>
      <van-divider style="margin: 0" />
      <van-form label-width="6em" @submit="onComplaintSubmit">
        <van-field
          v-model="comForm.complaintType"
          placeholder="请选择申诉类型"
          label="申诉类型"
          readonly
          is-link
          @click="state.showComplaintType = true"
          :rules="[{ required: true, message: '请选择申诉类型' }]"
        />
        <van-popup v-model:show="state.showComplaintType" position="bottom">
          <van-picker
            show-toolbar
            :columns="complaintTypeJson()"
            @confirm="onComConfirm"
            @cancel="state.showComplaintType = false"
          />
        </van-popup>
        <van-field
          name="complaintPic1"
          label="申诉图片1"
          :rules="[{ required: true, message: '请上传申诉图片1' }]"
        >
          <template #input>
            <maiUpload v-model="comForm.complaintPic1" :max-count="1" />
          </template>
        </van-field>
        <van-field
          name="complaintPic2"
          label="申诉图片2"
          :rules="[{ required: true, message: '请上传申诉图片2' }]"
        >
          <template #input>
            <maiUpload v-model="comForm.complaintPic2" :max-count="1" />
          </template>
        </van-field>
        <van-field
          v-model="comForm.complaintContent"
          placeholder="请输入申诉原因"
          label="申诉原因"
          rows="2"
          autosize
          show-word-limit
          type="textarea"
          maxlength="150"
          :rules="[{ required: true, message: '请输入申诉原因' }]"
        />

        <div class="sub">
          <van-button
            block
            type="primary"
            native-type="submit"
            :loading="state.loading"
            loading-text="提交中..."
          >
            确认提交
          </van-button>
        </div>
      </van-form>
    </van-popup>

    <!-- 取消任务弾框 -->
    <van-popup
      class="hotel-detail-dialog"
      :style="{ 'border-radius': '10px', width: '90%', top: '45%' }"
      v-model:show="state.showCancel"
      @close="state.showCancel = false"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div class="header">取消任务</div>
      <van-divider style="margin: 0" />
      <van-form label-width="6em" @submit="onCancelubmit">
        <van-field
          v-model="cancelForm.remark"
          placeholder="请输入取消说明"
          label="取消说明"
          rows="2"
          autosize
          show-word-limit
          type="textarea"
          maxlength="150"
          :rules="[{ required: true, message: '请输入取消说明' }]"
        />

        <div class="sub">
          <van-button
            block
            type="primary"
            native-type="submit"
            :loading="state.loading"
            loading-text="提交中..."
          >
            确认提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script setup>
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onBeforeMount } from 'vue'
import { orderDetailApi, orderComplaintApi, orderCancelApi } from '@/api/home'
import { complaintTypeJson } from '@/utils/staticJson.js'
const router = useRouter()
const detail = ref({})
const id = useRoute()?.query?.id
const comForm = ref({
  complaintType: undefined,
  publishTaskOrderId: id,
  complaintContent: undefined,
  complaintPic1: undefined,
  complaintPic2: undefined
})
const cancelForm = ref({
  remark: undefined,
  id: id
})
const state = reactive({
  showComplaint: false,
  showComplaintType: false,
  showCancel: false,
  loading: false
})
onBeforeMount(async () => {
  const { data } = await orderDetailApi({ id })
  if (data) {
    detail.value = data
  }
})
const onComplaintSubmit = async () => {
  state.loading = true
  const { data } = await orderComplaintApi(comForm.value).finally(() => {
    state.loading = false
    state.showComplaintType = false
    router.replace('/home/order')
  })
}
const onCancelubmit = async () => {
  state.loading = true
  const { data } = await orderCancelApi(cancelForm.value).finally(() => {
    state.loading = false
    state.showCancel = false
    router.replace('/home/order')
  })
}
const onComConfirm = value => {
  comForm.value.complaintType = value
  state.showComplaintType = false
}
</script>
<style lang="less" scoped>
.orderdetail-bg {
  margin: 30px 30px 0 30px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  .detail-title {
    font-size: 28px;
    display: flex;
    .status {
      font-size: 24px;
      color: #3688ff;
      flex: 1;
      text-align: right;
    }
  }
  .detail-no {
    font-size: 24px;
    label {
      color: #999999;
      padding-right: 20px;
    }
  }
}
.van-steps h3 {
  font-size: 35px;
  font-weight: bold;
  color: #333;
  padding-bottom: 20px;
}
.goods {
  display: flex;
  padding: 30px 0 25px;
  border-bottom: solid 1px #ebebeb;
  &-name {
    flex: 1;
    padding: 20px 0 20px 15px;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .price {
      display: flex;
      align-items: center;
      .num {
        font-size: 28px;
        flex: 1;
        text-align: right;
      }
    }
  }
  &-total {
    font-size: 28px;
    padding: 30px 0 0;
    color: rgb(255, 0, 54);
    line-height: 1.5;
  }
}
.pd30 {
  padding-bottom: 30px;
}
.butlist button {
  margin: 0 15px 15px 0;
}
.hotel-detail-dialog {
  .header {
    height: 88px;
    line-height: 88px;
    font-size: 28px;
    color: #333;
    font-weight: 500;
    text-align: center;
  }
  .wrapper {
    padding: 0 50px;
  }
}
</style>
