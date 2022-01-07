<template>
  <van-nav-bar
    title="详情"
    left-arrow
    fixed
    placeholder
    @clickLeft="() => router.push('/home/order')"
  />
  <div class="middle">
    <div class="orderdetail-bg">
      <div class="goods">
        <van-image
          src="http://t.haidaitest.top:555/m/static/img/mask.3954670f.png"
          :width="85"
          :height="85"
        />
        <div class="goods-name">
          <div class="goods-name-txt">
            搜索展示价格：{{ detail.ticketName || 0 }}
          </div>
          <div class="price">
            <div>类型：</div>
            <div class="num" style="color: #ff0036">2021-12-31 14:39:43</div>
          </div>
        </div>
      </div>
      <div class="goods-total">
        提示：请等待卖家确认，任务提交后一般会在一个工作日内完成
      </div>
    </div>

    <div class="orderdetail-bg">
      <div class="detail-title pd30">
        <div>操作状态</div>
        <div class="status">
          {{ detail.orderStatus || '取消' }}
        </div>
      </div>
      <div class="detail-title">
        <div>商品目标</div>
        <div class="status">
          {{ detail.orderStatus || '平台返款' }}
        </div>
      </div>
      <div class="color999">{{ detail.detail }}</div>
    </div>

    <div class="orderdetail-bg">
      <div class="butlist">
        <van-button plain type="primary">朴素按钮</van-button>
        <van-button plain type="primary">朴素按钮</van-button>
        <van-button plain type="primary">朴素按钮</van-button>
      </div>
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>接受任务：2021-12-31 14:39:43</h3>
          <p>订单编号：10256552</p>
          <p>买号：52222</p>
        </van-step>
        <van-step>
          <h3>操作任务</h3>
          <p>
            目标商品图：
            <van-image
              src="http://qn.iwillyou.cn//static/upload/shoppicture/2021-12-25/aa5c6202112251051515781.jpg"
              :width="85"
              :height="85"
            />
          </p>
        </van-step>
        <van-step>
          <h3>商家确认</h3>
          <p>返款方式：平台返款</p>
          <p>返款金额：￥444</p>
        </van-step>
        <van-step>
          <h3>任务完成</h3>
          <p>获得佣金：3.04金</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script setup>
import moment from 'moment'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
const router = useRouter()
const detail = ref({})
</script>
<style lang="less" scoped>
.orderdetail-bg {
  margin: 30px 30px 0 30px;
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  .detail-title {
    font-size: 28px;
    display: flex;
    .status {
      font-size: 24px;
      color: #3688ff;
      flex: 1;
      text-align: right;
    }
  }
  .detail-no {
    font-size: 24px;
    label {
      color: #999999;
      padding-right: 20px;
    }
  }
}
.goods {
  display: flex;
  padding: 30px 0 25px;
  border-bottom: solid 1px #ebebeb;
  &-name {
    flex: 1;
    padding: 20px 0 20px 30px;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .price {
      display: flex;
      align-items: center;
      .num {
        font-size: 28px;
        flex: 1;
        text-align: right;
      }
    }
  }
  &-total {
    font-size: 28px;
    padding: 30px 0 0;
    color: rgb(255, 0, 54);
    line-height: 1.5;
  }
}
.pd30 {
  padding-bottom: 30px;
}
.butlist button {
  margin: 0 15px 15px 0;
}
</style>
