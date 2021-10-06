import Ossupload from '../../shared/oss-upload/oss-upload.vue'
import {ElMessage} from "element-plus";
export default {
    components: {
        Ossupload
    },
    data() {
        return {
            menus: [],
            activeMenu: '',
            pageNum: 1,
            pageSize: 15,
            total: 0,
            tableData: [],
            inputState: false,
            menuName: ''
        }
    },
    methods: {
        // 模具菜单
        getMenus() {
            const params = {
                type: '1'
            };
            this.$axios({
                url: `/backstage/api/abrasives/queryAbr`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.menus = response.data;
                this.changeMenu(this.menus[0].name)
            },(error) => {
                console.log(error);
            });
        },

        changeMenu(name) {
            this.activeMenu = name;
            this.getTableData();
        },

        // 列表
        getTableData() {
            const params = {
                tableName: 'abrasives',
                type: this.activeMenu
            };
            this.$axios({
                url: `/backstage/api/abrasives/list/${this.pageNum}/${this.pageSize}`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.tableData = response.data.records;
                this.total = response.data.total;
            },(error) => {
                console.log(error);
            });
        },
        onUpdate(e) {
            this.pageNum = e;
            this.getTableData();
        },
        addMenu() {
            this.inputState = true
        },
        complateName() {
            this.inputState = false;
            if (!this.menuName) {
                return;
            }
            const params = {
                name: this.menuName,
                type: '1'
            };
            this.$axios({
                url: '/backstage/api/abrasives/addAbr',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                this.menuName = '';
                ElMessage.success('添加成功');
                this.getMenus();
            },(error) => {
                console.log(error);
            });
        },
        editFile(data) {
            data.fileInputState = true
        },
        complateFile(data, type) {
            data.fileInputState = false;
            if (type === 0) {
                data.editName = '';
                return
            }
            const params = {
                name: data.editName || '',
                id: data.id,
                tableName: 'abrasives'
            };
            this.$axios({
                url: '/backstage/api/abrasives/update',
                method: 'put',
                data: params
            }).then(response => {
                console.log(response);
                ElMessage.success('更新成功');
                this.getTableData();
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
                tableName: 'abrasives',
                type: this.activeMenu
            };
            this.$axios({
                url: '/backstage/api/abrasives/add',
                method: 'post',
                data: [params]
            }).then(response => {
                console.log(response);
                this.getTableData();
            },(error) => {
                console.log(error);
            });
        },
        // 删除
        delSingle(data) {
            const params = {
                ids: [data.id],
                fileUrls: [data.url],
                detailUrls: [data.detailUrl],
                tableName: 'abrasives'
            };
            if (!data.detailUrl) {
                delete params.detailUrls
            }
            this.$axios({
                url: '/backstage/api/abrasives/delete',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                this.getTableData();
            },(error) => {
                console.log(error);
            });
        }
    },

    mounted() {
        this.getMenus()
    }
}
