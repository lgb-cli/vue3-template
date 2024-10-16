import {
	defineStore
} from "pinia"
import {
	setLocalItem,
	getLocalItem
} from "../utils/localData"
// setup组合api写法
// import { ref } from 'vue'
// export const useIndexStore = defineStore('share', () => {
//   const collapseFlag = ref(false)
//   function expand (flag) {
//     collapseFlag.value = flag
//   }
//   return {
//     collapseFlag,
//     expand
//   }
// })

export const useIndexStore = defineStore("mainStore", {
	state: () => {
		return {
			collapseFlag: false, //侧边栏折叠
			breadList: [], //面包屑
			routesList: [], //动态路由
			refleshFlag: false,
			settingParams: getLocalItem('settingParams') || {
				animation: 1,
				themeColor: '#00b494',
			},
		}
	},
	actions: {
		expand(flag) {
			this.collapseFlag = flag
		},
		setBreadList(data) {
			this.breadList = data
		},
		setRoutesList(data) {
			this.routesList = data
			setLocalItem('routesList', data)
		},
		setRefleshFlag(flag) {
			this.refleshFlag = flag
		},
		setSettingParams(data) {
			this.settingParams = data
			setLocalItem('settingParams', data)
		},
	},
})