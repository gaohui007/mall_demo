<template>
  <div id="detail" ref="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="conten" :pull-up-load="true" ref="scroll">

           <detail-swiper :top-images="topImages"></detail-swiper>
           <detail-base-info :goods="goods"></detail-base-info>
           <detail-shop-info :shop="shop"></detail-shop-info>
            <!-- <detail-goods-info :detail-info="detailInfo"
            @imageLoad="imageLoad"></detail-goods-info> -->
             <detail-goods-info :detail-info="detailInfo"
            ></detail-goods-info>
            <detail-param-info :param-info=" paramInfo"></detail-param-info>
           
    </scroll>
 
  </div>
  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
export default {
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
    },
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{}
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

      })
    },
    methods:{
      imageLoad() {
        this.$refs.scroll.scroll.refresh()
        
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
  height:calc(100% - 44px);
  overflow: hidden;

}
.detail-nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>