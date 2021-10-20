<template>
  <div>
      <el-card class="box-search-card">
          <span class="search-label">地区选择：</span>
          <el-cascader
                  v-model="areaArr"
                  :options="areaData"
                  :props="{value: 'areaCode', label: 'areaName'}"
                  clearable="true"
                  @change="searchArea()"
          ></el-cascader>
          <div class="margin"></div>
          <span class="search-label">申请时间：</span>
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
          <span class="inp-search">搜索</span>
          <el-button type="primary" @click="showMod('', 'add')" v-if="activeMenu">添加</el-button>
      </div>
      <el-container>
          <el-aside width="188px">
              <div class="list-item" v-for="item in menus" @click="changeMenu(item.id, item.name)" :key="item.id" :class="{'active': activeMenu === item.id}">{{item.name}}</div>
          </el-aside>
          <el-container>
              <el-main>
                  <div class="table-box">
                      <el-table :data="tableData" style="width: 100%" max-height="520">
                          <el-table-column align="center" prop="photo" label="用户">
                              <template #default="scope">
                                  <img style="width: 80px;height: 80px;border-radius: 50%" :src="tableData[scope.$index].photo" alt="" v-if="tableData[scope.$index].photo">
                                  <img style="width: 80px;height: 80px;border-radius: 50%" src="../../../assets/icon-sculpture.png" alt="" v-else>
                              </template>
                          </el-table-column>
                          <el-table-column align="center" prop="username" label="昵称" show-overflow-tooltip="true"> </el-table-column>
                          <el-table-column align="center" prop="phone" label="联系电话" show-overflow-tooltip="true" width="175">
                          </el-table-column>
                          <el-table-column align="center" prop="areaCodeName" label="维修区域" show-overflow-tooltip="true">
                          </el-table-column>
                          <el-table-column align="center" prop="repairType" label="维修内容" show-overflow-tooltip="true">
                          </el-table-column>
                          <el-table-column align="center" prop="createTime" label="申请维修时间" show-overflow-tooltip="true" width="240" >
                          </el-table-column>
                          <el-table-column align="center" prop="fullName" label="真实姓名" show-overflow-tooltip="true"> </el-table-column>
                          <el-table-column align="center" label="操作">
                              <template #default="scope">
                                  <el-button
                                          @click.prevent="showMod(tableData[scope.$index], 'edit')"
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
              </el-main>
          </el-container>
      </el-container>
      <el-dialog
              v-model="dialogFormVisible"
              title="用户查找"
              width="1095px">

          <el-form :model="form" :rules="rules" v-if="!datailData">
              <el-form-item label="手机号码" prop="searchName">
                  <el-input v-model="form.searchName" autocomplete="off" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-table :data="modSearchData" style="width: 100%" max-height="600">
                  <el-table-column align="center" prop="photo" label="手机号">
                      <template #default="scope">
                          <el-button
                                  @click.prevent="showMod(modSearchData[scope.$index], 'add')"
                                  type="text"
                                  size="small"
                          >
                              {{modSearchData[scope.$index].phone}}
                          </el-button>
                      </template>
                  </el-table-column>
              </el-table>
              <el-button class="btn1" type="primary" @click="submitForm(form)" :disabled="!form.searchName">查找</el-button>
          </el-form>

          <el-form :model="form" :rules="rules" v-if="datailData">
              <div class="info-common info-1">
                  <img :src="datailData.photo" alt="">
                  <span class="sp1">{{datailData.username}}</span>
                  <span class="sp2">{{datailData.createTime}}注册</span>
              </div>
              <div class="marginH13"></div>
              <div class="info-common info-2">
                  <span class="sp1">手机&nbsp;&nbsp;{{datailData.phone}}</span>
              </div>
              <div class="marginH13"></div>
              <div class="info-title">账户类型</div>
              <div class="marginH13"></div>
              <div class="info-common info-3">
                  <span class="sp1">{{activeMenuName}}</span>
              </div>
              <div class="marginH13"></div>
              <el-form-item label="姓名" prop="fullName">
                  <el-input v-model="form.fullName" autocomplete="off" placeholder="请输入姓名"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="form.phone" autocomplete="off" placeholder="请输入联系电话"></el-input>
              </el-form-item>

              <el-form-item label="维修区域" prop="phone">
                  <el-input v-model="form.areaCodeName" autocomplete="off" placeholder="请输入维修区域"></el-input>
              </el-form-item>

              <el-form-item label="维修类别" prop="phone">
                  <div class="marginH13"></div>
                  <div class="type-box">
                      <div class="type-item" :class="{'active': form.type.indexOf(item.name) !== -1}" v-for="item in typeData" :key="item.name" @click="chooseType(item.name, 1)">{{item.name}}</div>
                      <el-input v-model="ownType" autocomplete="off" placeholder="自定义类别" @blur="chooseType(ownType, 2)"></el-input>
                  </div>
              </el-form-item>

              <el-form-item>
                  <el-button type="primary" @click="submitForm2(form)" :disabled="!form.fullName || !form.phone || !form.areaCodeName || !form.type.length" v-if="!id">添加</el-button>
                  <el-button type="primary" @click="submitForm2(form)" :disabled="!form.fullName || !form.phone || !form.areaCodeName || !form.type.length" v-else>编辑</el-button>
              </el-form-item>
          </el-form>

      </el-dialog>
  </div>
</template>
<script src="./maintenance-service.js"></script>
<style scoped lang="scss">
  @import './maintenance-service';
</style>
