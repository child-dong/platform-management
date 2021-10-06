<template>
  <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="showList"
          list-type="picture-card"
          multiple
          :on-success="handleAvatarSuccess"
          :on-remove="remove"
          :http-request="uploadOwn"
          :limit="limit"
          :file-list="fileList"
  >
    <i class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script src="./oss-upload.js"></script>
<style scoped lang="scss">
  @import './oss-upload';
</style>
