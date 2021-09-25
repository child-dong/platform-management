<template>
  <el-container>
    <el-aside width="200px">
      <img src="../../assets/logo.png" alt="" class="logo">
      <el-menu
              :uniqueOpened="true"
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
      >
        <el-menu-item index="1" @click="go({url: '/layout/homepage', title: '数据分析'})">
          <i class="icon-menu icon-home"></i>
          <template #title>数据分析</template>
        </el-menu-item>
        <el-submenu index="2">
          <template #title>
            <i class="icon-menu icon-home"></i>
            <span>图片管理</span>
          </template>
          <el-menu-item index="1-1" @click="go({url: '/layout/img-mag-swiper', title: '轮播图'})">轮播图</el-menu-item>
          <el-menu-item index="1-2" @click="go({url: '/layout/cnc-system', title: '数控系统'})">数控系统</el-menu-item>
          <el-menu-item index="1-3" @click="go({url: '/layout/img-mag-library', title: '模具图库'})">模具图库</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" @click="go({url: '/layout/user-mag', title: '用户管理'})">
          <i class="icon-menu icon-home"></i>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="4" @click="go({url: '/layout/post-mag', title: '帖子管理'})">
          <i class="icon-menu icon-home"></i>
          <template #title>帖子管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-row>
          <el-col :span="20">
            <div class="module-title">{{title}}</div>
          </el-col>
          <el-col :span="4">
            <div class="userInfos">主账户</div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script src="./layout.js"></script>
<style scoped lang="scss">
  @import './layout.scss';
</style>
