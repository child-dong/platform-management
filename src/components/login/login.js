import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (!this.username) {
                ElMessage.error('请输入账号');
                return
            }
            if (!this.password) {
                ElMessage.error('请输入密码');
                return
            }
            const params = {
                // client_id: 'client_3',
                // client_secret: '123456',
                client_id: 'backstage',
                client_secret: 'fansYun@.cn',
                grant_type: 'password',
                username: this.username,
                password: this.password
            };
            // 登录
            this.$axios({
                url: '/user-security/oauth/token',
                params,
                method: 'get',
            }).then(response => {
                if (!response.access_token) {
                    ElMessage.error('请输入正确的账号密码');
                    return
                }
                window.localStorage.setItem('token', response.access_token);
                this.$router.push('/layout/homepage')
            },(error) => {
                console.log(error);
                ElMessage.error('请输入正确的账号密码');
            });
        }
    }
}
