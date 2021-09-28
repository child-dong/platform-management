import {formatDate} from "../../../plugins/date";
import {ElMessage} from "element-plus";

export default {
    components: {
    },
    data() {
        return {
            type: '0',
            time: '',
            content: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData: [
            ],
            multipleSelection: [],
            select: false
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1)
        },
        // 获取列表数据
        getTableData() {
            const params = {
                type: this.type,
                searchName: this.content || '',
                startTime: this.time && this.time['0'] ? formatDate(this.time['0'], "YYYY-MM-DD") : '',
                endTime: this.time && this.time['1'] ? formatDate(this.time['1'], "YYYY-MM-DD") : '',
            };
            this.$axios({
                url: `/backstage/api/user/list/${this.pageNum}/${this.pageSize}`,
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
        showSelect(type) {
            this.select = type;
        },
        // 选中
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        // 删帖多选
        delMulti() {
            // if (!this.multipleSelection.length) return;
            // let id = '';
            // this.multipleSelection.forEach(item => {
            //     id += '&id=' + item.id;
            // });
            // this.$axios({
            //     url: `/backstage/api/posts/delete?tableName=${this.type}${id}`,
            //     method: 'get'
            // }).then(response => {
            //     console.log(response);
            //     this.select = false;
            // ElMessage.success('删除成功');
            //     this.getTableData();
            // },(error) => {
            //     console.log(error);
            // });
        },
    },

    mounted() {
        this.getTableData();
    }
}
