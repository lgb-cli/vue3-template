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
        <el-button type="primary" @click="loginHandle">登录</el-button>
      </el-form>
    </div>
  </div>
  <teleport to='body'>
    <div class="mask_box" v-if="fullscreenLoading">
      <span class="loader_box"></span>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getLocalItem, setLocalItem, setSItem } from '../../utils/localData';
interface user {
  account: string;
  password: string;
}
const formdata = reactive<user>({
  account: 'admin',
  password: 'admin123',
});
const router = useRouter();
const fullscreenLoading = ref(false);
function loginHandle() {
  if (formdata.account.trim() == '' || formdata.password.trim() == '') {
    return ElMessage.warning('请输入账号密码');
  } else {
    fullscreenLoading.value = true;
    setLocalItem('Account', formdata.account);
    setLocalItem('Password', formdata.password);
    if (formdata.account == 'admin') {
      setLocalItem('role', '1');
      setLocalItem('username', '超级管理员');
    } else if (formdata.account == 'admin1') {
      setLocalItem('role', '2');
      setLocalItem('username', '普通管理员');
    } else {
      setLocalItem('role', '3');
      setLocalItem('username', '访客');
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
.mask_box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #263038;
}
.loader_box {
  position: relative;
  width: 120px;
  height: 90px;
  margin: 0 auto;
}
.loader_box:before {
  content: '';
  position: absolute;
  bottom: 30px;
  left: 50px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #ff3d00;
  animation: loading-bounce 0.5s ease-in-out infinite alternate;
}
.loader_box:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 7px;
  width: 45px;
  border-radius: 4px;
  box-shadow: 0 5px 0 #fff, -35px 50px 0 #fff, -70px 95px 0 #fff;
  animation: loading-step 1s ease-in-out infinite;
}

@keyframes loading-bounce {
  0% {
    transform: scale(1, 0.7);
  }
  40% {
    transform: scale(0.8, 1.2);
  }
  60% {
    transform: scale(1, 1);
  }
  100% {
    bottom: 140px;
  }
}
@keyframes loading-step {
  0% {
    box-shadow: 0 10px 0 rgba(0, 0, 0, 0), 0 10px 0 #fff, -35px 50px 0 #fff,
      -70px 90px 0 #fff;
  }
  100% {
    box-shadow: 0 10px 0 #fff, -35px 50px 0 #fff, -70px 90px 0 #fff,
      -70px 90px 0 rgba(0, 0, 0, 0);
  }
}
</style>
