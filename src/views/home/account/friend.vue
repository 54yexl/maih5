<template>
  <van-nav-bar
    title="我的好友"
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
    color="rgb(242, 145, 0)"
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
        <div class="item" v-for="item in state.list" :key="item.cardOrderId">
          <div class="goods">
            <van-image
              src="http://t.haidaitest.top:555/m/static/img/tudiuser2.1934d30b.png"
              :width="40"
              :height="40"
            />
            <div class="goods-name">
              <div class="price">
                <div>昵称：{{ item.nikeName || '无' }}</div>
                <div class="num active">
                  {{ item.status === 1 ? '已实名' : '未实名' }}
                </div>
              </div>
              <div class="price" style="padding: 10px 0">
                <div>电话：{{ item.phone || '无' }}</div>
                <div class="num">正常</div>
              </div>
              <div class="price">
                <!-- <div>完成任务数：0</div> -->
                <div
                  class="num"
                  @click=";(state.show = true), (state.showDetail = item)"
                >
                  详情
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
  <van-popup v-model:show="state.show" :style="{ width: '77%' }">
    <van-cell-group>
      <van-cell title="ID" :value="state.showDetail?.userId" />
      <van-cell title="手机" :value="state.showDetail.phone" />
      <van-cell title="QQ" :value="state.showDetail.qq" />
      <van-cell title="微信" :value="state.showDetail.weChat" />
      <!-- <van-cell title="累积做单量" value="0" />
      <van-cell title="累计收益" value="￥1.52" /> -->
      <van-cell title="注册时间" :value="state.showDetail.createTime" />
    </van-cell-group>
  </van-popup>
</template>
<script setup>
import moment from 'moment'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { friendsListApi } from '@/api/home'
const router = useRouter()
const state = reactive({
  activeTab: 1,
  loading: false,
  finished: false,
  list: [],
  page: 0,
  pageSize: 10,
  show: false,
  showDetail: {}
})
const tabList = [
  // {
  //   label: '全部',
  //   key: 0
  // },
  {
    label: '已实名',
    key: 1
  },
  {
    label: '未实名',
    key: 0
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
  friendsListApi({
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
  //     state.list.push(state.list.length + 1)
  //   }
  //   state.loading = false
  //   if (state.list.length >= 40) {
  //     state.finished = true
  //   }
  // }, 1000)
}
</script>
<style lang="less" scoped>
.item {
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
      font-size: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #333;
      .price {
        display: flex;
        align-items: center;
        .num {
          font-size: 24px;
          flex: 1;
          text-align: right;
        }
        .active {
          color: rgb(242, 145, 0);
        }
      }
    }
  }
}
/deep/ .van-tab--active {
  color: rgb(242, 145, 0);
}
/deep/ .van-cell__value {
  color: #ff0036;
}
</style>
