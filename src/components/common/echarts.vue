<template>
  <div :id="id" class="echart_box">
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
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
  console.log('调用了1');
  mychart.value.resize();
}
function init() {
  if (mychart.value) return;
  mychart.value = echarts.init(document.getElementById(props.id));

  mychart.value && mychart.value.setOption(props.options);
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