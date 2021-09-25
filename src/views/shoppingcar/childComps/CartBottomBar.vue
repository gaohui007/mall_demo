<template>
<div class="cart-bottom-bar">
    <div class="check-content">
        <check-button class="check-button" :is-checked="isSelectAll" @click.native="selectAll"/>
        <div>全选</div>
    </div>
    合计:{{totalPrice}}
     <div class="calculate">去计算({{checkLength}})</div>
    </div>  
   
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
    name:"CartBottomBar",
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice() {
            return "￥" + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
           
        },
        checkLength(){
                return this.cartList.filter(item => item.checked).length
            },
       isSelectAll(){
           if(this.cartList.length === 0) return false
           return !(this.cartList.filter(item => !item.checked).length)
        // console.log(!this.cartList.find(item => !item.checked).length);

        //普通方法
        // for(let item of this.cartList){
        //     if(!item.checked){
        //         return false
        //     }
        // }
        // return true
       }


    },
    methods:{
        selectAll(){
            if(this.isSelectAll){
                this.cartList.forEach(item => item.checked = false)
            }else{
                 this.cartList.forEach(item => item.checked = true)
            }
        }
    }

}
</script>

<style scoped>
.cart-bottom-bar{
    display: flex;
    height: 40px;
    width: 100%;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    line-height: 40px;
}
.check-content{
display: flex;
align-items: center;
padding-left: 5px;
margin-right: 45px;
}
.check-button{
    height:20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.calculate{
    width: 90px;
    background-color:var(--color-tint);;
    margin-left: auto;
    text-align:center;
    color: #fff;
}
</style>>

