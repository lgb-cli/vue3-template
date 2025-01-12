import {
  HomeFilled,
  DataLine,
  Suitcase,
  Warning,
  Operation,
  Tools
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
} from "../utils/tool.ts";
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
    icon: markRaw(Tools),
    children: [{
      label: "文件上传",
      id: "4-1",
      pid: '4',
      role: [1],
      name: 'upload',
      path: "/upload",
      componentUrl: '../views/tools/upload.vue'

    }, {
      label: "文件预览",
      id: "4-2",
      pid: '4',
      role: [1],
      name: 'preview',
      path: "/preview",
      componentUrl: '../views/tools/preview.vue'
    }, {
      label: '水印',
      id: "4-3",
      pid: '4',
      role: [1],
      name: 'watermark',
      path: '/watermark',
      componentUrl: '../views/tools/watermark.vue'
    }, {
      label: "富文本",
      id: "4-4",
      pid: '4',
      path: "/editor",
      name: 'editor',
      role: [1],
      componentUrl: '../views/other/editor.vue'
    }, {
      label: '音频',
      id: "4-5",
      pid: '4',
      role: [1],
      name: 'audio',
      path: '/audio',
      componentUrl: '../views/tools/audio.vue'
    }, {
      label: '聊天室',
      id: "4-6",
      pid: '4',
      role: [1],
      name: 'chat',
      path: '/chat',
      componentUrl: '../views/tools/chat.vue'
    }],
  }, {
    label: '交互',
    id: "7",
    pid: null,
    icon: markRaw(Warning),
    children: [{
      label: "过渡动画",
      id: "7-1",
      pid: '7',
      name: 'animation',
      role: [1],
      path: "/animation",
      componentUrl: '../views/tools/transition.vue'
    }],
  },
  {
    label: "角色管理",
    icon: markRaw(Operation),
    id: "5",
    pid: null,
    children: [{
      label: "权限设置",
      id: "5-1",
      pid: '5',
      name: 'role',
      role: [1],
      path: "/role",
      componentUrl: '../views/role/role.vue'
    }],
  }, {
    label: "数据可视化",
    icon: markRaw(Operation),
    id: "6",
    pid: null,
    children: [{
      label: "数据报表",
      id: "6-1",
      pid: '6',
      name: 'dataReport',
      role: [1],
      path: "/dataReport",
      noLayout: true,
      componentUrl: '../views/echarts/dataReport.vue'
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
  console.log([...flatMenuArr], '拍平数组')
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