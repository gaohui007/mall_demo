<template>
<div class="cart-list">
    <scroll class="conten" ref="scroll">
        <!-- <cart-list-item v-for="(item,index) in cartList" :product="item"></cart-list-item> -->
        <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll.vue"
import CartListItem from './cartListItem'

export default {
    name:"CartList",
    computed:{
        ...mapGetters(['cartList'])
    },
    components:{
        Scroll,
        CartListItem,

    },
    activated(){
        this.$refs.scroll.scroll.refresh()
    }
}
</script>

<style scoped>
.conten{
    height: calc(100% - 44px - 49px - 40px);
}
.cart-list{
    height: 100%;
}
</style>