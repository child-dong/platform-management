<template>
  <div class="swiper-box">
    <swiper
            :slides-per-view="3"
            :space-between="28"
            :autoplay="swiper_options.autoplay"
            :loop="swiper_options.loop"
            :speed="swiper_options.speed"
            navigation
    >
      <swiper-slide v-for="item in imgList" :key="item.id"><img style="width: 506px;height: 220px" v-bind:src="item.url" alt=""></swiper-slide>
    </swiper>
  </div>

  <div class="line-common">
    <div class="line-title">
      <span class="title-symbol"></span>
      <div class="title">注册、发贴人数</div>
    </div>
    <div class="line-content">
      <div class="upload-title"><span class="sp1">上传图片（ 尺寸 1035*450 ）</span></div>
      <Ossupload v-on:childByValue="childByValue"></Ossupload>
      <div class="upload-title">
        <span class="sp1">修改图片</span>
        <span class="sp2">清空</span>
      </div>
      <div class="swiper-edit">
        <swiper
                :slides-per-view="3"
                :space-between="28"
        >
          <swiper-slide v-for="item in imgList" :key="item.id"><img style="width: 506px;height: 220px" v-bind:src="item.url" alt=""><div class="add-link">添加连接地址</div></swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script src="./img-mag-swiper.js"></script>
<style scoped lang="scss">
  @import './img-mag-swiper';
</style>
