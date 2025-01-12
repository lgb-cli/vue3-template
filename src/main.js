import {
  createApp
} from 'vue'
import {
  createPinia
} from 'pinia'
import App from './App.vue'
import router from './router'
/* 浏览器初始化样式 */
import 'normalize.css'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
/* 公共样式 */
import './style/minxin.less'
import './style/index.less'
import './style/common.less'



import installFun from './utils/install'

console.log(
  import.meta.env.VITE_APP_TITLE, 'mode')
console.log(import.meta.env.VITE_BASE_URL, 'baseURL')

const pinia = createPinia()

const app = createApp(App)
app.use(installFun)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')