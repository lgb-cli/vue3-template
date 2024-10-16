// 全屏
export const fullScreenHandle = function (): void {
  const docElm = document.documentElement
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}

// 退出全屏
export const exitFullScreen = function (): void {
  const doc = document
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen()
  }
}

