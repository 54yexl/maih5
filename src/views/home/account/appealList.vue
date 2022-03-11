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
        <van-image :src="item.goodsPic" :width="100" :height="100" />
        <div class="goods-name">
          <div class="price">
            订单编号：<span>{{ item.publishTaskOrderId || '无' }}</span>
          </div>
          <div class="price">
            申诉类型：<span>{{ item.complaintType || '无' }}</span>
          </div>
          <div class="price">
            申诉日期：<span>{{ item.addTime }}</span>
          </div>
          <div class="price">
            <van-button
              text="详情"
              type="primary"
              size="mini"
              style="padding: 0 15px"
              @click=";(state.show = true), (showDetail = item)"
            />
            <van-button
              text="申诉回复"
              type="warning"
              size="mini"
              style="padding: 0 15px"
              @click=";(state.formshow = true), (appealForm.id = item.id)"
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
  <!-- 申诉表单 -->
  <van-popup
    class="hotel-detail-dialog"
    :style="{ 'border-radius': '10px', width: '90%', top: '45%' }"
    v-model:show="state.formshow"
    @close="state.formshow = false"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <div class="header">申诉回复</div>
    <van-divider style="margin: 0" />
    <van-form
      label-width="6em"
      @submit="onFormSubmit"
      style="padding: 0 20px 20px"
    >
      <van-field
        v-model="appealForm.replayContent"
        placeholder="请输入申诉内容"
        label="申诉回复"
        rows="3"
        type="textarea"
        maxlength="300"
        show-word-limit
        :rules="[{ required: true, message: '请输入申诉内容' }]"
      />
      <div class="sub">
        <van-button block type="primary" native-type="submit">
          确认提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>
<script setup>
import moment from 'moment'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { complaintListApi, complaintReplayApi } from '@/api/home'
import { Toast } from 'vant'
const router = useRouter()
const state = reactive({
  loading: false,
  finished: false,
  list: [],
  page: 0,
  pageSize: 10,
  show: false,
  formshow: false
})
const showDetail = ref({})
const appealForm = ref({
  replayContent: undefined,
  id: undefined
})
const loadData = init => {
  !init
    ? state.page++
    : ((state.finished = false),
      (state.list = []),
      (state.page = 1),
      (state.pageSize = 10),
      (state.loading = true))
  complaintListApi({
    page: state.page,
    pageSize: state.pageSize
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
}
const onFormSubmit = async value => {
  const { code, msg } = await complaintReplayApi(appealForm.value)
  if (code === 0) {
    state.formshow = false
    Toast.success(msg)
  }
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
        & > span {
          font-size: 13px;
          color: #ff6667;
        }
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
