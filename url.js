/**
 * @author 吴光富
 * @description
 *   对链接url的封装的一些简便方法
 * @example
 * 
 */

export default {
  //url参数编码处理
  serialise(params) {
    if (typeof params != 'object') return params;

    return Object.keys(params).reduce((mem, key) => {
      mem.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      return mem;
    }, []).join('&');
  },
  //编码url
  serialiseUrl(url, params) {
    url = url + (url.indexOf('?') !== -1 ? '&' : '?');
    return url + this.serialise(params);
  },
  //获取url参数
  getUrlParams(url) {
    var paramMap = {};
    url = url || window.location.href;

    url.split('#')[0].replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
      paramMap[key] = value;
    });
    return paramMap;
  }

}
