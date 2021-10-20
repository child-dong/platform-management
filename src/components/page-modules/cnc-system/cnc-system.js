import Ossupload from '../../shared/oss-upload/oss-upload.vue'
import {ElMessage} from "element-plus";
export default {
    components: {
        Ossupload
    },
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            multipleSelection: [],
            select: false,
            dialogFormVisible: false,
            form: {
                name: '',
                url: '',
                detailUrl: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ],
                url: [
                    {
                        required: true,
                        message: '',
                        trigger: 'change',
                    }
                ],
                detailUrl: [
                    {
                        required: true,
                        message: '',
                        trigger: 'change',
                    }
                ]
            },
            fileList: [],
            detailFileList: [],
            id: ''
        }
    },
    methods: {
        // 列表
        getTableData() {
            const params = {
                tableName: 'numerical',
                type: '1'
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
        childByValue1(e) {
            console.log(e);
            this.form.url = e.url;
        },
        childByValue2(e) {
            console.log(e);
            this.form.detailUrl = e.url;
        },
        showMod(data) {
            this.dialogFormVisible = true;
            if (!data) {
                this.id = '';
                this.form = {
                    name: '',
                    url: '',
                    detailUrl: ''
                };
                this.fileList = [];
                this.detailFileList = [];
            } else {
                this.id = data.id;
                this.form = {
                    name: data.name,
                    url: data.url,
                    detailUrl: data.detailUrl
                };
                this.fileList = [{name: '', url: data.url}];
                this.detailFileList = [{name: '', url: data.detailUrl}];
            }
        },
        submitForm(data) {
            console.log(data);
            const params = {
                name: data.name,
                url: data.url,
                detailUrl: data.detailUrl,
                tableName: 'numerical',
                type: 1
            };
            if (!this.id) {
                this.$axios({
                    url: '/backstage/api/abrasives/add',
                    method: 'post',
                    data: [params]
                }).then(response => {
                    console.log(response);
                    this.getTableData();
                    ElMessage.success('添加成功');
                    this.dialogFormVisible = false;
                },(error) => {
                    console.log(error);
                });
            } else {
                params.id = this.id;
                this.$axios({
                    url: '/backstage/api/abrasives/update',
                    method: 'put',
                    data: params
                }).then(response => {
                    console.log(response);
                    this.getTableData();
                    ElMessage.success('更新成功');
                    this.dialogFormVisible = false;
                },(error) => {
                    console.log(error);
                });
            }
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
            let params = {
                ids: [],
                fileUrls: [],
                detailUrls: [],
                tableName: 'numerical'
            };
            this.multipleSelection.forEach(item => {
                params.ids.push(item.id);
                params.fileUrls.push(item.url);
                if (item.detailUrl) {
                    params.detailUrls.push(item.detailUrl);
                }
            });
            if (!params.detailUrls.length) {
                delete params.detailUrls.length
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
        this.getTableData();
    }
}
