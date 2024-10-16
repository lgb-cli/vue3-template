<template>
  <div class="watermark container_card page_content">
    <h3 class="page_title">水印</h3>
    <Upload />
    <div>
      <img id="source_img" class="preview_img" src="../../assets/images/test.png" alt="">
      <canvas id="water_preview" width="200" height="200"></canvas>
    </div>
    <el-button type="primary" @click="addMark">添加水印</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { uploadImage } from '../../api/api';
import Upload from '../../components/common/upload.vue';

async function addMark() {
  let target = document.getElementById('water_preview');
  let ctx = target.getContext('2d');
  let source_img = document.getElementById('source_img');
  ctx.drawImage(source_img, 0, 0, 200, 200);
  ctx.font = 'bold 30px Microsoft YaHei';
  ctx.save();
  ctx.rotate(Math.PI / 6);
  ctx.fillText('水印', 30, 30);
  ctx.restore();
  // let base64 = target.toDataURL();
  // console.log(base64);
  target.toBlob(async function (blob) {
    //blob 转 文件对象
    let file = new File([blob], 'watermark.png');
    await uploadImage({
      file: file,
    });
  }, 'image/png');
  // 上传图片
  // await uploadImage({
  //   file: base64,
  // });
}
</script>

<style lang="less" scoped>
.watermark {
  .preview_img {
    width: 200px;
    height: 200px;
  }
}
</style>