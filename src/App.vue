<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view #="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </van-config-provider>
</template>

<script>
export default {
  name: 'App',
  setup() {
    const themeVars = {
      tabTextColor: '#666666',
      tabsBottomBarHeight: '3px',
      tabActiveTextColor: '#DE424E',
      tabsBottomBarColor: '#DE424E',
      dividerBorderColor: '#EBEBEB',
      buttonBorderRadius: '5px',
      borderRadiusMax: '10px',
      ActionBarHeight: '66px',
      ActionBarButtonHeight: '48px',
      NavBarIconColor: '#666666'
    }

    return {
      themeVars
    }
  }
}
// #1567FA
</script>

<style lang="less">
@import './styles/reset.css';
</style>
