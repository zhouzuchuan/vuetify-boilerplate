import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/containers/views/Home.vue' // 引入 Home页面组件

// 注册路由插件
Vue.use(VueRouter)

//
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/containers/views/About.vue'),
    },
]

const router = new VueRouter({
    routes,
})

export default router
