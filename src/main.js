import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import './style/element-variables.scss'
import 'swiper/swiper.min.css';
import './style/navigation.min.css';
import './style/style.scss'
import Router from './plugins/router'
import * as echarts from 'echarts'
import axios from './plugins/axios'

const app = createApp(App);
installElementPlus(app);
app.use(Router);
app.mount('#app');
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$axios=axios;

let timer = '';
let speed = 0;
app.directive('scroll', {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
        speed = 0;
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(() => {
            speed += 0.2;
            el.scrollTop = speed;
            if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
                speed = 0
            }
        }, 10)
    },
    beforeUnmount() {
        clearInterval(timer)
    }
});
