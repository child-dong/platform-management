export default {
    data() {
        return {
            title: ''
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        go(data) {
            this.title = data.title;
            this.$router.push(data.url, {
                data: 1
            })
        }
    }
}
