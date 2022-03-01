<template>
  <van-nav-bar
    left-arrow
    title="个人中心"
    @clickLeft="() => router.push('/home')"
  />
  <div class="middle">
    <div class="card">
      <div class="top">
        <img src="@/assets/user/avatar.png" />
        <div class="top-txt">
          <h4 @click="foot.showNick = true">
            {{ state.nikeName || state.phone || '无' }} <van-icon name="edit" />
          </h4>
          <p>ID：{{ state.id || '无' }}</p>
          <div>邀请码：{{ state.promotePermission ? state.inviteCoe : '无权限' }}</div>
        </div>
      </div>
      <div class="bottom">
        <div @click="router.push('/gold/withdraw')">
          <h2>{{ state.balance }}</h2>
          <p>可提现 ></p>
        </div>
        <div>
          <h2>{{ state.principalAmount }}</h2>
          <p>本金（元）</p>
        </div>
        <div>
          <h2>{{ state.commissionAmount }}</h2>
          <p>佣金（元）</p>
        </div>
      </div>
    </div>

    <div class="card tool">
      <h1>主要工具</h1>
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          icon="orders-o"
          text="订单"
          icon-color="#F12D48"
          to="/home/order"
        />
        <van-grid-item
          icon="friends-o"
          text="我的好友"
          icon-color="#FFD252"
          to="/my/friend"
        />
        <van-grid-item
          v-show="state.promotePermission"
          icon="share-o"
          text="分享朋友"
          icon-color="#fc3251"
          :to="'/share/friends?inviteCoe=' + state.inviteCoe"
        />
        <van-grid-item
          icon="balance-list-o"
          text="收益"
          icon-color="#FFCD49"
          to="/income"
        />
        <van-grid-item
          icon="warning-o"
          text="申诉"
          icon-color="#989898"
          to="/appeal/list"
        />
      </van-grid>
    </div>
    <div class="card">
      <img src="@/assets/user_ad.png" style="width: 100%" />
    </div>
    <div class="card tool">
      <h1>常用工具</h1>
      <van-grid :column-num="4" :border="false">
        <!-- <van-grid-item icon="new" text="新手教程" icon-color="#745AFF" /> -->
        <van-grid-item
          icon="gold-coin"
          text="收款绑定"
          icon-color="#FFCD49"
          to="/collect/bind"
        />
        <van-grid-item
          icon="manager"
          text="绑定账号"
          icon-color="#F0BD84"
          to="/account/bind"
        />
        <!-- <van-grid-item
          icon="phone-circle"
          text="帮助与客服"
          icon-color="#F12D48"
        /> -->
        <van-grid-item
          icon="setting"
          text="设置"
          icon-color="#F77A85"
          to="/user/set"
        />
      </van-grid>
    </div>
  </div>
  <!-- 底部 -->
  <van-tabbar v-model="foot.active">
    <van-tabbar-item icon="home-o" name="home-o" color="#00255" to="/home">
      首页
    </van-tabbar-item>
    <van-tabbar-item icon="gold-coin-o" name="gold-coin-o" to="/task">
      接单
    </van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user-o"> 个人 </van-tabbar-item>
  </van-tabbar>
  <!-- 修改昵称 -->
  <van-popup
    class="hotel-detail-dialog"
    :style="{ 'border-radius': '10px', width: '90%', top: '45%' }"
    v-model:show="foot.showNick"
    @close="foot.showNick = false"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <div class="header">修改昵称</div>
    <van-divider style="margin: 0" />
    <van-form label-width="6em" @submit="onSubmit" style="padding: 0 20px 20px">
      <van-field
        v-model="nickForm.nikeName"
        placeholder="请输入昵称"
        label="昵称"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <div class="sub">
        <van-button
          block
          type="primary"
          native-type="submit"
          :loading="state.loading"
          loading-text="提交中..."
        >
          确认提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import { InfoApi, infoModifyApi } from '@/api/user'
const router = useRouter()
const state = ref({})
const nickForm = ref({
  nikeName: undefined
})
const foot = reactive({
  active: 'user-o',
  showNick: false
})
onMounted(() => {
  getInfo()
})
const getInfo = async () => {
  const { data } = await InfoApi()
  data ? (state.value = data) : ''
}
const onSubmit = async value => {
  const { code } = await infoModifyApi(nickForm.value)
  if (code === 0) {
    foot.showNick = false
    getInfo()
  }
}
</script>

<style lang="less" scoped>
.middle {
  overflow: hidden;
  margin: 20px 0 120px;
  .card {
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    margin: 0 30px 20px;
  }
  .top {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #666;
    & > img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    &-txt {
      padding-left: 20px;
      & > h4 {
        font-weight: 700;
        font-size: 30px;
      }
      & > p {
        padding: 10px 0;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    text-align: center;
    color: #999;
    font-size: 14px;
    margin-top: 50px;
    h2 {
      font-size: 35px;
      font-weight: 700;
      color: #333;
      margin-bottom: 15px;
    }
  }
  .tool {
    padding: 0;
    h1 {
      padding: 30px 0 0 20px;
      font-weight: 700;
      font-size: 30px;
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
}
</style>
