<template>
  <el-card class="box-search-card">
    <span class="search-label">用户类型：</span>
    <el-select v-model="type">
      <el-option label="全部" value=""></el-option>
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    <div class="margin"></div>
    <span class="search-label">注册时间：</span>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </el-card>
  <div class="btn-box">
    <el-input placeholder="输入要搜索内容" v-model="content"></el-input>
    <span class="inp-search">搜索</span>
    <el-button type="primary">删除</el-button>
  </div>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%" max-height="680">
      <el-table-column align="center" prop="photo" label="用户">
      </el-table-column>
      <el-table-column align="center" prop="username" label=""> </el-table-column>
      <el-table-column align="center" prop="phone" label="手机">
      </el-table-column>
      <el-table-column align="center" prop="isAuthEnt" label="个人认证"> </el-table-column>
      <el-table-column align="center" prop="isAuthPer" label="企业认证"> </el-table-column>
      <el-table-column align="center" prop="isWaresRepair" label="维修认证"> </el-table-column>
      <el-table-column align="center" prop="createTime" label="注册时间"> </el-table-column>
      <el-table-column align="center" prop="fullName" label="真实姓名"> </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
                  @click.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <template>-->
<!--      <el-pagination background :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next" :total="100">-->
<!--      </el-pagination>-->
<!--    </template>-->
    <template v-if="total !== 0">
      <el-pagination background layout="prev, pager, next" :total="total" :current-change="onUpdate">
      </el-pagination>
    </template>

  </div>
</template>
<script src="./user-mag.js"></script>
<style scoped lang="scss">
  @import './user-mag';
</style>
