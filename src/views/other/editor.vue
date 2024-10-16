<template>
  <div class="editor_box">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" />
    <div class="editor_btn">
      <el-button type="default" @click="getHtml">获取内容</el-button>
      <el-button type="default" @click="setHtml">设置内容</el-button>
      <el-button type="default" @click="clear">清除</el-button>
    </div>
    <el-dialog v-model="dialogFlag" title="内容" center append-to-body>
      <span v-html="valueHtml">

      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFlag = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFlag = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { ElMessage } from 'element-plus';
const editorConfig = {
  placeholder: '请输入内容',
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload/image',
      fieldName: 'file',
      maxFileSize: 10 * 1024 * 1024,
      onSuccess: (file: File, res: any) => {
        console.log(res, 'success');
      },
      // 单个文件上传失败
      onFailed(file: File, res: any) {
        // TS 语法
        // onFailed(file, res) {           // JS 语法
        console.log(`${file.name} 上传失败`, res);
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {
        // TS 语法
        // onError(file, err, res) {               // JS 语法
        console.log(`${file.name} 上传出错`, err, res);
      },
    },
  },
};
const toolbarConfig = {};

const editorRef = shallowRef();
const valueHtml = ref('');

const dialogFlag = ref(false);

function handleCreated(editor) {
  editorRef.value = editor;
}

function getHtml() {
  console.log(valueHtml.value, 'value');
  if (!valueHtml.value || valueHtml.value === '<p><br></p>')
    return ElMessage.info('请输入内容');
  dialogFlag.value = true;
}

function setHtml() {
  editorRef.value.setHtml('这里是设置的内容。。。。。');
}
function clear() {
  editorRef.value.setHtml('');
}
</script>

<style lang="less" scoped>
.editor_box {
  padding: 10px;
  background-color: #fff;
}
.editor_btn {
  position: sticky;
  bottom: 10px;
  left: 20px;
}
</style>
