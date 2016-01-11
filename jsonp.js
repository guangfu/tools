function serialise(params) {
  if (typeof params != 'object') return params;

  return Object.keys(params).reduce((mem, key) => {
    mem.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    return mem;
  }, []).join('&');
}

export default function jsonp(obj) {
  var callbackName = new Date().valueOf() + parseInt(Math.random() * 1000);

  obj.data || (obj.data = {})
  obj.data.callback = callbackName;

  var queryString = serialise(obj.data);

  var s = document.createElement('script');
  var separator = (obj.url.indexOf('?') > -1) ? '&': '?';
  var url = obj.url + separator + queryString;

  s.src = url;

  s.onload = function(data) {
    obj.success && obj.success(data);
    obj.complete && obj.complete(data);
  }
  s.error = function(data) {
    obj.error && obj.error(data);
    obj.complete && obj.complete(data);
  }

  document.getElementsByTagName('head')[0].appendChild(s);
}
