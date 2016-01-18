/**
 * @author 吴光富
 * @description
 *   抽象组件，拥有ready, destory，trigger，on，off方法和el，events属性，提供事件自动绑定功能
 * @example
 *   import Component from 'Component';
 *   let component = new Component({
 *     el: '#id'
 *     events: {
 *       'click button': 'clickBtn',
 *       'signalName signal': 'executeAction'
 *     },
 *     init() {},
 *     clickBtn() {},
 *     executeAction() {}
 *   })
 */

import _class from './class.js'

let $ = window.jQuery || window.Zepto;
//依赖jquery或者zepto，一般
export default _class.extend({
  init(obj={}) {

    this.obj = obj;
    this.$data = obj.data;
    this.$el = obj.$el = $(obj.el || window);

    $.each(obj.events || {}, (name, item) =>  {
      let eventType = name.split(' ')[0];
      let selector = name.split(' ')[1];

      //信号绑定
      if (selector === 'signal') {
        this.on(eventType, obj[item].bind(this))
        return;
      }
      //事件绑定
      $(obj.$el).on(eventType, selector || null, (...args) => {
          obj[item].call(this, ...args);
      })
    })

    //绑定事件后开始执行ready方法
    if (typeof obj.ready === 'function') obj.ready.call(this);
  },
  ready() {},
  destory() {
    $.each(this.obj.events, (eventType, item) => { $(this.$el).off(eventType); })
  },
  trigger(...args) {
    $(document).trigger(...args);
  },
  on(...args) {
    $(document).on(...args)
  },
  off(...args) {
    $(document).off.call(this, args);
  }

})
