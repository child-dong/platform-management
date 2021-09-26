<template>
  <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          multiple
          :on-success="handleAvatarSuccess"
          :http-request="uploadOwn"
  >
    <i class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script src="./oss-upload.js"></script>
<style scoped lang="scss">
  @import './oss-upload';
</style>
