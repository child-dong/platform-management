export default {
    data() {
        return {
            title: '',
            menus: [
                {
                    url: '/layout/homepage',
                    name: '数据分析',
                    index: '1'
                },
                {
                    url: '/layout/img-mag-swiper',
                    name: '轮播图',
                    index: '2'
                },
                {
                    url: '/layout/cnc-system',
                    name: '数控系统',
                    index: '3'
                },
                {
                    url: '/layout/img-mag-library',
                    name: '模具图库',
                    index: '4'
                },
                {
                    url: '/layout/user-mag',
                    name: '用户管理',
                    index: '5'
                },
                {
                    url: '/layout/post-mag',
                    name: '帖子管理',
                    index: '6'
                },
                {
                    url: '/layout/store-mag',
                    name: '店铺管理',
                    index: '7'
                },
                {
                    url: '/layout/dictionary-data',
                    name: '字典管理',
                    index: '8'
                },
                {
                    url: '/layout/maintenance-service',
                    name: '维修服务',
                    index: '9'
                }
            ],
            activeIndex: 0
        }
    },
    methods: {
        go(data) {
            this.title = data.title;
            this.$router.push(data.url)
        },
        logout() {
            window.localStorage.setItem('token', '');
            this.$router.push('/');
        },
        // 定位高亮菜单
        matchMenu() {
            this.menus.forEach((item) => {
                if (window.location.href.indexOf(item.url) !== -1) {
                    this.activeIndex = item.index;
                    this.title = item.name;
                    return;
                }
            });
        }
    },
    mounted() {
        this.matchMenu()
    }
}
