import { reactive, watch, toRefs } from 'vue';
import { useIndexStore } from '../pinia';
import { storeToRefs } from 'pinia';
export const useSetting = function () {
  const indexStore = useIndexStore();
  const { settingParams } = storeToRefs(indexStore);
  
  const settingObj = reactive({
    animation: 1,
    themeColor: '#00b494',
  })
  
  for(let key in settingParams.value) {
    settingObj[key] = settingParams.value[key];
  }
  function setTheme() {
    let colorStr = settingObj.themeColor; 
    console.log(colorStr, 'colorStr');
    document.documentElement.style.setProperty('--primary-color', colorStr);
    document.documentElement.style.setProperty('--el-color-primary', colorStr);
    document.documentElement.style.setProperty('--el-tag-border-color', colorStr);
    document.documentElement.style.setProperty('--el-color-primary-light-5', colorStr);
  }
  function setAnimationClass() {
    document.documentElement.dataset.animation = settingObj.animation == 1 ? 'animation_class' : '';
  }
  watch(settingObj, (newVal) => {
    indexStore.setSettingParams(newVal);
    setTheme();
    setAnimationClass();
  },{
    immediate: true
  })
  return {
    settingObj,
  }
}