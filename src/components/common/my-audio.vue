<template>
  <div class="my-audio">
    <audio ref="audioRef" controls="controls" :src="src" :autoplay="autoplay" :loop="loop" :muted="muted" :preload="preloadMap">
      <p>您的浏览器不支持 audio 标签。</p>
    </audio>
    <p class="tips">{{tips}}</p>
    <el-button @click="play">播放</el-button>
    <el-button @click="pause">暂停</el-button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  preload: {
    type: String,
    default: 1, // 1 'auto' 2 'metadata' 3 'none'
  },
});
const tips = ref('');
const preloadMap = computed(() => {
  switch (props.preload) {
    case 1:
      return 'auto';
    case 2:
      return 'metadata';
    case 3:
      return 'none';
    default:
      return 'auto';
  }
});
const audioRef = ref(null);
// 播放
function play() {
  audioRef.value.play();
  tips.value = '播放中';
}
// 暂停
function pause() {
  audioRef.value.pause();
  tips.value = '暂停了';
}
// 重新加载
function reload() {
  audioRef.value.load();
  tips.value = '重新加载';
}
function playEnd() {
  console.log('播放结束');
  tips.value = '播放结束';
}
// 播放进度
function updateTime() {
  console.log('跳转了');
  tips.value = '跳转了';
}
// 设置播放时间
function setTimeTo(time) {
  audioRef.value.currentTime = time;
  tips.value = '跳转到' + time;
}
//设置音量
function setVolume(volume) {
  audioRef.value.volume = volume;
  tips.value = '音量设置为' + volume;
}
onMounted(() => {
  audioRef.value && audioRef.value.addEventListener('ended', playEnd);
  audioRef.value && audioRef.value.addEventListener('timeupdate', updateTime);
});
onUnmounted(() => {
  audioRef.value && audioRef.value.removeEventListener('ended', playEnd);
  audioRef.value &&
    audioRef.value.removeEventListener('timeupdate', updateTime);
});
defineExpose({
  play,
  pause,
});
</script>

<style lang="less" scoped>
.my-audio {
  padding: 40px;
  .tips {
    margin: 20px;
    font-size: 18px;
    color: aquamarine;
    margin-bottom: 20px;
  }
  .el-button {
    margin-right: 20px;
  }
}
</style>