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
      <swiper-slide><img style="width: 506px;height: 220px" src="../../../assets/logo.png" alt=""></swiper-slide>
      <swiper-slide><img style="width: 506px;height: 220px" src="../../../assets/logo.png" alt=""></swiper-slide>
      <swiper-slide><img style="width: 506px;height: 220px" src="../../../assets/logo.png" alt=""></swiper-slide>
      <swiper-slide><img style="width: 506px;height: 220px" src="../../../assets/logo.png" alt=""></swiper-slide>
      <swiper-slide><img style="width: 506px;height: 220px" src="../../../assets/logo.png" alt=""></swiper-slide>
    </swiper>
  </div>

  <div class="line-common">
    <div class="line-title">
      <span class="title-symbol"></span>
      <div class="title">注册、发贴人数</div>
    </div>
    <div class="line-content"></div>
  </div>
</template>
<script src="./img-mag-swiper.js"></script>
<style scoped lang="scss">
  @import './img-mag-swiper';
</style>
