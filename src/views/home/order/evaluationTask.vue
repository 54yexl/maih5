<template>
  <van-nav-bar
    left-arrow
    title="评价任务"
    fixed
    @clickLeft="() => router.go(-1)"
  />

  <div class="content">
    <h3>任务商品</h3>
    <div class="goods">
      <van-image :src="detail.goodsPic" :width="100" :height="100" />
      <div class="goods-name">
        <div>搜索价格：{{ detail.goodsMoney || 0 }}</div>
        <div>佣金：{{ detail.commission }}</div>
        <div>购买数量：{{ detail.buyNum }}</div>
        <div class="last">
          {{ detail.screenFlag === 1 ? '需要截图任务' : '无截图任务' }}
        </div>
      </div>
    </div>

    <h3>任务要点</h3>
    <p class="tips">请按照任务要求认真评价和截图</p>
    <van-cell title="订单编号" :value="detail.id" />
    <van-cell
      title="任务类型"
      :value="detail.screenFlag === 1 ? '需要截图任务' : '无截图任务'"
    />
    <van-cell title="平台订单号" :value="detail.id" />

    <h3>注意事项</h3>
    <div class="tips" style="color: #333">
      评价内容中不能出现“任务，做单，种菜”等词汇
    </div>
    <div class="tips">
      1：五星+15字左右文字好评<br />
      2：根据任务类型，按照商家要求评价<br />
      3：提交前和提交后截图
    </div>

    <h3>商家要求</h3>
    <van-cell title="评价内容" :value="evalDetail.value" />
    <div style="text-align:right; padding: 20px 20px 0">
      <van-button
        type="primary"
        native-type="submit"
        size="mini"
        @click="copy(evalDetail.value)"
      >
        复制评价内容
      </van-button>
    </div>
    <div
      class="tips"
      v-show="
        evalDetail?.pic1 ||
        evalDetail?.pic2 ||
        evalDetail?.pic3 ||
        evalDetail?.pic4 ||
        evalDetail?.pic5
      "
    >
      要求晒图内容
    </div>
    <div class="tips">
      <van-image
        width="100"
        height="100"
        v-show="evalDetail?.pic1"
        :src="evalDetail?.pic1"
      />
      <van-image
        width="100"
        height="100"
        v-show="evalDetail?.pic2"
        :src="evalDetail?.pic2"
      />
      <van-image
        width="100"
        height="100"
        v-show="evalDetail?.pic3"
        :src="evalDetail?.pic3"
      />
      <van-image
        width="100"
        height="100"
        v-show="evalDetail?.pic4"
        :src="evalDetail?.pic4"
      />
      <van-image
        width="100"
        height="100"
        v-show="evalDetail?.pic5"
        :src="evalDetail?.pic5"
      />
    </div>

    <h3>评价步骤</h3>
    <div class="setp">第一步：确认收货</div>

    <div class="bot33">
      》请确认使用的账户为<span style="color: red">{{ detail.account }}</span
      >账号登录
    </div>
    <div class="bot33">
      》找到订单<span style="color: red">{{ detail.account }}，</span>确认收货
    </div>
    <div class="setp">第二步：订单评价</div>
    <div class="bot33">
      》普通任务，请按照平时购买习惯，提交15字左右的有字评价即可
    </div>

    <div class="setp">第三步：截图上传</div>
    <div class="bot33">》将评价过程的截图上传</div>

    <van-form label-width="6em">
      <div style="display: flex">
        <van-field
          name="payPic1"
          :rules="[{ required: true, message: '至少上传一张评价图' }]"
        >
          <template #input>
            <maiUpload v-model="form.payPic1" :max-count="1" />
          </template>
        </van-field>
        <van-field name="payPic2">
          <template #input>
            <maiUpload v-model="form.payPic2" :max-count="1" />
          </template>
        </van-field>
        <van-field name="payPic3">
          <template #input>
            <maiUpload v-model="form.payPic3" :max-count="1" />
          </template>
        </van-field>
      </div>
      <div style="display: flex">
        <van-field name="payPic4" input-align="center">
          <template #input>
            <maiUpload v-model="form.payPic4" :max-count="1" />
          </template>
        </van-field>
        <van-field name="payPic5" input-align="center">
          <template #input>
            <maiUpload v-model="form.payPic5" :max-count="1" />
          </template>
        </van-field>
      </div>
      <van-button
        type="primary"
        @click="onSubmit()"
        :loading="loading"
        native-type="submit"
        loading-text="提交中..."
        block
        style="width: 85%; margin: 20px auto"
      >
        提交评价
      </van-button>
    </van-form>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import useClipboard from 'vue-clipboard3'
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
import { orderDetailApi, orderCommentApi, orderCommentFinApi } from '@/api/home'
const router = useRouter()
const routeQuery = useRoute()?.query
const { toClipboard } = useClipboard()
const detail = ref({})
const evalDetail = ref({})
const form = ref({})
const loading = ref(false)
const shopName = ref(undefined)
const id = routeQuery?.id
const type = routeQuery?.type // 类型：1.好评 2.追评

onBeforeMount(async () => {
  const { data } = await orderDetailApi({ id })
  if (data) {
    detail.value = data
  }
  const { data: comment } = await orderCommentApi({
    id: id,
    type: type
  })
  if (comment) {
    evalDetail.value = comment
  }
})
const onSubmit = async () => {
  loading.value = true
  const { data } = await orderCommentFinApi({
    images: `${form.value?.payPic1}${
      form.value?.payPic2 ? ',' + form.value?.payPic2 : ''
    }${form.value?.payPic3 ? ',' + form.value?.payPic3 : ''}${
      form.value?.payPic4 ? ',' + form.value?.payPic4 : ''
    }${form.value?.payPic5 ? ',' + form.value?.payPic5 : ''}`,
    id: id,
    type: type
  }).catch(() => {
    loading.value = false
  })
  router.push('/home/order')
}
const copy = async val => {
  try {
    await toClipboard(val)
    Toast.success('复制成功')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="less" scoped>
.content {
  background: #fff;
  padding: 90px 0px 0;
  & > h3 {
    line-height: 80px;
    font-size: 30px;
    font-weight: bold;
    padding: 0 30px;
    background: #f7f7f7;
  }
  .tips {
    font-size: 25px;
    padding: 20px 30px;
    color: red;
    line-height: 1.5;
  }
  .setp {
    font-size: 26px;
    font-weight: bold;
    padding: 0px 0 0px 30px;
    margin: 30px 30px 20px;
    position: relative;
    line-height: 60px;
    &::before {
      content: '';
      width: 13px;
      height: 50px;
      background: #3688ff;
      border-radius: 10px;
      position: absolute;
      top: 5px;
      left: 0px;
    }
  }
  .bot33 {
    font-size: 25px;
    padding: 0 20px 20px 50px;
    line-height: 1.5;
  }
  .goods {
    display: flex;
    padding: 30px 30px 25px;
    &-name {
      flex: 1;
      padding: 0px 0 0px 30px;
      font-size: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .last {
        color: #ff0036;
        font-size: 28px;
      }
    }
  }
}
</style>
