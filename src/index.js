// TODO list
// 接收config参数
// 发送,接受的中间层
// promise 包装
// data 转换
// get post 不同的数据转换
function xhr(type, url, params, config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let method = type
    url = config.baseUrl + url
    if (type === 'get') {
      let paramsStr = ''
      for (let i in params) {
        paramsStr += `&${i}=${params[i]}`
      }
      url += '?' + paramsStr.substr(1)
      params = null
    }
    xhr.responseType = config.responseType; // todo
    xhr.open(method, url);
    // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); // formdata
    xhr.timeout = config.timeout;
    // xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = e => {
      resolve(e.target.response)
    };
    xhr.ontimeout = e => {
      reject(e.target)
    };
    xhr.onerror = e => {
      reject(e.target)
    }
    xhr.send(JSON.stringify(params));
  })
}

const Fetch = {
  config: {
    baseUrl: '',
    transformRequest(data) {
      return data
    },
    headers: {},
    timeout: 10000,
    responseType: 'json'
  },
  post(url, params, config) {
    return this.ajax('post', url, params, config)
  },
  get(url, params, config) {
    return this.ajax('get', url, params, config)
  },
  ajax(type, url, params, config) {
    let transformParams = this.config.transformRequest(params)
    // todo config //覆盖this.config
    return xhr(type, url, transformParams, this.config)
  }
}

let fetch = Object.create(Fetch)

window.fetch = fetch

// export default fetch
