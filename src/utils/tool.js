// 拍平树结构
export const flatTree = function (tree) {
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
export const buildTree = function (data, pid) {
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

// 处理图片并发上传问题
export const requestConcurrent = (requestList, max) => {
  let result = [];
  let concurrent = 0;
  let index = 0;
  console.log(requestList, 'list')
  let requestNum = requestList.length > max ? max : requestList.length;
  const handleRequest = () => {
    if (concurrent >= max) return;
    if (index >= requestList.length) return;
    concurrent++;
    requestList[index]().then((res) => {
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