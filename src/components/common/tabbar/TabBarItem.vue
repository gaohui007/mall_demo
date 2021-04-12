<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active:!isActive}"><slot name="item-text"></slot></div>
  </div>
   
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
      path:String
    },
      data() {
    return {
  
    }
  },
    methods:{
      itemClick() {
        
        this.$router.push(this.path)
      }
    },
    computed:{
      isActive() {
        return this.$route.path.indexOf(this.path) == -1
      }
    }
}

</script>
<style scoped>
.tab-bar-item {
     flex: 1;
     text-align: center;
     height: 49px;
     font-size: 14px;
   }
#tab-bar img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-bottom: 2px;
}
.active{
  color: rgba(143, 4, 62, 0.671);
}
</style>