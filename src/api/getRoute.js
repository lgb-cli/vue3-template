import {
  HomeFilled,
  DataLine,
  Suitcase,
  Warning,
  Operation
} from "@element-plus/icons-vue"
import {
  markRaw
} from 'vue'
import {
  getLocalItem
} from "../utils/localData.ts";

import {
  flatTree,
  buildTree
} from "../utils/tool.js";
const menuList = [{
    label: "首页",
    name: 'home',
    icon: markRaw(HomeFilled),
    id: "1",
    pid: null,
    path: "/home",
    role: [1, 2, 3],
    componentUrl: '../views/index/index.vue'
  },

  {
    label: "数据操作",
    icon: markRaw(DataLine),
    id: "3",
    pid: null,
    children: [{
        label: "表单",
        id: "3-1",
        name: 'form',
        pid: '3',
        path: "/form",
        role: [1],
        componentUrl: '../views/form/form.vue'
      },
      {
        label: "表格",
        id: "3-2",
        pid: '3',
        role: [1],
        name: 'table',
        path: "/table",
        componentUrl: '../views/table/table.vue'
      }

    ],
  }, {
    label: '工具',
    id: "4",
    pid: null,
    children: [{
      label: "文件上传",
      id: "4-1",
      pid: '4',
      role: [1],
      name: 'upload',
      path: "/upload",
      componentUrl: '../views/tools/upload.vue'

    }, {
      label: '水印',
      id: "4-2",
      pid: '4',
      role: [1],
      name: 'watermark',
      path: '/watermark',
      componentUrl: '../views/tools/watermark.vue'
    }, ],
  },
  {
    label: "权限设置",
    icon: markRaw(Warning),
    id: "5",
    pid: null,
    name: 'role',
    role: [1],
    path: "/role",
    componentUrl: '../views/role/role.vue'
  },
  {
    label: "其他",
    icon: markRaw(Operation),
    id: "2",
    pid: null,
    children: [{
      label: "富文本",
      id: "2-1",
      pid: '2',
      path: "/editor",
      name: 'editor',
      role: [1],
      componentUrl: '../views/other/editor.vue'
    }],
  },
]


function getRoutes() {
  let role = getLocalItem('role');
  let list = getMenuList(role)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(list)
    }, 500)
  })

}
// 获取处理过权限的路由列表
function getMenuList(role) {
  let flatMenuArr = flatTree(menuList);
  let resultList = []
  let newMenuList = []
  role = Number(role)
  resultList = flatMenuArr.filter(item => {
    return !item.role || item.role && item.role.includes(role)
  })
  newMenuList = buildTree(resultList, null)
  newMenuList = newMenuList.filter(item => item.children && item.children.length > 0 || item.componentUrl)
  return newMenuList
}

export default getRoutes