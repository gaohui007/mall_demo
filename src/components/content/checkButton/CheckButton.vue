<template>
<div class="check-button" :class="{check:!isChecked}">
    <img src="~assets/img/cart/tick.svg"  alt="">
</div>
</template>

<script>
export default {
    name:"CheckButton",
    props:{
        isChecked:{
            type:Boolean,
            default:false
        }
    },
 
}
</script>

<style scoped>
.check-button{
    background-color: rgb(236, 9, 9);
    border: 1px solid red;
    border-radius: 10%;
}
.check{
    border-color: #aaa;
    background-color: #fff;
}
</style>