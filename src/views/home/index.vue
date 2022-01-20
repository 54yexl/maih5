<template>
  <div class="content">
    <!-- <van-nav-bar
      fixed
      left-arrow
      title="迪士尼奇梦卡专区"
      @clickRight="() => router.push('/user/personal')"
    /> -->

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3" :border="false">
      <van-grid-item
        v-for="item in tabList"
        :key="item.key"
        :icon="item.icon"
        icon-color="#FFCD49"
        :to="item.url"
        :text="item.title"
      />
    </van-grid>

    <van-divider
      :style="{
        color: '#1989fa',
        borderColor: '#1989fa',
        fontWeight: 'bold',
        padding: ' 0 50px'
      }"
    >
      工作时间：09:00 - 20:00
    </van-divider>
    <div class="share">
      <h3>邀请分成</h3>
      <!-- 每个元素的两侧间隔相等 -->
      <van-row type="flex" justify="space-around">
        <van-col span="11"
          ><img style="width: 100%" src="@/assets/home_friend.png"
        /></van-col>
        <van-col span="11"
          ><img style="width: 100%" src="@/assets/home_shangjia.png"
        /></van-col>
      </van-row>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="state.active">
      <van-tabbar-item icon="home-o" name="home-o" color="#00255"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="gold-coin-o" name="gold-coin-o" to="/task"
        >接单</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" name="user-o" to="/user/personal"
        >个人</van-tabbar-item
      >
    </van-tabbar>
    <!-- qq微信悬浮 -->
    <div class="fixqq">
      <img src="@/assets/qq.png" />
    </div>
    <!-- 通告 -->
    <van-dialog
      class="hotel-detail-dialog"
      v-model:show="state.showNotice"
      @close="state.showNotice = false"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div class="header">{{ state.notice?.title }}</div>
      <van-divider style="margin: 0" />
      <div class="wrapper">
        <div v-html="state.notice?.noticeContent"></div>
        <van-button
          class="sub-btn"
          type="primary"
          @click="state.showNotice = false"
        >
          确定
        </van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { noticeApi } from '@/api/home'
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({
  loading: true,
  active: 'home-o',
  notice: {},
  showNotice: false
})
const tabList = [
  {
    key: '1',
    title: '订单',
    icon: `orders-o`,
    url: '/home/order'
  },
  {
    key: '4',
    title: '资金明细',
    icon: `cash-back-record`,
    url: '/gold/funding/detail'
  },
  {
    key: '5',
    title: '提现',
    icon: `balance-o`,
    url: '/gold/withdraw'
  },
  {
    key: '7',
    title: '收款账户',
    icon: `cash-on-deliver`,
    url: '/collect/bind'
  },
  {
    key: '9',
    title: '设置',
    icon: `setting-o`,
    url: '/user/set'
  },
  {
    key: '10',
    title: '收益',
    icon: `balance-pay`,
    url: '/income'
  }
]

onMounted(async () => {
  const { data } = await noticeApi()
  state.notice = data
  // state.showNotice = true
})
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  // background: url('@/assets/user/home_bg.png');
  // background-size: 100% 100%;
  .my-swipe {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 350px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
  .share {
    margin: 0 20px;
    text-align: center;
    background-color: #20263d;
    border-radius: 5px;
    padding: 15px 0;
    h3 {
      color: rgb(255, 255, 255);
      font-size: 30px;
      text-align: center;
      font-weight: 900;
      margin: 8px 0 30px;
    }
  }
  .van-grid {
    background: #fff;
  }
  .fixqq{
    position: fixed;
    top: 80%;
    right: 20px;
    img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: 0px 4px 8px rgb(0, 0, 0/6%);
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
