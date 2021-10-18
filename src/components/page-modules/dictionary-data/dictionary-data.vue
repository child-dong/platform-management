<template>
  <div class="library">
    <div class="line-common">
      <div class="line-title">
        <span class="title-symbol"></span>
        <div class="title">字典数据</div>
      </div>
      <div class="line-content">
        <el-container>
          <el-aside width="188px">
            <div class="list-item" v-for="item in menus" @click="changeMenu(item.id)" :key="item.id" :class="{'active': activeMenu === item.id}">{{item.name}}</div>
            <div class="add-item" @click="addMenu()" v-if="!inputState">添加名称</div>
            <el-input class="add-item" placeholder="" v-model="menuName" @blur="complateName()" v-else></el-input>
          </el-aside>
          <el-container>
            <el-header>字典数据</el-header>
            <el-main>
              <div class="library-box">
                <div class="library-add">
                  <div class="dv1">
                    <el-input placeholder="" v-model="name"></el-input>
                  </div>
                  <el-button class="dv2" type="text" @click="addData()">添加数据</el-button>
                </div>
                <div class="library-item" v-for="item in tableData" :key="item.id">
                  <div class="dv1">
                    <el-select v-model="item.status" @change="complateFile(item, 1)">
                      <el-option label="启用" :value="1"></el-option>
                      <el-option label="未启用" :value="0"></el-option>
                    </el-select>
                  </div>
                  <div class="dv2" v-if="!item.fileInputState">{{item.name}}</div>
                  <el-input class="dv2" placeholder="" v-model="item.editName" v-else></el-input>
                  <div class="dv3">
                    <span class="sp1" @click="editFile(item)" v-if="!item.fileInputState">编辑</span>
                    <span class="sp1 active" @click="complateFile(item, 1)" v-else>确认</span>
                    <el-popconfirm
                            title="是否删除?"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            confirmButtonType="text"
                            @confirm="delSingle(item)"
                            v-if="!item.fileInputState"
                    >
                      <template #reference>
                        <span class="sp2">删除</span>
                      </template>
                    </el-popconfirm>
                    <span class="sp2" @click="complateFile(item, 0)" v-else>取消</span>
                  </div>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script src="./dictionary-data.js"></script>
<style scoped lang="scss">
  @import './dictionary-data';
</style>
