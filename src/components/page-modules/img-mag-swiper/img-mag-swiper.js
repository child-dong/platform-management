import {reactive} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Autoplay } from 'swiper'
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
                detailUrl: '',
                status: '1'
            };
            this.$axios({
                url: '/backstage/api/rotation/addRotation',
                method: 'post',
                data: [params]
            }).then(response => {
                console.log(response);
                this.getImgLists();
            },(error) => {
                console.log(error);
            });
        },
        clearAll() {
            if (!this.imgList.length) {
                return
            }
            const params = {
                ids: [],
                fileUrls: [],
                detailUrls: []
            };
            this.imgList.forEach(item => {
                params.ids.push(item.id);
                params.fileUrls.push(item.url);
                if (item.detailUrl) {
                    params.detailUrls.push(item.detailUrl);
                }
            });

            this.$axios({
                url: '/backstage/api/rotation/deleteRotation',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                this.getImgLists();
            },(error) => {
                console.log(error);
            });
        },
        clearOne(data) {
            const params = {
                ids: [data.id],
                fileUrls: [data.url],
                detailUrls: [data.detailUrl || '']
            };
            this.$axios({
                url: '/backstage/api/rotation/deleteRotation',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                this.getImgLists();
            },(error) => {
                console.log(error);
            });
        },
        addDetailUrl(data) {
            data.inputState = true
        },
        complateUrl(data) {
            data.inputState = false;
            const params = {
                id: data.id,
                name: data.name || '',
                url: data.url,
                sort: data.sort,
                detailUrl: data.detailUrl,
                status: data.status
            };
            this.$axios({
                url: '/backstage/api/rotation/updateRotation',
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
