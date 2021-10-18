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
            tableData: [],
            inputState: false,
            menuName: '',
            name: ''
        }
    },
    methods: {
        // 字典菜单
        getMenus() {
            this.$axios({
                url: `/backstage/api/dic/listCollection`,
                method: 'get'
            }).then(response => {
                console.log(response);
                this.menus = response.data;
                this.changeMenu(this.menus[0].id)
            },(error) => {
                console.log(error);
            });
        },

        changeMenu(id) {
            this.activeMenu = id;
            this.getTableData();
        },

        // 列表
        getTableData() {
            const params = {
                cid: this.activeMenu
            };
            this.$axios({
                url: `/backstage/api/dic/listDataSet`,
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.tableData = response.data;
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
                status: '1'
            };
            this.$axios({
                url: '/backstage/api/dic/addCollection',
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
                name: data.editName || data.name,
                id: data.id,
                cid: data.cid,
                status: data.status
            };
            this.$axios({
                url: '/backstage/api/dic/updateDataSet',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                ElMessage.success('更新成功');
                this.getTableData();
            },(error) => {
                console.log(error);
            });
        },
        // 添加数据
        addData() {
            const params = {
                name: this.name,
                status: '1',
                cid: this.activeMenu
            };
            this.$axios({
                url: '/backstage/api/dic/addDataSet',
                method: 'post',
                data: params
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
                id: data.id,
            };
            this.$axios({
                url: '/backstage/api/dic/deleteDataSet',
                method: 'delete',
                params
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
