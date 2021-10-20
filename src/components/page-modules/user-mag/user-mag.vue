<template>
  <el-card class="box-search-card">
    <span class="search-label">用户类型：</span>
    <el-select v-model="type" @change="search()">
      <el-option label="普通用户" value="0"></el-option>
      <el-option label="个人用户" value="1"></el-option>
      <el-option label="企业用户" value="2"></el-option>
    </el-select>
    <div class="margin"></div>
    <span class="search-label">注册时间：</span>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="search()"
    >
    </el-date-picker>
  </el-card>
  <div class="btn-box">
    <el-input placeholder="输入要搜索内容" v-model="content" @input="search()"></el-input>
    <!--<span class="inp-search" @click="search()">搜索</span>-->
  </div>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%" max-height="520">
      <el-table-column align="center" prop="photo" label="用户">
        <template #default="scope">
          <img style="width: 80px;height: 80px;border-radius: 50%" :src="tableData[scope.$index].photo" alt="" v-if="tableData[scope.$index].photo">
          <img style="width: 80px;height: 80px;border-radius: 50%" src="../../../assets/icon-sculpture.png" alt="" v-else>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label="" show-overflow-tooltip="true"> </el-table-column>
      <el-table-column align="center" prop="phone" label="手机" show-overflow-tooltip="true" width="175">
      </el-table-column>
      <el-table-column align="center" prop="isAuthEnt" label="个人认证">
        <template #default="scope">
          <span v-if="tableData[scope.$index].isAuthEnt === 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isAuthPer" label="企业认证">
        <template #default="scope">
          <span v-if="tableData[scope.$index].isAuthPer === 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isWaresRepair" label="维修认证">
        <template #default="scope">
          <span v-if="tableData[scope.$index].isWaresRepair === 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="注册时间" show-overflow-tooltip="true" width="240"> </el-table-column>
      <el-table-column align="center" prop="fullName" label="真实姓名" show-overflow-tooltip="true"> </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template #default="scope">
          <el-popconfirm
                  title="是否锁定?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  confirmButtonType="text"
                  @confirm="disableRow(scope.$index, tableData)">
            <template #reference>
              <el-button
                      type="text"
                      size="small"
                      style="padding: 0 5px;"
              >
                锁定
              </el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm
              title="是否删除?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirmButtonType="text"
              @confirm="delSingle(scope.$index, tableData)"
          >
            <template #reference>
              <el-button type="text"
                         size="small"
                         style="margin-left: 0;padding: 0 5px">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="total !== 0">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="onUpdate" @prev-click="onUpdate" @next-click="onUpdate">
      </el-pagination>
    </template>

  </div>
</template>
<script src="./user-mag.js"></script>
<style scoped lang="scss">
  @import './user-mag';
</style>
