<template>
  <van-nav-bar
    title="任务列表"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/user/personal')"
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
        <div
          class="item"
          v-for="item in state.list"
          :key="item.cardOrderId"
          @click="router.push(`/home/order/detail`)"
        >

          <div class="goods">
            <van-image src="http://t.haidaitest.top:555/m/static/img/mask.3954670f.png" :width="85" :height="85" />
            <div class="goods-name">
              <div class="price">
                <div>任务ID：2454</div>
                <div class="num" style="color:#999">2021-12-31 14:39:43</div>
              </div>
              <div class="price">
                <div>佣金：3.04</div>
                <div class="num">
                  <van-button type="primary" size="mini">迷你按钮</van-button>
                </div>
              </div>
              <div class="price">
                <div>垫付：0</div>
                <div class="num">账号：tao</div>
              </div>
              <div class="last">无任务</div>
            </div>
          </div>

        </div>
      </van-list>
    </van-tab>
  </van-tabs>
</template>
<script setup>
import moment from 'moment'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
const router = useRouter()
const state = reactive({
  activeTab: '',
  loading: false,
  finished: false,
  list: [],
  pageNum: 0,
  pageSize: 10
})
const tabList = [
  {
    label: '待返款',
    key: 0
  },
  {
    label: '待评价',
    key: 1
  },
  {
    label: '待确认',
    key: 3
  },
  {
    label: '待追评',
    key: 4
  },
  {
    label: '追评待确认',
    key: 5
  },
  {
    label: '已完成',
    key: 6
  },
  {
    label: '未完成',
    key: 7
  },
  {
    label: '预售待付款',
    key: 8
  },
  {
    label: '追评已完成',
    key: 9
  }
]
const onClickTab = ({ name }) => {
  state.activeTab = name
  loadData(1)
}
const loadData = async init => {
  // !init
  //   ? state.pageNum++
  //   : ((state.finished = false),
  //     (state.list = []),
  //     (state.pageNum = 1),
  //     (state.pageSize = 10),
  //     (state.loading = false))
  // const { data } = await couponsOrderList({
  //   pageNum: state.pageNum,
  //   pageSize: state.pageSize,
  //   param: {
  //     orderStatus: state.activeTab
  //   }
  // }).catch(() => {
  //   console.log(111)
  //   state.loading = false
  // })
  // state.list.push(...data.records)
  // if (state.pageSize > data.records.length) {
  //   state.finished = true
  // }
  // state.finished = true
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      state.list.push(state.list.length + 1);
    }

    // 加载状态结束
    state.loading = false;

    // 数据全部加载完成
    if (state.list.length >= 40) {
      state.finished = true;
    }
  }, 1000);
}
</script>
<style lang="less" scoped>
.item{
  margin: 30px 30px 0 30px;
  background: #fff;
  border-radius: 10px;
  padding: 30px;
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
        color:#ff0036;
        font-size: 28px;
      }
    }
  }
}
</style>
