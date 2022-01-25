<template>
  <van-nav-bar
    left-arrow
    title="接单"
    fixed
    @clickLeft="() => router.push('/home')"
  />
  <div class="content">
    <van-cell-group inset>
      <van-cell center value="点击绑定" v-for="item in nums" :key="item.id">
        <template #title>
          <img src="@/assets/taobao.png" />
          <span type="danger">{{ item.account }}</span>
        </template>
        <template #default>
          <van-switch v-model="item.checked" size="24px" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-button
      :loading="state.loading"
      type="primary"
      block
      loading-text="接单中..."
      @click="doGet"
    >
      接单
    </van-button>
  </div>
  <!-- 底部 -->
  <van-tabbar v-model="state.active">
    <van-tabbar-item icon="home-o" name="home-o" color="#00255" to="/home">
      首页
    </van-tabbar-item>
    <van-tabbar-item icon="gold-coin-o" name="gold-coin-o">
      接单
    </van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user-o" to="/user/personal">
      个人
    </van-tabbar-item>
  </van-tabbar>
  <van-dialog
    class="hotel-detail-dialog"
    v-model:show="state.showGet"
    @close="state.showGet = false"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <div class="header">抢单详情</div>
    <van-divider style="margin: 0" />

    <div class="wrapper">
      <div class="item">
        <div class="label">商品主图</div>
        <div class="value">
          <van-image width="100" height="100" :src="detail?.goodsPic" />
        </div>
      </div>
      <div class="item">
        <div class="label">佣金</div>
        <div class="value">{{ detail?.commission }}</div>
      </div>
      <div class="item">
        <div class="label">商品单价</div>
        <div class="value">{{ detail?.goodsPrice }}元</div>
      </div>
      <div class="item">
        <div class="label">购买数量</div>
        <div class="value">{{ detail?.buyNum }}个</div>
      </div>

      <van-button
        class="sub-btn"
        type="primary"
        @click="
          (state.showGet = false),
            router.replace({
              path: `/home/order/detail`,
              query: { id: detail?.id }
            })
        "
        >确定</van-button
      >
    </div>
  </van-dialog>
</template>
<script setup>
import { GetTaskApi, TaskListApi } from '@/api/task'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
  loading: false,
  active: 'gold-coin-o',
  accountId: [],
  showGet: false
})
const nums = ref([])
const detail = ref({})

const loadData = () => {
  TaskListApi({ status: 1 }).then(({ data }) => {
    nums.value = data
  })
}
loadData()
const doGet = async () => {
  state.loading = true
  const { data } = await GetTaskApi(nums.value.map(v => v.id)).finally(() => {
    state.loading = false
  })
  if (data) {
    state.showGet = true
    detail.value = data
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 120px 40px 32px;
  .van-cell-group {
    margin: 30px 0;
    /deep/ .van-cell__title {
      margin-right: 4px;
      vertical-align: middle;
      display: flex;
      img {
        margin-right: 10px;
        width: 48px;
        height: 48px;
      }
    }
    /deep/ .van-cell__value {
      color: red;
    }
  }
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
  .item {
    display: flex;
    font-size: 24px;
    font-weight: 500;
    margin-top: 40px;
    .label {
      color: #999;
    }
    .value {
      color: #333;
      margin-left: 60px;
    }
  }
  .sub-btn {
    width: 100%;
    height: 90px;
    line-height: 90px;
    color: #fff;
    border: 0;
    border-radius: 10px;
    background-color: #1989fa;
    margin: 50px 0 37px;
  }
}
</style>
