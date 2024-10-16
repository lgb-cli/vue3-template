<template>
  <div class="upload-container">
    <div class="upload_box">
      <div class="img_box">
        <div class="icon_box">
          <el-icon>
            <Plus />
          </el-icon>
        </div>
        {{fileType}}
        <input type="file" @change="handleChange" :multiple="multiple" :accept="fileType == 'image' ? IMGAGE_TYPE : FILE_TYPE">
      </div>
      <div class="upload_list" v-if="previewList.length > 0">
        <div class="upload_item" v-for="(item, index) in previewList" :key="index">
          <img :src="item.url" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { uploadImage } from '../../api/api';
import { requestConcurrent } from '../../utils/tool';
const IMGAGE_TYPE = 'jpg,jpeg,png,gif,bmp,webp';
const FILE_TYPE = '.doc,.docx';
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRO_BASE_URL
  : import.meta.env.VITE_DEV_BASE_URL;
const props = defineProps({
  fileType: {
    type: String,
    default: 'image', //file 文件上传 image 图片上传
  },
  multiple: {
    type: Boolean,
    default: true,
  },
});
const formRef = ref(null);
const previewList = ref([]);
const handleChange = (e: any) => {
  let fileList = Array.from(e.target.files);
  previewList.value = getFilePreviewUrl(fileList);
  let requestList = fileList.map((file) => () => uploadRequest(file));
  const result = requestConcurrent(requestList, 3);
  console.log(result);
};
const uploadRequest = (file: File) => {
  let formData = new FormData();
  formData.append('file', file);
  return uploadImage(formData);
};
function getFilePreviewUrl(fileList) {
  return fileList.map((file) => {
    return {
      url: URL.createObjectURL(file),
    };
  });
}
</script>

<style scoped lang="less">
.upload-container {
  overflow: hidden;
  .upload_box {
    display: flex;
    flex-wrap: wrap;
    .img_box {
      width: 140px;
      height: 140px;
      position: relative;
      border: 1px dashed #ccc;
      border-radius: 10px;
      margin: 8px;
      overflow: hidden;
      cursor: pointer;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 10;
      }
      .icon_box {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-icon {
          font-size: 24px;
          color: #ccc;
        }
      }
    }
  }
  .upload_list {
    display: flex;
    flex-wrap: wrap;
    .upload_item {
      width: 140px;
      height: 140px;
      margin: 8px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

