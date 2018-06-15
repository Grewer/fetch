const json2str = (obj = {}) => {
  return Object.keys(obj).reduce((str, i) => str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]) + '&', '')
};

function xhr(type, url, params, config, interceptor) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    url = config.baseUrl + url;

    xhr.open(type, url);

    if (type === 'post' && params.length) {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    // config start
    xhr.responseType = config.responseType;
    xhr.withCredentials = config.withCredentials;
    xhr.timeout = config.timeout;
    let headers = config.headers || {};
    let headers_keys = Object.keys(headers);
    headers_keys.forEach(i => {
      xhr.setRequestHeader(i, headers[i])
    });
    // config end
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(interceptor.success(xhr.response))
      }
    };
    xhr.ontimeout = e => {
      reject(interceptor.fail(e.target))
    };
    xhr.onerror = e => {
      reject(interceptor.fail(e.target))
    };
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
  interceptor: {
    success(data) {
      return data
    },
    fail(data) {
      return data
    }
  },
  post(url, params, config) {
    params = this.config.transformRequest(params);
    params = params instanceof FormData ? params : json2str(params).substr(1);
    return this.ajax('post', url, params, config)
  },
  get(url, params, config) {
    params = this.config.transformRequest(params);
    let newParams = json2str(params);
    if (newParams) {
      url += '?' + newParams.substr(1)
    }
    params = null;
    return this.ajax('get', url, params, config)
  },
  ajax(type, url, params, config) {
    // 合并config
    return xhr(type, url, params, config ? (
        Object.keys(this.config).forEach(i => {
          if (config[i] === void 0) {
            config[i] = this.config[i]
          }
        }), config) : this.config
      , this.interceptor)
  },
  install(Vue, options) {
    try {
      options && options(this.config)
    } catch (e) {
      console.error('options 必须是一个函数')
    }
    const that = this
    Vue.prototype.$get = this.get.bind(that)
    Vue.prototype.$post = this.post.bind(that)
  }
};

const fetch = Object.create(Fetch);

export default fetch