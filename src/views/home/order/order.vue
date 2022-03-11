<template>
  <van-nav-bar
    title="任务列表"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.go(-1)"
  />
  <van-tabs
    v-model:active="state.activeTab"
    sticky
    :offset-top="46"
    @click-tab="onClickTab"
  >
    <van-tab
      v-for="tab in state.tabList"
      :key="tab.key"
      :title="`${tab.label}${
        tab.key === 0 || tab.key === 10 ? '' : '(' + tab.nums + ')'
      }`"
      :name="tab.key"
    >
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="loadData"
      >
        <div
          class="item"
          v-for="item in state.list"
          :key="item.cardOrderId"
          @click="
            router.replace({
              path: `/home/order/detail`,
              query: { id: item?.id }
            })
          "
        >
          <div class="goods">
            <van-image
              :src="item.goodsPic"
              :width="100"
              :height="100"
              :class="item.statusStr === '待操作' ? 'blur' : ''"
            />
            <div class="goods-name">
              <div class="price">
                <div>订单ID：{{ item.id }}</div>
                <div class="num" style="color: #999">
                  {{ item.receiveTime }}
                </div>
              </div>
              <div class="price" v-show="tab.key === 7">
                <div>预售时间：{{ item.id }}</div>
                <div class="num" style="color: #999">{{ item.canDoTime }}</div>
              </div>
              <div class="price">
                <div>佣金：{{ item.commission }}</div>
                <div class="num">
                  <van-button type="primary" size="mini">{{
                    item.statusStr
                  }}</van-button>
                </div>
              </div>
              <div class="price">
                <div>垫付：{{ item.goodsPrice }}</div>
                <div class="num">账号：{{ item.account }}</div>
              </div>
              <div class="last price">
                <div>{{ item.returnTypeStr }}</div>
                <div class="num" v-show="item.returnTypeStr === '商家返款'">
                  {{ item.returnStr }}
                </div>
              </div>
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
import { reactive, onMounted } from 'vue'
import { orderListApi, orderTotalApi } from '@/api/home'
const router = useRouter()
const state = reactive({
  activeTab: 0,
  loading: false,
  finished: false,
  list: [],
  page: 0,
  pageSize: 10,
  tabList: [
    {
      label: '全部',
      key: 0,
      nums: 0
    },
    {
      label: '待审核',
      key: 1,
      nums: 0
    },
    {
      label: '待操作',
      key: 2,
      nums: 0
    },
    {
      label: '待返款',
      key: 3,
      nums: 0
    },
    {
      label: '待评价',
      key: 4,
      nums: 0
    },
    {
      label: '待确认',
      key: 5,
      nums: 0
    },
    {
      label: '待追评',
      key: 6,
      nums: 0
    },
    {
      label: '预售订单',
      key: 7,
      nums: 0
    },
    {
      label: '已完成',
      key: 10,
      nums: 0
    },
    {
      label: '异常订单',
      key: 11,
      nums: 0
    }
  ]
})
// 0.全部 1.待审核 2.待操作 3.待返款 4.待好评 5.待确认 6.待追评 7.预售订单 10.已完成 11.异常

onMounted(async () => {
  const { data } = await orderTotalApi()
  if (data) {
    state.tabList.map(v => {
      v.key === 1 ? (v.nums = data.waitAuditTotal) : ''
      v.key === 2 ? (v.nums = data.runningTaskTotal) : ''
      v.key === 3 ? (v.nums = data.returnMoneyTotal) : ''
      v.key === 4 ? (v.nums = data.commentTotal) : ''
      v.key === 5 ? (v.nums = data.confirmTotal) : ''
      v.key === 6 ? (v.nums = data.appendCommentTotal) : ''
      v.key === 7 ? (v.nums = data.delayedBuyTotal) : ''
      v.key === 11 ? (v.nums = data.exceptionTotal) : ''
    })
  }
})
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
  orderListApi({
    page: state.page,
    pageSize: state.pageSize,
    status: state.activeTab
  })
    .catch(() => {
      state.loading = false
    })
    .then(({ data }) => {
      state.list.push(...data)
      if (state.pageSize > data.length) {
        state.finished = true
      }
      state.loading = false
    })

  // setTimeout(() => {
  //   for (let i = 0; i < 10; i++) {
  //     state.list.push(state.list.length + 1);
  //   }
  //   state.loading = false;
  //   if (state.list.length >= 40) {
  //     state.finished = true;
  //   }
  // }, 1000);
}
</script>
<style lang="less" scoped>
.item {
  margin: 30px 30px 0 30px;
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  .blur {
    -webkit-filter: blur(2px); /* Chrome, Opera */
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
  .goods {
    display: flex;
    padding: 30px 0 25px;
    &-name {
      flex: 1;
      padding: 0px 0 0px 30px;
      font-size: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        display: flex;
        align-items: center;
        .num {
          font-size: 24px;
          flex: 1;
          text-align: right;
        }
      }
      .last {
        color: #ff0036;
        font-size: 28px;
      }
    }
  }
}
</style>
