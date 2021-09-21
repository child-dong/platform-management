import {reactive} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Autoplay } from 'swiper'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
SwiperCore.use([Autoplay, Navigation]);
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let swiper_options = reactive({
            autoplay:{
                delay:3000,
                disableOnInteraction: false
            },
            loop:true,
            speed:1000
        });
        // 将swiper_options返回给模板中的swiper组件使用
        return {swiper_options};
    },
    data() {
        return {
        }
    },
    methods: {
    },

    mounted() {

    }
}