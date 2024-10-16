<template>
  <div class="page_content">
    <h2 class="page_title">权限设置</h2>
    <el-row class="search">
      <el-button type="primary" @click="addRole">新建角色</el-button>
    </el-row>
    <div class="table_content">
      <el-table ref="multipleTableRef" :data="tableData" border>
        <el-table-column type="index" width="100" align="center" fixed="left" label="序号" />
        <el-table-column label="账号" align="center" prop="account" />
        <el-table-column label="角色权限" align="center" prop="idcard" #default="{ row }">
          <el-tag type="warning" v-if="row.role == 1">超级管理员</el-tag>
          <el-tag type="primary" v-else>普通用户</el-tag>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300" align="center">
          <template #default="{ row }">
            <el-button>查看</el-button>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="
					margin-top: 20px;
					display: flex;
					justify-content: space-between;
				">
        <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :small="false" :background="true" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useIndexStore } from '../../pinia/index.js';
import { storeToRefs } from 'pinia';
const store = useIndexStore();
const { routesList } = storeToRefs(store);
const tableData = ref([
  {
    account: 'admin',
    idcard: '超级管理员',
    role: 1,
  },
  {
    account: 'user1',
    idcard: '普通用户1',
    role: 2,
  },
  {
    account: 'user2',
    idcard: '普通用户2',
    role: 2,
  },
]);
const currentPage = ref(1);
const pageSize = ref(10);

const handleSizeChange = (val) => {
  pageSize.value = val;
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
};
function addRole() {}
function getTag(id) {
  let label = '';
  routesList.map((item) => {
    if (item.id == id) {
      label = item.label;
    }
  });
  return label;
}
</script>
<style lang="less" scoped>
.search {
  margin-top: 20px;
  padding-left: 16px;
}
.el-tag {
  margin-right: 10px;
}
</style>
