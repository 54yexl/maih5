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
        <van-image :src="item.goodsPic" :width="80" :height="80" />
        <div
          class="goods-name"
          @click=";(state.show = true), (showDetail = item)"
        >
          <div class="price">
            订单编号：{{ item.publishTaskOrderId || '无' }}
          </div>
          <div class="price">申诉类型：{{ item.complaintType || '无' }}</div>
          <div class="price">申诉日期：{{ item.addTime }}</div>
          <div class="price">
            <van-button
              text="详情"
              type="primary"
              size="mini"
              style="padding: 0 15px"
            />
          </div>
        </div>
      </div>
    </div>
  </van-list>
  <van-popup v-model:show="state.show" :style="{ width: '77%' }">
    <div class="header">申诉详情</div>
    <van-cell-group>
      <van-cell
        title="申诉状态:"
        :value="
          showDetail.status === 1
            ? '协商中'
            : showDetail.status === 2
            ? '已完结'
            : '待处理'
        "
      />
      <van-cell
        title="发起方："
        :value="showDetail.startSource === 1 ? '买手' : '商家'"
      />
      <van-cell
        title="是否平台借入："
        :value="showDetail.platformStatus === 1 ? '是' : '否'"
      />
      <van-cell title="申诉内容：" :value="showDetail.complaintContent" />
      <template v-for="item in showDetail.complaintReplyList" :key="item.id">
        <van-cell>
          <span class="blue">
            {{
              item.replyType === 1
                ? '商家'
                : item.replyType === 2
                ? '买手'
                : '平台'
            }}回复：
          </span>
          {{ item.replyContent }}
        </van-cell>
      </template>
    </van-cell-group>
  </van-popup>
</template>
<script setup>
import moment from 'moment'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { complaintListApi } from '@/api/home'
const router = useRouter()
const state = reactive({
  loading: false,
  finished: false,
  list: [],
  page: 0,
  pageSize: 10,
  show: false
})
const showDetail = ref({})
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
    // padding: 30px 0 25px;
    align-items: center;
    &-name {
      flex: 1;
      padding: 0px 0 0px 30px;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #333;
      .price {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
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
.header {
  height: 88px;
  line-height: 88px;
  font-size: 32px;
  color: #333;
  font-weight: bold;
  text-align: center;
}
.blue {
  color: #1989fa;
}
</style>
