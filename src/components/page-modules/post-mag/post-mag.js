import {reactive} from 'vue';
import {ElMessage} from 'element-plus';
import {formatDate} from '../../../plugins/date';
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
    data() {
        return {
            type: 'tb_career_post',
            time: '',
            content: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData: [
            ],
            multipleSelection: [],
            datailData: {},
            dialogVisible: false,
            select: false,
            areaData: [],
            area: '',
            areaArr: [],
            areaSearchType: ''
        }
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
    methods: {
        // 地区
        getArea() {
            this.$axios({
                url: `/fansen-resource/api/public/getAreaChildren?type=${this.areaSearchType}`,
                method: 'get',
            }).then(response => {
                console.log(response);
                this.areaData = response.data;
            },(error) => {
                console.log(error);
            });
        },
        // 获取列表数据
        getTableData() {
            const params = {
                tableName: this.type,
                searchName: this.content || '',
                startTime: this.time && this.time['0'] ? formatDate(this.time['0'], "YYYY-MM-DD") : '',
                endTime: this.time && this.time['1'] ? formatDate(this.time['1'], "YYYY-MM-DD") : '',
                areaCode: this.area
            };
            this.$axios({
                url: `/backstage/api/posts/list/${this.pageNum}/${this.pageSize}`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.tableData = response.data.records;
                this.total = response.data.total;
                this.tableData.forEach(item => {
                    item.homeImage = item.homeImage ? item.homeImage.split(',')[0] : '';
                })
            },(error) => {
                console.log(error);
            });
        },
        onUpdate(e) {
            this.pageNum = e;
            this.getTableData();
        },
        search() {
            this.pageNum = 1;
            this.getTableData();
        },
        searchArea() {
            this.area = this.areaArr ? this.areaArr[this.areaArr.length - 1] : '';
            this.search()
        },
        searchType() {
            this.area = '';
            this.areaArr = '';
            this.search();
            switch(this.type) {
                case 'tb_career_post':
                    this.areaSearchType = '';
                    break;
                case 'tb_wares_sell':
                    this.areaSearchType = 'waresSell';
                    this.getArea();
                    break;
                case 'tb_wares_wany_buy':
                    this.areaSearchType = 'waresWanyBuy';
                    this.getArea();
                    break;
                case 'tb_wares_repair':
                    this.areaSearchType = 'waresRepair';
                    this.getArea();
                    break;
                case 'tb_talent_recruitment':
                    this.areaSearchType = 'talentRecruitment';
                    this.getArea();
                    break;
                default:
                    this.areaSearchType = '';
                    break;
            }
        },
        // 弹窗按钮
        confirmEvent(data, status) {
            const params = {
                id: data.id,
                status: status,
                tableName: this.type,
                type: 1
            };
            this.$axios({
                url: `/backstage/api/posts/update`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                ElMessage.success('更新成功');
                this.getTableData();
                this.dialogVisible = false;
            },(error) => {
                console.log(error);
            });
        },
        // 排序
        tableSort(data) {
            const params = {
                id: data.id,
                status: data.sort,
                tableName: this.type,
                type: 2
            };
            this.$axios({
                url: `/backstage/api/posts/update`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                ElMessage.success('更新成功');
                this.getTableData()
            },(error) => {
                console.log(error);
            });
        },
        // 详情
        dialogShow(index, datas) {
            this.datailData = datas[index];
            this.dialogVisible = true;
            const params = {
                id: datas[index].id,
                tableName: this.type + '_file'
            };
            this.$axios({
                url: `/backstage/api/posts/detail`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.datailData.waresSellFileList = response.data.waresSellFileList;
                this.datailData.waresSellFileListDetails = response.data.waresSellFileListDetails;
            },(error) => {
                console.log(error);
            });
        },
        // 筛选框显隐藏
        showSelect() {
            if (!this.multipleSelection.length) {
                this.select = !this.select;
            }
        },
        // 选中
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        // 删帖多选
        delMulti() {
            if (!this.multipleSelection.length) return;
            let id = '';
            this.multipleSelection.forEach(item => {
                id += '&id=' + item.id;
            });
            this.$axios({
                url: `/backstage/api/posts/delete?tableName=${this.type}${id}`,
                method: 'get'
            }).then(response => {
                console.log(response);
                ElMessage.success('删除成功');
                this.getTableData();
            },(error) => {
                console.log(error);
            });
        },
        // 单个删除
        delSingle(data) {
            this.$axios({
                url: `/backstage/api/posts/delete?tableName=${this.type}&id=${data.id}`,
                method: 'get'
            }).then(response => {
                console.log(response);
                ElMessage.success('删除成功');
                this.getTableData();
                this.dialogVisible = false;
            },(error) => {
                console.log(error);
            });
        }
    },

    mounted() {
        this.getTableData();
    }
}
