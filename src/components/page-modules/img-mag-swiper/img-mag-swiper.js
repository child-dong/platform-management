import {reactive} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Autoplay } from 'swiper'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import Ossupload from '../../shared/oss-upload/oss-upload.vue'
SwiperCore.use([Autoplay, Navigation]);
export default {
    components: {
        Swiper,
        SwiperSlide,
        Ossupload
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
            imgList: []
        }
    },
    methods: {
        getImgLists() {
            this.$axios({
                url: '/backstage/api/rotation/rotationList',
                method: 'get',
            }).then(response => {
                console.log(response);
                this.imgList = response.data;
            },(error) => {
                console.log(error);
            });
        },
        // 子组件图片URL保存后台
        childByValue(e) {
            const params = {
                name: e.name,
                url: e.url,
                sort: 1,
                detail_url: '',
                status: '1'
            };
            this.$axios({
                url: '/backstage/api/rotation/addRotation',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                this.getImgLists();
            },(error) => {
                console.log(error);
            });
        }
    },

    mounted() {
        this.getImgLists()
    }
}