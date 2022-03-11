<template>
  <van-nav-bar
    title="资金明细"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/home')"
  />
  <van-tabs
    v-model:active="state.activeTab"
    sticky
    :offset-top="46"
    @click-tab="onClickTab"
  >
    <van-tab
      v-for="item in tabList"
      :key="item.key"
      :title="item.label"
      :name="item.key"
    >
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="loadData"
      >
        <div class="item" v-for="item in state.list" :key="item.memberId">
          <div class="price">
            <div>订单ID：{{ item.sourceId || '无' }}</div>
            <div class="num" style="color: #999">{{ item.optTime }}</div>
          </div>
          <div class="price">
            <div class="incom">
              {{ item.type === 1 ? '收入' : '支出' }}：{{ item.optMoney }}元
            </div>
            <div class="num">
              <van-button type="primary" size="mini">{{
                item.remark
              }}</van-button>
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script setup>
// import moment from 'moment'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { wmoneyListApi } from '@/api/gold'
const router = useRouter()
const state = reactive({
  activeTab: '',
  loading: false,
  finished: false,
  list: [],
  page: 0,
  pageSize: 10
})
const tabList = [
  {
    label: '本金',
    key: 1
  },
  {
    label: '佣金',
    key: 2
  },
  {
    label: '推广',
    key: 3
  },
  {
    label: '提现',
    key: 4
  }
]
const onClickTab = ({ name }) => {
  state.activeTab = name
  loadData(1)
}
const loadData = init => {
  !init
    ? state.page++
    : ((state.finished = false),
      (state.list = []),
      (state.page = 1),
      (state.pageSize = 10),
      (state.loading = true))
  wmoneyListApi({
    page: state.page,
    pageSize: state.pageSize,
    type: state.activeTab
  })
    .then(({ data }) => {
      state.list.push(...data)
      if (state.pageSize > data.length) {
        state.finished = true
      }
      state.loading = false
    })
    .catch(() => {
      state.loading = false
    })
}
</script>
<style lang="less" scoped>
.item {
  margin: 30px 30px 0 30px;
  background: #fff;
  border-radius: 10px;
  padding: 30px 30px 0;
  .price {
    display: flex;
    align-items: center;
    font-size: 28px;
    padding-bottom: 30px;
    .num {
      font-size: 24px;
      flex: 1;
      text-align: right;
    }
    .incom {
      color: #ff0036;
      font-size: 35px;
      font-weight: 800;
    }
  }
  .last {
    color: #ff0036;
    font-size: 28px;
  }
}
</style>
