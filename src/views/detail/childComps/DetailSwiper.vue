<template>
<div class="datail-swiper">
    <swiper class="swiperClass">
        <swiper-item v-for="(item,id) in topImages" :key="id">
         <img :src="item" alt="">
        </swiper-item>
    </swiper>
</div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:"DetailSwiper",
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.swiperClass{
    height: 300px;
    overflow: hidden;
}
</style>