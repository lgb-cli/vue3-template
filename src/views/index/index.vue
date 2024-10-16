<template>
  <div>
    <el-row class="cards" :gutter="20">
      <el-col v-for="(item, index) in listCount" :key="index" :lg="6" :sm="12" :xs="24">
        <div :class="['card-item', 'white_bg', item.class, active === index ? 'active' : '']" @click="setActive(index)">
          <div class="card-title">
            {{ item.text }}(人)
          </div>
          <div :class="['card-value', ['green_text', 'yellow_text', 'blue_text', 'red_text'][index]]">
            {{ item.value }}
          </div>
          <div :class="['card-icon', ['green_bg', 'yellow_bg', 'blue_bg', 'red_bg'][index]]">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="echart_card" :gutter="20">
      <el-col :span="9">
        <div id="box-people" class="white_bg card_radius"></div>
      </el-col>
      <el-col :span="15">
        <div id="box-weather" class="white_bg card_radius">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div id="box-total" class="card_radius white_bg"></div>
    </el-row>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { Present, GoldMedal, HotWater, Discount } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { sexOptions, ageOptions, moneyOptions } from '../../echarts/options'
const active = ref('')

const listCount = [
  {
    text: '当天总人数：',
    value: 2000,
    class: 'green',
    icon: Present
  }, {
    text: '本周总人数：',
    value: 5000,
    class: 'blue',
    icon: GoldMedal
  }, {
    text: '当月总人数：',
    value: 10000,
    class: 'red',
    icon: HotWater
  }, {
    text: '本季度总人数：',
    value: 200000,
    class: 'yellow',
    icon: Discount
  }
]
const setActive = function (index) {
  active.value = index
}

nextTick(() => {
  const weather = echarts.init(document.getElementById('box-weather'))
  const peoplebox = echarts.init(document.getElementById('box-people'))
  const totalbox = echarts.init(document.getElementById('box-total'))
  weather.setOption(moneyOptions)
  peoplebox.setOption(sexOptions)
  totalbox.setOption(ageOptions)
})

</script>

<style lang="less" scoped>
@import url("../../style/common.less");
@import url("../../style/minxin.less");

.cards {
  display: flex;
  height: 160px;

  .el-col {
    height: 100%;
  }

  .card-item {
    position: relative;
    height: 100%;
    border-radius: 12px;
    padding: 25px 10px 10px 20px;

    .card-value {
      font-size: 32px;
      font-weight: 500;
      margin-top: 10px;
    }

    .card-title {
      .font(16px, #211717, 400);
    }

    .card-icon {
      position: absolute;
      top: 50%;
      right: 15px;
      .wh(50px, 50px);
      .flex(row, center, center);
      transform: translateY(-50%);
      border-radius: 6px;
      .font(36px, #fff, 400);
    }

  }

}

#box-people,
#box-weather {
  height: 320px;
}

#box-total {
  width: 100%;
  height: 420px;
}</style>
