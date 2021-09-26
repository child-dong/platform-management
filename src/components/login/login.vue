<template>
  <div class="login">
      <div class="system-logo">
        <img src="../../assets/login-logo.png" alt="" class="icon-logo">
        <p class="system-name">钣金联盟平台管理系统</p>
      </div>
      <div class="split-line"></div>
      <div class="login-swrapper">
          <div class="login-tabs">
            <div class="tab-item active">账号登录</div>
<!--              <div class="tab-split-line"></div>-->
<!--            <div class="tab-item">手机号码登录</div>-->
          </div>
          <div class="username">
              <el-input placeholder="请输入账号" v-model="username"></el-input>
          </div>
          <div class="password">
              <el-input placeholder="请输入密码" v-model="password"></el-input>
          </div>

          <el-button type="primary" @click.prevent="login()">登录</el-button>
      </div>
  </div>
</template>
<script src="./login.js"></script>
<style scoped lang="scss">
  @import "./login";
</style>
