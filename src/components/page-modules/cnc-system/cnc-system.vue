<template>
  <div class="library">
    <div class="line-common">
      <div class="line-title">
        <span class="title-symbol"></span>
        <div class="title">数控系统图</div>
        <el-button type="primary" style="background: #8398DB;position: absolute; right: 126px;">删除</el-button>
        <el-button type="primary" style="position: absolute; right: 28px;" @click="dialogFormVisible = true">添加</el-button>
      </div>
      <div class="table-box">
        <el-table :data="tableData" style="width: 100%" max-height="680">
          <el-table-column align="center" prop="url" label="系统主图">
            <template #default="scope">
              <img style="width: 126px;height: 126px;" :src="tableData[scope.$index].url" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="名称"> </el-table-column>
          <el-table-column align="center" prop="detailUrl" label="详情图">
            <template #default="scope">
              <img style="width: 126px;height: 126px;" :src="tableData[scope.$index].detailUrl" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" label="编辑">
            <template #default="scope">
              <el-button
                      @click.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small"
              >
                编辑
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
    <el-dialog v-model="dialogFormVisible" title="数控系统" width="1095px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="系统名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="系统主图" prop="url">
          <Ossupload v-on:childByValue="childByValue1" v-bind:showList="true" v-model="form.url" v-bind:limit="1"></Ossupload>
        </el-form-item>

        <el-form-item label="系统详情图" prop="detailUrl">
          <Ossupload v-on:childByValue="childByValue2" v-bind:showList="true" v-model="form.detailUrl" v-bind:limit="1"></Ossupload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(form)">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script src="./cnc-system.js"></script>
<style scoped lang="scss">
  @import './cnc-system';
</style>
