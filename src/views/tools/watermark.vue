<template>
  <div class="watermark container_card page_content">
    <h3 class="page_title">水印</h3>
    <div class="water_container">
      <div>
        <img id="source_img" class="preview_img" src="../../assets/images/test.png" alt="">
        <canvas id="water_preview" width="200" height="200"></canvas>
      </div>
      <el-button type="primary" @click="addMark">添加水印</el-button>
    </div>

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
  ctx.font = 'bold 18px Microsoft YaHei';
  ctx.save();
  ctx.translate(-80, -50); // 设置旋转中心点为画布中心
  ctx.rotate(-Math.PI / 8);
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // 设置填充颜色为红色，透明度为0.5
  let startX = 0,
    startY = 0;
  while (startX < 300) {
    ctx.fillText('水印', startX, startY);
    while (startY < 300) {
      startY += 40;
      ctx.fillText('水印', startX, startY);
    }
    startX += 50;
    startY = 0;
  }
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
.water_container {
  padding: 20px;
}
.watermark {
  .preview_img {
    width: 200px;
    height: 200px;
  }
}
#water_preview {
  margin-left: 20px;
}
</style>