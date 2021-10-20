import {formatDate} from "../../../plugins/date";

export default {
    components: {
    },
    data() {
        return {
            area: '',
            time: '',
            content: '',
            activeMenu: '',
            activeMenuName: '安装调试',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            areaData: [],
            menus: [
                {name: '安装调试', id: ''},
                {name: '刀片修磨', id: '1'},
                {name: '模具修磨', id: '2'},
                {name: '数控改装', id: '3'},
                {name: '电话指导', id: '4'}
            ],
            multipleSelection: [],
            select: false,
            dialogFormVisible: false,
            form: {
                searchName: '',
                phone: '',
                fullName: '',
                areaCodeName: '',
                type: []
            },
            rules: {
                searchName: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ],
                fullName: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ],
                areaCodeName: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ]
            },
            id: '',
            modSearchData: [],
            datailData: '',
            typeData: [],
            ownType: '',
            areaArr: []
        }
    },
    methods: {
        // 地区
        getArea() {
            this.$axios({
                url: `/fansen-resource/api/public/getAreaChildren?type=waresRepair`,
                method: 'get',
            }).then(response => {
                console.log(response);
                this.areaData = response.data;
            },(error) => {
                console.log(error);
            });
        },
        changeMenu(id, name) {
            this.activeMenu = id;
            this.activeMenuName = name;
            this.getTableData();
        },
        // 获取列表数据
        getTableData() {
            const params = {
                repairType: this.activeMenu,
                searchName: this.content || '',
                startTime: this.time && this.time['0'] ? formatDate(this.time['0'], "YYYY-MM-DD") + ' 00:00:00' : '',
                endTime: this.time && this.time['1'] ? formatDate(this.time['1'], "YYYY-MM-DD") + ' 00:00:00' : '',
                areaCode: this.area
            };
            this.$axios({
                url: `/backstage/api/repair/repairList/${this.pageNum}/${this.pageSize}`,
                method: 'post',
                data: params
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
        showMod(data, type) {
            this.dialogFormVisible = true;
            this.ownType = '';
            if (!data) {
                if (!data) {
                    this.form = {
                        searchName: '',
                        phone: '',
                        fullName: '',
                        areaCodeName: '',
                        type: []
                    };
                    this.datailData = '';
                    this.modSearchData = []
                }
            } else {
                this.datailData = data;
                if (type === 'add') {
                    this.id = '';
                    this.form = {
                        searchName: '',
                        phone: '',
                        fullName: '',
                        areaCodeName: '',
                        type: []
                    }
                } else {
                    this.id = data.id;
                    this.form = {
                        searchName: '',
                        phone: this.datailData.phone,
                        fullName: this.datailData.fullName,
                        areaCodeName: this.datailData.areaCode,
                        type: this.datailData.repairType.split(',')
                    };
                }
                this.getType();
            }
        },
        // 手机号查用户
        submitForm(data) {
            console.log(data);
            const params = {
                searchName: data.searchName
            };
            this.$axios({
                url: '/backstage/api/user/list/1/9999',
                method: 'get',
                params
            }).then(response => {
                console.log(response);
                this.modSearchData = response.data.records;
            },(error) => {
                console.log(error);
            });
        },
        // 维修类别
        getType() {
            const params = {
                cid: '1432877859197816800'
            };
            this.$axios({
                url: `/backstage/api/dic/listDataSet`,
                method: 'get',
                params
            }).then(response => {
                let arr = [];
                this.typeData = [];
                response.data.forEach((item) => {
                    arr.push(item.name)
                });
                this.form.type.forEach((item) => {
                   if (arr.indexOf(item) === -1) {
                       arr.push(item);
                   }
                });
                arr.forEach((item) => {
                    this.typeData.push({name: item})
                });
            },(error) => {
                console.log(error);
            });
        },
        chooseType(name, type) {
            if (type === 1) {
                if (this.form.type.indexOf(name) === -1) {
                    this.form.type.push(name)
                } else {
                    this.form.type.splice(this.form.type.indexOf(name), 1)
                }
            } else {
                if (!name) return;
                this.typeData.push({name});
                this.form.type.push(name);
            }
        },
        // 保存
        submitForm2(data) {
            console.log(data);
            const params = {
                phone: data.phone,
                fullName: data.fullName,
                areaCodeName: data.areaCodeName,
                repairType: data.type.join(','),
                uid: this.datailData.uid,
                id: this.id,
                type: this.activeMenu
            };
            if (!this.id) {
                delete params.id
            }
            this.$axios({
                url: '/backstage/api/repair/addRepair',
                method: 'post',
                data: params
            }).then(response => {
                console.log(response);
                this.getTableData();
                this.dialogFormVisible = false;
            },(error) => {
                console.log(error);
            });
        },
    },

    mounted() {
        this.getTableData();
        this.getArea();
        this.getType();
    }
}
