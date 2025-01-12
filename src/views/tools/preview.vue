<template>
  <div class="page_content">
    <h2 class="page_title">表格</h2>
    <div class="table_content">
      <el-row>
      </el-row>
      <el-table ref="multipleTableRef" :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" width="100" align="center" fixed="left" label="序号" />
        <el-table-column label="文件名" align="center">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="file" label="文件格式" align="center" width="240" />
        <el-table-column label="操作" fixed="right" width="300" align="center">
          <template #default="{ row }">
            <el-button type="primary" @click="openPreview(row)">预览</el-button>
            <el-button type="primary" @click="downloadFileHandle(row)">下载</el-button>
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
    <!-- 预览对话框 -->
    <el-dialog title="预览" v-model="previewFlag" width="80%">
      <template v-if="previewType === 'pdf'">
        <iframe :src="previewUrl" frameborder="0" width="100%" height="500px"></iframe>
      </template>
      <template v-else-if="previewType === 'docx'">
        <div id="doc-preview-container"></div>
      </template>
      <template v-else-if="previewType === 'xlsx'">
        <el-table :data="excelJsonData" border :span-method="spanMethodHandle">
          <el-table-column property="日期" label="日期"></el-table-column>
          <el-table-column property="时间" label="上午/下午"></el-table-column>
          <el-table-column property="__EMPTY" label="时间段"></el-table-column>
          <el-table-column property="目标" label="目标"></el-table-column>
          <el-table-column property="时长" label="时长"></el-table-column>
          <el-table-column property="完成度" label="完成度"></el-table-column>
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { read, utils, writeFile } from 'xlsx';
import {
  downloadFile,
  excelFilePreview,
  wordFilePreview,
} from '../../utils/tool';
import requestFun from '../../api/request';
import { renderAsync } from 'docx-preview';
const tableData = ref([
  {
    name: '前端工程师-简历',
    file: 'pdf',
    url: 'http://39.102.213.94:3000/files/前端开发工程师.pdf',
  },
  {
    name: '2024年学习计划',
    file: 'xlsx',
    url: 'http://39.102.213.94:3000/files/学习计划.xlsx',
  },
  {
    name: '前端工程师-简历',
    file: 'docx',
    url: 'http://39.102.213.94:3000/files/前端开发工程师.docx',
  },
]);
const excelJsonData = ref([]);
const currentPage = ref<Number>(1);
const pageSize = ref(10);
const multipleTableRef = ref();
const multipleSelection = ref([]);
// 预览对话框
const previewFlag = ref(false);
const previewType = ref('pdf');
const previewUrl = ref('');

const toggleSelection = () => {
  tableData.value.forEach((row) => {
    multipleTableRef.value.toggleRowSelection(row, undefined);
  });
};
const handleSelectionChange = (val: any) => {
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

// 打开预览
function openPreview(row) {
  previewType.value = row.file;
  previewUrl.value = row.url;
  previewFlag.value = true;
  if (previewType.value === 'xlsx') {
    // 预览excel
    excelFilePreview(row.url, (result) => {
      const data = new Uint8Array(result);
      const workbook = read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet);
      jsonData.forEach((item, index) => {
        if (item['日期']) {
          // 查询下一个日期属性值不为空的item项的索引
          let curIndex = index;
          let nextItem = jsonData[curIndex + 1];
          item.dateSpanNum = 0;
          while (nextItem && !nextItem['日期']) {
            nextItem = jsonData[++curIndex];
            item.dateSpanNum += 1;
          }
        }
        if (item['时间']) {
          let curIndex = index;
          item.timeSpanNum = 0;
          let nextItem = jsonData[curIndex + 1];
          while (nextItem && !nextItem['时间']) {
            nextItem = jsonData[++curIndex];
            item.timeSpanNum += 1;
          }
        }
      });
      excelJsonData.value = jsonData;
    });
  } else if (row.file === 'docx') {
    wordFilePreview(row.url, (result) => {
      console.log(result, 'result');
      renderAsync(
        result,
        document.getElementById('doc-preview-container'),
        null,
        {
          className: 'text-docx', //class name/prefix for default and document style classes
          inWrapper: true, //enables rendering of wrapper around document content
          ignoreWidth: false, //disables rendering width of page
          ignoreHeight: false, //disables rendering height of page
          ignoreFonts: false, //disables fonts rendering
          breakPages: true, //enables page breaking on page breaks
          ignoreLastRenderedPageBreak: true, //disables page breaking on lastRenderedPageBreak elements
          experimental: true, //enables experimental features (tab stops calculation)
          trimXmlDeclaration: true, //if true, xml declaration will be removed from xml documents before parsing
          useBase64URL: false, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
          useMathMLPolyfill: true, //includes MathML polyfills for chrome, edge, etc.
          debug: false, //enables additional logging
        }
      )
        .then(() => {
          console.log('render success');
        })
        .catch((err) => {
          console.log(err, 'render error');
        });
    });
  }
}

function downloadFileHandle(row) {
  downloadFile(row.url, row.name, row.file);
}

function spanMethodHandle({ row, column, rowIndex, columnIndex }) {
  if (columnIndex === 0) {
    if (row.dateSpanNum) {
      return [row.dateSpanNum, 1];
    } else {
      return [0, 0];
    }
  } else if (columnIndex === 1) {
    if (row.timeSpanNum) {
      return [row.timeSpanNum, 1];
    } else {
      return [0, 0];
    }
  } else {
    return [1, 1];
  }
}
</script>
<style lang="less" scoped></style>
