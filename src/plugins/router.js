import * as vueRouter from 'vue-router';
import Login from './../components/login/login.vue'
import Layout from '../components/layout/layout.vue'
import Homepage from '../components/page-modules/homepage/homepage.vue'
import ImgMagSwiper from '../components/page-modules/img-mag-swiper/img-mag-swiper.vue'
import ImgMagLibrary from '../components/page-modules/img-mag-library/img-mag-library.vue'
import UserMag from '../components/page-modules/user-mag/user-mag.vue'
import PostMag from '../components/page-modules/post-mag/post-mag.vue'
import CncSystem from '../components/page-modules/cnc-system/cnc-system.vue'
import DictionaryData from '../components/page-modules/dictionary-data/dictionary-data.vue'
import StoreMag from '../components/page-modules/store-mag/store-mag.vue'
import MaintenanceService from '../components/page-modules/maintenance-service/maintenance-service.vue'

const routes = [
    {
        path: '/',
        component: Login,
        meta:{
            // 页面标题title
            title: '钣金联盟'
        }
    },
    {
        path: '/Layout',
        component: Layout,
        meta:{
            // 页面标题title
            title: '钣金联盟'
        },
        children: [
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'homepage',
                component: Homepage,
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'img-mag-swiper',
                component: ImgMagSwiper
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'img-mag-library',
                component: ImgMagLibrary,
                meta:{
                    // 页面标题title
                    title: '钣金联盟'
                }
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'user-mag',
                component: UserMag
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'post-mag',
                component: PostMag
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'cnc-system',
                component: CncSystem
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'dictionary-data',
                component: DictionaryData
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'store-mag',
                component: StoreMag
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'maintenance-service',
                component: MaintenanceService
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
