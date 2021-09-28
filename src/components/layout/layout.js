export default {
    data() {
        return {
            title: ''
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
        }
    }
}
