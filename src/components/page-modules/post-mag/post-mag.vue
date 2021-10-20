<template>
  <el-card class="box-search-card">
    <span class="search-label">帖子类型：</span>
    <el-select v-model="type" @change="searchType()">
      <el-option label="生活" value="tb_career_post"></el-option>
      <el-option label="出售" value="tb_wares_sell"></el-option>
      <el-option label="求购" value="tb_wares_wany_buy"></el-option>
      <el-option label="维修" value="tb_wares_repair"></el-option>
      <el-option label="人才招聘" value="tb_talent_recruitment"></el-option>
    </el-select>
    <div class="margin" v-if="type !== 'tb_career_post'"></div>
    <span class="search-label" v-if="type !== 'tb_career_post'">地区选择：</span>
    <el-cascader
            v-model="areaArr"
            :options="areaData"
            :props="{value: 'areaCode', label: 'areaName'}"
            clearable="true"
            @change="searchArea()"
            v-if="type !== 'tb_career_post'"
    ></el-cascader>
    <div class="margin"></div>
    <span class="search-label">发帖时间：</span>
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
    <el-popconfirm
            title="是否删除?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirmButtonType="text"
            @confirm="delMulti()"
            v-if="multipleSelection.length"
    >
      <template #reference>
        <el-button type="primary">删贴</el-button>
      </template>
    </el-popconfirm>
    <el-button type="primary" @click="showSelect()" v-if="!multipleSelection.length">删贴</el-button>
  </div>
  <div class="table-box">
    <el-table :data="tableData" style="width: 100%" max-height="520" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="select" />
      <el-table-column align="center" prop="photo" label="用户">
        <template #default="scope">
          <img style="width: 80px;height: 80px;border-radius: 50%" :src="tableData[scope.$index].photo" alt="" v-if="tableData[scope.$index].photo">
          <img style="width: 80px;height: 80px;border-radius: 50%" src="../../../assets/icon-sculpture.png" alt="" v-else>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="" show-overflow-tooltip="true"> </el-table-column>
      <el-table-column align="center" prop="phone" label="手机" show-overflow-tooltip="true" width="175">
      </el-table-column>
      <el-table-column align="center" prop="homeImage" label="帖子照片">
        <template #default="scope">
          <img style="width: 80px;height: 80px;border-radius: 50%" :src="tableData[scope.$index].homeImage" alt="" v-if="tableData[scope.$index].homeImage">
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="content" label="帖子内容" show-overflow-tooltip="true"> </el-table-column>
      <el-table-column align="center" prop="createTime" label="发帖时间" show-overflow-tooltip="true" width="240"> </el-table-column>
      <!--<el-table-column align="center" prop="type" label="帖子类型"> </el-table-column>-->
      <el-table-column align="center" prop="status" label="状态">
        <template #default="scope">
          <el-popconfirm
                  title="审核是否通过?"
                  confirm-button-text="通过"
                  cancel-button-text="不通过"
                  confirmButtonType="text"
                  @confirm="confirmEvent(tableData[scope.$index], 1)"
                  @cancel="confirmEvent(tableData[scope.$index], -1)"
                  v-if="tableData[scope.$index].status === 0">
            <template #reference>
              <el-button v-if="tableData[scope.$index].status === 0"
                         type="text"
                         size="small"
              >
                审核
              </el-button>
            </template>
          </el-popconfirm>
          <span v-if="tableData[scope.$index].status === 1">通过</span>
          <span v-if="tableData[scope.$index].status === -1">未通过</span>
          <span v-if="tableData[scope.$index].status === -2">下帖</span>
        </template>
      </el-table-column>
        <el-table-column align="center" label="排序" v-if="type !== 'tb_career_post'">
            <template #default="scope">
                <el-input placeholder="" v-model="tableData[scope.$index].sort" @change="tableSort(tableData[scope.$index])"></el-input>
            </template>
        </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
            @click.prevent="dialogShow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="出售帖子"
      width="1095px">
      <div class="info-common info-1">
        <img :src="datailData.photo" alt="" v-if="datailData.photo">
        <img src="../../../assets/icon-sculpture.png" alt="" v-else>
        <span class="sp1">{{datailData.name}}</span>
        <span class="sp2">{{datailData.createTime}}发布</span>
      </div>
      <div class="marginH13"></div>
      <div class="info-common info-2">
        <span class="sp1">手机&nbsp;&nbsp;{{datailData.phone}}</span>
      </div>
      <div class="marginH13"></div>
      <div class="info-title">内容</div>
      <div class="marginH6"></div>
      <div class="info-common info-3">
        <span class="sp1">{{datailData.content}}</span>
      </div>
      <div class="marginH13"></div>
      <div class="info-title">照片</div>
      <div class="marginH18"></div>
      <div class="swiper-box">
        <swiper
                :slides-per-view="5"
                :space-between="14"
                navigation
        >
          <swiper-slide style="width: 180px !important;margin-right: 14px;" v-for="item in datailData.waresSellFileList" :key="item">
              <img style="width: 180px;height: 230px" :src="item.url" alt="" v-if="item.url.toLowerCase().indexOf('.mp4') === -1">
              <video :src="item.url" muted autoplay v-else></video>
          </swiper-slide>
        </swiper>
      </div>
      <div class="marginH13"></div>
      <div class="info-title">产品详情</div>
      <div class="marginH18"></div>
      <div class="swiper-box">
        <swiper
                :slides-per-view="5"
                :space-between="14"
        >
          <swiper-slide style="width: 180px !important;margin-right: 14px" v-for="item in datailData.waresSellFileListDetails" :key="item">
              <img style="width: 180px;height: 230px" :src="item.url" alt="" v-if="item.url.toLowerCase().indexOf('.mp4') === -1">
              <video :src="item.url" muted autoplay v-else></video>
          </swiper-slide>
        </swiper>
      </div>
      <el-popconfirm
              title="是否删除?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirmButtonType="text"
              @confirm="delSingle(datailData)"
             >
        <template #reference>
          <el-button type="primary" style="margin-top: 67px;width: 255px;height: 80px;font-size: 30px">删除</el-button>
        </template>
      </el-popconfirm>
      <el-popconfirm
              title="审核是否通过?"
              confirm-button-text="通过"
              cancel-button-text="不通过"
              confirmButtonType="text"
              @confirm="confirmEvent(datailData, 1)"
              @cancel="confirmEvent(datailData, -1)"
              v-if="datailData.status === 0">
        <template #reference>
          <el-button type="primary" style="margin: 67px 0 0 28px;width: 255px;height: 80px;background: #4BC9EA;border: none;font-size: 30px">审核</el-button>
        </template>
      </el-popconfirm>

    </el-dialog>
    <template v-if="total !== 0">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="onUpdate" @prev-click="onUpdate" @next-click="onUpdate">
      </el-pagination>
    </template>
  </div>
</template>
<script src="./post-mag.js"></script>
<style scoped lang="scss">
  @import './post-mag';
</style>
