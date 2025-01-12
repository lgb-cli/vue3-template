<template>
  <div :id="id" class="echart_box">
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
const getMapJson = () => import('../../plugins/410000.json');

const mychart = ref(null);
const props = defineProps({
  id: {
    type: String,
    default: 'chart',
  },
  data: {
    type: Array,
    default: () => [],
  },
  options: {},
});
onMounted(async () => {
  await nextTick();
  init();
  // window.addEventListener('resize', resize);
});
onUnmounted(() => {
  // window.removeEventListener('resize', resize);
});
function resize() {
  if (!mychart.value) return;
  console.log('调用了12');
  mychart.value.resize();
}
function init() {
  if (mychart.value) return;
  mychart.value = echarts.init(document.getElementById(props.id));
  getMapJson()
    .then((res) => {
      const geoJson = res.default;
      echarts.registerMap('HENAN', geoJson);
      mychart.value && mychart.value.setOption(props.options);
    })

    .catch((err) => console.log(err));
}
defineExpose({
  resize,
});
</script>

<style lang="less" scoped>
.echart_box {
  width: 100%;
  height: 100%;
}
</style>