/**
 * @author 吴光富
 * @description
 *   抽象组件，拥有ready, destory，trigger，on，off方法和el，events属性，提供事件自动绑定功能
 * @example
 *   import AbstractComponent from 'abstractComponent';
 *   let component = new AbstractComponent({
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

import _class from './_class.js'

let $ = window.jQuery || window.Zepto;
//依赖jquery或者zepto，一般
export default _class.extend({
  init() {
    this.$el = $(this.el || window);

    $.each(this.events, (name, item) =>  {
      let eventType = name.split(' ')[0];
      let selector = name.split(' ')[1];

      //信号绑定
      if (selector === 'signal') {
        this.on(eventType, this[item])
        return;
      }
      //事件绑定
      $(this.$el).on(eventType, selector || null, function(e) {
          this[item].call(this, e);
      })
    })
    //绑定事件后开始执行ready方法
    this.ready();
  },
  ready() {},
  destory() {
    $.each(this.events, (eventType, item) => {
      $(this.$el).off(eventType);
    })
  },
  trigger(...args) {
    $(document).trigger.call(this, args);
  },
  on(...args) {
    $(document).on.call(this, args);
  },
  off(...args) {
    $(document).off.call(this, args);
  }

})
