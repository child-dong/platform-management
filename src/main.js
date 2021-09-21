import { createApp } from 'vue'
import App from './App.vue'
import './style/style.scss'
import Router from './plugins/router'
import installElementPlus from './plugins/element'
import * as echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
installElementPlus(app);
app.use(Router, VueAxios, axios);
app.mount('#app')
app.config.globalProperties.$echarts = echarts
