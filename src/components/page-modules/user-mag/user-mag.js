export default {
    components: {
    },
    data() {
        return {
            type: '',
            time: '',
            content: '',
            pageNum: 1,
            pageSize: 10,
            total: 100,
            tableData: [
            ]
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1)
        },
        // 获取列表数据
        getTableData() {
            this.$axios({
                url: `/backstage/api/user/list/${this.pageNum}/${this.pageSize}`,
                method: 'get',
            }).then(response => {
                console.log(response);
                this.tableData = response.data.records;
            },(error) => {
                console.log(error);
            });
        },
        onUpdate(e) {
            console.log(e)
        }
    },

    mounted() {
        this.getTableData();
    }
}
