/**
 * @author 吴光富
 * @description
 *   封装一些设备判断方法 
 * @example
 *
 */

export default {
  //安卓判断
  isAndroid() {
    return window.navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
  },
  //IOS判断
  isIOS() {
    var ua = window.navigator.userAgent,
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    return ua.match(/(iPhone\sOS)\s([\d_]+)/) || ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  },
  //微信判断
  isWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
}
