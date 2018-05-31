'use strict';

// TODO list
// 接收config参数
// 发送,接受的中间层
// promise 包装
// data 转换
// get post 不同的数据转换
function xhr(type, url, params, config) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var method = type;
    var url = config.baseURI + url;

    xhr.open(method, url);
    // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.timeout = config.timeout;
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     console.log(xhr.responseText)
    //   }
    // }
    xhr.onload = function (e) {
      resolve(e);
      // 请求完成。在此进行处理。
    };
    xhr.ontimeout = function (e) {
      reject(e);
      // XMLHttpRequest 超时。在此做某事。
    };
    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send(params);
  });
}

var Fetch = {
  config: {
    baseUrl: '',
    transformRequest: function transformRequest(data) {
      return data;
    },

    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    timeout: 10000
  },
  post: function post(url, params, config) {
    return this.xhr('', url, params, config);
  },
  get: function get(url, params, config) {
    return this.xhr('post', url, params, config);
  },
  ajax: function ajax() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "get";
    var url = arguments[1];
    var params = arguments[2];
    var config = arguments[3];

    var transformParams = this.transformRequest(params);
    // todo config //覆盖this.config
    return xhr(type, url, transformParams, this.config);
  }
};

var fetch = Object.create(Fetch);

// export default fetch


window.fetch = fetch;