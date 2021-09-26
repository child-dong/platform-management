<template>
    <div class="homepage">
      <div class="line-one">
        <div class="line-one-1">
          <div class="line-one-1-item">
            <p class="p1">注册总人数</p>
            <p class="p2">{{allPeople.total}}</p>
            <p class="p3"><span class="sp1">{{(Math.abs(allPeople.total - allPeople.lastMonthTotal) * 100 / allPeople.lastMonthTotal).toFixed(2)}}%</span>同上月对比</p>
          </div>

          <div class="line-one-1-item line-one-1-item2">
            <p class="p1">新注册用户</p>
            <div class="list">
              <div class="list-item" v-for="item in newPeople" :key="item.phone">
                <span class="sp1"><img v-bind:src="item.photo" alt=""></span>
                <span class="sp2">{{item.username}}</span>
                <span class="sp3">{{item.phone}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="line-one-2 line-common">
          <div class="line-title">
            <span class="title-symbol"></span>
            <div class="title">发贴占比</div>
          </div>
          <div class="line-content">
            <div id="myChart"
                 :style="{ width: '100%', height: '100%' }"></div>
          </div>
          <div class="echart-total">
            <p class="p1">{{postAllData}}</p>
            <p class="p2">周发贴总量</p>
          </div>
          <div class="echart-legend-layout">
            <div class="echart-legend">
              <div class="item" v-for="(item, index) in postData" :key="item" :style="{color: color[index]}">
                <span class="sp1" :style="{background: color[index]}"></span>
                <span class="sp2">{{item.name}}</span>
                <span class="sp3">{{item.percent}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="line-one-3 line-common">
          <div class="line-title">
            <span class="title-symbol"></span>
            <div class="title">在线人数</div>
          </div>
          <div class="time-picker">
            <el-date-picker v-model="time1" type="date" placeholder="选择日期" format="DD-MM-YYYY" @change="getOnline()" prefix-icon="1" clear-icon="1">
            </el-date-picker>
          </div>
          <div class="line-content">
            <div id="myChart2"
                 :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </div>
      </div>
      <div class="line-two line-common">
        <div class="line-title">
          <span class="title-symbol"></span>
          <div class="title">注册、发贴人数</div>
        </div>
        <div class="time-picker">
          <el-date-picker v-model="time2" type="month" placeholder="选择月" format="MM-YYYY" @change="getTimeTrend()" prefix-icon="1" clear-icon="1">
          </el-date-picker>
        </div>
        <div class="line-content">
          <div id="myChart3"
               :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
</template>
<script src="./homepage.js"></script>
<style scoped lang="scss">
  @import './homepage.scss';
</style>
