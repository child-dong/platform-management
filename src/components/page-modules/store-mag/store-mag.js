import {formatDate} from "../../../plugins/date";
import {ElMessage} from "element-plus";

export default {
    components: {
    },
    data() {
        return {
            type: '1',
            area: '',
            time: '',
            content: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData: [
            ],
            areaData: [

            ],
            multipleSelection: [],
            select: false,
            areaArr: []
        }
    },
    methods: {
        // 地区
        getArea() {
            this.$axios({
                url: `/fansen-resource/api/public/getAreaChildren?type=userInfo`,
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
                type: this.type,
                searchName: this.content || '',
                startTime: this.time && this.time['0'] ? formatDate(this.time['0'], "YYYY-MM-DD") : '',
                endTime: this.time && this.time['1'] ? formatDate(this.time['1'], "YYYY-MM-DD") : '',
                areaCode: this.area
            };
            this.$axios({
                url: `/backstage/api/shop/list/${this.pageNum}/${this.pageSize}`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.tableData = response.data.records;
                this.total = response.data.total
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
        // 锁定
        disableRow(index, datas) {
            console.log(datas[index]);
            const params = {
              uid: datas[index].uid
            };
            this.$axios({
                url: `/backstage/api/user/userBan`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                ElMessage.success('锁定成功');
                this.getTableData();
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
        // 删帖
        delSingle(index, datas) {
            const params = {
                uid: datas[index].uid
            };
            this.$axios({
                url: `/backstage/api/user/delete`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                ElMessage.success('删除成功');
                this.getTableData();
            },(error) => {
                console.log(error);
            });
        },
        // 排序
        cSort(data) {
            if (!data.sort) {
                return
            }
            const params = {
                uid: data.uid,
                shopSort: data.sort
            };
            this.$axios({
                url: `/fansen-resource/api/user/updateUserInfo`,
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                ElMessage.success('更新成功');
                this.getTableData();
            },(error) => {
                console.log(error);
            });
        }
    },

    mounted() {
        this.getTableData();
        this.getArea();
    }
}
