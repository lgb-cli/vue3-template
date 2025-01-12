import {
	ElMessage
} from "element-plus"
import {
	createRouter,
	createWebHistory
} from "vue-router"
import {
	getLocalItem,
	setLocalItem,
} from "../utils/localData"
import getRoutes from "../api/getRoute"
import {
	useLogout
} from '../utils/auth.ts';
import {
	flatTree
} from "../utils/tool"

const modulesPage =
	import.meta.glob("../views/**/*.vue")
const routes = [{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login/login.vue"),
	},
	{
		path: "/layout",
		name: 'layout',
		component: () => import("../components/layout.vue"),
	}, {
		path: "/404",
		name: "404",
		component: () => import("../views/404.vue"),
	}, {
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import("../views/404.vue")
	},
]
// 定义动态路由
// const dynamicRoutes = [{
// 		path: "/home",
// 		name: "home",
// 		meta: {
// 			index: 1,
// 		},
// 		component: () => import("../views/index/index.vue"),
// 	},

// 	{
// 		path: "/echarts",
// 		name: "echarts",
// 		component: () => import("../views/other/echarts.vue"),
// 	},
// 	{
// 		path: "/editor",
// 		name: "editor",
// 		component: () => import("../views/other/editor.vue"),
// 	},
// 	{
// 		path: "/form",
// 		name: "form",
// 		component: () => import("../views/form/form.vue"),
// 	},
// 	{
// 		path: "/table",
// 		name: "table",
// 		component: () => import("../views/table/table.vue"),
// 	},
// 	{
// 		path: "/role",
// 		name: "role",
// 		component: () => import("../views/role/role.vue"),
// 	}, {
// 		path: "/upload",
// 		name: 'upload',
// 		component: () => import("../views/tools/upload.vue")
// 	}

// ]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
let addRoutes = new Map()
router.beforeEach((to, from, next) => {
	let role = getLocalItem("role")
	if (to.path == "/login") {
		useLogout()
		deleteRoutes()
		next()
	} else {
		if (role) {
			// 如果路由列表为空，则获取路由列表
			if (addRoutes.size == 0) {
				let routesList = getLocalItem('routesList')
				if (!routesList || routesList.length === 0) {
					getRoutes().then(res => {
						setLocalItem('routesList', res)
						let result = flatTree(res)
						formatRoutes(result)
						next({
							path: to.path,
							replace: true,
						})
					})
				} else {
					let result = flatTree(routesList)
					formatRoutes(result)
					next({
						path: to.path,
						replace: true,
					})
				}
			} else {
				next()
			}

		} else {
			ElMessage.warning("身份识别失败，请重新登录！")
			deleteRoutes()
			useLogout()
			setTimeout(() => {
				next({
					path: "/login",
				})
			}, 800)
		}
	}
})
// 格式化路由
function formatRoutes(list) {
	if (!list || list.length === 0) return;
	list.map(item => {
		if (item.componentUrl) {
			let obj = {
				name: item.name,
				path: item.path,
				component: () => modulesPage[item.componentUrl] ? modulesPage[item.componentUrl]() : import('../views/404.vue'),
			}
			if (item.noLayout) {
				let routeResult = router.addRoute(obj)
				addRoutes.set(item.name, routeResult)
			} else {
				let routeResult = router.addRoute('layout', obj)
				addRoutes.set(item.name, routeResult)
			}

		}

	})
}

// 退出登录时删除路由
function deleteRoutes() {
	if (addRoutes.size == 0) return false;
	addRoutes.forEach(item => {
		item()
	})
	console.log(router.getRoutes(),'退出时')
}
export default router