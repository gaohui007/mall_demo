import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const Shoppingcar = () => import('../views/shoppingcar/Shoppingcar')
const Sort = () => import('../views/sort/Sort')
const Detail = () => import('../views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect:"/home"
      
      },
      {
        path:'/profile',
        component:Profile
      },
      {
        path:'/sort',
        component:Sort
      }, {
        path:'/shoppingcar',
        component:Shoppingcar
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/detail/:iid',
        component:Detail
      },
]

//2。创建router
const router = new VueRouter({
    routes,
    mode: 'history'
})

//3.导出路由
export default router