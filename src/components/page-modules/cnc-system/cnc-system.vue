<template>
  <div class="library">
    <div class="line-common">
      <div class="line-title">
        <span class="title-symbol"></span>
        <div class="title">数控系统图</div>
        <el-popconfirm
                title="是否删除?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirmButtonType="text"
                @confirm="delMulti()"
                v-if="multipleSelection.length"
        >
          <template #reference>
            <el-button type="primary" style="background: #8398DB;position: absolute; right: 126px;">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="showSelect()" style="background: #8398DB;position: absolute; right: 126px;" v-if="!multipleSelection.length">删除</el-button>
        <el-button type="primary" style="position: absolute; right: 28px;" @click="showMod('')">添加</el-button>
      </div>
      <div class="table-box">
        <el-table :data="tableData" style="width: 100%" max-height="620" @selection-change="handleSelectionChange">
          <el-table-column type="selection" v-if="select" />
          <el-table-column align="center" prop="url" label="系统主图">
            <template #default="scope">
              <img style="width: 126px;height: 126px;" :src="tableData[scope.$index].url" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="名称" show-overflow-tooltip="true"> </el-table-column>
          <el-table-column align="center" prop="detailUrl" label="详情图">
            <template #default="scope">
                <a :href="tableData[scope.$index].detailUrl" target="_blank" style="text-decoration: none">显示详情</a>
            </template>
          </el-table-column>
          <el-table-column align="center" label="编辑">
            <template #default="scope">
              <span class="icon-edit" @click.prevent="showMod(tableData[scope.$index])"></span>
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
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入数控系统名称"></el-input>
        </el-form-item>

        <el-form-item label="系统主图" prop="url">
          <Ossupload v-on:childByValue="childByValue1" v-bind:showList="true" v-bind:limit="1" v-bind:fileList="fileList"></Ossupload>
        </el-form-item>

        <el-form-item label="系统详情图" prop="detailUrl">
          <Ossupload v-on:childByValue="childByValue2" v-bind:showList="true" v-bind:limit="1" v-bind:fileList="detailFileList"></Ossupload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(form)" :disabled="!form.name || !form.url || !form.detailUrl" v-if="!id">添加</el-button>
          <el-button type="primary" @click="submitForm(form)" :disabled="!form.name || !form.url || !form.detailUrl" v-else>编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script src="./cnc-system.js"></script>
<style scoped lang="scss">
  @import './cnc-system';
</style>
