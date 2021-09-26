const OSS = require('ali-oss');
export default {
    data() {
        return {
            client: {},
            ossConfig: {
                // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
                region: 'oss-cn-beijing',
                // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
                accessKeyId: 'LTAI5tJoY41Av8UHz59RtwNw',
                accessKeySecret: 'ZEPUbwXfYysFvoyIn4iOkKLiCylVVv',
                // 填写Bucket名称，例如examplebucket。
                bucket: 'fansen-app'
            },
            tempCheckpoint: ''
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res,file)
        },
        uploadOwn(file) {
            console.log('自定义上传', file);
            this.multipartUpload(file.file)
        },
        multipartUpload (file) {
            console.log(file);
            try {
                // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
                // 您可以通过自定义文件名（例如exampleobject.txt）或目录（例如exampledir/exampleobject.txt）的形式，实现将文件上传到当前Bucket或Bucket中的指定目录。
                this.client.multipartUpload(file.name, file, {
                    progress: (p, checkpoint) => {
                        // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
                        this.tempCheckpoint = checkpoint;
                    }
                }).then((res) => {
                    console.log(res);
                    // 保存数据到后台
                    const params = {
                        name: res.name,
                        url: res.res.requestUrls[0]
                    };
                    this.$emit('childByValue', params)
                })
            } catch(e){
                console.log(e);
            }
        }
    },
    mounted() {
        this.client = new OSS(this.ossConfig);
        console.log(this.client)
    }
}
