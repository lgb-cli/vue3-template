<template>
  <div class="menu" :style="{ width: collapseFlag ? '64px' : '220px' }">
    <div class="logo" @click="alertHandle">
      <img src="../assets/system_icon.png" alt="" /><span class="text" v-show="!collapseFlag">管理系统</span>
    </div>
    <el-menu background-color="#324157" :collapse="collapseFlag" text-color="#d7d7d7" active-text-color="#fff" :default-active="active" router :unique-opened="true">
      <template v-for="item in menu" :key="item.id">
        <el-sub-menu v-if="item.children" :index="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="city.path" v-for="city in item.children" :key="city.id" @click="clickBar">
              <span>{{ city.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item :index="item.path" @click="clickBar" v-else>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { HomeFilled } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useIndexStore } from '../pinia/index';
import getRoutes from '../api/getRoute.js';
// import { menu1, menu2, menu3 } from './menu.js';
import { getLocalItem, setLocalItem } from '../utils/localData.ts';
import { useRoute } from 'vue-router';
const menu = ref([]);
const route = useRoute();

const active = ref('/home');
const mainStore = useIndexStore();

const { collapseFlag, setRoutesList } = storeToRefs(mainStore);

getRoutes().then((res) => {
  menu.value = res;
  setLocalItem('routesList', res);
});

watch(
  () => route.path,
  (newVal) => {
    clickBar({ index: newVal });
  },
  {
    immediate: true,
  }
);
function clickBar(data) {
  active.value = data.index;
  let pageArr = [];
  menu.value.length &&
    menu.value.map((item) => {
      if (item.path == data.index) {
        pageArr.push({ title: item.label, path: item.path });
      } else {
        item.children?.map((option) => {
          if (option.path == data.index) {
            pageArr = [
              { title: item.label },
              { title: option.label, path: option.path },
            ];
          }
        });
      }
    });
  mainStore.setBreadList(pageArr);
}
</script>
<style lang="less">
.el-menu-item-group .el-menu-item-group__title {
  display: none;
}
</style>
<style lang="less" scoped>
.menu {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #324157;
  .el-menu {
    height: calc(100% - 50px);
    border-right: none;
  }

  .el-menu-item.is-active {
    background-color: var(--primary-color);
  }

  .logo {
    width: 100%;
    height: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    z-index: 999;

    img {
      width: 28px;
      height: 26px;
      margin-right: 5px;
    }
  }
}
</style>
