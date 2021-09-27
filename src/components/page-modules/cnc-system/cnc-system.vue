<template>
  <div class="library">
    <div class="line-common">
      <div class="line-title">
        <span class="title-symbol"></span>
        <div class="title">数控系统图</div>
      </div>
      <div class="table-box">
        <el-table :data="tableData" style="width: 100%" max-height="680">
          <el-table-column align="center" prop="date" label="日期">
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名"> </el-table-column>
          <el-table-column align="center" prop="province" label="省份">
          </el-table-column>
          <el-table-column align="center" prop="city" label="市区"> </el-table-column>
          <el-table-column align="center" prop="address" label="地址"> </el-table-column>
          <el-table-column align="center" prop="zip" label="邮编"> </el-table-column>
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
        <template v-if="total !== 0">
          <el-pagination background layout="prev, pager, next" :total="total" @current-change="onUpdate" @prev-click="onUpdate" @next-click="onUpdate">
          </el-pagination>
        </template>
      </div>
    </div>
  </div>
</template>
<script src="./cnc-system.js"></script>
<style scoped lang="scss">
  @import './cnc-system';
</style>
