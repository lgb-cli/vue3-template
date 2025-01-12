<template>
  <div class="container_card page_content">
    <div class="page_title">聊天室</div>
    <div class="chat_box">
      <div class="chat_header">机器人</div>
      <div class="chat_main scroll_bar_style" ref="chatListRef">
          <template v-for="(item,index) in msgList">
            <div class="chat_target msg_list_item" v-if="item.sourceType === 1">
              <span class="img_avator">AI</span>
              <div class="msg_content">{{item.msg}}</div>
            </div>
            <div class="chat_mine msg_list_item" v-else>
              <div class="msg_content">{{item.msg}}</div>
              <span class="img_avator">我</span>
            </div>
          </template>
      </div>
      <dov class="chat_footer">
        <el-input type="textarea" resize="none" placeholder="请输入内容..." v-model.trim="messageText"></el-input>
        <el-button type="primary" class="send_btn" @click="sendMsgHandle">发送</el-button>
      </dov>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onUnmounted, ref} from 'vue';
import { ElMessage } from "element-plus";
import { children } from 'dom7';
let ws = null
const msgList = ref([])
const messageText = ref('')
const chatListRef = ref(null)
init();
onUnmounted(() => {
  ws && ws.close()
  ws = null
})
function init() {
  if ('WebSocket' in window) {
    if(ws) return;
     ws = new WebSocket('ws://127.0.0.1:3000');
    ws.onopen = function () {
      console.log('连接成功');
    };
    ws.onmessage = function (e) {
      console.log(e,'e')
        let data = e.data && JSON.parse(e.data) || ''
      if(data.code == 200) {
        msgList.value.push({
          ...data,
          sourceType: 1
        })
        lastElScrollToView()
      }
    };
    ws.onclose = function () {
      console.log('连接关闭');
    };
    ws.onerror = function (err) {
      console.log(err)
    }
  } else {
    alert('您的浏览器不支持WebSocket');
    return;
  }
}


function sendMsgHandle() {
  if(messageText.value == '') {
    return ElMessage.info('发送的内容不能为空');
  }
  let data = {
    msg: messageText.value,
    code: 200,
    sourceType: 0
  }
  msgList.value.push(data)
  ws.send(messageText.value,{ })
  lastElScrollToView()

}
function lastElScrollToView() {
  nextTick(() => {
    let childrenEl = chatListRef.value.children
    let lastChildEl = childrenEl[childrenEl.length - 1]
    if(lastChildEl) {
      lastChildEl.scrollIntoView({
        smooth: true,
      })
    }
  })
}
</script>

<style scoped lang="less">
.chat_box {
  display: flex;
  flex-direction: column;
  height: calc(100% - 90px);
  padding: 20px;
  .chat_header {
    height: 50px;
    line-height: 50px;
    background-color: var(--el-color-primary);
    text-indent: 10px;
    color: #fff;
  }
  .chat_footer {
    position: relative;
    height: 100px;
    border: 1px solid #d2d2d2;
    .el-textarea {
      width: 100%;
      height: 100%;
    }
    :deep(.el-textarea__inner) {
      width: 100%;
      height: 100%;
      box-shadow: none;
    }
    .send_btn {
      position: absolute;
      right: 0;
      bottom: -40px;
    }
  }
  .chat_main {
    flex: 1;
    border: 1px solid #d2d2d2;
    border-bottom: none;
  }

}
.chat_main {
  padding: 10px 0;
  overflow-y: auto;
  .msg_list_item {
    display: flex;
    margin-top: 10px;

    .img_avator {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      line-height: 45px;
      text-align: center;
      background-color: #67C23A;
      color: #fff;
      margin: 0 12px 0 16px;
    }
    .msg_content {
      position: relative;
      height: fit-content;
      padding: 8px 10px;
      background-color: #67C23A;
      color: #fff;
      font-family: 楷体;
      max-width: 400px;
      border-radius: 0 6px 6px 6px;
      &::after {
        content: '';
        position: absolute;
       border-top: 6px solid #67C23A;
        border-bottom: 6px solid transparent;
        border-left: 6px solid transparent;
        border-right: 6px solid #67C23A;
      }

    }
    &.chat_target {
      justify-content: flex-start;
      .msg_content {
        &::after {
          left: -12px;
          top: 0;
        }
      }
    }
    &.chat_mine {
      justify-content: flex-end;
      .img_avator {
        margin: 0 16px 0 12px;
        background-color: #409EFF;
      }
      .msg_content {
        background-color: #409EFF;
        border-radius: 6px 0 6px 6px;
        &::after {
          left: inherit;
          right: -12px;
          top: 0;
          border-top-color: #409EFF;
          border-right-color: transparent;
          border-left-color: #409EFF;
          border-bottom-color: transparent;
        }
      }
    }
  }
}
</style>