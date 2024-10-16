
<template>
  <nav :style="{ left: mainStore.collapseFlag ? '64px' : '220px' }">
    <div class="left-box">
      <el-icon size="28px" class="btn" @click="expandHandle">
        <component :is="icons[isExpand ? 'Expand' : 'Fold']" />
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" class="bread_list">
        <el-breadcrumb-item :to="{ path: item.path || '' }" v-for="(item, index) in breadList" :key="index">{{ item.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tools">
      <el-icon @click="refreshHandle">
        <component :is="icons.Refresh" />
      </el-icon>
      <el-icon @click="screenHandle">
        <component :is="icons.FullScreen" />
      </el-icon>
      <el-dropdown>
        <div class="user_box">
          <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ooGOtfne6QeEzzVi2ZRQIQAAAA?w=218&h=218&c=7&r=0&o=5&dpr=2&pid=1.7" alt="" />
          <span class="user">{{ username }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="upRightBar">设置</el-dropdown-item>
            <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <teleport to='body'>
      <el-drawer v-model="drawerFlag" direction="rtl">
        <template #header>
          <h4>动态参数设置</h4>
        </template>
        <template #default>
          <el-form :model="settingObj">
            <el-form-item label="首页渲染动画:">
              <el-radio-group v-model="settingObj.animation">
                <el-radio :label="1" size="large">
                  有
                </el-radio>
                <el-radio :label="0" size="large">
                  无
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="主题色:">
              <el-color-picker v-model="settingObj.themeColor" />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button type="primary" @click="drawerFlag = false">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </teleport>
  </nav>
</template> 
<script setup>
import { ref, reactive, watch, markRaw } from 'vue';
import {
  Fold,
  Expand,
  ArrowRight,
  FullScreen,
  Refresh,
} from '@element-plus/icons-vue';
import { useFullScreen } from '../hooks/event';

import { storeToRefs } from 'pinia';
import { useIndexStore } from '../pinia/index';
import { useRouter } from 'vue-router';
import { deleteLocalItem, getLocalItem } from '../utils/localData';
import { useSetting } from '../hooks/settings';
const icons = {
  Fold: markRaw(Fold),
  Expand: markRaw(Expand),
  ArrowRight: markRaw(ArrowRight),
  FullScreen: markRaw(FullScreen),
  Refresh: markRaw(Refresh),
};
const emits = defineEmits(['refleshHandle']);

const isExpand = ref(false);
const isFullScreen = ref(false);
const drawerFlag = ref(false);

const mainStore = useIndexStore();
const { breadList } = storeToRefs(mainStore);
const { screenHandle } = useFullScreen();
const { settingObj } = useSetting();
const router = useRouter();
const username = getLocalItem('username');

function expandHandle() {
  isExpand.value = !isExpand.value;
  mainStore.collapseFlag = isExpand.value;
}
function refreshHandle() {
  emits('refleshHandle');
}
function loginout() {
  deleteLocalItem('role');
  router.push({ path: '/login' });
}
// 设置
function upRightBar() {
  drawerFlag.value = true;
}
</script>



<style lang="less" scoped>
nav {
  position: fixed;
  top: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #e8e8e8;
  box-sizing: border-box;
  border-bottom: 1px solid #d0d0d0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

  .left-box {
    display: flex;
    align-items: center;
    .btn {
      margin: 0 10px;
    }
  }
  .tools {
    display: flex;
    align-items: center;
    padding-right: 16px;
    cursor: pointer;
    .user_box {
      line-height: 34px;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      vertical-align: bottom;
      margin-right: 8px;
    }
    .user {
      font-size: 16px;
      color: #575757;
    }
    .el-icon {
      margin-right: 10px;
      font-size: 21px;
      color: #42423f;
    }
  }
}
.drawer-content-item {
  display: flex;
  align-items: center;
  span {
    width: 100px;
  }
}
</style>
