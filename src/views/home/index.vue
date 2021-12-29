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

    <van-grid :column-num="5" :border="false">
      <van-grid-item 
        v-for="item in tabList" 
        :key="item.key" 
        :icon="item.icon" 
        :to="item.url" 
        :text="item.title" 
      />
    </van-grid>

    <van-divider
      :style="{ color: '#1989fa',borderColor: '#1989fa',fontWeight: 'bold',padding:' 0 50px' }"
    >
      工作时间：09:00 - 20:00
    </van-divider>
    <div class="share">
      <h3>邀请分成</h3>
      <!-- 每个元素的两侧间隔相等 -->
      <van-row type="flex" justify="space-around">
        <van-col span="11"><img style="width:100%" src="@/assets/home_friend.png"/></van-col>
        <van-col span="11"><img style="width:100%" src="@/assets/home_shangjia.png"/></van-col>
      </van-row>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="state.active">
      <van-tabbar-item icon="home-o" name="home-o" color="#00255">首页</van-tabbar-item>
      <van-tabbar-item icon="gold-coin-o" name="gold-coin-o">接单</van-tabbar-item>
      <van-tabbar-item icon="user-o" name="user-o" to="/user/personal">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({
  loading: true,
  active: 'home-o'
})
const tabList = [
  {
    key: '1',
    title: '待操作',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '2',
    title: '待返款',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '3',
    title: '待评价',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '4',
    title: '资金明细',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '5',
    title: '提现',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '6',
    title: '待追评',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '7',
    title: '收款账户',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '8',
    title: '预售任务',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '9',
    title: '设置',
    icon: `photo-o`,
    url: '/'
  },
  {
    key: '10',
    title: '收益',
    icon: `photo-o`,
    url: '/'
  }
]

onMounted(async () => {
})

</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  // background: url('@/assets/user/home_bg.png');
  // background-size: 100% 100%;
  .my-swipe{
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 350px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
  .share{
    margin: 0 20px;
    text-align: center;
    background-color: #20263d;
    border-radius: 5px;
    padding: 15px 0;
    h3{
      color: rgb(255, 255, 255);
      font-size: 30px;
      text-align: center;
      font-weight: 900;
      margin: 8px 0 30px;
    }
  }
}
</style>
