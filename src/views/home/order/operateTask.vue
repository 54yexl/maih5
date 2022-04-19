<template>
  <van-nav-bar
    left-arrow
    title="操作任务"
    fixed
    @clickLeft="() => router.go(-1)"
  />

  <div class="content">
    <div class="downtme">
      <div
        v-if="
          moment(detail.beginTime).add(1, 'hours').valueOf() -
            moment(new Date()).valueOf() >
          0
        "
      >
        <van-count-down
          :time="
            moment(detail.beginTime).add(1, 'hours').valueOf() -
            moment(new Date()).valueOf()
          "
          format="HH 时 mm 分 ss 秒"
        />
        <p>请在倒计时结束前完成操作任务</p>
      </div>

      <div v-else>任务超时</div>
    </div>
    <h3>任务商品</h3>
    <div class="goods">
      <van-image
        :src="detail.goodsPic"
        :width="110"
        :height="110"
        class="blur"
      />
      <div class="goods-name">
        <div class="goods-name-txt">
          搜索展示价格：{{ detail.searchPrice || 0 }}
        </div>
        <div class="goods-name-txt">支付金额：{{ detail.goodsMoney || 0 }}</div>
        <div>佣金：{{ detail.commission }}</div>
        <div>购买数量：{{ detail.buyNum }}</div>
        <div>规格：{{ detail.goodsSpec || '默认随机' }}</div>
        <div class="last">
          {{ detail.screenFlag === 1 ? '需要截图任务' : '无截图任务' }}
        </div>
      </div>
    </div>
    <h3 style="color:red" v-show="detail.matchingGoods === 1">搭配商品</h3>
    <van-grid :column-num="3" v-show="detail.matchingGoods === 1">
      <van-grid-item v-for="item in detail.goodsOptionExted" :key="item.id">
        <van-image :src="item.pic1" :width="100" :height="100" />
        <!-- <div style="padding: 10px 0; line-height: 1.3">{{ item.value }}</div> -->
        <div style="padding: 10px 0 0">商品价格：{{ item.goodsPrice }}</div>
      </van-grid-item>
    </van-grid>

    <h3>任务要点</h3>
    <p class="tips">
      禁止使用淘宝客、返利网等方式下单，否则一律永久封号并冻结资金！禁止乱添加关键词
    </p>
    <van-cell title="订单编号" :value="detail.id" />
    <van-cell
      title="任务类型"
      :value="detail.screenFlag === 1 ? '需要截图任务' : '无截图任务'"
    />
    <!-- entryShopType 1.2.3对应entryShopTypeOptionExted value字段，4直接打开 6是取value图片展示 99五张图&备注-->
    <!-- entryShopType:1.搜索关键词 2.搜索店铺 3.直通车 4.直接打开 5.淘口令 6.二维码 99.其它渠道 -->
    <van-cell
      v-show="detail.entryShopType !== 4"
      :title="
        detail.entryShopType === 1
          ? '搜索关键词'
          : detail.entryShopType === 2
          ? '搜索店铺'
          : detail.entryShopType === 3
          ? '直通车'
          : detail.entryShopType === 5
          ? '淘口令'
          : detail.entryShopType === 6
          ? '二维码'
          : detail.entryShopType === 99
          ? '商家要求'
          : ''
      "
    >
      {{ detail.entryShopType !==6 ? (detail?.entryShopTypeOptionExted?.value) : ''}}
      <van-button
        v-show="detail.entryShopType < 6"
        type="primary"
        size="mini"
        @click="copy(detail?.entryShopTypeOptionExted?.value)"
        >复制</van-button
      >
      <van-image
        v-show="detail.entryShopType === 6"
        :src="detail?.entryShopTypeOptionExted?.value"
        :width="110"
        :height="110"
        
      />
    </van-cell>
    <div class="tips" v-show="detail.entryShopType === 99">
      <van-image
        width="100"
        height="100"
        v-show="detail?.entryShopTypeOptionExted?.pic1"
        :src="detail?.entryShopTypeOptionExted?.pic1"
      />
      <van-image
        width="100"
        height="100"
        v-show="detail?.entryShopTypeOptionExted?.pic2"
        :src="detail?.entryShopTypeOptionExted?.pic2"
      />
      <van-image
        width="100"
        height="100"
        v-show="detail?.entryShopTypeOptionExted?.pic3"
        :src="detail?.entryShopTypeOptionExted?.pic3"
      />
      <van-image
        width="100"
        height="100"
        v-show="detail?.entryShopTypeOptionExted?.pic4"
        :src="detail?.entryShopTypeOptionExted?.pic4"
      />
      <van-image
        width="100"
        height="100"
        v-show="detail?.entryShopTypeOptionExted?.pic5"
        :src="detail?.entryShopTypeOptionExted?.pic5"
      />
    </div>
    <van-cell
      v-show="detail.entryShopType === 4"
      is-link
      title="直接打开"
      :url="detail.goodsUrl"
    >
    {{ detail.goodsUrl }}
      <van-button
        type="primary"
        size="mini"
        @click.stop="copy(detail.goodsUrl)"
        >复制</van-button
      >
    </van-cell>

    

    <!-- <div class="tips">
      收藏宝贝（把宝贝加入收藏夹）<br />
      不允许使用优惠券及红包<br />
      不允许使用信用卡（严禁使用信用卡，否则扣手续费：本金×1%）<br />
      不允许花呗（严禁使用花呗，否则扣手续费：本金×1%）<br />
      下单支付（提交支付宝上面的账单截图）<br />
    </div> -->

    <h3 v-show="detail.messageWarn">商家要求</h3>
    <div class="tips" v-show="detail.messageWarn">{{ detail.messageWarn }}</div>


    <h3>注意事项</h3>
    <div class="tips" style="color: #333">
      与商家聊天过程中切记不要出现“任务，做单，种菜”等词汇，按照正常购物流程和语气进行操作。
    </div>
    <div class="tips">
      1：{{ detail.screenFlag === 1 ? '全程需要截图' : '全程不需要截图' }}<br />
      2：但是必须一样按照全程操作，平台会随机抽查，查到没有按照流程的封号处理。
    </div>

    <h3>任务步骤</h3>
    <div class="setp">第一步： 目标商品 货比多家</div>
    <div class="tips">店铺名称（提示：{{ detail.shopName }}）</div>
    <div class="tips">
      由于部分店铺名称相似，请仔细核对，确保下单的店铺名称和要求的完全一致才能操作。<br />
      拍错店铺需自行承担损失。<br />
      旗舰店 ≠ 专卖店 ≠ 专营店 ≠ XX店
    </div>
    <!-- 核对店铺 -->
    <van-form
      label-width="6em"
      @submit="onShopSubmit"
      style="padding: 0 20px 20px; display: flex"
    >
      <van-field
        v-model="shopName"
        label=""
        :rules="[{ required: true, message: '请核对商品淘口令' }]"
        style="border: solid 1px #1989fa; margin-right: 10px"
      />
      <van-button style="width: 220px" type="primary" native-type="submit">
        核对商品淘口令
      </van-button>
    </van-form>

    <div class="bot33">
      》请确认使用的账户为<span style="color: red">{{ detail.account }}</span
      >账号登录
    </div>
    <div class="bot33">》点击搜索框输入指定的关键词</div>
    <div class="bot33">
      》按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范围
    </div>
    <div class="bot33">》任意点开多个非目标商品，慢慢浏览至底部</div>
    <div class="bot33">》找到目标商品图，填写目标商品店铺名验证</div>
    <div class="setp">第二步：浏览目标商品图</div>
    <div class="bot33">
      》根据商品主图、价格、名称等找到目标商品，点击“进入店铺”按钮
    </div>
    <div class="bot33">
      》进入目标商品详情页，从头至尾慢慢浏览，停留至少三分钟
    </div>
    <div v-show="detail.goodsCompareNum">
      <div class="setp">第三步：提交货比商品链接</div>
      <van-form :model="compareForm" label-width="6em" @submit="onHbSubmit">
        <template v-for="item in detail.goodsCompareNum" :key="item">
          <van-field
            v-model="compareForm[item]"
            placeholder="请输入货比链接"
            :label="'货比链接' + `${item}`"
            input-align="right"
            :rules="[{ required: true, message: '请输入货比链接' }]"
          />
        </template>
        <div style="margin: 20px">
          <van-button
            block
            type="primary"
            native-type="submit"
            :loading="loading"
            loading-text="提交中..."
          >
            提交货比
          </van-button>
        </div>
      </van-form>
    </div>
    <div>
      <div class="setp">
        第{{ detail.goodsCompareNum ? '四' : '三' }}步：店内其他商品浏览
      </div>
      <van-form :model="reviewForm" label-width="6em" @submit="onTdSubmit">
        <van-field
          v-model="reviewForm[0]"
          placeholder="请输入同店商品1"
          label="同店商品1"
          input-align="right"
          :rules="[{ required: true, message: '请输入同店商品1链接' }]"
        />
        <van-field
          v-model="reviewForm[1]"
          placeholder="请输入同店商品2"
          label="同店商品2"
          input-align="right"
          :rules="[{ required: true, message: '请输入同店商品2链接' }]"
        />
        <div style="margin: 20px">
          <van-button
            block
            type="primary"
            native-type="submit"
            :loading="loading"
            loading-text="提交中..."
          >
            提交同店商品浏览
          </van-button>
        </div>
      </van-form>
    </div>


    <h3>操作要求</h3>
    <!-- <div class="tips">
      *浏览商品数量：{{
        detail.browseNum === 0 ? '不要求' : detail.browseNum + '个'
      }}
    </div> -->
    <div class="tips">
      *货比数量：{{
        detail.goodsCompareNum === 0
          ? '不要求'
          : '货比' + detail.goodsCompareNum + '家'
      }}
    </div>
    <div class="tips">
      *是否搭配商品：{{ detail.matchingGoods === 1 ? '是' : '否' }}
    </div>
    <div
      class="tips"
      v-for="item in detail.publishTaskOptionList"
      :key="item.id"
    >
      {{ item.optionName + '：' + item.optionValue }}
    </div>
    <van-button
      type="primary"
      @click="
        router.push({
          path: '/home/finish/task',
          query: { id: id, screenFlag: detail.screenFlag }
        })
      "
      block
      style="width: 85%; margin: 20px auto"
    >
      操作完成
    </van-button>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useClipboard from 'vue-clipboard3'
import moment from 'moment'
import {
  orderDetailApi,
  shopCheckApi,
  compareAddApi,
  reviewAddApi
} from '@/api/home'
import { Toast } from 'vant'

const router = useRouter()
const detail = ref({})
const loading = ref(false)
const shopName = ref(undefined)
const id = useRoute()?.query?.id
const compareForm = ref({})
const reviewForm = ref({})
const { toClipboard } = useClipboard()

onBeforeMount(async () => {
  const { data } = await orderDetailApi({ id })
  if (data) {
    detail.value = data
  }
})
const onShopSubmit = async () => {
  const { code, msg } = await shopCheckApi({
    shopName: shopName.value,
    id: id
  })
  !code ? Toast.success(msg) : ''
}
const onHbSubmit = async () => {
  const { code, msg } = await compareAddApi({
    urlList: Object.values(compareForm.value).join(','),
    id: +id
  })
  !code ? Toast.success(msg) : ''
}
const onTdSubmit = async () => {
  const { code, msg } = await reviewAddApi({
    urlList: Object.values(reviewForm.value).join(','),
    id: +id
  })
  !code ? Toast.success(msg) : ''
}
const copy = async val => {
  try {
    await toClipboard(val)
    Toast.success('复制成功')
  } catch (e) {
    console.error(e)
    oast.success('复制失败')
  }
}
</script>

<style lang="less" scoped>
.content {
  background: #fff;
  padding: 90px 0px 0;
  font-size: 25px;
  .downtme {
    background: linear-gradient(270deg, #0acffe 0%, #495aff 100%);
    // box-shadow: 0px 5px 10px rgb(0 0 0 0.5);
    padding: 20px;
    font-size: 30px;
    text-align: center;
    color: #fff;
    /deep/ .van-count-down {
      color: #fff;
    }
    p > {
      padding-top: 15px;
    }
  }
  & > h3 {
    line-height: 80px;
    font-size: 30px;
    font-weight: bold;
    padding: 0 30px;
    background: #f7f7f7;
  }
  .tips {
    font-size: 25px;
    padding: 20px 30px;
    color: red;
    line-height: 1.5;
  }
  .setp {
    font-size: 26px;
    font-weight: bold;
    padding: 0px 0 0px 30px;
    margin: 30px 30px 20px;
    position: relative;
    line-height: 60px;
    &::before {
      content: '';
      width: 13px;
      height: 50px;
      background: #3688ff;
      border-radius: 10px;
      position: absolute;
      top: 5px;
      left: 0px;
    }
  }
  .bot33 {
    font-size: 25px;
    padding: 0 20px 20px 50px;
    line-height: 1.5;
  }
  .goods {
    display: flex;
    padding: 30px 30px 25px;
    .blur {
      -webkit-filter: blur(2px); /* Chrome, Opera */
      -moz-filter: blur(2px);
      -ms-filter: blur(2px);
      filter: blur(2px);
    }
    &-name {
      flex: 1;
      padding: 0px 0 0px 30px;
      font-size: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .last {
        color: #ff0036;
        font-size: 28px;
      }
    }
  }
}
</style>
