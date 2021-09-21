import * as vueRouter from 'vue-router';
import Login from './../components/login/login.vue'
import Layout from '../components/layout/layout.vue'
import Homepage from '../components/page-modules/homepage/homepage.vue'
import ImgMagSwiper from '../components/page-modules/img-mag-swiper/img-mag-swiper.vue'

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/Layout',
        component: Layout,
        children: [
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'homepage',
                component: Homepage
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'img-mag-swiper',
                component: ImgMagSwiper
            }
        ]
    }
];

const router = vueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: vueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
});

export default router