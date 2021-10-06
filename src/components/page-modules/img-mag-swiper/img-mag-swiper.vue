<template>
  <div class="swiper-box">
    <swiper
            :slides-per-view="3"
            :space-between="28"
            :autoplay="swiper_options.autoplay"
            :speed="swiper_options.speed"
            navigation
    >
      <swiper-slide style="width: 506px !important;" v-for="item in imgList" :key="item.id"><img style="width: 506px;height: 220px" v-bind:src="item.url" alt=""></swiper-slide>
    </swiper>
  </div>

  <div class="line-common">
    <div class="line-title">
      <span class="title-symbol"></span>
      <div class="title">注册、发贴人数</div>
    </div>
    <div class="line-content">
      <div class="upload-title"><span class="sp1">上传图片（ 尺寸 1035*450 ）</span></div>
      <Ossupload v-on:childByValue="childByValue" v-bind:showList="false" v-bind:limit="99" v-bind:fileList="[]"></Ossupload>
      <div class="upload-title">
        <span class="sp1">修改图片</span>
        <span class="sp2" @click="clearAll()">清空</span>
      </div>
      <div class="swiper-edit">
        <swiper
                :slides-per-view="3"
                :space-between="28"
        >
          <swiper-slide v-for="item in imgList" :key="item.id">
            <img style="width: 506px;height: 220px" v-bind:src="item.url" alt="">
            <div class="add-link" v-if="!item.inputState" @click="addDetailUrl(item)">添加连接地址</div>
            <el-input class="add-link" placeholder="" v-model="item.detailUrl" @blur="complateUrl(item)" v-else></el-input>
            <img class="icon-del" src="../../../assets/icon-del.png" alt="" @click="clearOne(item)">
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script src="./img-mag-swiper.js"></script>
<style scoped lang="scss">
  @import './img-mag-swiper';
</style>
