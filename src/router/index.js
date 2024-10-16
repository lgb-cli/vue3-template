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
	deleteLocalItem
} from "../utils/localData"
import getRoutes from "../api/getRoute"
import {
	flatTree
} from "../utils/tool"

const modulesPage =
	import.meta.glob("../views/**/*.vue")
console.log(modulesPage, 'modulesPage')
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
let isAddRoute = false;
let routeNames = {}
router.beforeEach((to, from, next) => {
	console.log(to, from)
	let role = getLocalItem("role")
	if (to.path == "/login") {

		deleteLocalItem('routesList')
		deleteLocalItem('role')
		deleteRoutes()
		next()
	} else {
		if (role) {
			if (!isAddRoute) {
				isAddRoute = true
				let routesList = getLocalItem('routesList')
				if (!routesList || routesList.length === 0) {
					getRoutes().then(res => {
						setLocalItem('routesList', res)
						let result = flatTree(res)
						formatRoutes(result)
						console.log(router.getRoutes(), 'routes')
						console.log(to, 'to')
						next({
							path: to.path,
							replace: true,
						})
					})
				} else {
					let result = flatTree(routesList)
					formatRoutes(result)
					console.log(router.getRoutes(), 'routes')
					console.log(to, 'to')
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
			deleteLocalItem('routesList')
			deleteLocalItem('role')
			setTimeout(() => {
				next({
					path: "/login"
				})
			}, 800)
		}
	}
})

function formatRoutes(list) {
	if (!list || list.length === 0) return;
	list.map(item => {
		if (item.componentUrl) {
			let obj = {
				name: item.name,
				path: item.path,
				component: () => modulesPage[item.componentUrl] ? modulesPage[item.componentUrl]() : import('../views/404.vue'),
			}
			router.addRoute('layout', obj)
		}

	})
}

function deleteRoutes() {
	isAddRoute = false;
	if (Object.keys(routeNames).length == 0) return false;
	Object.keys(routeNames).forEach(item => {
		routeNames[item]()
	})
}
export default router