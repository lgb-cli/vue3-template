<template>
  <div class="container_card">
    <div class="demo1">
      <!-- :duration="{enter: 2000, leave: 2000}" -->
      <transition name="demo1" mode="out-in">
        <h3 v-if="show" @transitionend="endHandle">点击按钮控制元素销毁渲染</h3>
        <h3 v-else>元素切换了</h3>
      </transition>
      <el-button @click="handleClick">点击</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
const handleClick = () => {
  console.log('click');
  show.value = !show.value;
};
const endHandle = () => {
  console.log('end');
};
</script>

<style lang="less" scoped>
.demo1 {
  padding: 20px;
  h3 {
    margin-bottom: 20px;
  }
}
.demo1-enter-active,
.demo1-leave-active {
  transition: all 1s;
}
.demo1-enter-from {
  opacity: 0;
  transform-origin: 50% 0;
  transform: translateX(-50px) scale(1.2);
}
.demo1-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.8);
}
</style>