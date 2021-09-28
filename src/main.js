import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import './style/element-variables.scss'
import 'swiper/swiper.min.css';
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
