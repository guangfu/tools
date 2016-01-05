/**
 * @author 吴光富
 * @description
 *   将wenire脚本插入页面中进行调试
 * @example
 *   import wenire from 'wenire.js';
 *   wenire(ip, port)
 */

export default function(ip = location.hostname, port = 8081) {
  if (process.env.NODE_ENV === 'test') {

    var script = document.createElement('script');
    script.src = "http://{ip}:{port}/target/target-script-min.js#anonymous".replace('{ip}', ip).replace('{port}', port);
    // script.src = 'http://172.22.23.56:8081/target/target-script-min.js#anonymous';

    document.head.appendChild(script);
  }
}
