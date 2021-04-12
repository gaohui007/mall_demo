<template>
 <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home_1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_2.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/sort">
        <img slot="item-icon" src="~assets/img/tabbar/sort_1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/sort_2.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shoppingcar">
        <img slot="item-icon" src="~assets/img/tabbar/shoppingcar_1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shoppingcar_2.svg" alt="">
        <div  slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile_1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_2.svg" alt="">
        <div slot="item-text">主页</div>
      </tab-bar-item>
    </tab-bar>
</template>


<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
    name:"MainTabBar",
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>