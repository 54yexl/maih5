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
      v-for="tab in tabList"
      :key="tab.key"
      :title="tab.label"
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
                <div>任务ID：{{ item.id }}</div>
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
                <div class="num">账号：{{ item.id }}</div>
              </div>
              <div class="last">{{ item.returnTypeStr }}</div>
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
import { orderListApi } from '@/api/home'
const router = useRouter()
const state = reactive({
  activeTab: 0,
  loading: false,
  finished: false,
  list: [],
  page: 0,
  pageSize: 10
})
// 0.全部 1.待审核 2.待操作 3.待返款 4.待好评 5.待确认 6.待追评 7.预售订单 10.已完成
const tabList = [
  {
    label: '全部',
    key: 0
  },
  {
    label: '待审核',
    key: 1
  },
  {
    label: '待操作',
    key: 2
  },
  {
    label: '待返款',
    key: 3
  },
  {
    label: '待评价',
    key: 4
  },
  {
    label: '待确认',
    key: 5
  },
  {
    label: '待追评',
    key: 6
  },
  {
    label: '预售订单',
    key: 7
  },
  {
    label: '已完成',
    key: 10
  }
]
const onClickTab = ({ name }) => {
  state.activeTab = name
  loadData(1)
}
const loadData = async init => {
  !init
    ? state.page++
    : ((state.finished = false),
      (state.list = []),
      (state.page = 1),
      (state.pageSize = 10),
      (state.loading = false))
  const { data } = await orderListApi({
    page: state.page,
    pageSize: state.pageSize,
    status: state.activeTab
  }).catch(() => {
    state.loading = false
  })
  state.list.push(...data)
  if (state.pageSize > data.length) {
    state.finished = true
  }
  state.finished = true
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
    -webkit-filter: blur(3px); /* Chrome, Opera */
    -moz-filter: blur(3px);
    -ms-filter: blur(3px);
    filter: blur(3px);
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
