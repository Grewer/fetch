'use strict';

// TODO list
// 发送,接受的中间层

var json2str = function json2str() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var keys = Object.keys(obj);
  var str = '';
  keys.forEach(function (i) {
    str += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
  });
  return str;
};

function xhr(type, url, params, config) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var method = type;
    url = config.baseUrl + url;

    xhr.open(method, url);

    if (type === 'post' && params.length) {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    // config start
    xhr.responseType = config.responseType;
    xhr.withCredentials = config.withCredentials; // true 头部带cookie false不带
    xhr.timeout = config.timeout;
    var headers = config.headers || {};
    var headers_keys = Object.keys(headers);
    headers_keys.forEach(function (i) {
      xhr.setRequestHeader(i, headers[i]);
    });
    // config end

    xhr.onload = function (e) {
      resolve(e.target.response);
    };
    xhr.ontimeout = function (e) {
      reject(e.target);
    };
    xhr.onerror = function (e) {
      reject(e.target);
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

    headers: {},
    timeout: 10000,
    responseType: 'json',
    withCredentials: false
  },
  post: function post(url, params, config) {
    params = this.config.transformRequest(params);
    params = params instanceof FormData ? params : json2str(params).substr(1);
    return this.ajax('post', url, params, config);
  },
  get: function get(url, params, config) {
    params = this.config.transformRequest(params);
    var newParams = json2str(params);
    if (newParams) {
      url += '?' + json2str(params).substr(1);
    }
    params = null;
    return this.ajax('get', url, params, config);
  },
  ajax: function ajax(type, url, params, config) {
    var _this = this;

    //config //覆盖this.config
    return xhr(type, url, params, config ? (Object.keys(this.config).forEach(function (i) {
      if (config[i] === void 0) {
        config[i] = _this.config[i];
      }
    }), config) : this.config);
  }
};

var fetch = Object.create(Fetch);

window.fetch = fetch;

// export default fetch