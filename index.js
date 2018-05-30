(function () {
  // TODO list
  // 接收config参数
  // 发送,接受的中间层
  // promise 包装
  // data 转换
  // get post 不同的数据转换


  let xhr = new XMLHttpRequest();
  let method = "GET"
  let url = "https://developer.mozilla.org/"

  xhr.open(method, url);
  // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.timeout = 2000;
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     console.log(xhr.responseText)
  //   }
  // }
  xhr.onload = e => {
    // 请求完成。在此进行处理。
  };
  xhr.ontimeout = e => {
    // XMLHttpRequest 超时。在此做某事。
  };
  xhr.onerror = e => {

  }
  xhr.send();
})()