<template>
  <van-nav-bar
    left-arrow
    title="个人中心"
    @clickLeft="() => router.push('/home')"
  />
  <div class="middle">
    <div class="top">
      <van-cell-group inset>
        <van-cell center :icon="avatarImg">
          <template #title>
            <div class="top-phone">159541***52</div>
            <div class="top-gray">登录账号</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-cell-group inset>
      <van-cell
        v-for="item in lists"
        :title="item.title"
        :key="item.key"
        center
        :icon="item.icon"
        is-link
        :url="item.url"
      />
    </van-cell-group>

    <van-cell-group inset>
      <van-cell
        title="联系我们"
        center
        :icon="wechatImg"
        is-link
      />
    </van-cell-group>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import ticketImg from '@/assets/user/ticket.png' 
import hotelImg from '@/assets/user/hotel.png' 
import couponsImg from '@/assets/user/coupons.png' 
import inkindImg from '@/assets/user/inkind.png'
import wechatImg from '@/assets/user/wechat.png'
import avatarImg from '@/assets/user/avatar.png'
const router = useRouter()
const lists = [
  {
    key: 'ticket',
    title: '门票订单',
    icon: `${ticketImg}`,
    url: '#/home/ticket/order'
  },
  {
    key: 'hotel',
    title: '酒店订单',
    icon: `${hotelImg}`,
    url: '#/home/hotel/order'
  },
  {
    key: 'coupons',
    title: '卡券订单',
    icon: `${couponsImg}`,
    url: '#/home/coupons/order'
  },
  {
    key: 'inkind',
    title: '实物订单',
    icon: `${inkindImg}`,
    url: '#/home/inkind/order'
  }
]
</script>

<style lang="less" scoped>
.middle {
  overflow: hidden;
  .top {
    background: #e81a32;
    padding: 62px 0 30px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -70px;
      left: -10px;
      width: 0;
      height: 0;
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-top: 70px solid #e81a32;
    }
    &::before {
      content: '';
      position: absolute;
      bottom: -70px;
      right: -10px;
      width: 0;
      height: 0;
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-top: 70px solid #e81a32;
    }
    &-phone {
      color: #de424e;
      font-size: 40px;
    }
    &-gray {
      color: #999999;
      font-size: 24px;
    }
    /deep/ .van-cell-group {
      margin-bottom: 0px;
    }
    /deep/ .van-cell__left-icon {
      height: 98px;
      line-height: 98px;
      margin-right: 14px;
    }
    /deep/ .van-icon__image {
      width: 98px;
      height: 98px;
    }
  }
  /deep/ .van-cell-group {
    margin-bottom: 30px;
  }
  /deep/ .van-cell__left-icon {
    height: 48px;
    line-height: 48px;
    margin-right: 39px;
  }
}
</style>
