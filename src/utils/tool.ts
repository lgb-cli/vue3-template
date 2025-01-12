import requestFun from '../api/request.js'
// 拍平树结构
interface TreeItem {
  id: number;
  name: string;
  pid: number;
  children?: TreeItem[];
  [propName: string]: any;
}
export const flatTree = function (tree: TreeItem[]): TreeItem[] {
  let result = []
  tree.forEach(item => {
    let obj = {
      ...item
    }
    delete obj.children
    result.push(obj)
    if (item.children && item.children.length > 0) {
      result = result.concat(flatTree(item.children))
    }
  })
  return result;
}
// 转化为树结构
export const buildTree = function (data:TreeItem[], pid:string|number):TreeItem[]|any {
  if (!data || data.length == 0) return;
  let result = data.filter(item => item.pid === pid)
  if (!result.length) return false;
  result.map(item => {
    let children = buildTree(data, item.id)
    if (children.length) {
      item.children = children
    }
  })
  return result
}

// 防抖函数
export const debounce = function (fn: () => {}, delay: number) {
  let timer = null
  return function (...args: any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 处理图片并发上传问题
interface requestItem {
  (): Promise<any>;
}
export const requestConcurrent = (requestList: requestItem[], max:number):any[] =>{
  let result: any[] = [];
  let concurrent = 0;
  let index = 0;
  console.log(requestList, 'list')
  let requestNum = requestList.length > max ? max : requestList.length;
  const handleRequest = () => {
    if (concurrent >= max) return;
    if (index >= requestList.length) return;
    concurrent++;
    requestList[index]().then((res: any) => {
      result.push(res);
      concurrent--;
      index++;
      handleRequest();
    }).catch((err) => {
      concurrent--;
      index++;
      handleRequest();
    });
  };
  for (let i = 0; i < 3; i++) {
    index = i;
    handleRequest()
  }
  return result;
}

// 下载文件，通过文件流blob格式下载
export const downloadFile = (url: string, name: string,fileType:string) => {
  let isDev = import.meta.env.DEV
  if(isDev) {
    url = url.split(':3000')[1]
  }
  requestFun('GET',url,{},{
    responseType: 'blob'
  }).then(res => {
    console.log(res);
    let blob = res.data
    console.log(blob)
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name + '.'+fileType
    link.click()
    URL.revokeObjectURL(link.href)
  })
}
// 处理excel文件预览
export const excelFilePreview = (url:string,cb: Function) => {
  let isDev = import.meta.env.DEV
  if(isDev) {
    url = url.split(':3000')[1]
  }
  requestFun('GET',url,{},{
    responseType: 'arraybuffer'
  }).then(res => {
    cb && cb(res.data)
  })
}

export const wordFilePreview = (url:string,cb: Function) => {
  let isDev = import.meta.env.DEV
  if(isDev) {
    url = url.split(':3000')[1]
  }
  requestFun('GET',url,{},{
    responseType: 'blob'
  }).then(res => {
    cb && cb(res.data)
  })
}