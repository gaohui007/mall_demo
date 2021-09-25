<template>
  <div class="wrapper">

  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Sort",
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position) => {
        console.log(position);
      })
      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多');
      })
    },
    methods:{
      btnClick(){
        console.log("按钮已经点击");
      }
    }
}

</script>
<style scoped>
.wrapper{
  height: 150px;
  background-color: red;
 overflow: hidden;
}
</style>