<template>
  <div class="login_container">
    <div class="login_box">
      <h2>管理后台登录</h2>
      <el-form :model="formdata" class="baseinfo-prescription" label-width="90px">
        <el-form-item label="账号">
          <el-input type="text" v-model="formdata.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formdata.password" autocomplete="off" clear></el-input>
        </el-form-item>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="loginHandle">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
interface user {
  account: String;
  password: String | Number;
}
const formdata = reactive({
  account: '',
  password: '',
});
const router = useRouter();
const fullscreenLoading = ref(false);
function loginHandle() {
  if (formdata.account == '' || formdata.password == '') {
    return ElMessage.warning('请输入账号密码');
  } else {
    fullscreenLoading.value = true;
    window.localStorage.setItem('Account', formdata.account);
    window.localStorage.setItem('Password', formdata.password);
    if (formdata.account == 'admin') {
      localStorage.setItem('role', '1');
      localStorage.setItem('username', '超级管理员');
    } else if (formdata.account == 'admin1') {
      localStorage.setItem('role', '2');
      localStorage.setItem('username', '普通管理员');
    } else {
      localStorage.setItem('role', '3');
      localStorage.setItem('username', '访客');
    }
    setTimeout(() => {
      fullscreenLoading.value = true;
      router.push({ path: '/home' });
    }, 1000);
  }
}
</script>

<style scoped lang="less">
.login_container {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../../assets/images/login.png) no-repeat;
  background-size: 100% 100%;
}
.login_box {
  position: absolute;
  left: 60%;
  top: 50%;
  transform: translateY(-50%);
  width: 420px;
  height: 320px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.3);
  padding-top: 20px;
  box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.4);
  h2 {
    text-align: center;
    color: #00b494;
    font-size: 30px;
    letter-spacing: 10px;
    text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.08);
  }
  .el-form {
    margin-top: 30px;
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-input {
      height: 45px;
    }
    :deep(.el-input__wrapper) {
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: none;
      border-radius: 10px;
      &:hover {
        box-shadow: 0px 0px 1px rgb(0, 180, 148) inset;
      }
    }
  }
}
</style>
