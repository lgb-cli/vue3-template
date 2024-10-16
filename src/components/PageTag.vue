<template>
  <div class="pageTags" :style="{ left: mainStore.collapseFlag ? '64px' : '220px' }">
    <el-tag v-for="(tag,index) in tagsList" :key="tag.path" class="mx-1" :closable="tag.path == '/home' ? false : true" :effect="active == tag.path ? 'dark' : 'plain'" :disable-transitions="false" @close="handleClose(tag,index)" @click="changePage(tag.path,index)" :ref="tagRef" size="large">
      {{ tag.title }}
    </el-tag>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { useIndexStore } from '../pinia/index.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const active = ref('');
const tagRefs = ref([]);
const tagRef = (el) => {
  tagRefs.value.push(el);
};
const mainStore = useIndexStore();
const tagsList = reactive([
  {
    title: '首页',
    path: '/home',
  },
]);
watch(
  () => mainStore.breadList,
  (newVal) => {
    if (newVal.length == 0) {
      return;
    }
    let pathObj = newVal[newVal.length - 1];
    console.log(newVal, 'val');
    let index = tagsList.findIndex((item) => item.path == pathObj.path);
    if (index == -1) {
      tagsList.push(pathObj);
    }
    active.value = pathObj.path;
  },
  { immediate: true }
);

function handleClose(tag, i) {
  let index = tagsList.findIndex((item) => item.path == tag.path);
  if (index != -1) {
    tagsList.splice(index, 1);
    if (i - 1 >= 0) {
      let url = tagsList[i - 1] ? tagsList[i - 1].path : tagsList[0].path;
      changePage(url);
    }
  }
}

function changePage(path, index) {
  active.value = path;
  // tagRefs.value[index].$el.scrollIntoView({
  //   behavior: 'smooth',
  //   inline: 'center',
  // });
  console.log(path);
  router.push({ path: path });
}
</script>

<style lang="less" scoped>
.pageTags {
  position: fixed;
  top: 50px;
  right: 0;
  margin: auto;
  height: 40px;
  padding: 5px 10px 0 10px;
  background-color: #fff;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
