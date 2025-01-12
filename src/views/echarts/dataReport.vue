<template>
  <div class="dataReport">
    <header>
      <span class="left_arrow" @click="backHandle">
        <el-icon>
          <component :is="icons.DArrowLeft"></component>
        </el-icon>
        返回
      </span>
      <span>数据服务平台</span>
    </header>
    <div class="main">
      <section class="main_item">
        <section class="static_total">
          <ul class="todo_lists">
            <li class="todo_list_item">
              <el-icon>
                <component :is="icons.Tools" />
              </el-icon>
              <div class="todo_list_info">
                <div class="todo_list_title">待办事项</div>
                <div class="todo_list_num text-elipse">{{ 88 }}<span>件</span></div>
              </div>
            </li>
            <li class="todo_list_item">
              <el-icon>
                <component :is="icons.Tools" />
              </el-icon>
              <div class="todo_list_info">
                <div class="todo_list_title">已办理事项</div>
                <div class="todo_list_num text-elipse">{{ 188 }}<span>件</span></div>
              </div>
            </li>
            <li class="todo_list_item">
              <el-icon>
                <component :is="icons.Tools" />
              </el-icon>
              <div class="todo_list_info">
                <div class="todo_list_title">办理中事项</div>
                <div class="todo_list_num text-elipse">{{ 88 }}<span>件</span></div>
              </div>
            </li>
            <li class="todo_list_item">
              <el-icon>
                <component :is="icons.Tools" />
              </el-icon>
              <div class="todo_list_info">
                <div class="todo_list_title">已结束事项</div>
                <div class="todo_list_num text-elipse">{{ 288 }}<span>件</span></div>
              </div>
            </li>

          </ul>
        </section>
        <section class="bar_total_ver">
          <transition-group class="bar_list" name="bar-list" tag="ul">
            <li class="bar__list_item" v-for="(item,index) in barData" :key="item.id">
              <span>{{item.name}}</span>
              <div class="progress_box">
                <div class="progress_bar" :style="{width: item.percent + '%'}"></div>
              </div>
              <span class="num">{{item.value}}</span>
              <span class="unit">万个</span>
            </li>
          </transition-group>
        </section>
        <section class="bar_total_hor">
          <EchartComponent ref="echartsRef1" id="bar_total_hor" :options="bar_total" key="bar_1" />
        </section>
      </section>
      <section class="main_item">
        <section class="map_box">
          <MapEchartComponent ref="echartsRef2" id="map-cahrt" :options="map_options" key="map_chart" />
        </section>
        <section class="bar_bottom">
          <EchartComponent ref="echartsRef3" id="bar_total_3d" :options="bar_3d_total" key="bar_3d" />
        </section>
      </section>
      <section class="main_item">
        <section class="pie_total">
          <EchartComponent ref="echartsRef4" id="pie_total1" :options="pie_total" key="pie_1" />
        </section>
        <section class="deal_bar_total">
          <EchartComponent ref="echartsRef5" id="bar_total_hor2" :options="bar_total2" key="bar_2" />
        </section>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw, onMounted, onUnmounted, ref, reactive } from 'vue';
import autofit from 'autofit.js';
import { Tools, DArrowLeft } from '@element-plus/icons-vue';
import MyEchart from '../../components/common/echarts.vue';
import MapEchart from '../../components/common/map-echart.vue';
import { debounce } from '../../utils/tool';
import { BarDataType } from '../../types/data';
import { useRoute, useRouter } from 'vue-router';
import {
  bar_total,
  bar_total2,
  pie_total,
  bar_3d_total,
  map_options,
} from '../../echarts/options';

const router = useRouter();

const EchartComponent = markRaw(MyEchart);
const MapEchartComponent = markRaw(MapEchart);

const echartsRef1 = ref(null);
const echartsRef2 = ref(null);
const echartsRef3 = ref(null);
const echartsRef4 = ref(null);
const echartsRef5 = ref(null);

const icons = {
  Tools: markRaw(Tools),
  DArrowLeft: markRaw(DArrowLeft),
};
const timer = ref(null);

const barData = reactive<BarDataType[]>([
  {
    name: '数据一',
    value: 2000,
    percent: 0,
    id: 1,
  },
  {
    name: '数据二',
    value: 3000,
    percent: 0,
    id: 2,
  },
  {
    name: '数据三',
    value: 4000,
    percent: 0,
    id: 3,
  },
  {
    name: '数据四',
    value: 5000,
    percent: 0,
    id: 4,
  },
  {
    name: '数据五',
    value: 6000,
    percent: 0,
    id: 5,
  },
  {
    name: '数据六',
    value: 7000,
    percent: 0,
    id: 6,
  },
  {
    name: '数据七',
    value: 8000,
    percent: 0,
    id: 7,
  },
]);

onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: 'body',
    resize: true,
  });
  shuffle(barData);
  timer.value = setInterval(() => {
    shuffle(barData);
  }, 3000);
});
onUnmounted(() => {
  clearInterval(timer.value);
  autofit.off();
});

function backHandle() {
  router.back();
}

// 打乱数组顺序
function shuffle(array: BarDataType[]): void {
  array.forEach((item) => {
    item.value = Math.floor(Math.random() * 10000);
    item.percent = (item.value / 10000) * 100;
  });
  array.sort((a, b) => {
    return b.value - a.value;
  });
}
</script>

<style lang="less" scoped>
.dataReport {
  width: 100%;
  height: 100%;
  background-color: #000748;
  header {
    height: 80px;
    font-size: 48px;
    color: #fff;
    text-align: center;
    line-height: 80px;
    font-family: 楷体;
    .left_arrow {
      float: left;
      color: #fff;
      font-size: 21px;
      margin-left: 20px;
      font-family: '微软雅黑';
      cursor: pointer;
      &:hover {
        color: #d2d2d2;
      }
    }
  }
  .main {
    height: calc(100% - 80px);
    display: flex;
    padding: 10px;
    .main_item {
      flex: 1 0;
      height: 100%;
      margin: 0 10px;
      border: 1px solid #239ee8;
    }
    .static_total {
      height: 320px;
      overflow: hidden;
      border-bottom: 1px dashed #239ee8;
      .todo_lists {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin: 30px 0 0 0;
        .todo_list_item {
          display: flex;
          align-items: center;
          width: 260px;
          height: 120px;
          border-radius: 8px;
          padding: 10px 14px;
          margin: 0 16px 16px 0;
          background: #030a5c;
          border-radius: 12px;
          box-shadow: 0 0 20px 10px #020a87 inset;
          .el-icon {
            color: #fff;
            margin: 0 14px 0 0;
            font-size: 48px;
          }
          .todo_list_info {
            flex: 1;
            overflow: hidden;
            .todo_list_title {
              font-size: 24px;
              color: #fff;
              margin: 10px 0;
            }
            .todo_list_num {
              font-size: 32px;
              color: #30d7e1;
              text-align: right;
              span {
                font-size: 24px;
                color: #fff;
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
    .bar_total_ver {
      height: 350px;
      padding: 0 16px;
      overflow: hidden;
      border-bottom: 1px dashed #239ee8;
      .bar_list {
        height: 320px;
        margin-top: 20px;
        overflow: hidden;
      }
      .bar__list_item {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 18px;
        margin-bottom: 25px;
      }
      .progress_box {
        flex: 1;
        height: 20px;
        background: #010170;
        border-radius: 8px;
        margin: 0 16px;
        overflow: hidden;
      }
      .progress_bar {
        width: 0%;
        height: 100%;
        border-radius: 8px;
        background: linear-gradient(to right, #0337ff 0%, #30d7e1 100%);
        transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .num {
        color: #30d7e1;
        margin-right: 8px;
        font-family: 'Times New Roman', Times, serif;
      }
      .unit {
        font-size: 14px;
        color: #30d7e1;
      }
    }
    .bar_total_hor {
      height: 300px;
    }
    .map_box {
      height: 620px;
      border-bottom: 1px dashed #239ee8;
    }
    .bar_bottom {
      height: 360px;
    }
    .pie_total {
      height: 600px;
      border-bottom: 1px dashed #239ee8;
    }
    .deal_bar_total {
      height: 380px;
    }
  }
}
.bar-list-move,
.bar-list-enter-active,
.bar-list-leave-active {
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.bar-list-enter,
.bar-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.bar-list-leave-active {
  position: absolute;
}
</style>