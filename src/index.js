const json2str = (obj = {}) => {
  let str = '';
  Object.keys(obj).forEach(i => {
    str += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(obj[i])
  });
  return str
};

function xhr(type, url, params, config, interceptor) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let method = type;
    url = config.baseUrl + url;

    xhr.open(method, url);

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

    xhr.onload = e => {
      resolve(interceptor.success(e.target.response))
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
      url += '?' + json2str(params).substr(1)
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
    Vue.prototype.$get = this.get
    Vue.prototype.$post = this.get
  }
};

const fetch = Object.create(Fetch);

export default fetch