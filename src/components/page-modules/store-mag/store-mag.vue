<template>
  <el-card class="box-search-card">
    <span class="search-label">店铺类型：</span>
    <el-select v-model="type" @change="search()">
      <el-option label="个人用户" value="1"></el-option>
      <el-option label="企业用户" value="2"></el-option>
    </el-select>
    <div class="margin"></div>
    <span class="search-label">开店时间：</span>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="search()"
    >
    </el-date-picker>
    <div class="margin"></div>
    <span class="search-label">地区选择：</span>
    <el-select v-model="area" @change="search()">
      <el-option label="全部" value=""></el-option>
      <el-option :label="item.areaName" :value="item.areaCode" v-for="item in areaData" :key="item.areaCode"></el-option>
    </el-select>
  </el-card>
  <div class="btn-box">
    <el-input placeholder="输入要搜索内容" v-model="content"></el-input>
    <span class="inp-search" @click="search()">搜索</span>
  </div>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%" max-height="680">
      <el-table-column align="center" prop="photo" label="用户">
        <template #default="scope">
          <img style="width: 80px;height: 80px;border-radius: 50%" :src="tableData[scope.$index].photo" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label=""> </el-table-column>
      <el-table-column align="center" prop="phone" label="手机">
      </el-table-column>
      <el-table-column align="center" prop="shopName" label="经营内容">
      </el-table-column>
      <el-table-column align="center" prop="shopCreateTime" label="开店时间">
      </el-table-column>
      <el-table-column align="center" prop="type" label="店铺类型">
      </el-table-column>
      <el-table-column align="center" prop="areaCodeName" label="地区"> </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
            <el-input placeholder="排序" v-model="tableData[scope.$index].sort" @change="cSort(tableData[scope.$index])"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="total !== 0">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="onUpdate" @prev-click="onUpdate" @next-click="onUpdate">
      </el-pagination>
    </template>

  </div>
</template>
<script src="./store-mag.js"></script>
<style scoped lang="scss">
  @import './store-mag';
</style>
