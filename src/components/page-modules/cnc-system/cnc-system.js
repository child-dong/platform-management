import Ossupload from '../../shared/oss-upload/oss-upload.vue'
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
                        message: '请输入系统名称',
                        trigger: 'blur',
                    }
                ],
                url: [
                    {
                        required: true,
                        message: '请上传系统主图',
                        trigger: 'change',
                    }
                ],
                detailUrl: [
                    {
                        required: true,
                        message: '请上传系统详情图',
                        trigger: 'change',
                    }
                ]
            }
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1)
        },
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
        submitForm(data) {
            console.log(data)
        }
    },

    mounted() {
        this.getTableData();
    }
}
