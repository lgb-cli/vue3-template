export const getLocalItem = function (key: string) {
	let val = localStorage.getItem(key)
	try {
		val = JSON.parse(val)
	} catch (error) {
		return val
	}
	return val
}

export const setLocalItem = function (key: string, val: any) {
	if (typeof val == "object") {
		localStorage.setItem(key, JSON.stringify(val))
	} else {
		localStorage.setItem(key, val)
	}
}
export const deleteLocalItem = function (key: string) {
	localStorage.removeItem(key)
}
