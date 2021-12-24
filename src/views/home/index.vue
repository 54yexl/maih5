<template>
  <div class="content">
    <van-nav-bar
      fixed
      left-arrow
      title="迪士尼奇梦卡专区"
      @clickRight="() => router.push('/user/personal')"
    >
      <template #right>
        <van-icon name="user-circle-o" />
      </template>
    </van-nav-bar>
    <h2 class="title">快选通道<span>购卡用卡一站体验</span></h2>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { setCookie } from '@/utils/user.js'
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
  /deep/ .van-nav-bar {
    background: none;
    &::after {
      border: 0;
    }
  }
  /deep/.van-nav-bar {
    .van-nav-bar__arrow,
    .van-icon-user-circle-o {
      font-size: 44px;
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .title {
    padding: 603px 17px 47px;
    color: #ffffff;
    font-size: 44px;
    span {
      font-size: 24px;
      padding-left: 19px;
      opacity: 100%;
    }
  }
  .middle {
    margin: 0 24px;
    padding: 0 7px;
    background: #fff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    overflow: hidden;
    font-size: 32px;
    .Coupons {
      width: 100%;
      border-right: 0;
      border-bottom: solid 1px #ddd;
      padding: 56px 20px 35px;
      background: url('@/assets/user/home_menubg_coupon.png') 202px bottom
        no-repeat;
      background-size: 436px 193px;
      h5 {
        font-size: 24px;
        padding: 8px 0 17px;
      }
      a {
        padding: 6px 15px;
        background: #f22d47;
        border-radius: 17px;
        font-size: 22px;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .Hotel {
      background: url('@/assets/user/home_menubg_hotel.png') right bottom
        no-repeat;
      background-size: 154px 129px;
    }
    .InKind {
      background: url('@/assets/user/home_menubg_inkind.png') right bottom
        no-repeat;
      background-size: 154px 129px;
    }
    .Ticket {
      background: url('@/assets/user/home_menubg_ticket.png') right bottom
        no-repeat;
      background-size: 154px 129px;
    }
    > a {
      width: 33%;
      float: left;
      border-right: 1px solid #ddd;
      box-sizing: border-box;
      color: #000;
      .price {
        color: #f22d47;
        font-size: 22px;
        padding-top: 5px;
      }
      &:last-child {
        border-right: 0;
      }
      .com {
        padding: 27px 0 144px 18px;
        .integral {
          font-size: 18px;
          color: #ffffff;
          margin-top: 11px;
          padding: 8px 10px;
          background: #f22d47;
          border-radius: 17px;
          display: inline-block;
        }
      }
    }
    .pd {
      padding: 50px 0;
    }
  }
}
</style>
