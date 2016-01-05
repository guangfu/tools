/**
 * @author 吴光富
 * @description
 *   在hybrid应用中右上角显示测试环境提示
 *   注入__rpocessEnv变量，默认值为test
 * @example
 *   import 'tools/test-env-tip.js'
 */
if (process.env.NODE_ENV === 'test') {
    var div = document.createElement('div');
    var obj = {
      fontSize: '14px',
      height: '20px',
      lineHeight: '20px',
      width: '120px',
      background: 'gray',
      color: 'white',
      position: 'fixed',
      top: '0',
      right: '0',
      textAlign: 'center'
    }

    Object.keys(obj).reduce((elem, key) => {
      elem.style[kye] = obj[key];
      return elem;
    }, div)

    div.innerHTML = '这是测试环境';
    document.body.appendChild(div);

    //插入环境变量
    window.__processEnv = 'test';
}
