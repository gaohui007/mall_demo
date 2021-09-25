import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import { resolve, reject } from 'core-js/fn/promise'
//--------------------------------------vuex 很重要（难点）------------
//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCart(state,payload){
      return new Promise((resolve,reject) => {
                // let oldProduct = null;
            // for(let item of state.cartList){
            //     if(item.iid === payload.idd){
            //         oldProduct = item;
            //     }
            // }
            payload.checked=true
            let oldProduct = state.cartList.find(item => item.iid === payload.iid)
            //判断oldProduct
            if(oldProduct) {
                oldProduct.count += 1
                resolve('111111')
            }else {
                payload.count=1
                state.cartList.push(payload)
                resolve('2222222')
            }
           
      })
        }
    },
    getters
})
//3.挂载到VUE实例上

export default store