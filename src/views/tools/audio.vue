<template>
  <div class="container_card">
    <MyAudio :src="url"></MyAudio>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyAudio from '../../components/common/my-audio.vue';
const url = ref('');
import('../../assets/audio/onepeoplefine.mp3').then((res) => {
  console.log(res, 'res');
  url.value = res.default;
});
// 'https://m10.music.126.net/20241018235300/62b6bb25877104ba95834329bce1ca88/ymusic/555d/015c/035b/b7f3a2c20066705fc4ac411631836cd0.mp3';
</script>

<style lang="less" scoped>
</style>