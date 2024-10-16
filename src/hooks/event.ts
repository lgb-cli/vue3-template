import { ref, onMounted, onUnmounted } from 'vue';
import { fullScreenHandle, exitFullScreen } from '../utils/event';
// 全局管理全屏状态
export const useFullScreen = function () {
  const isFullScreen = ref(false);
  const screenHandle = function () {
    isFullScreen.value = !isFullScreen.value;
    if (isFullScreen.value) {
      fullScreenHandle();
    } else {
      exitFullScreen();
    }
  }
  const screenChange = function(res: any) {
    isFullScreen.value = document.fullscreenElement ? true : false;
  }
  onMounted(() => {
    window.addEventListener('fullscreenchange', screenChange);
  })
  onUnmounted(() => {
    window.removeEventListener('fullscreenchange', screenChange);
  })
  return {
    isFullScreen,
    screenHandle,
  }
}

// 
