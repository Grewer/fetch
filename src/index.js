// TODO list
// 接收config参数
// 发送,接受的中间层
// promise 包装
// data 转换
// get post 不同的数据转换

const json2str = (obj = {}) => {
  let keys = Object.keys(obj)
  let str = ''
  keys.forEach(i => {
    str += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(obj[i])
  })
  return str
}

function xhr(type, url, params, config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let method = type
    url = config.baseUrl + url

    xhr.open(method, url);

    if (type === 'post') {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // formdata
    }
    // config start
    xhr.responseType = config.responseType;
    xhr.withCredentials = config.withCredentials;// true 头部带cookie false不带
    xhr.timeout = config.timeout;
    // config end

    xhr.onload = e => {
      resolve(e.target.response)
    };
    xhr.ontimeout = e => {
      reject(e.target)
    };
    xhr.onerror = e => {
      reject(e.target)
    }
    console.log(params)
    xhr.send(params);
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
    responseType: 'json',
    withCredentials: false
  },
  post(url, params, config) {
    params = json2str(params).substr(1)
    return this.ajax('post', url, params, config)
  },
  get(url, params, config) {
    let newParams = json2str(params)
    if (newParams) {
      url += '?' + json2str(params).substr(1)
    }
    params = null
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
