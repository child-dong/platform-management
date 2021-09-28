export default {
    components: {
    },
    data() {
        return {
            menus: [],
            activeMenu: -1,
            tableData: []
        }
    },
    methods: {
        // 模具菜单
        getMenus() {
            this.$axios({
                url: `/backstage/api/abrasives/queryAbr`,
                method: 'post'
            }).then(response => {
                console.log(response);
                this.menus = response.data;
                this.activeMenu = this.menus[0].id;
            },(error) => {
                console.log(error);
            });
        },

        // 列表
        getLists() {
            const params = {
                tableName: 'abrasives',
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
        }
    },

    mounted() {
        this.getMenus()
    }
}