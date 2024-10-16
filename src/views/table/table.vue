<template>
  <div class="page_content">
    <h2 class="page_title">表格</h2>
    <div class="table_content">
      <el-row>
        <el-button type="primary" @click="exportHandle">导出excel</el-button>
      </el-row>
      <el-table ref="multipleTableRef" :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" width="100" align="center" fixed="left" label="序号" />
        <el-table-column label="Date" width="180" align="center">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" align="center" width="240" />
        <el-table-column property="address" label="Address" align="center" width="300" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" width="300" align="center">
          <template #default="{ row }">
            <el-button type="primary">编辑</el-button>
            <el-button type="success">查看</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="
					margin-top: 20px;
					display: flex;
					justify-content: space-between;
				">
        <div class="btns">
          <el-button @click="toggleSelection">全选</el-button>
          <el-button @click="toggleSelection()">取消</el-button>
        </div>
        <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :small="false" :background="true" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { utils, writeFile } from 'xlsx';
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);
const currentPage = ref<Number>(1);
const pageSize = ref(10);
const multipleTableRef = ref();
const multipleSelection = ref([]);
const toggleSelection = () => {
  tableData.value.forEach((row) => {
    multipleTableRef.value.toggleRowSelection(row, undefined);
  });
};
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const handleSizeChange = (val: number): void => {
  pageSize.value = val;
};
const handleCurrentChange = (val: number): void => {
  currentPage.value = val;
};

function exportHandle() {
  let wb = utils.book_new();
  let tableHead: Array<String> = ['name', 'address'];

  let list = [];
  list.push(tableHead);
  tableData.value.map((item) => {
    list.push([item.name, item.address]);
  });
  let ws = utils.aoa_to_sheet(list);
  utils.book_append_sheet(wb, ws, 'sheet1');
  writeFile(wb, '导出.xlsx');
}
</script>
<style lang="less" scoped></style>
