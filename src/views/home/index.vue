<template>
  <div class="content">
    <van-nav-bar
      fixed
      left-arrow
      title="迪士尼奇梦卡专区"
      @clickRight="() => router.push('/user/personal')"
    />

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({
      activeTab: 'Hotel',
      tabList: [],
      loading: true,
      priceShowMethod: 0
    })

    onMounted(async () => {
    })

    return {
      ...toRefs(state),
      router
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  height: 100vh;
  background: url('@/assets/user/home_bg.png');
  background-size: 100% 100%;
  .my-swipe{
    margin-top: 90px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
}
</style>
