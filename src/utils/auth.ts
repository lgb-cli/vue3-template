import { clearLocalItem, clearSItem } from "../utils/localData"
// 清除登录状态
export const useLogout = function () {
	clearLocalItem()
	clearSItem()

}
