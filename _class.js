/**
 * @author 吴光富
 * @description
 *   模拟类的继承，通过extend方法操作，每一个继承后都是一个新类，同时也拥有extend方法
 * @example
 *   import _class from '_class.js';
 *   let newClass = _class.extend({
 *     init() {},
 *     method() {}
 *   })
 */

var _class = function(obj) {
  for (var name in obj) {
    this[name] = obj[name];
  }
}

_class.extend = function(obj) {
  var newClass = function() {
    for (var i = 0, len = this.initList.length; i < len; i++) {
      this.initList[i].apply(this, arguments);
    }
  }

  function F() {}
  F.prototype = this.prototype;
  newClass.prototype = new F();
  for (var name in obj) {
    newClass.prototype[name] = obj[name];
  }

  newClass.prototype.initList = this.prototype.initList && this.prototype.initList.concat() || [];
  if (undefined !== obj.init) {
    newClass.prototype.initList.push(obj.init)
  }

  newClass.extend = this.extend;
  return newClass;

}

export default _class;
