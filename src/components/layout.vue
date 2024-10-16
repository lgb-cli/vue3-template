<template>
  <side-bar class="side-bar"></side-bar>
  <div class="container" :style="{ marginLeft: collapseFlag ? '64px' : '220px' }">
    <Nav @refleshHandle="refleshHandle" class="nav" />
    <PageTag class="page-tag" />
    <div class="main" v-if="showFlag">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, watch, nextTick, ref } from 'vue';
import Nav from './Nav.vue';
import SideBar from './SideBar.vue';
import PageTag from './PageTag.vue';
import { useIndexStore } from '../pinia/index';
import { storeToRefs } from 'pinia';
const showFlag = ref(true);
const mainStore = useIndexStore();
const { collapseFlag } = storeToRefs(mainStore);

async function refleshHandle() {
  showFlag.value = false;
  await nextTick();
  showFlag.value = true;
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
  .main {
    position: absolute;
    top: 110px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #e4e4e4;
    overflow-y: auto;
    padding: 0 20px;
  }
}
html[data-animation='animation_class'] {
  .side-bar {
    animation: animation_class1 0.5s ease-in;
  }
  .nav {
    animation: animation_class2 0.5s ease-in;
  }
  .page-tag {
    animation: animation_class3 0.5s ease-in;
  }
  .main {
    animation: animation_class4 0.8s;
  }
  @keyframes animation_class1 {
    from {
      transform: translateX(-300px);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes animation_class2 {
    from {
      transform: translateY(-300px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes animation_class3 {
    from {
      transform: translateY(-300px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes animation_class4 {
    from {
      transform: translateX(1600px);
    }
    to {
      transform: translateX(0);
    }
  }
}
</style>
