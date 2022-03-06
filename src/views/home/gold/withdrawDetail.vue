<template>
  <van-nav-bar
    left-arrow
    title="提现明细"
    fixed
    @clickLeft="() => router.replace('/gold/withdraw')"
  />
  <div class="content">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
    >
      <div class="item" v-for="item in list" :key="item.ticketId">
        <div class="info">
          <!-- <div class="name">提现人: {{ item.name || '无' }}</div> -->
          <div class="name">提现金额: {{ item.withdrawMoney || 0 }}</div>
          <div class="desc">提现时间：{{ item.createTime }}</div>
          <div class="desc">审核时间：{{ item.reviewTime || '暂未审核' }}</div>
          <div class="desc" v-show="item.failReason">拒绝原因: {{ item.failReason }}</div>
        </div>
        <van-button plain hairline type="primary">{{
          item.status === 0
            ? '待审核'
            : item.status === 1
            ? '已返款'
            : item.status === 2
            ? '返款失败'
            : '无'
        }}</van-button>
      </div>
    </van-list>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { withdrawListApi } from '@/api/gold'
export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({
      loading: false,
      finished: false,
      list: [],

      page: 0,
      pageSize: 10
    })

    const loadData = async init => {
      if (!init) {
        state.page++
      }
      const { data } = await withdrawListApi({
        page: state.page,
        pageSize: state.pageSize
      }).finally(() => {
        state.loading = false
      })
      state.list.push(...data)

      if (state.pageSize > data.length) {
        state.finished = true
      }
    }

    return {
      ...toRefs(state),
      loadData,
      router
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  flex: auto;
  background-color: #f7f7f7;
  padding: 120px 30px 0;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // height: 206px;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 32px;
    padding: 40px 30px 32px;
    background-color: #fff;
    &:first-child {
      margin-top: 0;
    }
    .info {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 28px;
        font-weight: 800;
        color: #000;
        margin-bottom: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
      }
      .desc {
        color: #666;
        font-size: 24px;
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
