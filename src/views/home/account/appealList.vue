<template>
  <van-nav-bar
    title="申诉列表"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/user/personal')"
  />

      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="loadData"
      >
        <div class="item" v-for="item in state.list" :key="item.publishTaskOrderId">
          <div class="goods">
            <van-image
              :src="item.complaintPic1"
              :width="80"
              :height="80"
            />
            <div class="goods-name">
              <div class="price">
                <div>订单编号：{{ item.publishTaskOrderId || '无' }}</div>
                <!-- <div class="num active">
                  {{ item.status === 1 ? '已实名' : '未实名' }}
                </div> -->
              </div>
              <div class="price" style="padding: 5px 0">
                <div>申诉类型：{{ item.complaintType || '无' }}</div>
              </div>
              <div class="price" style="padding:0 0 5px 0">
                <div>状态：{{ item.status === 1 ? '协商中' : item.status === 2 ? '已完结' : '待处理' }}</div>
              </div>
              <div class="price" style="padding:0 0 5px 0">
                <div>发起方：{{ item.startSource === 1 ? '买手' : '商家' }}</div>
              </div>
              <div class="price" style="padding:0 0 5px 0">
                <div>是否平台借入：{{ item.platformStatus === 1 ? '是' : '否' }}</div>
              </div>
              <div class="price" style="padding:0 0 5px 0">
                <div>申诉日期：{{ item.addTime }}</div>
              </div>
              <div class="price" style="padding:0 0 5px 0">
                <div>申诉内容：{{ item.complaintContent }}</div>
              </div>
              <!-- <div class="price">
                <div>完成任务数：0</div>
                <div
                  class="num"
                  @click="(state.show = true), (state.showDetail = item)"
                >
                  详情
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </van-list>
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
import { complaintListApi } from '@/api/home'
const router = useRouter()
const state = reactive({
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
const loadData = async init => {
  !init
    ? state.page++
    : ((state.finished = false),
      (state.list = []),
      (state.page = 1),
      (state.pageSize = 10),
      (state.loading = false))
  const { data } = await complaintListApi({
    page: state.page,
    pageSize: state.pageSize
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
    align-items: center;
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
