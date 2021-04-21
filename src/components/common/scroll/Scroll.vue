<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
           <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            defalut:0
        },
        pullUpLoad:{
            type:Boolean,
            defalut:false
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        //创建SCROLL对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            observeDOM:true,
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        //监听滚动位置
        this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
        })
        //上拉加载更多
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })
    },
    methods:{
        refresh() {
           this.scroll && this.scroll.refresh()
           console.log("--------");
        }
    }
}
</script>

<style>

</style>