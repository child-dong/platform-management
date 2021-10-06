<template>
  <div class="library">
    <div class="line-common">
      <div class="line-title">
        <span class="title-symbol"></span>
        <div class="title">模具图库</div>
      </div>
      <div class="line-content">
        <el-container>
          <el-aside width="188px">
            <div class="list-item" v-for="item in menus" @click="changeMenu(item.name)" :key="item.id" :class="{'active': activeMenu === item.name}">{{item.name}}</div>
            <div class="add-item" @click="addMenu()" v-if="!inputState">添加名称</div>
            <el-input class="add-item" placeholder="" v-model="menuName" @blur="complateName()" v-else></el-input>
          </el-aside>
          <el-container>
            <el-header>模具图片</el-header>
            <el-main>
              <div class="library-box">
                <div class="library-add">
                  <div class="dv1">
                    <img src="../../../assets/icon-upload-img.png" alt="">
                  </div>
                  <div class="dv2">添加图片</div>
                  <Ossupload v-on:childByValue="childByValue" v-bind:showList="false" v-bind:limit="99" v-bind:fileList="[]"></Ossupload>
                </div>
                <div class="library-item" v-for="item in tableData" :key="item.id">
                  <div class="dv1">
                    <img :src="item.url" alt="">
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
      <template v-if="total !== 0">
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onUpdate" @prev-click="onUpdate" @next-click="onUpdate">
        </el-pagination>
      </template>
    </div>
  </div>
</template>
<script src="./img-mag-library.js"></script>
<style scoped lang="scss">
  @import './img-mag-library';
</style>
