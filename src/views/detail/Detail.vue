<template>
  <div id="detail" ref="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="conten" :pull-up-load="true" ref="scroll" :probe-type="3" @scroll="contentScroll">
  
           <detail-swiper :top-images="topImages"></detail-swiper>
           <detail-base-info :goods="goods"></detail-base-info>
           <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"
            @imageLoad="imageLoad"></detail-goods-info>
             <!-- <detail-goods-info :detail-info="detailInfo"
            ></detail-goods-info> -->
            <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
           <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
           <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from "components/content/backtop/BackTop.vue"

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import GoodsList from 'components/content/goods/GoodsList'
import {debounce} from 'common/utils.js'
export default {
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      BackTop
    },
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeToY:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
          //1.获取顶部图片的数据
          //中转
          const data = res.result
        console.log(res);
          this.topImages = data.itemInfo.topImages
          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.获取店铺信息
          this.shop = new Shop(data.shopInfo)
          //4.保存商品的详情数据
          this.detailInfo = data.detailInfo
          //5.获参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //6.取出评论信息
          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
          //第一次获取，值不对的原因
          //this.$refs.param  压根没有渲染       
          //  this.themeToY.push(0)
          //       this.themeToY.push(this.$refs.param.$el.offsetTop)
          //       this.themeToY.push(this.$refs.comment.$el.offsetTop)
          //       this.themeToY.push(this.$refs.recommend.$el.offsetTop)
          //       console.log(this.themeToY);
          //nextTick:以上DOM渲染完成，执行调用这个函数
          // this.$nextTick(()=>{
            //第二次获取，值不对的原因，dom加载完成，但是图片信息没有加载完成
                // this.themeToY.push(0)
                // this.themeToY.push(this.$refs.param.$el.offsetTop)
                // this.themeToY.push(this.$refs.comment.$el.offsetTop)
                // this.themeToY.push(this.$refs.recommend.$el.offsetTop)
                // console.log(this.themeToY);
          // })
         
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //运用防抖函数来获取getThemeTopY的值
       this.getThemeTopY = debounce(()=>{
                this.themeToY = []
                this.themeToY.push(0)
                this.themeToY.push(this.$refs.param.$el.offsetTop-44)
                this.themeToY.push(this.$refs.comment.$el.offsetTop-44)
                this.themeToY.push(this.$refs.recommend.$el.offsetTop-44) 
          },500)
         
        
    },
    mounted(){
setTimeout(() => {this.getThemeTopY()},1000)
setTimeout(() => {this.getThemeTopY()},2000)
setTimeout(() => {this.getThemeTopY()},5000)
    },
    methods:{
      imageLoad() {
        this.$refs.scroll.scroll.refresh()
        this.getThemeTopY()
       
      },
      titleClick(index) {
        this.$refs.scroll.scroll.scrollTo(0,-this.themeToY[index],300)
      },
      contentScroll(position){
        const positionY = -position.y

        let length = this.themeToY.length
        for(let i = 0;i < length; i++){
          if(this.currentIndex !== i && ((i < length - 1 && positionY > this.themeToY[i] && positionY < this.themeToY[i+1] ) || 
           (i === length - 1 && positionY > this.themeToY[i]))){
             this.currentIndex = i
             this.$refs.nav.currentIndex = this.currentIndex
             }
        }
        this.isShowBackTop = (-position.y)> 1000
      },
       backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      addToCart(){
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(product);

        this.$store.commit('addCart',product)

      }
    },

}
</script>

<style>
#detail{
  position: relative;
  z-index: 999;
  height: 100vh;
  background-color: #fff;
}

.conten{
  height:calc(100% - 44px - 49px);
  overflow: hidden;

}
.detail-nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>