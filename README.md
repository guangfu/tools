# 一些辅助性的开发工具组件

## test-env-tip.js

在hybrid应用中右上角显示测试环境提示
调用方式:

```js
import 'tools/test-env-tip.js'
```

## wenire.js

将wenire脚本插入页面中进行调试
调用方式:

```js
import wenire from 'tools/wenire.js';
wenire('172.22.23.56'/*ip, default: location.hostname*/, 8081/*port, default: 8081*/)
```

## log.js

前端代码监控，收集performance信息和脚本运行错误信息
调用方式:

```js
import collectInfo from 'tools/log.js';
collectInfo(REPORT_URL /*信息上传地址*/)
```


## validator.js

传值验证，内置num，notNull，phone，mail， character，url验证规则

## abstractComponent.js

抽象组件，拥有ready, destory，trigger，on，off方法和el，events属性，提供事件自动绑定功能
调用方式：
```js
import AbstractComponent from 'abstractComponent';
let component = new AbstractComponent({
  el: '#id'
  events: {
    'click button': 'clickBtn',
    'signalName signal': 'executeAction'
  },
  init() {},
  clickBtn() {},
  executeAction() {}
})
```

## _class.js

模拟类的继承，通过extend方法操作，每一个继承后都是一个新类，同时也拥有extend方法
调用方式:
```js
import _class from '_class.js';
let newClass = _class.extend({
  init() {},
  method() {}
})
```
