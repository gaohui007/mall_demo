<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       <tab-control 
    :titles="['流行','新款','精选']"
    @tabClick="tabClick"
    ref="tabControl1"
    class="tabControl"  v-show=" isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
    :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control 
    :titles="['流行','新款','精选']"
    @tabClick="tabClick"
    ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import TabControl from "components/content/tabControl/TabControl.vue"

import {getHomeMultidata,getHomeGoods} from "network/home.js"


import HomeSwiper from "./childComps/HomeSwiper.vue"
import RecommendView from "./childComps/RecommendView.vue"
import FeatureView from "./childComps/FeatureView"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll.vue"
import BackTop from "components/content/backtop/BackTop.vue"
import {debounce} from "common/utils.js"



export default {
    name:"Home",
    components:{
      NavBar,
      TabControl,

      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          "pop": {page:0,list:[]},
          "new": {page:0,list:[]},
          "sell": {page:0,list:[]},
        },
        currentType:"pop",
        isShowBackTop:false,
        taboffsetTab:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
     
    },
    //进来组件时触发
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    },
    //离开组件时触发
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y
 
    },
    methods:{
      /**
       * 事件监听相关方法
       */
     
      tabClick(index){
        switch(index){
          case 0:
            this.currentType="pop"
            break;
          case 1:
            this.currentType="new"
            break;
          case 2:
            this.currentType="sell"
        }
        this.$refs.tabControl2.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;

      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y)> 1000
        //2.判断tabCtrol是否吸顶(position:fixed)
        this.isTabFixed = (-position.y)>this.taboffsetTab-44
        
      },
      loadMore(){
       this.getHomeGoods(this.currentType)
       this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        this.taboffsetTab = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关方法
       */
       getHomeMultidata(){
          getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
       },
       getHomeGoods(type){
         const page = this.goods[type].page + 1
           getHomeGoods(type,page).then(res => {
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1
    })
       }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    mounted() { 
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })
    }
    
}
</script>
<style scoped>
#home{
  height: 100vh;

}
.home-nav{
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100; */
  background-color: var(--color-tint);
  color: #fff;
}
.content{
  height:calc(100% - 93px);
  overflow: hidden;
  /* margin-top: -40px; */
}
.tabControl{
position: fixed;
width: 100%;
  z-index: 19;
}


</style>
 