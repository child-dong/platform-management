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
    <el-input placeholder="输入要搜索内容" v-model="content"></el-input>
    <span class="inp-search" @click="search()">搜索</span>
<!--    <el-popconfirm-->
<!--            title="确认删除?"-->
<!--            confirm-button-text="删除"-->
<!--            cancel-button-text="取消"-->
<!--            confirmButtonType="text"-->
<!--            @confirm="delMulti()"-->
<!--            v-if="multipleSelection.length"-->
<!--    >-->
<!--      <template #reference>-->
<!--        <el-button type="primary">删除</el-button>-->
<!--      </template>-->
<!--    </el-popconfirm>-->
<!--    <el-button type="primary" @click="showSelect()" v-if="!multipleSelection.length">删除</el-button>-->
  </div>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%" max-height="680" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" v-if="select" />-->
      <el-table-column align="center" prop="photo" label="用户">
        <template #default="scope">
          <img style="width: 80px;height: 80px;border-radius: 50%" :src="tableData[scope.$index].photo" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label=""> </el-table-column>
      <el-table-column align="center" prop="phone" label="手机">
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
      <el-table-column align="center" prop="createTime" label="注册时间"> </el-table-column>
      <el-table-column align="center" prop="fullName" label="真实姓名"> </el-table-column>
      <el-table-column align="center" label="操作">
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
                         style="margin-left: 0">删除</el-button>
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
