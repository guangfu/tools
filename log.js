/**
 * @author 吴光富
 * @description
 *   前端代码监控，收集performance信息和脚本运行错误信息
 * @example
 *   import collectInfo from 'tools/log.js';
 *   collectInfo(REPORT_URL)
 */
export default function(REPORT_URL) {
  //信息上传
  function upload(data) {
    var img = new Image;

    img.onload = img.onerror = function() { img = null;}
    img.src = REPORT_URL + data;
  }
  //收集performance信息
  function performance() {
    var perf = (window.performance ? window.performance: (window.webkitPerformance ? window.webkitPerformance : window.msPerformance )),
        points = ['navigationStart','unloadEventStart','unloadEventEnd','redirectStart','redirectEnd','fetchStart','domainLookupStart','connectStart',
                  'requestStart','responseStart','responseEnd','domLoading','domInteractive','domContentLoadedEventEnd','domComplete','loadEventStart','loadEventEnd'],
        timing = pref.timing;

    if(perf && timing) {
      var data = {};
      var navigationStart = timing[points[0]];

      for(var i = 1, l = points.length; i < l; i++){
         data[points[i]] = timing[points[i]] - navigationStart;
      }

      upload(JSON.toString(data));
    }
  }
  //收集脚本错误信息
  function error(msg,url,line,col,error) {
    if (msg != "Script error." && !url){
      return true;
    }
    setTimeout(function(){
      var data = {};
      //不一定所有浏览器都支持col参数
      col = col || (window.event && window.event.errorCharacter) || 0;

      data.url = url;
      data.line = line;
      data.col = col;
      if (!!error && !!error.stack){
        //如果浏览器有堆栈信息
        //直接使用
        data.msg = error.stack.toString();
      }else if (!!arguments.callee){
        //尝试通过callee拿堆栈信息
        var ext = [];
        var f = arguments.callee.caller, c = 3;
        //这里只拿三层堆栈信息
        while (f && (--c>0)) {
          ext.push(f.toString());
          if (f  === f.caller) {
            break;
          }
          f = f.caller;
        }
        ext = ext.join(",");
        data.msg = ext;
      }

      upload(JSON.toString(data));

    },0);
  }

  window.addEventListener('error', error, false);
  window.addEventListener('load', performance, false);

}
