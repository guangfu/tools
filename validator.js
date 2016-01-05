/**
 * @author 吴光富
 * @description
 *   传值验证
 *   内置num，notNull，phone，mail， character，url验证规则
 *   methods
 *     addRegExp  //添加验证规则
 *     config     //配置验证值和规则的映射
 *     validate   //传入验证值验证
 * @example
 *   import validator from 'validator.js';
 *   validator.addRegExp({
 *     reg: function() {}
 *   })
 *   validator.config({
 *     name: reg,
 *     address: character
 *   })
 *   validator.validate({
 *     name: 'wuguangfu',
 *     address: '深圳市南山区'
 *   })
 */

let regExps = {
  //数字
  num: function(value) {
    return !isNaN(value)
  },
  //不能为空
  notNull: function(value) {
    return value !== ''
  },
  //电话号码
  phone: function(value) {
    var regExp = /^1\d{10}$/;

    return regExp.test(value)
  },
  // 邮件地址
  mail: function(value) {
      var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

      return regExp.test(value)
  },
  //只能是汉字、字母和数字
  character: function(value) {
    var regExp = new RegExp('^[\\w\\-\\(\\)\\u4E00-\\u9FFF]{1,}$');

    return regExp.test(value)
  },
  //url地址
  url: function(value) {
      var regExp = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w{2,4}(?:\/|$)/i;

      return regExp.test(value)
  }
}

let validateFields = {};

function validate(rule, value) {
  var regFn = null, mem = { pass: true, infos: {}};

  if (typeof rule.regexp === 'string') {
    regFn = regExps[rule.regexp];
  } else if (rule.regexp === 'function') {
    regFn = rule.regexp;
  }

  if (regFn(value) && mem.pass) {
    mem.pass = true;
  } else {
    mem.pass = false;
    mem.info = rule.info;
  }

  return mem;
}

let validator = {
  addRegExp(obj) {
    Object.keys(obj).reduce((mem, name) => {
      mem[name] = obj[name];
      return mem;
    }, regExps)
  },

  config(obj) {
    Object.keys(obj).reduce((mem, name) => {
      mem[name] = obj[name];
      return mem;
    }, validateFields)
  },

  validate(obj) {

    return Object.keys(obj).reduce((mem, name) => {
      let value = obj[name].value,
          rule = validateFields[name],
          regFn = null;

      switch (Object.prototype.toString.call(rule)) {
        case '[object Object]':
          mem = validate(rule, value);
          break;

        case '[object Array]':
          let temp = null;

          rule.forEach((item) => {
            temp = validate(item , value);
            if (!temp.pass) {
              mem.pass = false;
              mem.ifnos[name] = temp.info;
            }
          })
          break;
        default:

      }

      return mem;

    }, { pass: true, infos: {} });
  }
}

export default validator;
