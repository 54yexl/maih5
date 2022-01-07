<template>
  <van-nav-bar
    left-arrow
    title="个人中心"
    @clickLeft="() => router.push('/home')"
  />
  <div class="middle">
    <div class="card">
      <div class="top">
        <img src="@/assets/user/avatar.png"/>
        <div class="top-txt">
          <h4>名字</h4>
          <p>ID：555</p>
          <div>邀请码：无权限</div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <h2>10.7</h2>
          <p>可提现 ></p>
        </div>
        <div>
          <h2>190</h2>
          <p>已提现（元）</p>
        </div>
        <div>
          <h2>10.7</h2>
          <p>累计总佣金（元）</p>
        </div>
      </div>
    </div>

    <div class="card tool">
      <h1>主要工具</h1>
      <van-grid :column-num="5" :border="false">
        <van-grid-item icon="orders-o" text="订单" icon-color="#F12D48" to="/home/order"/>
        <van-grid-item icon="friends-o" text="我的好友" icon-color="#FFD252"/>
        <van-grid-item icon="share-o" text="分享朋友" icon-color="#fc3251"/>
        <van-grid-item icon="balance-list-o" text="收益" icon-color="#FFCD49"/>
        <van-grid-item icon="warning-o" text="申诉" icon-color="#989898"/>
      </van-grid>
    </div>
    <div class="card">
      <img src="@/assets/user_ad.png" style="width:100%"/>
    </div>
    <div class="card tool">
      <h1>常用工具</h1>
      <van-grid :column-num="4" :border="false">
        <van-grid-item icon="new" text="新手教程" icon-color="#745AFF"/>
        <van-grid-item icon="gold-coin" text="收款绑定" icon-color="#FFCD49" to="/collect/bind"/>
        <van-grid-item icon="manager" text="绑定账号" icon-color="#F0BD84" to="/account/bind"/>
        <van-grid-item icon="phone-circle" text="帮助与客服" icon-color="#F12D48"/>
        <van-grid-item icon="setting" text="设置" icon-color="#F77A85"/>
      </van-grid>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="less" scoped>
.middle {
  overflow: hidden;
  margin: 20px 0;
  .card{
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    margin:0 30px 20px;
  }
  .top{
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #666;
    &>img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    &-txt{
      padding-left: 20px;
      &>h4{
        font-weight: 700;
        font-size: 30px;
      }
      &>p{
        padding: 10px 0;
      }
    }
  }
  .bottom{
    display: flex;
    justify-content: space-around;
    text-align: center;
    color: #999;
    font-size: 14px;
    margin-top: 50px;
    h2{
      font-size: 35px;
      font-weight: 700;
      color: #333;
      margin-bottom: 15px;
    }
  }
  .tool{
    padding: 0;
    h1{
      padding: 30px 0 0 20px;
      font-weight: 700;
      font-size: 30px;
    }
  }
}
</style>
