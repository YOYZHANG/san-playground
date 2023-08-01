// @
/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file San 主文件
 */

// 人工调整打包代码顺序，通过注释手工写一些依赖
//     // require('./util/guid');
//     // require('./util/empty');
//     // require('./util/extend');
//     // require('./util/inherits');
//     // require('./util/each');
//     // require('./util/contains');
//     // require('./util/bind');
//     // require('./browser/on');
//     // require('./browser/un');
//     // require('./browser/svg-tags');
//     // require('./browser/create-el');
//     // require('./browser/remove-el');
//     // require('./util/next-tick');
//     // require('./browser/ie');
//     // require('./browser/ie-old-than-9');
//     // require('./browser/input-event-compatible');
//     // require('./browser/auto-close-tags');
//     // require('./util/data-types.js');
//     // require('./util/create-data-types-checker.js');
//     // require('./parser/walker');
//     // require('./parser/parse-template');
//     // require('./runtime/change-expr-compare');
//     // require('./runtime/data-change-type');
//     // require('./runtime/default-filters');
//     // require('./view/life-cycle');
//     // require('./view/node-type');
//     // require('./view/get-prop-handler');
//     // require('./view/is-data-change-by-element');
//     // require('./view/get-event-listener');
//     // require('./view/create-node');

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 唯一id
 */

/**
 * 获取唯一id
 *
 * @type {number} 唯一id
 */
let guid = 1

// exports = module.exports = guid;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 空函数
 */

/**
 * 啥都不干
 */
function empty() {}

// exports = module.exports = empty;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 属性拷贝
 */

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 返回目标对象
 */
function extend(target, source) {
  for (const key in source) {
    /* istanbul ignore else  */
    if (source.hasOwnProperty(key)) {
      const value = source[key]
      if (typeof value !== 'undefined')
        target[key] = value
    }
  }

  return target
}

// exports = module.exports = extend;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 构建类之间的继承关系
 */

// var extend = require('./extend');

/**
 * 构建类之间的继承关系
 *
 * @param {Function} subClass 子类函数
 * @param {Function} superClass 父类函数
 */
function inherits(subClass, superClass) {
/* jshint -W054 */
  const subClassProto = subClass.prototype
  const F = new Function()
  F.prototype = superClass.prototype
  subClass.prototype = new F()
  subClass.prototype.constructor = subClass
  extend(subClass.prototype, subClassProto)
/* jshint +W054 */
}

// exports = module.exports = inherits;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 遍历数组
 */

/**
 * 遍历数组集合
 *
 * @param {Array} array 数组源
 * @param {function(Any,number):boolean} iterator 遍历函数
 */
function each(array, iterator) {
  if (array && array.length > 0) {
    for (let i = 0, l = array.length; i < l; i++) {
      if (iterator(array[i], i) === false)
        break
    }
  }
}

// exports = module.exports = each;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断数组中是否包含某项
 */

// var each = require('./each');

/**
 * 判断数组中是否包含某项
 *
 * @param {Array} array 数组
 * @param {*} value 包含的项
 * @return {boolean}
 */
function contains(array, value) {
  let result = false
  each(array, (item) => {
    result = item === value
    return !result
  })

  return result
}

// exports = module.exports = contains;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file bind函数
 */

/**
 * Function.prototype.bind 方法的兼容性封装
 *
 * @param {Function} func 要bind的函数
 * @param {Object} thisArg this指向对象
 * @param {...*} args 预设的初始参数
 * @return {Function}
 */
function bind(func, thisArg) {
  const nativeBind = Function.prototype.bind
  const slice = Array.prototype.slice
  // #[begin] allua
  if (nativeBind && func.bind === nativeBind) {
    // #[end]
    return nativeBind.apply(func, slice.call(arguments, 1))
    // #[begin] allua
  }

  /* istanbul ignore next */
  const args = slice.call(arguments, 2)
  /* istanbul ignore next */
  return function () {
    return func.apply(thisArg, args.concat(slice.call(arguments)))
  }
// #[end]
}

// exports = module.exports = bind;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM 事件挂载
 */

/**
 * DOM 事件挂载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function on(el, eventName, listener, capture) {
// #[begin] allua
/* istanbul ignore else */
  if (el.addEventListener) {
    // #[end]
    el.addEventListener(eventName, listener, capture)
    // #[begin] allua
  }
  else {
    el.attachEvent(`on${eventName}`, listener)
  }
// #[end]
}

// exports = module.exports = on;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM 事件卸载
 */

/**
 * DOM 事件卸载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function un(el, eventName, listener, capture) {
// #[begin] allua
/* istanbul ignore else */
  if (el.addEventListener) {
    // #[end]
    el.removeEventListener(eventName, listener, capture)
    // #[begin] allua
  }
  else {
    el.detachEvent(`on${eventName}`, listener)
  }
// #[end]
}

// exports = module.exports = un;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将字符串逗号切分返回对象
 */

// var each = require('../util/each');

/**
 * 将字符串逗号切分返回对象
 *
 * @param {string} source 源字符串
 * @return {Object}
 */
function splitStr2Obj(source) {
  const result = {}
  each(
    source.split(','),
    (key) => {
      result[key] = key
    },
  )
  return result
}

// exports = module.exports = splitStr2Obj;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file SVG标签表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * svgTags
 *
 * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
 * @type {Object}
 */
const svgTags = splitStr2Obj(''
// Animation elements
+ 'animate,animateMotion,animateTransform,'

// Basic shapes
+ 'circle,ellipse,line,polygon,polyline,rect,'

// Container elements
+ 'defs,g,marker,mask,missing-glyph,pattern,svg,symbol,'

// Descriptive elements
+ 'desc,metadata,'

// Font elements
+ 'font,font-face,'

// Gradient elements
+ 'linearGradient,radialGradient,stop,'

// Graphics elements
+ 'image,path,use,'

// Text elements
+ 'glyph,textPath,text,tref,tspan,'

// Others
+ 'clipPath,cursor,filter,foreignObject,view',
)

// exports = module.exports = svgTags;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file DOM创建
 */

// var svgTags = require('./svg-tags');

/**
 * 创建 DOM 元素
 *
 * @param  {string} tagName tagName
 * @return {HTMLElement}
 */
function createEl(tagName) {
  if (svgTags[tagName] && document.createElementNS)
    return document.createElementNS('http://www.w3.org/2000/svg', tagName)

  return document.createElement(tagName)
}

// exports = module.exports = createEl;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 移除DOM
 */

/**
 * 将 DOM 从页面中移除
 *
 * @param {HTMLElement} el DOM元素
 */
function removeEl(el) {
  if (el && el.parentNode)
    el.parentNode.removeChild(el)
}

// exports = module.exports = removeEl;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 在下一个时间周期运行任务
 */

// 该方法参照了vue2.5.0的实现，感谢vue团队
// SEE: https://github.com/vuejs/vue/blob/0948d999f2fddf9f90991956493f976273c5da1f/src/core/util/env.js#L68

// var bind = require('./bind');

/**
 * 下一个周期要执行的任务列表
 *
 * @inner
 * @type {Array}
 */
let nextTasks = []

/**
 * 执行下一个周期任务的函数
 *
 * @inner
 * @type {Function}
 */
let nextHandler

/**
 * 浏览器是否支持原生Promise
 * 对Promise做判断，是为了禁用一些不严谨的Promise的polyfill
 *
 * @inner
 * @type {boolean}
 */
const isNativePromise = typeof Promise === 'function' && /native code/.test(Promise)

/**
 * 浏览器是否支持原生setImmediate
 *
 * @inner
 * @type {boolean}
 */
const isNativeSetImmediate = typeof setImmediate === 'function' && /native code/.test(setImmediate)

/**
 * 在下一个时间周期运行任务
 *
 * @inner
 * @param {Function} fn 要运行的任务函数
 * @param {Object=} thisArg this指向对象
 */
function nextTick(fn, thisArg) {
  if (thisArg)
    fn = bind(fn, thisArg)

  nextTasks.push(fn)

  if (nextHandler)
    return

  nextHandler = function () {
    const tasks = nextTasks.slice(0)
    nextTasks = []
    nextHandler = null

    for (let i = 0, l = tasks.length; i < l; i++)
      tasks[i]()
  }

  // 非标准方法，但是此方法非常吻合要求。
  /* istanbul ignore next */
  if (isNativeSetImmediate) {
    setImmediate(nextHandler)
  }
  // 用MessageChannel去做setImmediate的polyfill
  // 原理是将新的message事件加入到原有的dom events之后
  else if (typeof MessageChannel === 'function') {
    const channel = new MessageChannel()
    const port = channel.port2
    channel.port1.onmessage = nextHandler
    port.postMessage(1)
  }
  // for native app
  else if (isNativePromise) {
    Promise.resolve().then(nextHandler)
  }
  else {
    setTimeout(nextHandler, 0)
  }
}

// exports = module.exports = nextTick;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ie版本号
 */

// #[begin] allua
/**
 * 从userAgent中ie版本号的匹配信息
 *
 * @type {Array}
 */
const ieVersionMatch = typeof navigator !== 'undefined'
&& navigator.userAgent.match(/(msie|trident)(\s*|\/)([0-9]+)/i)

/**
 * ie版本号，非ie时为0
 *
 * @type {number}
 */
let ie = ieVersionMatch ? /* istanbul ignore next */ ieVersionMatch[3] - 0 : 0
if (ie && !/msie/i.test(ieVersionMatch[1]))
  ie += 4

// #[end]

// exports = module.exports = ie;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 是否 IE 并且小于 9
 */

// var ie = require('./ie');

// HACK:
// 1. IE8下，设置innerHTML时如果以html comment开头，comment会被自动滤掉
//    为了保证stump存在，需要设置完html后，createComment并appendChild/insertBefore
// 2. IE8下，innerHTML还不支持custom element，所以需要用div替代，不用createElement
// 3. 虽然IE8已经优化了字符串+连接，碎片化连接性能不再退化
//    但是由于上面多个兼容场景都用 < 9 判断，所以字符串连接也沿用
//    所以结果是IE8下字符串连接用的是数组join的方式

// #[begin] allua
/**
 * 是否 IE 并且小于 9
 */
const ieOldThan9 = ie && /* istanbul ignore next */ ie < 9
// #[end]

// exports = module.exports = ieOldThan9;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 触发元素事件
 */

/**
 * 触发元素事件
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 */
function trigger(el, eventName) {
  const event = document.createEvent('HTMLEvents')
  event.initEvent(eventName, true, true)
  el.dispatchEvent(event)
}

// exports = module.exports = trigger;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解决 IE9 在表单元素中删除字符时不触发事件的问题
 */

// var ie = require('./ie');
// var on = require('./on');
// var trigger = require('./trigger');

// #[begin] allua
/* istanbul ignore if */
if (ie === 9) {
  on(document, 'selectionchange', () => {
    const el = document.activeElement
    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')
      trigger(el, 'input')
  })
}
// #[end]

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 自闭合标签表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 自闭合标签列表
 *
 * @type {Object}
 */
const autoCloseTags = splitStr2Obj('area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr')

// exports = module.exports = autoCloseTags;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file data types
 */

// var bind = require('./bind');
// var empty = require('./empty');
// var extend = require('./extend');

// #[begin] error
const ANONYMOUS_CLASS_NAME = '<<anonymous>>'

/**
 * 获取精确的类型
 *
 * @NOTE 如果 obj 是一个 DOMElement，我们会返回 `element`；
 *
 * @param  {*} obj 目标
 * @return {string}
 */
function getDataType(obj) {
// 不支持element了。data应该是纯数据
// if (obj && obj.nodeType === 1) {
//     return 'element';
// }

  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase()
}
// #[end]

/**
 * 创建链式的数据类型校验器
 *
 * @param  {Function} validate 真正的校验器
 * @return {Function}
 */
function createChainableChecker(validate) {
/* istanbul ignore next */
  let chainedChecker = function () {}
  chainedChecker.isRequired = empty

  // 只在 error 功能启用时才有实际上的 dataTypes 检测
  // #[begin] error
  validate = validate || empty
  const checkType = function (isRequired, data, dataName, componentName, fullDataName) {
    const dataValue = data[dataName]
    const dataType = getDataType(dataValue)

    /* istanbul ignore next */
    componentName = componentName || ANONYMOUS_CLASS_NAME

    // 如果是 null 或 undefined，那么要提前返回啦
    if (dataValue == null) {
    // 是 required 就报错
      if (isRequired) {
        throw new Error('[SAN ERROR] '
                + `The \`${dataName}\` `
                + `is marked as required in \`${componentName}\`, `
                + `but its value is ${dataType}`,
        )
      }
      // 不是 required，那就是 ok 的
      return
    }

    validate(data, dataName, componentName, fullDataName)
  }

  chainedChecker = bind(checkType, null, false)
  chainedChecker.isRequired = bind(checkType, null, true)
  // #[end]

  return chainedChecker
}

// #[begin] error
/**
 * 生成主要类型数据校验器
 *
 * @param  {string} type 主类型
 * @return {Function}
 */
function createPrimaryTypeChecker(type) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    const dataValue = data[dataName]
    const dataType = getDataType(dataValue)

    if (dataType !== type) {
      throw new Error('[SAN ERROR] '
            + `Invalid ${componentName} data \`${fullDataName}\` of type`
            + `(${dataType} supplied to ${componentName}, `
            + `expected ${type})`,
      )
    }
  })
}

/**
 * 生成 arrayOf 校验器
 *
 * @param  {Function} arrayItemChecker 数组中每项数据的校验器
 * @return {Function}
 */
function createArrayOfChecker(arrayItemChecker) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    if (typeof arrayItemChecker !== 'function') {
      throw new TypeError('[SAN ERROR] '
            + `Data \`${dataName}\` of \`${componentName}\` has invalid `
            + 'DataType notation inside `arrayOf`, expected `function`',
      )
    }

    const dataValue = data[dataName]
    const dataType = getDataType(dataValue)

    if (dataType !== 'array') {
      throw new Error('[SAN ERROR] '
            + `Invalid ${componentName} data \`${fullDataName}\` of type`
            + `(${dataType} supplied to ${componentName}, `
            + 'expected array)',
      )
    }

    for (let i = 0, len = dataValue.length; i < len; i++)
      arrayItemChecker(dataValue, i, componentName, `${fullDataName}[${i}]`)
  })
}

/**
 * 生成 instanceOf 检测器
 *
 * @param  {Function|Class} expectedClass 期待的类
 * @return {Function}
 */
function createInstanceOfChecker(expectedClass) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    const dataValue = data[dataName]

    if (dataValue instanceof expectedClass)
      return

    const dataValueClassName = dataValue.constructor && dataValue.constructor.name
      ? dataValue.constructor.name
      : /* istanbul ignore next */ ANONYMOUS_CLASS_NAME

    /* istanbul ignore next */
    const expectedClassName = expectedClass.name || ANONYMOUS_CLASS_NAME

    throw new Error('[SAN ERROR] '
        + `Invalid ${componentName} data \`${fullDataName}\` of type`
        + `(${dataValueClassName} supplied to ${componentName}, `
        + `expected instance of ${expectedClassName})`,
    )
  })
}

/**
 * 生成 shape 校验器
 *
 * @param  {Object} shapeTypes shape 校验规则
 * @return {Function}
 */
function createShapeChecker(shapeTypes) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    if (getDataType(shapeTypes) !== 'object') {
      throw new Error('[SAN ERROR] '
            + `Data \`${fullDataName}\` of \`${componentName}\` has invalid `
            + 'DataType notation inside `shape`, expected `object`',
      )
    }

    const dataValue = data[dataName]
    const dataType = getDataType(dataValue)

    if (dataType !== 'object') {
      throw new Error('[SAN ERROR] '
            + `Invalid ${componentName} data \`${fullDataName}\` of type`
            + `(${dataType} supplied to ${componentName}, `
            + 'expected object)',
      )
    }

    for (const shapeKeyName in shapeTypes) {
    /* istanbul ignore else  */
      if (shapeTypes.hasOwnProperty(shapeKeyName)) {
        const checker = shapeTypes[shapeKeyName]
        if (typeof checker === 'function')
          checker(dataValue, shapeKeyName, componentName, `${fullDataName}.${shapeKeyName}`)
      }
    }
  })
}

/**
 * 生成 oneOf 校验器
 *
 * @param  {Array} expectedEnumValues 期待的枚举值
 * @return {Function}
 */
function createOneOfChecker(expectedEnumValues) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    if (getDataType(expectedEnumValues) !== 'array') {
      throw new Error('[SAN ERROR] '
            + `Data \`${fullDataName}\` of \`${componentName}\` has invalid `
            + 'DataType notation inside `oneOf`, array is expected.',
      )
    }

    const dataValue = data[dataName]

    for (let i = 0, len = expectedEnumValues.length; i < len; i++) {
      if (dataValue === expectedEnumValues[i])
        return
    }

    throw new Error('[SAN ERROR] '
        + `Invalid ${componentName} data \`${fullDataName}\` of value`
        + `(\`${dataValue}\` supplied to ${componentName}, `
        + `expected one of ${expectedEnumValues.join(',')})`,
    )
  })
}

/**
 * 生成 oneOfType 校验器
 *
 * @param  {Array<Function>} expectedEnumOfTypeValues 期待的枚举类型
 * @return {Function}
 */
function createOneOfTypeChecker(expectedEnumOfTypeValues) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    if (getDataType(expectedEnumOfTypeValues) !== 'array') {
      throw new Error('[SAN ERROR] '
            + `Data \`${dataName}\` of \`${componentName}\` has invalid `
            + 'DataType notation inside `oneOf`, array is expected.',
      )
    }

    const dataValue = data[dataName]

    for (let i = 0, len = expectedEnumOfTypeValues.length; i < len; i++) {
      const checker = expectedEnumOfTypeValues[i]

      if (typeof checker !== 'function')
        continue

      try {
        checker(data, dataName, componentName, fullDataName)
        // 如果 checker 完成校验没报错，那就返回了
        return
      }
      catch (e) {
        // 如果有错误，那么应该把错误吞掉
      }
    }

    // 所有的可接受 type 都失败了，才丢一个异常
    throw new Error('[SAN ERROR] '
        + `Invalid ${componentName} data \`${dataName}\` of value`
        + `(\`${dataValue}\` supplied to ${componentName})`,
    )
  })
}

/**
 * 生成 objectOf 校验器
 *
 * @param  {Function} typeChecker 对象属性值校验器
 * @return {Function}
 */
function createObjectOfChecker(typeChecker) {
  return createChainableChecker((data, dataName, componentName, fullDataName) => {
    if (typeof typeChecker !== 'function') {
      throw new TypeError('[SAN ERROR] '
            + `Data \`${dataName}\` of \`${componentName}\` has invalid `
            + 'DataType notation inside `objectOf`, expected function',
      )
    }

    const dataValue = data[dataName]
    const dataType = getDataType(dataValue)

    if (dataType !== 'object') {
      throw new Error('[SAN ERROR] '
            + `Invalid ${componentName} data \`${dataName}\` of type`
            + `(${dataType} supplied to ${componentName}, `
            + 'expected object)',
      )
    }

    for (const dataKeyName in dataValue) {
    /* istanbul ignore else  */
      if (dataValue.hasOwnProperty(dataKeyName)) {
        typeChecker(
          dataValue,
          dataKeyName,
          componentName,
        `${fullDataName}.${dataKeyName}`,
        )
      }
    }
  })
}

/**
 * 生成 exact 校验器
 *
 * @param  {Object} shapeTypes object 形态定义
 * @return {Function}
 */
function createExactChecker(shapeTypes) {
  return createChainableChecker((data, dataName, componentName, fullDataName, secret) => {
    if (getDataType(shapeTypes) !== 'object') {
      throw new Error('[SAN ERROR] '
            + `Data \`${dataName}\` of \`${componentName}\` has invalid `
            + 'DataType notation inside `exact`',
      )
    }

    const dataValue = data[dataName]
    const dataValueType = getDataType(dataValue)

    if (dataValueType !== 'object') {
      throw new Error('[SAN ERROR] '
            + `Invalid data \`${fullDataName}\` of type \`${dataValueType}\``
            + `(supplied to ${componentName}, expected \`object\`)`,
      )
    }

    const allKeys = {}

    // 先合入 shapeTypes
    extend(allKeys, shapeTypes)
    // 再合入 dataValue
    extend(allKeys, dataValue)
    // 保证 allKeys 的类型正确

    for (const key in allKeys) {
    /* istanbul ignore else  */
      if (allKeys.hasOwnProperty(key)) {
        const checker = shapeTypes[key]

        // dataValue 中有一个多余的数据项
        if (!checker) {
          throw new Error('[SAN ERROR] '
                    + `Invalid data \`${fullDataName}\` key \`${key}\` `
                    + `supplied to \`${componentName}\`. `
                    + `(\`${key}\` is not defined in \`DataTypes.exact\`)`,
          )
        }

        if (!(key in dataValue)) {
          throw new Error('[SAN ERROR] '
                    + `Invalid data \`${fullDataName}\` key \`${key}\` `
                    + `supplied to \`${componentName}\`. `
                    + `(\`${key}\` is marked \`required\` in \`DataTypes.exact\`)`,
          )
        }

        checker(
          dataValue,
          key,
          componentName,
        `${fullDataName}.${key}`,
        secret,
        )
      }
    }
  })
}
// #[end]

/* eslint-disable fecs-valid-var-jsdoc */
let DataTypes = {
  array: createChainableChecker(),
  object: createChainableChecker(),
  func: createChainableChecker(),
  string: createChainableChecker(),
  number: createChainableChecker(),
  bool: createChainableChecker(),
  symbol: createChainableChecker(),
  any: createChainableChecker,
  arrayOf: createChainableChecker,
  instanceOf: createChainableChecker,
  shape: createChainableChecker,
  oneOf: createChainableChecker,
  oneOfType: createChainableChecker,
  objectOf: createChainableChecker,
  exact: createChainableChecker,
}

// #[begin] error
DataTypes = {

  any: createChainableChecker(),

  // 类型检测
  array: createPrimaryTypeChecker('array'),
  object: createPrimaryTypeChecker('object'),
  func: createPrimaryTypeChecker('function'),
  string: createPrimaryTypeChecker('string'),
  number: createPrimaryTypeChecker('number'),
  bool: createPrimaryTypeChecker('boolean'),
  symbol: createPrimaryTypeChecker('symbol'),

  // 复合类型检测
  arrayOf: createArrayOfChecker,
  instanceOf: createInstanceOfChecker,
  shape: createShapeChecker,
  oneOf: createOneOfChecker,
  oneOfType: createOneOfTypeChecker,
  objectOf: createObjectOfChecker,
  exact: createExactChecker,

}
/* eslint-enable fecs-valid-var-jsdoc */
// #[end]

// module.exports = DataTypes;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建数据检测函数
 */

// #[begin] error

/**
 * 创建数据检测函数
 *
 * @param  {Object} dataTypes     数据格式
 * @param  {string} componentName 组件名
 * @return {Function}
 */
function createDataTypesChecker(dataTypes, componentName) {
/**
 * 校验 data 是否满足 data types 的格式
 *
 * @param  {*} data 数据
 */
  return function (data) {
    for (const dataTypeName in dataTypes) {
    /* istanbul ignore else  */
      if (dataTypes.hasOwnProperty(dataTypeName)) {
        const dataTypeChecker = dataTypes[dataTypeName]

        if (typeof dataTypeChecker !== 'function') {
          throw new TypeError(`[SAN ERROR] ${
                        componentName}:${dataTypeName} is invalid; `
                    + 'it must be a function, usually from san.DataTypes',
          )
        }

        dataTypeChecker(
          data,
          dataTypeName,
          componentName,
          dataTypeName,
        )
      }
    }
  }
}

// #[end]

// module.exports = createDataTypesChecker;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 字符串源码读取类
 */

/**
 * 字符串源码读取类，用于模板字符串解析过程
 *
 * @class
 * @param {string} source 要读取的字符串
 */
function Walker(source) {
  this.source = source
  this.len = this.source.length
  this.index = 0
}

/**
 * 读取下一个字符，返回下一个字符的 code
 *
 * @return {number}
 */
Walker.prototype.nextCode = function () {
  this.index++
  return this.source.charCodeAt(this.index)
}

/**
 * 向前读取字符，直到遇到指定字符再停止
 * 未指定字符时，当遇到第一个非空格、制表符的字符停止
 *
 * @param {number=} charCode 指定字符的code
 * @return {boolean} 当指定字符时，返回是否碰到指定的字符
 */
Walker.prototype.goUntil = function (charCode) {
  let code
  while (this.index < this.len && (code = this.source.charCodeAt(this.index))) {
    switch (code) {
      case 32: // 空格 space
      case 9: // 制表符 tab
      case 13: // \r
      case 10: // \n
        this.index++
        break

      default:
        if (code === charCode) {
          this.index++
          return 1
        }
        return
    }
  }
}

/**
 * 向前读取符合规则的字符片段，并返回规则匹配结果
 *
 * @param {RegExp} reg 字符片段的正则表达式
 * @param {boolean} isMatchStart 是否必须匹配当前位置
 * @return {Array?}
 */
Walker.prototype.match = function (reg, isMatchStart) {
  reg.lastIndex = this.index

  const match = reg.exec(this.source)
  if (match && (!isMatchStart || this.index === match.index)) {
    this.index = reg.lastIndex
    return match
  }
}

// exports = module.exports = Walker;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 表达式类型
 */

/**
 * 表达式类型
 *
 * @const
 * @type {Object}
 */
const ExprType = {
  STRING: 1,
  NUMBER: 2,
  BOOL: 3,
  ACCESSOR: 4,
  INTERP: 5,
  CALL: 6,
  TEXT: 7,
  BINARY: 8,
  UNARY: 9,
  TERTIARY: 10,
  OBJECT: 11,
  ARRAY: 12,
  NULL: 13,
}

// exports = module.exports = ExprType;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 把 kebab case 字符串转换成 camel case
 */

/**
 * 把 kebab case 字符串转换成 camel case
 *
 * @param {string} source 源字符串
 * @return {string}
 */
function kebab2camel(source) {
  return source.replace(/-+(.)/ig, (match, alpha) => {
    return alpha.toUpperCase()
  })
}

// exports = module.exports = kebab2camel;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file bool属性表
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * bool属性表
 *
 * @type {Object}
 */
const boolAttrs = splitStr2Obj(
  'allowpaymentrequest,async,autofocus,autoplay,'
+ 'checked,controls,default,defer,disabled,formnovalidate,'
+ 'hidden,ismap,itemscope,loop,multiple,muted,nomodule,novalidate,'
+ 'open,readonly,required,reversed,selected,typemustmatch',
)

// exports = module.exports = boolAttrs;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取字符串
 */

// var ExprType = require('./expr-type');

/**
 * 读取字符串
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readString(walker) {
  const startCode = walker.source.charCodeAt(walker.index)
  let value = ''
  let charCode

  walkLoop: while ((charCode = walker.nextCode())) {
    switch (charCode) {
      case 92: // \
        charCode = walker.nextCode()

        switch (charCode) {
          case 117: // \u
            value += String.fromCharCode(parseInt(
              walker.source.slice(walker.index + 1, walker.index + 5), 16,
            ))
            walker.index += 4
            break

          case 120: // \x
            value += String.fromCharCode(parseInt(
              walker.source.slice(walker.index + 1, walker.index + 3), 16,
            ))
            walker.index += 2
            break

          case 98:
            value += '\b'
            break
          case 102:
            value += '\f'
            break
          case 110:
            value += '\n'
            break
          case 114:
            value += '\r'
            break
          case 116:
            value += '\t'
            break
          case 118:
            value += '\v'
            break

          default:
            value += String.fromCharCode(charCode)
        }

        break
      case startCode:
        walker.index++
        break walkLoop
      default:
        value += String.fromCharCode(charCode)
    }
  }

  return {
    type: 1,
    // 处理字符转义
    value,
  }
}

// exports = module.exports = readString;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取ident
 */

/**
 * 读取ident
 * 这里的 ident 指标识符(identifier)，也就是通常意义上的变量名
 * 这里默认的变量名规则为：由美元符号($)、数字、字母或者下划线(_)构成的字符串
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {string}
 */
function readIdent(walker) {
  const match = walker.match(/\s*([\$0-9a-z_]+)/ig, 1)

  // #[begin] error
  if (!match)
    throw new Error(`[SAN FATAL] expect an ident: ${walker.source.slice(walker.index)}`)

  // #[end]

  return match[1]
}

// exports = module.exports = readIdent;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取三元表达式
 */

// var ExprType = require('./expr-type');
// var readLogicalORExpr = require('./read-logical-or-expr');

/**
 * 读取三元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readTertiaryExpr(walker) {
  const conditional = readLogicalORExpr(walker)
  walker.goUntil()

  if (walker.source.charCodeAt(walker.index) === 63) { // ?
    walker.index++
    const yesExpr = readTertiaryExpr(walker)
    walker.goUntil()

    if (walker.source.charCodeAt(walker.index) === 58) { // :
      walker.index++
      return {
        type: 10,
        segs: [
          conditional,
          yesExpr,
          readTertiaryExpr(walker),
        ],
      }
    }
  }

  return conditional
}

// exports = module.exports = readTertiaryExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取访问表达式
 */

// var ExprType = require('./expr-type');
// var readIdent = require('./read-ident');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取访问表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAccessor(walker) {
  const firstSeg = readIdent(walker)
  switch (firstSeg) {
    case 'true':
    case 'false':
      return {
        type: 3,
        value: firstSeg === 'true',
      }
    case 'null':
      return {
        type: 13,
      }
  }

  const result = {
    type: 4,
    paths: [
      { type: 1, value: firstSeg },
    ],
  }

  accessorLoop: while (1) {
    /* eslint-enable no-constant-condition */

    switch (walker.source.charCodeAt(walker.index)) {
      case 46: // .
        walker.index++

        // ident as string
        result.paths.push({
          type: 1,
          value: readIdent(walker),
        })
        break

      case 91: // [
        walker.index++
        result.paths.push(readTertiaryExpr(walker))
        walker.goUntil(93) // ]
        break

      default:
        break accessorLoop
    }
  }

  return result
}

// exports = module.exports = readAccessor;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取调用
 */

// var ExprType = require('./expr-type');
// var readAccessor = require('./read-accessor');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取调用
 *
 * @param {Walker} walker 源码读取对象
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function readCall(walker, defaultArgs) {
  walker.goUntil()
  let result = readAccessor(walker)

  let args
  if (walker.goUntil(40)) { // (
    args = []

    while (!walker.goUntil(41)) { // )
      args.push(readTertiaryExpr(walker))
      walker.goUntil(44) // ,
    }
  }
  else if (defaultArgs) {
    args = defaultArgs
  }

  if (args) {
    result = {
      type: 6,
      name: result,
      args,
    }
  }

  return result
}

// exports = module.exports = readCall;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取括号表达式
 */

// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取括号表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readParenthesizedExpr(walker) {
  walker.index++
  const expr = readTertiaryExpr(walker)
  walker.goUntil(41) // )

  expr.parenthesized = true
  return expr
}

// exports = module.exports = readParenthesizedExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取一元表达式
 */

// var ExprType = require('./expr-type');
// var readString = require('./read-string');
// var readCall = require('./read-call');
// var readParenthesizedExpr = require('./read-parenthesized-expr');
// var readTertiaryExpr = require('./read-tertiary-expr');

function postUnaryExpr(expr, operator) {
  switch (operator) {
    case 33:
      var value
      switch (expr.type) {
        case 2:
        case 1:
        case 3:
          value = !expr.value
          break
        case 12:
        case 11:
          value = false
          break
        case 13:
          value = true
          break
      }

      if (value != null) {
        return {
          type: 3,
          value,
        }
      }
      break

    case 43:
      switch (expr.type) {
        case 2:
        case 1:
        case 3:
          return {
            type: 2,
            value: +expr.value,
          }
      }
      break

    case 45:
      switch (expr.type) {
        case 2:
        case 1:
        case 3:
          return {
            type: 2,
            value: -expr.value,
          }
      }
      break
  }

  return {
    type: 9,
    expr,
    operator,
  }
}

/**
 * 读取一元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readUnaryExpr(walker) {
  walker.goUntil()

  const currentCode = walker.source.charCodeAt(walker.index)
  switch (currentCode) {
    case 33: // !
    case 43: // +
    case 45: // -
      walker.index++
      return postUnaryExpr(readUnaryExpr(walker), currentCode)

    case 34: // "
    case 39: // '
      return readString(walker)

    case 48: // number
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return {
        type: 2,
        value: +(walker.match(/[0-9]+(\.[0-9]+)?/g, 1)[0]),
      }

    case 40: // (
      return readParenthesizedExpr(walker)

    // array literal
    case 91: // [
      walker.index++
      var arrItems = []
      while (!walker.goUntil(93)) { // ]
        var item = {}
        arrItems.push(item)

        if (walker.source.charCodeAt(walker.index) === 46 && walker.match(/\.\.\.\s*/g))
          item.spread = true

        item.expr = readTertiaryExpr(walker)
        walker.goUntil(44) // ,
      }

      return {
        type: 12,
        items: arrItems,
      }

    // object literal
    case 123: // {
      walker.index++
      var objItems = []

      while (!walker.goUntil(125)) { // }
        var item = {}
        objItems.push(item)

        if (walker.source.charCodeAt(walker.index) === 46 && walker.match(/\.\.\.\s*/g)) {
          item.spread = true
          item.expr = readTertiaryExpr(walker)
        }
        else {
        // #[begin] error
          const walkerIndexBeforeName = walker.index
          // #[end]

          item.name = readUnaryExpr(walker)

          // #[begin] error
          if (item.name.type > 4) {
            throw new Error(
            `[SAN FATAL] unexpect object name: ${
                            walker.source.slice(walkerIndexBeforeName, walker.index)}`,
            )
          }
          // #[end]

          if (walker.goUntil(58)) { // :
            item.expr = readTertiaryExpr(walker)
          }
          else {
            item.expr = item.name
          }

          if (item.name.type === 4)
            item.name = item.name.paths[0]
        }

        walker.goUntil(44) // ,
      }

      return {
        type: 11,
        items: objItems,
      }
  }

  return readCall(walker)
}

// exports = module.exports = readUnaryExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取乘法表达式
 */

// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取乘法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readMultiplicativeExpr(walker) {
  let expr = readUnaryExpr(walker)

  while (1) {
    walker.goUntil()

    const code = walker.source.charCodeAt(walker.index)
    switch (code) {
      case 37: // %
      case 42: // *
      case 47: // /
        walker.index++
        expr = {
          type: 8,
          operator: code,
          segs: [expr, readUnaryExpr(walker)],
        }
        continue
    }

    break
  }

  return expr
}

// exports = module.exports = readMultiplicativeExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取加法表达式
 */

// var ExprType = require('./expr-type');
// var readMultiplicativeExpr = require('./read-multiplicative-expr');

/**
 * 读取加法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAdditiveExpr(walker) {
  let expr = readMultiplicativeExpr(walker)

  while (1) {
    walker.goUntil()
    const code = walker.source.charCodeAt(walker.index)

    switch (code) {
      case 43: // +
      case 45: // -
        walker.index++
        expr = {
          type: 8,
          operator: code,
          segs: [expr, readMultiplicativeExpr(walker)],
        }
        continue
    }

    break
  }

  return expr
}

// exports = module.exports = readAdditiveExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取关系判断表达式
 */

// var ExprType = require('./expr-type');
// var readAdditiveExpr = require('./read-additive-expr');

/**
 * 读取关系判断表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readRelationalExpr(walker) {
  const expr = readAdditiveExpr(walker)
  walker.goUntil()

  let code = walker.source.charCodeAt(walker.index)
  switch (code) {
    case 60: // <
    case 62: // >
      if (walker.nextCode() === 61) {
        code += 61
        walker.index++
      }

      return {
        type: 8,
        operator: code,
        segs: [expr, readAdditiveExpr(walker)],
      }
  }

  return expr
}

// exports = module.exports = readRelationalExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取相等比对表达式
 */

// var ExprType = require('./expr-type');
// var readRelationalExpr = require('./read-relational-expr');

/**
 * 读取相等比对表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readEqualityExpr(walker) {
  const expr = readRelationalExpr(walker)
  walker.goUntil()

  let code = walker.source.charCodeAt(walker.index)
  switch (code) {
    case 61: // =
    case 33: // !
      if (walker.nextCode() === 61) {
        code += 61
        if (walker.nextCode() === 61) {
          code += 61
          walker.index++
        }

        return {
          type: 8,
          operator: code,
          segs: [expr, readRelationalExpr(walker)],
        }
      }

      walker.index--
  }

  return expr
}

// exports = module.exports = readEqualityExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取逻辑与表达式
 */

// var ExprType = require('./expr-type');
// var readEqualityExpr = require('./read-equality-expr');

/**
 * 读取逻辑与表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalANDExpr(walker) {
  const expr = readEqualityExpr(walker)
  walker.goUntil()

  if (walker.source.charCodeAt(walker.index) === 38) { // &
    if (walker.nextCode() === 38) {
      walker.index++
      return {
        type: 8,
        operator: 76,
        segs: [expr, readLogicalANDExpr(walker)],
      }
    }

    walker.index--
  }

  return expr
}

// exports = module.exports = readLogicalANDExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 读取逻辑或表达式
 */

// var ExprType = require('./expr-type');
// var readLogicalANDExpr = require('./read-logical-and-expr');

/**
 * 读取逻辑或表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalORExpr(walker) {
  const expr = readLogicalANDExpr(walker)
  walker.goUntil()

  if (walker.source.charCodeAt(walker.index) === 124) { // |
    if (walker.nextCode() === 124) {
      walker.index++
      return {
        type: 8,
        operator: 248,
        segs: [expr, readLogicalORExpr(walker)],
      }
    }

    walker.index--
  }

  return expr
}

// exports = module.exports = readLogicalORExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析表达式
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 解析表达式
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseExpr(source) {
  if (!source)
    return

  if (typeof source === 'object' && source.type)
    return source

  return readTertiaryExpr(new Walker(source))
}

// exports = module.exports = parseExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析调用
 */

// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析调用
 *
 * @param {string} source 源码
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function parseCall(source, defaultArgs) {
  let expr = readCall(new Walker(source), defaultArgs)

  if (expr.type !== 6) {
    expr = {
      type: 6,
      name: expr,
      args: defaultArgs || [],
    }
  }

  return expr
}

// exports = module.exports = parseCall;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解码 HTML 字符实体
 */

const ENTITY_DECODE_MAP = {
  lt: '<',
  gt: '>',
  nbsp: '\u00A0',
  quot: '\"',
  emsp: '\u2003',
  ensp: '\u2002',
  thinsp: '\u2009',
  copy: '\xA9',
  reg: '\xAE',
  zwnj: '\u200C',
  zwj: '\u200D',
  amp: '&',
}

/**
 * 解码 HTML 字符实体
 *
 * @param {string} source 要解码的字符串
 * @return {string}
 */
function decodeHTMLEntity(source) {
  return source
    .replace(/&#(x[0-9a-f]+|[0-9]+);/g, (match, code) => {
      if (code.charCodeAt(0) === 120) { // x
        return String.fromCharCode(parseInt(code.slice(1), 16))
      }
      return String.fromCharCode(+code)
    })
    .replace(/&([a-z]+);/ig, (match, code) => {
      return ENTITY_DECODE_MAP[code] || match
    })
}

// exports = module.exports = decodeHTMLEntity;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析文本
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');
// var decodeHTMLEntity = require('../util/decode-html-entity');

/**
 * 解析文本
 *
 * @param {string} source 源码
 * @param {Array?} delimiters 分隔符。默认为 ['{{', '}}']
 * @return {Object}
 */
function parseText(source, delimiters) {
  delimiters = delimiters || ['{{', '}}']

  const walker = new Walker(source)
  let beforeIndex = 0

  const segs = []
  let segIndex = -1
  let original

  function pushString(value) {
    const current = segs[segIndex]
    if (!current || current.type !== 1) {
      segs[++segIndex] = {
        type: 1,
        value,
      }
    }
    else {
      current.value = current.value + value
    }
  }

  const delimStart = delimiters[0]
  const delimStartLen = delimStart.length
  const delimEnd = delimiters[1]
  const delimEndLen = delimEnd.length
  while (1) {
    const delimStartIndex = walker.source.indexOf(delimStart, walker.index)
    let delimEndIndex = walker.source.indexOf(delimEnd, walker.index)
    if (delimStartIndex === -1 || delimEndIndex < delimStartIndex)
      break

    // pushStringToSeg
    var strValue = walker.source.slice(
      beforeIndex,
      delimStartIndex,
    )
    strValue && pushString(decodeHTMLEntity(strValue))

    // pushInterpToSeg
    if (walker.source.indexOf(delimEnd, delimEndIndex + 1) === delimEndIndex + 1)
      delimEndIndex++

    const interpWalker = new Walker(walker.source.slice(delimStartIndex + delimStartLen, delimEndIndex))
    if (!interpWalker.goUntil(125) && interpWalker.index < interpWalker.len) {
      const interp = {
        type: 5,
        expr: readTertiaryExpr(interpWalker),
        filters: [],
      }
      while (interpWalker.goUntil(124)) { // |
        const callExpr = readCall(interpWalker, [])
        switch (callExpr.name.paths[0].value) {
          case 'html':
            break
          case 'raw':
            interp.original = 1
            break
          default:
            interp.filters.push(callExpr)
        }
      }

      original = original || interp.original
      segs[++segIndex] = interp
    }
    else {
      pushString(delimStart + interpWalker.source + delimEnd)
    }

    beforeIndex = walker.index = delimEndIndex + delimEndLen
  }

  // pushStringToSeg
  var strValue = walker.source.slice(beforeIndex)
  strValue && pushString(decodeHTMLEntity(strValue))

  switch (segs.length) {
    case 0:
      return {
        type: 1,
        value: '',
      }

    case 1:
      if (segs[0].type === 5 && segs[0].filters.length === 0 && !segs[0].original)
        return segs[0].expr

      return segs[0]
  }

  return original
    ? {
        type: 7,
        segs,
        original: 1,
      }
    : {
        type: 7,
        segs,
      }
}

// exports = module.exports = parseText;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析指令
 */

// var Walker = require('./walker');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var readAccessor = require('./read-accessor');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 解析指令
 *
 * @param {string} name 指令名称
 * @param {string} value 指令值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function parseDirective(name, value, options) {
  switch (name) {
    case 'is':
    case 'show':
    case 'html':
    case 'bind':
    case 'if':
    case 'elif':
      return {
        value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, '')),
      }

    case 'else':
      return {
        value: {},
      }

    case 'transition':
      return {
        value: parseCall(value),
      }

    case 'ref':
      return {
        value: parseText(value, options.delimiters),
      }

    case 'for':
      var walker = new Walker(value)
      var match = walker.match(/^\s*([$0-9a-z_]+)(\s*,\s*([$0-9a-z_]+))?\s+in\s+/ig, 1)

      if (match) {
        const directive = {
          item: match[1],
          value: readUnaryExpr(walker),
        }

        if (match[3])
          directive.index = match[3]

        if (walker.match(/\s*trackby\s+/ig, 1)) {
          const start = walker.index
          directive.trackBy = readAccessor(walker)
          directive.trackByRaw = walker.source.slice(start, walker.index)
        }
        return directive
      }

      // #[begin] error
      throw new Error(`[SAN FATAL] for syntax error: ${value}`)
        // #[end]
  }
}

// exports = module.exports = parseDirective;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析抽象节点属性
 */

// var each = require('../util/each');
// var kebab2camel = require('../util/kebab2camel');
// var boolAttrs = require('../browser/bool-attrs');
// var ExprType = require('./expr-type');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var parseDirective = require('./parse-directive');

/**
 * 解析抽象节点属性
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateAttr(aNode, name, value, options) {
  const prefixIndex = name.indexOf('-')
  let realName
  let prefix

  if (prefixIndex > 0) {
    prefix = name.slice(0, prefixIndex)
    realName = name.slice(prefixIndex + 1)
  }

  switch (prefix) {
    case 'on':
      var event = {
        name: realName,
        modifier: {},
      }
      aNode.events.push(event)

      var colonIndex
      while ((colonIndex = value.indexOf(':')) > 0) {
        const modifier = value.slice(0, colonIndex)

        // eventHandler("dd:aa") 这种情况不能算modifier，需要辨识
        if (!/^[a-z]+$/i.test(modifier))
          break

        event.modifier[modifier] = true
        value = value.slice(colonIndex + 1)
      }

      event.expr = parseCall(value, [
        {
          type: 4,
          paths: [
            { type: 1, value: '$event' },
          ],
        },
      ])
      break

    case 'san':
    case 's':
      if (realName === 'else-if')
        realName = 'elif'

      var directiveValue = parseDirective(realName, value, options)
      directiveValue && (aNode.directives[realName] = directiveValue)
      break

    case 'var':
      if (!aNode.vars)
        aNode.vars = []

      realName = kebab2camel(realName)
      aNode.vars.push({
        name: realName,
        expr: parseExpr(value.replace(/(^\{\{|\}\}$)/g, '')),
      })
      break

    default:
      if (prefix === 'prop')
        name = realName

      // parse two way binding, e.g. value="{=ident=}"
      if (value && value.indexOf('{=') === 0 && value.slice(-2) === '=}') {
        aNode.props.push({
          name,
          expr: parseExpr(value.slice(2, -2)),
          x: 1,
        })

        return
      }

      var expr = parseText(value || '', options.delimiters)
      if (expr.value === '') {
        if (boolAttrs[name]) {
          expr = {
            type: 3,
            value: true,
          }
        }
      }
      else {
        switch (name) {
          case 'class':
          case 'style':

            switch (expr.type) {
              case 7:
                for (let i = 0, l = expr.segs.length; i < l; i++) {
                  if (expr.segs[i].type === 5) {
                    expr.segs[i].filters.push({
                      type: 6,
                      name: {
                        type: 4,
                        paths: [
                          { type: 1, value: `_${name}` },
                        ],
                      },
                      args: [],
                    })
                  }
                }
                break

              case 5:
                expr.filters.push({
                  type: 6,
                  name: {
                    type: 4,
                    paths: [
                      { type: 1, value: `_${name}` },
                    ],
                  },
                  args: [],
                })
                break

              default:
                if (expr.type !== 1) {
                  expr = {
                    type: 5,
                    expr,
                    filters: [{
                      type: 6,
                      name: {
                        type: 4,
                        paths: [
                          { type: 1, value: `_${name}` },
                        ],
                      },
                      args: [],
                    }],
                  }
                }
            }
        }
      }

      aNode.props.push(
        value != null
          ? { name, expr }
          : { name, expr, noValue: 1 },
      )
  }
}

// exports = module.exports = integrateAttr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析模板
 */

// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var integrateAttr = require('./integrate-attr');
// var parseText = require('./parse-text');
// var svgTags = require('../browser/svg-tags');
// var autoCloseTags = require('../browser/auto-close-tags');

// #[begin] error
function getXPath(stack, currentTagName) {
  const path = ['ROOT']
  for (let i = 1, len = stack.length; i < len; i++)
    path.push(stack[i].tagName)

  if (currentTagName)
    path.push(currentTagName)

  return path.join('>')
}
// #[end]

/* eslint-disable fecs-max-statements */

/**
 * 解析 template
 *
 * @param {string} source template源码
 * @param {Object?} options 解析参数
 * @param {string?} options.trimWhitespace 空白文本的处理策略。none|blank|all
 * @param {Array?} options.delimiters 插值分隔符列表
 * @return {ANode}
 */
function parseTemplate(source, options) {
  options = options || {}
  options.trimWhitespace = options.trimWhitespace || 'none'

  const rootNode = {
    directives: {},
    props: [],
    events: [],
    children: [],
  }

  if (typeof source !== 'string')
    return rootNode

  source = source.replace(/<!--([\s\S]*?)-->/mg, '')
  const walker = new Walker(source)
  walker.goUntil()

  const tagReg = /<(\/)?([a-z][a-z0-9-]*)\s*/ig
  const attrReg = /([-:0-9a-z\[\]_]+)(\s*=\s*(([^'"<>\s]+)|"([^"]*?)"|'([^']*?)'))?\s*/ig

  let tagMatch
  let currentNode = rootNode
  const stack = [rootNode]
  let stackIndex = 0
  let beforeLastIndex = walker.index

  while ((tagMatch = walker.match(tagReg)) != null) {
    const tagMatchStart = walker.index - tagMatch[0].length
    const tagEnd = tagMatch[1]
    const tagName = tagMatch[2]

    // 62: >
    // 47: /
    // 处理 </xxxx >
    if (tagEnd) {
      if (walker.source.charCodeAt(walker.index) === 62) {
        // 满足关闭标签的条件时，关闭标签
        // 向上查找到对应标签，找不到时忽略关闭
        let closeIndex = stackIndex

        // #[begin] error
        // 如果正在闭合一个自闭合的标签，例如 </input>，报错
        if (autoCloseTags[tagName]) {
          throw new Error(''
                    + `[SAN ERROR] ${getXPath(stack, tagName)} is a \`auto closed\` tag, `
                    + `so it cannot be closed with </${tagName}>`,
          )
        }

        // 如果关闭的 tag 和当前打开的不一致，报错
        if (
          stack[closeIndex].tagName !== tagName
                // 这里要把 table 自动添加 tbody 的情况给去掉
                && !(tagName === 'table' && stack[closeIndex].tagName === 'tbody')
        )
          throw new Error(`[SAN ERROR] ${getXPath(stack)} is closed with ${tagName}`)

        // #[end]

        pushTextNode(source.slice(beforeLastIndex, tagMatchStart))
        while (closeIndex > 0 && stack[closeIndex].tagName !== tagName)
          closeIndex--

        if (closeIndex > 0) {
          stackIndex = closeIndex - 1
          currentNode = stack[stackIndex]
        }
        walker.index++
      }
      // #[begin] error
      else {
        // 处理 </xxx 非正常闭合标签

        // 如果闭合标签时，匹配后的下一个字符是 <，即下一个标签的开始，那么当前闭合标签未闭合
        if (walker.source.charCodeAt(walker.index) === 60) {
          throw new Error(''
                    + `[SAN ERROR] ${getXPath(stack)
                        }'s close tag not closed`,
          )
        }

        // 闭合标签有属性
        throw new Error(''
                + `[SAN ERROR] ${getXPath(stack)
                    }'s close tag has attributes`,
        )
      }
    // #[end]
    }
    else {
      let aElement = {
        directives: {},
        props: [],
        events: [],
        children: [],
        tagName,
      }
      let tagClose = autoCloseTags[tagName]

      // 解析 attributes

      while (1) {
        /* eslint-enable no-constant-condition */

        const nextCharCode = walker.source.charCodeAt(walker.index)

        // 标签结束时跳出 attributes 读取
        // 标签可能直接结束或闭合结束
        if (nextCharCode === 62) {
          walker.index++
          break
        }

        // 遇到 /> 按闭合处理
        if (nextCharCode === 47
                && walker.source.charCodeAt(walker.index + 1) === 62
        ) {
          walker.index += 2
          tagClose = 1
          break
        }

        // template 串结束了
        // 这时候，说明这个读取周期的所有内容，都是text
        if (!nextCharCode) {
          pushTextNode(walker.source.slice(beforeLastIndex))
          aElement = null
          break
        }

        // #[begin] error
        // 在处理一个 open 标签时，如果遇到了 <， 即下一个标签的开始，则当前标签未能正常闭合，报错
        if (nextCharCode === 60)
          throw new Error(`[SAN ERROR] ${getXPath(stack, tagName)} is not closed`)

        // #[end]

        // 读取 attribute
        const attrMatch = walker.match(attrReg, 1)
        if (attrMatch) {
          integrateAttr(
            aElement,
            attrMatch[1],
            attrMatch[2] ? (attrMatch[5] || attrMatch[6] || attrMatch[4] || '') : void (0),
            options,
          )
        }
        else {
          pushTextNode(walker.source.slice(beforeLastIndex, walker.index))
          aElement = null
          break
        }
      }

      if (aElement) {
        pushTextNode(source.slice(beforeLastIndex, tagMatchStart))

        // handle show directive, append expr to style prop
        if (aElement.directives.show) {
        // find style prop
          let styleProp = null
          let propsLen = aElement.props.length
          while (propsLen--) {
            if (aElement.props[propsLen].name === 'style') {
              styleProp = aElement.props[propsLen]
              break
            }
          }

          const showStyleExpr = {
            type: 10,
            segs: [
              aElement.directives.show.value,
              { type: 1, value: '' },
              { type: 1, value: ';display:none;' },
            ],
          }

          if (styleProp) {
            if (styleProp.expr.type === 7) {
              styleProp.expr.segs.push(showStyleExpr)
            }
            else {
              aElement.props[propsLen].expr = {
                type: 7,
                segs: [
                  styleProp.expr,
                  showStyleExpr,
                ],
              }
            }
          }
          else {
            aElement.props.push({
              name: 'style',
              expr: showStyleExpr,
            })
          }
        }

        // match if directive for else/elif directive
        const elseDirective = aElement.directives['else'] // eslint-disable-line dot-notation
                || aElement.directives.elif

        if (elseDirective) {
          let parentChildrenLen = currentNode.children.length
          let ifANode = null

          while (parentChildrenLen--) {
            var parentChild = currentNode.children[parentChildrenLen]
            if (parentChild.textExpr) {
              currentNode.children.splice(parentChildrenLen, 1)
              continue
            }

            ifANode = parentChild
            break
          }

          // #[begin] error
          if (!ifANode || !parentChild.directives['if']) { // eslint-disable-line dot-notation
            throw new Error('[SAN FATEL] else not match if.')
          }
          // #[end]

          if (ifANode) {
            ifANode.elses = ifANode.elses || []
            ifANode.elses.push(aElement)
          }
        }
        else {
          if (aElement.tagName === 'tr' && currentNode.tagName === 'table') {
            const tbodyNode = {
              directives: {},
              props: [],
              events: [],
              children: [],
              tagName: 'tbody',
            }
            currentNode.children.push(tbodyNode)
            currentNode = tbodyNode
            stack[++stackIndex] = tbodyNode
          }

          currentNode.children.push(aElement)
        }

        if (!tagClose) {
          currentNode = aElement
          stack[++stackIndex] = aElement
        }
      }
    }

    beforeLastIndex = walker.index
  }

  pushTextNode(walker.source.slice(beforeLastIndex).replace(/^\s+$/, ''))

  return rootNode

  /**
 * 在读取栈中添加文本节点
 *
 * @inner
 * @param {string} text 文本内容
 */
  function pushTextNode(text) {
    switch (options.trimWhitespace) {
      case 'blank':
        if (/^\s+$/.test(text))
          text = null

        break

      case 'all':
        text = text.replace(/(^\s+|\s+$)/g, '')
        break
    }

    if (text) {
      const expr = parseText(text, options.delimiters)
      const lastChild = currentNode.children[currentNode.children.length - 1]
      const textExpr = lastChild && lastChild.textExpr

      if (textExpr) {
        if (textExpr.segs) {
          textExpr.segs = textExpr.segs.concat(expr.segs || expr)
        }
        else if (textExpr.value != null && expr.value != null) {
          textExpr.value = textExpr.value + expr.value
        }
        else {
          lastChild.textExpr = {
            type: 7,
            segs: [textExpr].concat(expr.segs || expr),
          }
        }
      }
      else {
        currentNode.children.push({
          textExpr: expr,
        })
      }
    }
  }
}

/* eslint-enable fecs-max-statements */

// exports = module.exports = parseTemplate;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 处理组件异常
 */

function handleError(e, component, info) {
  let current = component

  while (current) {
    if (typeof current.error === 'function') {
      current.error(e, component, info)
      return
    }

    current = current.parentComponent
  }

  throw e
}

// exports = module.exports = handleError;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 默认filter
 */

/* eslint-disable fecs-camelcase */

function defaultStyleFilter(source) {
  if (typeof source === 'object') {
    let result = ''
    for (const key in source) {
    /* istanbul ignore else  */
      if (source.hasOwnProperty(key))
        result += `${key}:${source[key]};`
    }

    return result
  }

  return source
}

/**
 * 默认filter
 *
 * @const
 * @type {Object}
 */
const DEFAULT_FILTERS = {

  /**
 * URL编码filter
 *
 * @param {string} source 源串
 * @return {string} 替换结果串
 */
  url: encodeURIComponent,

  _class(source) {
    if (Array.isArray(source))
      return source.join(' ')

    return source
  },
  _style: defaultStyleFilter,

  _xclass(outer, inner) {
    if (Array.isArray(outer))
      outer = outer.join(' ')

    if (outer) {
      if (inner)
        return `${inner} ${outer}`

      return outer
    }

    return inner
  },

  _xstyle(outer, inner) {
    outer = outer && defaultStyleFilter(outer)
    if (outer) {
      if (inner)
        return `${inner};${outer}`

      return outer
    }

    return inner
  },
}
/* eslint-enable fecs-camelcase */

// exports = module.exports = DEFAULT_FILTERS;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 表达式计算
 */

// var ExprType = require('../parser/expr-type');
// var extend = require('../util/extend');
// var handleError = require('../util/handle-error');
// var DEFAULT_FILTERS = require('./default-filters');
// var evalArgs = require('./eval-args');

/**
 * 计算表达式的值
 *
 * @param {Object} expr 表达式对象
 * @param {Data} data 数据容器对象
 * @param {Component=} owner 所属组件环境
 * @return {*}
 */
function evalExpr(expr, data, owner) {
  if (expr.value != null)
    return expr.value

  let value

  switch (expr.type) {
    case 13:
      return null

    case 9:
      value = evalExpr(expr.expr, data, owner)
      switch (expr.operator) {
        case 33:
          value = !value
          break

        case 43:
          value = +value
          break

        case 45:
          value = 0 - value
          break
      }
      return value

    case 8:
      value = evalExpr(expr.segs[0], data, owner)
      var rightValue = evalExpr(expr.segs[1], data, owner)

      /* eslint-disable eqeqeq */
      switch (expr.operator) {
        case 37:
          value = value % rightValue
          break

        case 43:
          value = value + rightValue
          break

        case 45:
          value = value - rightValue
          break

        case 42:
          value = value * rightValue
          break

        case 47:
          value = value / rightValue
          break

        case 60:
          value = value < rightValue
          break

        case 62:
          value = value > rightValue
          break

        case 76:
          value = value && rightValue
          break

        case 94:
          value = value != rightValue
          break

        case 121:
          value = value <= rightValue
          break

        case 122:
          value = value == rightValue
          break

        case 123:
          value = value >= rightValue
          break

        case 155:
          value = value !== rightValue
          break

        case 183:
          value = value === rightValue
          break

        case 248:
          value = value || rightValue
          break
      }
      /* eslint-enable eqeqeq */
      return value

    case 10:
      return evalExpr(
        expr.segs[evalExpr(expr.segs[0], data, owner) ? 1 : 2],
        data,
        owner,
      )

    case 12:
      value = []
      for (var i = 0, l = expr.items.length; i < l; i++) {
        var item = expr.items[i]
        var itemValue = evalExpr(item.expr, data, owner)

        if (item.spread)
          itemValue && (value = value.concat(itemValue))

        else
          value.push(itemValue)
      }
      return value

    case 11:
      value = {}
      for (var i = 0, l = expr.items.length; i < l; i++) {
        var item = expr.items[i]
        var itemValue = evalExpr(item.expr, data, owner)

        if (item.spread)
          itemValue && extend(value, itemValue)

        else
          value[evalExpr(item.name, data, owner)] = itemValue
      }
      return value

    case 4:
      return data.get(expr)

    case 5:
      value = evalExpr(expr.expr, data, owner)

      if (owner) {
        for (var i = 0, l = expr.filters.length; i < l; i++) {
          const filter = expr.filters[i]
          const filterName = filter.name.paths[0].value

          switch (filterName) {
            case 'url':
            case '_class':
            case '_style':
              value = DEFAULT_FILTERS[filterName](value)
              break

            case '_xclass':
            case '_xstyle':
              value = DEFAULT_FILTERS[filterName](value, evalExpr(filter.args[0], data, owner))
              break

            default:
              try {
                value = owner.filters[filterName] && owner.filters[filterName].apply(
                  owner,
                  [value].concat(evalArgs(filter.args, data, owner)),
                )
              }
              catch (e) {
                handleError(e, owner, `filter:${filterName}`)
              }
          }
        }
      }

      if (value == null)
        value = ''

      return value

    case 6:
      if (owner && expr.name.type === 4) {
        let method = owner
        const pathsLen = expr.name.paths.length

        for (var i = 0; method && i < pathsLen; i++)
          method = method[evalExpr(expr.name.paths[i], data, owner)]

        if (method)
          value = method.apply(owner, evalArgs(expr.args, data, owner))
      }

      break

    case 7:
      var buf = ''
      for (var i = 0, l = expr.segs.length; i < l; i++) {
        const seg = expr.segs[i]
        buf += seg.value || evalExpr(seg, data, owner)
      }
      return buf
  }

  return value
}

// exports = module.exports = evalExpr;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 为函数调用计算参数数组的值
 */

// var evalExpr = require('./eval-expr');

/**
 * 为函数调用计算参数数组的值
 *
 * @param {Array} args 参数表达式列表
 * @param {Data} data 数据环境
 * @param {Component} owner 组件环境
 * @return {Array}
 */
function evalArgs(args, data, owner) {
  const result = []
  for (let i = 0; i < args.length; i++)
    result.push(evalExpr(args[i], data, owner))

  return result
}

// exports = module.exports = evalArgs;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 比较变更表达式与目标表达式之间的关系
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');

/**
 * 判断变更表达式与多个表达式之间的关系，0为完全没关系，1为有关系
 *
 * @inner
 * @param {Object} changeExpr 目标表达式
 * @param {Array} exprs 多个源表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompareExprs(changeExpr, exprs, data) {
  for (let i = 0, l = exprs.length; i < l; i++) {
    if (changeExprCompare(changeExpr, exprs[i], data))
      return 1
  }

  return 0
}

/**
 * 比较变更表达式与目标表达式之间的关系，用于视图更新判断
 * 视图更新需要根据其关系，做出相应的更新行为
 *
 * 0: 完全没关系
 * 1: 变更表达式是目标表达式的母项(如a与a.b) 或 表示需要完全变化
 * 2: 变更表达式是目标表达式相等
 * >2: 变更表达式是目标表达式的子项，如a.b.c与a.b
 *
 * @param {Object} changeExpr 变更表达式
 * @param {Object} expr 要比较的目标表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompare(changeExpr, expr, data) {
// if (!expr.dynamic) {
//     return 0;
// }

  switch (expr.type) {
    case 4:
      var paths = expr.paths
      var pathsLen = paths.length
      var changePaths = changeExpr.paths
      var changeLen = changePaths.length

      var result = 1
      for (var i = 0; i < pathsLen; i++) {
        const pathExpr = paths[i]
        const pathExprValue = pathExpr.value

        if (pathExprValue == null && changeExprCompare(changeExpr, pathExpr, data)) {
          result = 1
          break
        }

        if (result && i < changeLen
                /* eslint-disable eqeqeq */
                && (pathExprValue || evalExpr(pathExpr, data)) != changePaths[i].value
                /* eslint-enable eqeqeq */
        )
          result = 0
      }

      if (result)
        result = Math.max(1, changeLen - pathsLen + 2)

      return result

    case 9:
      return changeExprCompare(changeExpr, expr.expr, data) ? 1 : 0

    case 7:
    case 8:
    case 10:
      return changeExprCompareExprs(changeExpr, expr.segs, data)

    case 12:
    case 11:
      for (var i = 0; i < expr.items.length; i++) {
        if (changeExprCompare(changeExpr, expr.items[i].expr, data))
          return 1
      }

      break

    case 5:
      if (changeExprCompare(changeExpr, expr.expr, data)) {
        return 1
      }
      else {
        for (var i = 0; i < expr.filters.length; i++) {
          if (changeExprCompareExprs(changeExpr, expr.filters[i].args, data))
            return 1
        }
      }

      break

    case 6:
      if (changeExprCompareExprs(changeExpr, expr.name.paths, data)
            || changeExprCompareExprs(changeExpr, expr.args, data)
      )
        return 1

      break
  }

  return 0
}

// exports = module.exports = changeExprCompare;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 数据变更类型枚举
 */

/**
 * 数据变更类型枚举
 *
 * @const
 * @type {Object}
 */
const DataChangeType = {
  SET: 1,
  SPLICE: 2,
}

// exports = module.exports = DataChangeType;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 生命周期类
 */

function lifeCycleOwnIs(name) {
  return this[name]
}

/* eslint-disable fecs-valid-var-jsdoc */
/**
 * 节点生命周期信息
 *
 * @inner
 * @type {Object}
 */
const LifeCycle = {
  start: {
    is: lifeCycleOwnIs,
  },

  compiled: {
    is: lifeCycleOwnIs,
    compiled: true,
  },

  inited: {
    is: lifeCycleOwnIs,
    compiled: true,
    inited: true,
  },

  created: {
    is: lifeCycleOwnIs,
    compiled: true,
    inited: true,
    created: true,
  },

  attached: {
    is: lifeCycleOwnIs,
    compiled: true,
    inited: true,
    created: true,
    attached: true,
  },

  leaving: {
    is: lifeCycleOwnIs,
    compiled: true,
    inited: true,
    created: true,
    attached: true,
    leaving: true,
  },

  detached: {
    is: lifeCycleOwnIs,
    compiled: true,
    inited: true,
    created: true,
    detached: true,
  },

  disposed: {
    is: lifeCycleOwnIs,
    disposed: true,
  },
}
/* eslint-enable fecs-valid-var-jsdoc */

// exports = module.exports = LifeCycle;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 节点类型
 */

/**
 * 节点类型
 *
 * @const
 * @type {Object}
 */
const NodeType = {
  TEXT: 1,
  IF: 2,
  FOR: 3,
  ELEM: 4,
  CMPT: 5,
  SLOT: 6,
  TPL: 7,
  LOADER: 8,
  IS: 9,
}

// exports = module.exports = NodeType;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取 ANode props 数组中相应 name 的项
 */

/**
 * 获取 ANode props 数组中相应 name 的项
 *
 * @param {Object} aNode ANode对象
 * @param {string} name name属性匹配串
 * @return {Object}
 */
function getANodeProp(aNode, name) {
  const index = aNode._pi[name]
  if (index != null)
    return aNode.props[index]
}

// exports = module.exports = getANodeProp;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取属性处理对象
 */

// var contains = require('../util/contains');
// var empty = require('../util/empty');
// var nextTick = require('../util/next-tick');
// var svgTags = require('../browser/svg-tags');
// var ie = require('../browser/ie');
// var evalExpr = require('../runtime/eval-expr');
// var getANodeProp = require('./get-a-node-prop');
// var NodeType = require('./node-type');

/**
 * HTML 属性和 DOM 操作属性的对照表
 *
 * @inner
 * @const
 * @type {Object}
 */
const HTML_ATTR_PROP_MAP = {
  readonly: 'readOnly',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  valign: 'vAlign',
  usemap: 'useMap',
  frameborder: 'frameBorder',
  for: 'htmlFor',
}

/**
 * 默认的元素的属性设置的变换方法
 *
 * @inner
 * @type {Object}
 */
function defaultElementPropHandler(el, value, name) {
  const propName = HTML_ATTR_PROP_MAP[name] || name
  const valueNotNull = value != null

  // input 的 type 是个特殊属性，其实也应该用 setAttribute
  // 但是 type 不应该运行时动态改变，否则会有兼容性问题
  // 所以这里直接就不管了
  if (propName in el)
    el[propName] = valueNotNull ? value : ''

  else if (valueNotNull)
    el.setAttribute(name, value)

  if (!valueNotNull)
    el.removeAttribute(name)
}

function svgPropHandler(el, value, name) {
  el.setAttribute(name, value)
}

function boolPropHandler(el, value, name) {
  const propName = HTML_ATTR_PROP_MAP[name] || name
  el[propName] = !!value
}

// #[begin] allua
// see https://github.com/baidu/san/issues/495
function placeholderHandler(el, value, name, element) {
/* istanbul ignore if */
  if (ie > 9 && !el.value && value) {
    element.__bkph = true
    nextTick(() => {
      element.__bkph = false
    })
  }

  defaultElementPropHandler(el, value, name)
}
// #[end]

/* eslint-disable fecs-properties-quote */
/**
 * 默认的属性设置变换方法
 *
 * @inner
 * @type {Object}
 */
const defaultElementPropHandlers = {
  id(el, value) {
    if (value != null)
      el.id = value

    else if (el.id)
      el.removeAttribute('id')
  },

  style(el, value) {
    el.style.cssText = value
  },

'class': function (el, value) { // eslint-disable-line
    if (
    // #[begin] allua
      ie
        ||
        // #[end]
        el.className !== value
    )
      el.className = value
  },

  slot: empty,

  draggable: boolPropHandler,
}
/* eslint-enable fecs-properties-quote */

const analInputChecker = {
  checkbox: contains,
  radio(a, b) {
    return a === b
  },
}

function analInputCheckedState(element, value) {
  const bindValue = getANodeProp(element.aNode, 'value')
  const bindType = getANodeProp(element.aNode, 'type')

  if (bindValue && bindType) {
    const type = evalExpr(bindType.expr, element.scope, element.owner)

    if (analInputChecker[type]) {
      const bindChecked = getANodeProp(element.aNode, 'checked')
      if (bindChecked != null && !bindChecked.hintExpr)
        bindChecked.hintExpr = bindValue.expr

      return !!analInputChecker[type](
        value,
        element.data
          ? evalExpr(bindValue.expr, element.data, element)
          : evalExpr(bindValue.expr, element.scope, element.owner),
      )
    }
  }
}

const elementPropHandlers = {
  input: {
    multiple: boolPropHandler,
    checked(el, value, name, element) {
      const state = analInputCheckedState(element, value)

      boolPropHandler(
        el,
        state != null ? state : value,
        'checked',
        element,
      )

      // #[begin] allua
      // 代码不用抽出来防重复，allua内的代码在现代浏览器版本会被编译时干掉，gzip也会处理重复问题
      // see: #378
      /* istanbul ignore if */
      if (ie && ie < 8 && !element.lifeCycle.attached) {
        boolPropHandler(
          el,
          state != null ? state : value,
          'defaultChecked',
          element,
        )
      }
    // #[end]
    },

    // #[begin] allua
    placeholder: placeholderHandler,
    // #[end]

    readonly: boolPropHandler,
    disabled: boolPropHandler,
    autofocus: boolPropHandler,
    required: boolPropHandler,
  },

  option: {
    value(el, value, name, element) {
      defaultElementPropHandler(el, value, name, element)

      if (isOptionSelected(element, value))
        el.selected = true
    },
  },

  select: {
    readonly: boolPropHandler,
    disabled: boolPropHandler,
    autofocus: boolPropHandler,
    required: boolPropHandler,
  },

  textarea: {
    // #[begin] allua
    placeholder: placeholderHandler,
    // #[end]
    readonly: boolPropHandler,
    disabled: boolPropHandler,
    autofocus: boolPropHandler,
    required: boolPropHandler,
  },

  button: {
    disabled: boolPropHandler,
    autofocus: boolPropHandler,
    type(el, value) {
      if (value != null)
        el.setAttribute('type', value)

      else
        el.removeAttribute('type')
    },
  },
}

function isOptionSelected(element, value) {
  let parentSelect = element.parent
  while (parentSelect) {
    if (parentSelect.tagName === 'select')
      break

    parentSelect = parentSelect.parent
  }

  if (parentSelect) {
    let selectValue = null
    let prop
    let expr

    if ((prop = getANodeProp(parentSelect.aNode, 'value'))
        && (expr = prop.expr)
    ) {
      selectValue = parentSelect.nodeType === 5
        ? evalExpr(expr, parentSelect.data, parentSelect)
        : evalExpr(expr, parentSelect.scope, parentSelect.owner)
            || ''
    }

    if (selectValue === value)
      return 1
  }
}

/**
 * 获取属性处理对象
 *
 * @param {string} tagName 元素tag
 * @param {string} attrName 属性名
 * @return {Object}
 */
function getPropHandler(tagName, attrName) {
  if (svgTags[tagName])
    return svgPropHandler

  let tagPropHandlers = elementPropHandlers[tagName]
  if (!tagPropHandlers)
    tagPropHandlers = elementPropHandlers[tagName] = {}

  let propHandler = tagPropHandlers[attrName]
  if (!propHandler) {
    propHandler = defaultElementPropHandlers[attrName] || defaultElementPropHandler
    tagPropHandlers[attrName] = propHandler
  }

  return propHandler
}

// exports = module.exports = getPropHandler;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断变更是否来源于元素
 */

/**
 * 判断变更是否来源于元素，来源于元素时，视图更新需要阻断
 *
 * @param {Object} change 变更对象
 * @param {Element} element 元素
 * @param {string?} propName 属性名，可选。需要精确判断是否来源于此属性时传入
 * @return {boolean}
 */
function isDataChangeByElement(change, element, propName) {
  const changeTarget = change.option.target
  return changeTarget && changeTarget.node === element
    && (!propName || changeTarget.prop === propName)
}

// exports = module.exports = isDataChangeByElement;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 在对象上使用accessor表达式查找方法
 */

// var evalExpr = require('../runtime/eval-expr');

/**
 * 在对象上使用accessor表达式查找方法
 *
 * @param {Object} source 源对象
 * @param {Object} nameExpr 表达式
 * @param {Data} data 所属数据环境
 * @return {Function}
 */
function findMethod(source, nameExpr, data) {
  let method = source

  for (let i = 0; method != null && i < nameExpr.paths.length; i++)
    method = method[evalExpr(nameExpr.paths[i], data)]

  return method
}

// exports = module.exports = findMethod;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 数据类
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var DataChangeType = require('./data-change-type');
// var parseExpr = require('../parser/parse-expr');

/**
 * 数据类
 *
 * @class
 * @param {Object?} data 初始数据
 * @param {Model?} parent 父级数据容器
 */
function Data(data, parent) {
  this.parent = parent
  this.raw = data || {}
  this.listeners = []
}

// #[begin] error
// 以下两个函数只在开发模式下可用，在生产模式下不存在
/**
 * DataTypes 检测
 */
Data.prototype.checkDataTypes = function () {
  if (this.typeChecker)
    this.typeChecker(this.raw)
}

/**
 * 设置 type checker
 *
 * @param  {Function} typeChecker 类型校验器
 */
Data.prototype.setTypeChecker = function (typeChecker) {
  this.typeChecker = typeChecker
}

// #[end]

/**
 * 添加数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.listen = function (listener) {
  if (typeof listener === 'function')
    this.listeners.push(listener)
}

/**
 * 移除数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.unlisten = function (listener) {
  let len = this.listeners.length
  while (len--) {
    if (!listener || this.listeners[len] === listener)
      this.listeners.splice(len, 1)
  }
}

/**
 * 触发数据变更
 *
 * @param {Object} change 变更信息对象
 */
Data.prototype.fire = function (change) {
  if (change.option.silent || change.option.silence || change.option.quiet)
    return

  for (let i = 0; i < this.listeners.length; i++)
    this.listeners[i].call(this, change)
}

/**
 * 获取数据项
 *
 * @param {string|Object?} expr 数据项路径
 * @param {Data?} callee 当前数据获取的调用环境
 * @return {*}
 */
Data.prototype.get = function (expr, callee) {
  let value = this.raw
  if (!expr)
    return value

  if (typeof expr !== 'object')
    expr = parseExpr(expr)

  const paths = expr.paths
  callee = callee || this

  value = value[paths[0].value]

  if (typeof value == 'undefined' && this.parent) {
    value = this.parent.get(expr, callee)
  }
  else {
    for (let i = 1, l = paths.length; value != null && i < l; i++)
      value = value[paths[i].value || evalExpr(paths[i], callee)]
  }

  return value
}

/**
 * 数据对象变更操作
 *
 * @inner
 * @param {Object|Array} source 要变更的源数据
 * @param {Array} exprPaths 属性路径
 * @param {number} pathsStart 当前处理的属性路径指针位置
 * @param {number} pathsLen 属性路径长度
 * @param {*} value 变更属性值
 * @param {Data} data 对应的Data对象
 * @return {*} 变更后的新数据
 */
function immutableSet(source, exprPaths, pathsStart, pathsLen, value, data) {
  if (pathsStart >= pathsLen)
    return value

  if (source == null)
    source = {}

  const pathExpr = exprPaths[pathsStart]
  let prop = evalExpr(pathExpr, data)
  let result = source

  if (Array.isArray(source)) {
    const index = +prop
    prop = isNaN(index) ? prop : index

    result = source.slice(0)
    result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data)
  }
  else if (typeof source === 'object') {
    result = {}
    let needAssigned = true

    for (const key in source) {
    /* istanbul ignore else  */
      if (source.hasOwnProperty(key)) {
        if (key === prop) {
          needAssigned = false
          result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data)
        }
        else {
          result[key] = source[key]
        }
      }
    }

    // 如果set的是一个不存在的属性，会走到该逻辑
    if (needAssigned)
      result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data)
  }

  if (pathExpr.value == null) {
    exprPaths[pathsStart] = {
      type: typeof prop === 'string' ? 1 : 2,
      value: prop,
    }
  }

  return result
}

/**
 * 设置数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.set = function (expr, value, option) {
  option = option || {}

  // #[begin] error
  const exprRaw = expr
  // #[end]

  expr = parseExpr(expr)

  // #[begin] error
  if (expr.type !== 4)
    throw new Error(`[SAN ERROR] Invalid Expression in Data set: ${exprRaw}`)

  // #[end]

  if (this.get(expr) === value && !option.force)
    return

  expr = {
    type: 4,
    paths: expr.paths.slice(0),
  }

  const prop = expr.paths[0].value
  this.raw[prop] = immutableSet(this.raw[prop], expr.paths, 1, expr.paths.length, value, this)

  this.fire({
    type: 1,
    expr,
    value,
    option,
  })

  // #[begin] error
  this.checkDataTypes()
// #[end]
}

/**
 * 批量设置数据
 *
 * @param {Object} source 待设置的数据集
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.assign = function (source, option) {
  option = option || {}

for (var key in source) { // eslint-disable-line
    this.set(
      {
        type: 4,
        paths: [
          { type: 1, value: key },
        ],
      },
      source[key],
      option,
    )
  }
}

/**
 * 合并更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object} source 待合并的数据
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.merge = function (expr, source, option) {
  option = option || {}

  // #[begin] error
  const exprRaw = expr
  // #[end]

  expr = parseExpr(expr)

  // #[begin] error
  if (expr.type !== 4)
    throw new Error(`[SAN ERROR] Invalid Expression in Data merge: ${exprRaw}`)

  if (typeof this.get(expr) !== 'object')
    throw new Error(`[SAN ERROR] Merge Expects a Target of Type 'object'; got ${typeof oldValue}`)

  if (typeof source !== 'object')
    throw new Error(`[SAN ERROR] Merge Expects a Source of Type 'object'; got ${typeof source}`)

  // #[end]

for (var key in source) { // eslint-disable-line
    this.set(
      {
        type: 4,
        paths: expr.paths.concat(
          [
            {
              type: 1,
              value: key,
            },
          ],
        ),
      },
      source[key],
      option,
    )
  }
}

/**
 * 基于更新函数更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Function} fn 数据处理函数
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.apply = function (expr, fn, option) {
// #[begin] error
  const exprRaw = expr
  // #[end]

  expr = parseExpr(expr)

  // #[begin] error
  if (expr.type !== 4)
    throw new Error(`[SAN ERROR] Invalid Expression in Data apply: ${exprRaw}`)

  // #[end]

  const oldValue = this.get(expr)

  // #[begin] error
  if (typeof fn !== 'function') {
    throw new TypeError(
      '[SAN ERROR] Invalid Argument\'s Type in Data apply: '
        + `Expected Function but got ${typeof fn}`,
    )
  }
  // #[end]

  this.set(expr, fn(oldValue), option)
}

/**
 * 数组数据项splice操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Array} args splice 接受的参数列表，数组项与Array.prototype.splice的参数一致
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {Array} 新数组
 */
Data.prototype.splice = function (expr, args, option) {
  option = option || {}
  // #[begin] error
  const exprRaw = expr
  // #[end]

  expr = parseExpr(expr)

  // #[begin] error
  if (expr.type !== 4)
    throw new Error(`[SAN ERROR] Invalid Expression in Data splice: ${exprRaw}`)

  // #[end]

  expr = {
    type: 4,
    paths: expr.paths.slice(0),
  }

  const target = this.get(expr)
  let returnValue = []

  if (Array.isArray(target)) {
    let index = args[0]
    const len = target.length
    if (index > len) {
      index = len
    }
    else if (index < 0) {
      index = len + index
      if (index < 0)
        index = 0
    }

    const newArray = target.slice(0)
    returnValue = newArray.splice.apply(newArray, args)

    this.raw = immutableSet(this.raw, expr.paths, 0, expr.paths.length, newArray, this)

    this.fire({
      expr,
      type: 2,
      index,
      deleteCount: returnValue.length,
      value: returnValue,
      insertions: args.slice(2),
      option,
    })
  }

  // #[begin] error
  this.checkDataTypes()
  // #[end]

  return returnValue
}

/**
 * 数组数据项push操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要push的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.push = function (expr, item, option) {
  const target = this.get(expr)

  if (Array.isArray(target)) {
    this.splice(expr, [target.length, 0, item], option)
    return target.length + 1
  }
}

/**
 * 数组数据项pop操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.pop = function (expr, option) {
  const target = this.get(expr)

  if (Array.isArray(target)) {
    const len = target.length
    if (len)
      return this.splice(expr, [len - 1, 1], option)[0]
  }
}

/**
 * 数组数据项shift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.shift = function (expr, option) {
  return this.splice(expr, [0, 1], option)[0]
}

/**
 * 数组数据项unshift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要unshift的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.unshift = function (expr, item, option) {
  const target = this.get(expr)

  if (Array.isArray(target)) {
    this.splice(expr, [0, 0, item], option)
    return target.length + 1
  }
}

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {number} index 要移除项的索引
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.removeAt = function (expr, index, option) {
  this.splice(expr, [index, 1], option)
}

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 要移除的项
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.remove = function (expr, value, option) {
  const target = this.get(expr)

  if (Array.isArray(target)) {
    let len = target.length
    while (len--) {
      if (target[len] === value) {
        this.splice(expr, [len, 1], option)
        break
      }
    }
  }
}

// exports = module.exports = Data;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取声明式事件的监听函数
 */

// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var Data = require('../runtime/data');

/**
 * 获取声明式事件的监听函数
 *
 * @param {Object} eventBind 绑定信息对象
 * @param {Component} owner 所属组件环境
 * @param {Data} data 数据环境
 * @param {boolean} isComponentEvent 是否组件自定义事件
 * @return {Function}
 */
function getEventListener(eventBind, owner, data, isComponentEvent) {
  const args = eventBind.expr.args

  return function (e) {
    e = isComponentEvent ? e : e || window.event

    const method = findMethod(owner, eventBind.expr.name, data)
    if (typeof method === 'function') {
      method.apply(
        owner,
        args.length ? evalArgs(args, new Data({ $event: e }, data), owner) : [],
      )
    }

    if (eventBind.modifier.prevent) {
      e.preventDefault && e.preventDefault()
      return false
    }

    if (eventBind.modifier.stop) {
      if (e.stopPropagation)
        e.stopPropagation()

      else
        e.cancelBubble = true
    }
  }
}

// exports = module.exports = getEventListener;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断变更数组是否影响到数据引用摘要
 */

/**
 * 判断变更数组是否影响到数据引用摘要
 *
 * @param {Array} changes 变更数组
 * @param {Object} dataRef 数据引用摘要
 * @return {boolean}
 */
function changesIsInDataRef(changes, dataRef) {
  if (dataRef) {
    for (let i = 0; i < changes.length; i++) {
      const change = changes[i]

      if (!change.overview) {
        const paths = change.expr.paths
        change.overview = paths[0].value

        if (paths.length > 1) {
          change.extOverview = `${paths[0].value}.${paths[1].value}`
          change.wildOverview = `${paths[0].value}.*`
        }
      }

      if (dataRef[change.overview]
            || change.wildOverview && dataRef[change.wildOverview]
            || change.extOverview && dataRef[change.extOverview]
      )
        return true
    }
  }
}

// exports = module.exports = changesIsInDataRef;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file insertBefore 方法的兼容性封装
 */

/**
 * insertBefore 方法的兼容性封装
 *
 * @param {HTMLNode} targetEl 要插入的节点
 * @param {HTMLElement} parentEl 父元素
 * @param {HTMLElement?} beforeEl 在此元素之前插入
 */
function insertBefore(targetEl, parentEl, beforeEl) {
  if (parentEl) {
    if (beforeEl)
      parentEl.insertBefore(targetEl, beforeEl)

    else
      parentEl.appendChild(targetEl)
  }
}

// exports = module.exports = insertBefore;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 样式的基本属性
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 元素的基本属性
 *
 * @type {Object}
 */
const styleProps = splitStr2Obj('class,style')

// exports = module.exports = styleProps;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素子节点遍历操作类
 */

// var removeEl = require('../browser/remove-el');

// #[begin] reverse
/**
 * 元素子节点遍历操作类
 *
 * @inner
 * @class
 * @param {HTMLElement} el 要遍历的元素
 */
function DOMChildrenWalker(el) {
  this.children = []
  this.index = 0
  this.target = el

  let child = el.firstChild
  let next
  while (child) {
    next = child.nextSibling

    switch (child.nodeType) {
      case 3:
        if (/^\s*$/.test(child.data || child.textContent))
          removeEl(child)

        else
          this.children.push(child)

        break

      case 1:
      case 8:
        this.children.push(child)
    }

    child = next
  }

  this.current = this.children[this.index]
  this.next = this.children[this.index + 1]
}

/**
 * 往下走一个元素
 */
DOMChildrenWalker.prototype.goNext = function () {
  this.current = this.children[++this.index]
  this.next = this.children[this.index + 1]
}
// #[end]

// exports = module.exports = DOMChildrenWalker;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 元素节点类
 */

// var changeExprCompare = require('../runtime/change-expr-compare');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var evalExpr = require('../runtime/eval-expr');
// var insertBefore = require('../browser/insert-before');
// var LifeCycle = require('./life-cycle');
// var NodeType = require('./node-type');
// var styleProps = require('./style-props');
// var reverseElementChildren = require('./reverse-element-children');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getPropHandler = require('./get-prop-handler');
// var createNode = require('./create-node');
// var preheatEl = require('./preheat-el');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnAttached = require('./element-own-attached');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var warnSetHTML = require('./warn-set-html');
// var getNodePath = require('./get-node-path');

/**
 * 元素节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {string} tagName 元素标签名
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function Element(aNode, parent, scope, owner, tagName, reverseWalker) {
  this.aNode = aNode
  this.owner = owner
  this.scope = scope
  this.parent = parent

  this.lifeCycle = LifeCycle.start
  this.children = []
  this._elFns = []
  this.parentComponent = parent.nodeType === 5
    ? parent
    : parent.parentComponent

  this.tagName = tagName || aNode.tagName

  // #[begin] allua
  // ie8- 不支持innerHTML输出自定义标签
  /* istanbul ignore if */
  if (ieOldThan9 && this.tagName.indexOf('-') > 0)
    this.tagName = 'div'

  // #[end]

  aNode._i++
  this._sbindData = nodeSBindInit(aNode.directives.bind, this.scope, this.owner)
  this.lifeCycle = LifeCycle.inited

  // #[begin] reverse
  if (reverseWalker) {
    const currentNode = reverseWalker.current

    /* istanbul ignore if */
    if (!currentNode) {
      throw new Error(`[SAN REVERSE ERROR] Element not found. \nPaths: ${
                getNodePath(this).join(' > ')}`)
    }

    /* istanbul ignore if */
    if (currentNode.nodeType !== 1) {
      throw new Error(`[SAN REVERSE ERROR] Element type not match, expect 1 but ${
                currentNode.nodeType}.\nPaths: ${
                getNodePath(this).join(' > ')}`)
    }

    /* istanbul ignore if */
    if (currentNode.tagName.toLowerCase() !== this.tagName) {
      throw new Error(`[SAN REVERSE ERROR] Element tagName not match, expect ${
                this.tagName} but meet ${currentNode.tagName.toLowerCase()}.\nPaths: ${
                getNodePath(this).join(' > ')}`)
    }

    this.el = currentNode
    reverseWalker.goNext()

    reverseElementChildren(this, this.scope, this.owner)

    this.lifeCycle = LifeCycle.created
    this._attached()
    this.lifeCycle = LifeCycle.attached
  }
// #[end]
}

Element.prototype.nodeType = 4

/**
 * 将元素attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
Element.prototype.attach = function (parentEl, beforeEl) {
  if (!this.lifeCycle.attached) {
    const aNode = this.aNode

    if (!this.el) {
      let props

      if (aNode._ce && aNode._i > 2) {
        props = aNode._dp
        this.el = (aNode._el || preheatEl(aNode)).cloneNode(false)
      }
      else {
        props = aNode.props
        this.el = createEl(this.tagName)
      }

      if (this._sbindData) {
        for (const key in this._sbindData) {
          if (this._sbindData.hasOwnProperty(key)) {
            getPropHandler(this.tagName, key)(
              this.el,
              this._sbindData[key],
              key,
              this,
            )
          }
        }
      }

      for (var i = 0, l = props.length; i < l; i++) {
        const prop = props[i]
        const value = evalExpr(prop.expr, this.scope, this.owner)

        if (value || !styleProps[prop.name])
          prop.handler(this.el, value, prop.name, this)
      }

      this.lifeCycle = LifeCycle.created
    }
    insertBefore(this.el, parentEl, beforeEl)

    if (!this._contentReady) {
      const htmlDirective = aNode.directives.html

      if (htmlDirective) {
        // #[begin] error
        warnSetHTML(this.el)
        // #[end]

        this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner)
      }
      else {
        for (var i = 0, l = aNode.children.length; i < l; i++) {
          const childANode = aNode.children[i]
          const child = childANode.Clazz
            ? new childANode.Clazz(childANode, this, this.scope, this.owner)
            : createNode(childANode, this, this.scope, this.owner)
          this.children.push(child)
          child.attach(this.el)
        }
      }

      this._contentReady = 1
    }

    this._attached()

    this.lifeCycle = LifeCycle.attached
  }
}

Element.prototype.detach = elementOwnDetach
Element.prototype.dispose = elementOwnDispose
Element.prototype._onEl = elementOwnOnEl
Element.prototype._leave = function () {
  if (this.leaveDispose) {
    if (!this.lifeCycle.disposed) {
      let len = this.children.length
      while (len--)
        this.children[len].dispose(1, 1)

      len = this._elFns.length
      while (len--) {
        const fn = this._elFns[len]
        un(this.el, fn[0], fn[1], fn[2])
      }
      this._elFns = null

      // #[begin] allua
      /* istanbul ignore if */
      if (this._inputTimer) {
        clearInterval(this._inputTimer)
        this._inputTimer = null
      }
      // #[end]

      // 如果没有parent，说明是一个root component，一定要从dom树中remove
      if (!this.disposeNoDetach || !this.parent)
        removeEl(this.el)

      this.lifeCycle = LifeCycle.detached

      this.el = null
      this.owner = null
      this.scope = null
      this.children = null
      this.lifeCycle = LifeCycle.disposed

      if (this._ondisposed)
        this._ondisposed()
    }
  }
}

/**
 * 视图更新
 *
 * @param {Array} changes 数据变化信息
 */
Element.prototype._update = function (changes) {
  const dataHotspot = this.aNode._d
  if (dataHotspot && changesIsInDataRef(changes, dataHotspot)) {
    // update s-bind
    const me = this
    this._sbindData = nodeSBindUpdate(
      this.aNode.directives.bind,
      this._sbindData,
      this.scope,
      this.owner,
      changes,
      (name, value) => {
        if (name in me.aNode._pi)
          return

        getPropHandler(me.tagName, name)(me.el, value, name, me)
      },
    )

    // update prop
    const dynamicProps = this.aNode._dp
    for (var i = 0, l = dynamicProps.length; i < l; i++) {
      const prop = dynamicProps[i]
      const propName = prop.name

      for (let j = 0, changeLen = changes.length; j < changeLen; j++) {
        const change = changes[j]

        if (!isDataChangeByElement(change, this, propName)
                && (
                  changeExprCompare(change.expr, prop.expr, this.scope)
                    || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.scope)
                )
        ) {
          prop.handler(this.el, evalExpr(prop.expr, this.scope, this.owner), propName, this)
          break
        }
      }
    }

    // update content
    const htmlDirective = this.aNode.directives.html
    if (htmlDirective) {
      let len = changes.length
      while (len--) {
        if (changeExprCompare(changes[len].expr, htmlDirective.value, this.scope)) {
        // #[begin] error
          warnSetHTML(this.el)
          // #[end]

          this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner)
          break
        }
      }
    }
    else {
      for (var i = 0, l = this.children.length; i < l; i++)
        this.children[i]._update(changes)
    }
  }
}

/**
 * 执行完成attached状态的行为
 */
Element.prototype._attached = elementOwnAttached

// exports = module.exports = Element;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 通过组件反解创建节点的工厂方法
 */

// var Element = require('./element');
// var TemplateNode = require('./template-node');
// var AsyncComponent = require('./async-component');

// #[begin] reverse
/**
 * 通过组件反解创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker} reverseWalker 子元素遍历对象
 * @return {Node}
 */
function createReverseNode(aNode, parent, scope, owner, reverseWalker, componentName) {
  if (aNode.elem)
    return new Element(aNode, parent, scope, owner, componentName, reverseWalker)

  if (aNode.Clazz)
    return new aNode.Clazz(aNode, parent, scope, owner, reverseWalker)

  const ComponentOrLoader = owner.components[componentName || aNode.tagName]

  if (ComponentOrLoader) {
    return typeof ComponentOrLoader === 'function'
      ? new ComponentOrLoader({
        source: aNode,
        owner,
        scope,
        parent,
        reverseWalker,
      })
      : new AsyncComponent({
        source: aNode,
        owner,
        scope,
        parent,
        reverseWalker,
      }, ComponentOrLoader)
  }

  if (aNode.directives.is) {
    switch (componentName) {
      case 'fragment':
      case 'template':
        return new TemplateNode(aNode, parent, scope, owner, reverseWalker)
    }
  }
  else {
    aNode.elem = true
  }
  return new Element(aNode, parent, scope, owner, componentName, reverseWalker)
}
// #[end]

// exports = module.exports = createReverseNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 销毁释放元素的子元素
 */

/**
 * 销毁释放元素的子元素
 *
 * @param {Array=} children 子元素数组
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementDisposeChildren(children, noDetach, noTransition) {
  let len = children && children.length
  while (len--)
    children[len].dispose(noDetach, noTransition)
}

// exports = module.exports = elementDisposeChildren;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建节点的工厂方法
 */

// var Element = require('./element');
// var TemplateNode = require('./template-node');
// var AsyncComponent = require('./async-component');

/**
 * 创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @return {Node}
 */
function createNode(aNode, parent, scope, owner, componentName) {
  if (aNode.elem)
    return new Element(aNode, parent, scope, owner, componentName)

  if (aNode.Clazz)
    return new aNode.Clazz(aNode, parent, scope, owner)

  const ComponentOrLoader = owner.components[componentName || aNode.tagName]

  if (ComponentOrLoader) {
    return typeof ComponentOrLoader === 'function'
      ? new ComponentOrLoader({
        source: aNode,
        owner,
        scope,
        parent,
      })
      : new AsyncComponent({
        source: aNode,
        owner,
        scope,
        parent,
      }, ComponentOrLoader)
  }

  if (aNode.directives.is) {
    switch (componentName) {
      case 'fragment':
      case 'template':
        return new TemplateNode(aNode, parent, scope, owner)
    }
  }
  else {
    aNode.elem = true
  }

  return new Element(aNode, parent, scope, owner, componentName)
}

// exports = module.exports = createNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将没有 root 只有 children 的元素 attach 到页面
 */

// var insertBefore = require('../browser/insert-before');
// var LifeCycle = require('./life-cycle');
// var createNode = require('./create-node');

/**
 * 将没有 root 只有 children 的元素 attach 到页面
 * 主要用于 slot 和 template
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function nodeOwnOnlyChildrenAttach(parentEl, beforeEl) {
  this.sel = document.createComment(this.id)
  insertBefore(this.sel, parentEl, beforeEl)

  for (let i = 0; i < this.aNode.children.length; i++) {
    const child = createNode(
      this.aNode.children[i],
      this,
      this.childScope || this.scope,
      this.childOwner || this.owner,
    )
    this.children.push(child)
    child.attach(parentEl, beforeEl)
  }

  this.el = document.createComment(this.id)
  insertBefore(this.el, parentEl, beforeEl)

  this.lifeCycle = LifeCycle.attached
}

// exports = module.exports = nodeOwnOnlyChildrenAttach;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file template 节点类
 */

// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');

/**
 * template 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TemplateNode(aNode, parent, scope, owner, reverseWalker) {
  this.aNode = aNode
  this.owner = owner
  this.scope = scope
  this.parent = parent
  this.parentComponent = parent.nodeType === 5
    ? parent
    : parent.parentComponent

  this.id = guid++
  this.lifeCycle = LifeCycle.start
  this.children = []

  // #[begin] reverse
  if (reverseWalker) {
    let hasFlagComment

    // start flag
    if (reverseWalker.current && reverseWalker.current.nodeType === 8) {
      this.sel = reverseWalker.current
      hasFlagComment = 1
      reverseWalker.goNext()
    }
    else {
      this.sel = document.createComment(this.id)
      insertBefore(this.sel, reverseWalker.target, reverseWalker.current)
    }

    // content
    const aNodeChildren = this.aNode.children
    for (let i = 0, l = aNodeChildren.length; i < l; i++) {
      this.children.push(
        createReverseNode(aNodeChildren[i], this, this.scope, this.owner, reverseWalker),
      )
    }

    // end flag
    if (hasFlagComment) {
      this.el = reverseWalker.current
      reverseWalker.goNext()
    }
    else {
      this.el = document.createComment(this.id)
      insertBefore(this.el, reverseWalker.target, reverseWalker.current)
    }

    this.lifeCycle = LifeCycle.attached
  }
// #[end]
}

TemplateNode.prototype.nodeType = 7

TemplateNode.prototype.attach = nodeOwnOnlyChildrenAttach

/**
 * 销毁释放
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
TemplateNode.prototype.dispose = function (noDetach, noTransition) {
  elementDisposeChildren(this.children, noDetach, noTransition)

  if (!noDetach) {
    removeEl(this.el)
    removeEl(this.sel)
  }

  this.sel = null
  this.el = null
  this.owner = null
  this.scope = null
  this.children = null

  this.lifeCycle = LifeCycle.disposed

  if (this._ondisposed)
    this._ondisposed()
}

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
TemplateNode.prototype._update = function (changes) {
  for (let i = 0; i < this.children.length; i++)
    this.children[i]._update(changes)
}

TemplateNode.prototype._getElAsRootNode = function () {
  return this.sel
}

// exports = module.exports = TemplateNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建节点对应的 stump comment 元素
 */

/**
 * 创建节点对应的 stump comment 主元素
 */
function nodeOwnCreateStump() {
  this.el = this.el || document.createComment(this.id)
}

// exports = module.exports = nodeOwnCreateStump;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 简单执行销毁节点的行为
 */

// var removeEl = require('../browser/remove-el');
// var LifeCycle = require('./life-cycle');
// var elementDisposeChildren = require('./element-dispose-children');

/**
 * 简单执行销毁节点的行为
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
function nodeOwnSimpleDispose(noDetach) {
  elementDisposeChildren(this.children, noDetach, 1)

  if (!noDetach)
    removeEl(this.el)

  this.el = null
  this.owner = null
  this.scope = null
  this.children = null

  this.lifeCycle = LifeCycle.disposed
  if (this._ondisposed)
    this._ondisposed()
}

// exports = module.exports = nodeOwnSimpleDispose;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 异步组件类
 */

// var guid = require('../util/guid');
// var each = require('../util/each');
// var insertBefore = require('../browser/insert-before');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');

/**
 * 异步组件类
 *
 * @class
 * @param {Object} options 初始化参数
 * @param {Object} loader 组件加载器
 */
function AsyncComponent(options, loader) {
  this.options = options
  this.loader = loader
  this.id = guid++
  this.children = []

  // #[begin] reverse
  const reverseWalker = options.reverseWalker
  if (reverseWalker) {
    const PlaceholderComponent = this.loader.placeholder
    if (PlaceholderComponent)
      this.children[0] = new PlaceholderComponent(options)

    this._create()
    insertBefore(this.el, reverseWalker.target, reverseWalker.current)

    const me = this
    this.loader.start((ComponentClass) => {
      me.onload(ComponentClass)
    })
  }
  options.reverseWalker = null
// #[end]
}

AsyncComponent.prototype._create = nodeOwnCreateStump
AsyncComponent.prototype.dispose = nodeOwnSimpleDispose

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
AsyncComponent.prototype.attach = function (parentEl, beforeEl) {
  const PlaceholderComponent = this.loader.placeholder
  if (PlaceholderComponent) {
    const component = new PlaceholderComponent(this.options)
    this.children[0] = component
    component.attach(parentEl, beforeEl)
  }

  this._create()
  insertBefore(this.el, parentEl, beforeEl)

  const me = this
  this.loader.start((ComponentClass) => {
    me.onload(ComponentClass)
  })
}

AsyncComponent.prototype._getElAsRootNode = function () {
  const child = this.children[0]
  return child && child.el
}

/**
 * loader加载完成，渲染组件
 *
 * @param {Function=} ComponentClass 组件类
 */
AsyncComponent.prototype.onload = function (ComponentClass) {
  if (this.el && ComponentClass) {
    const component = new ComponentClass(this.options)
    component.attach(this.el.parentNode, this.el)

    const parent = this.options.parent

    if (parent._rootNode === this) {
    // 如果异步组件为 root 节点，直接更新
      parent._rootNode = component
      component._getElAsRootNode && (parent.el = component._getElAsRootNode())
    }
    else {
    // 在 children 中查找
      const parentChildren = parent.children

      // children 中存在多个 AsyncComponent 时，只循环一遍，为所有 AsyncComponent 的 parentIndex 赋值
      if (this.parentIndex == null || parentChildren[this.parentIndex] !== this) {
        each(parentChildren, (child, index) => {
          if (child instanceof AsyncComponent)
            child.parentIndex = index
        })
      }

      parentChildren[this.parentIndex] = component
    }
  }

  this.dispose()
}

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
AsyncComponent.prototype._update = function (changes) {
  this.children[0] && this.children[0]._update(changes)
}

// exports = module.exports = AsyncComponent;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 对元素的子节点进行反解
 */

// var each = require('../util/each');
// var DOMChildrenWalker = require('./dom-children-walker');
// var createReverseNode = require('./create-reverse-node');

// #[begin] reverse

/**
 * 对元素的子节点进行反解
 *
 * @param {Object} element 元素
 */
function reverseElementChildren(element, scope, owner) {
  const htmlDirective = element.aNode.directives.html

  if (!htmlDirective) {
    const reverseWalker = new DOMChildrenWalker(element.el)
    const aNodeChildren = element.aNode.children

    for (let i = 0, l = aNodeChildren.length; i < l; i++) {
      element.children.push(
        createReverseNode(aNodeChildren[i], element, scope, owner, reverseWalker),
      )
    }
  }
}
// #[end]

// exports = module.exports = reverseElementChildren;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ANode预热
 */

/**
 * ANode预热HTML元素，用于循环创建时clone
 *
 * @param {Object} aNode 要预热的ANode
 * @return {HTMLElement}
 */
function preheatEl(aNode) {
  const el = createEl(aNode.tagName)
  aNode._el = el

  for (let i = 0, l = aNode.props.length; i < l; i++) {
    const prop = aNode.props[i]
    if (prop.expr.value != null)
      prop.handler(el, prop.expr.value, prop.name, aNode)
  }

  return el
}

// exports = module.exports = preheatEl;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取 element 的 transition 控制对象
 */

// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var handleError = require('../util/handle-error');
// var NodeType = require('./node-type');

/**
 * 获取 element 的 transition 控制对象
 *
 * @param {Object} element 元素
 * @return {Object?}
 */
function elementGetTransition(element) {
  let directive = element.aNode.directives.transition
  let owner = element.owner

  if (element.nodeType === 5) {
    const cmptGivenTransition = element.source && element.source.directives.transition
    if (cmptGivenTransition)
      directive = cmptGivenTransition

    else
      owner = element
  }

  let transition
  if (directive && owner) {
    transition = findMethod(owner, directive.value.name)

    if (typeof transition === 'function') {
      try {
        transition = transition.apply(
          owner,
          evalArgs(directive.value.args, element.scope, owner),
        )
      }
      catch (e) {
        handleError(e, owner, 'transitionCreate')
      }
    }
  }

  return transition || element.transition
}

// exports = module.exports = elementGetTransition;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 将元素从页面上移除
 */

// var NodeType = require('./node-type');
// var handleError = require('../util/handle-error');
// var elementGetTransition = require('./element-get-transition');

/**
 * 将元素从页面上移除
 */
function elementOwnDetach() {
  const lifeCycle = this.lifeCycle
  if (lifeCycle.leaving)
    return

  if (!this.disposeNoTransition) {
    const transition = elementGetTransition(this)

    if (transition && transition.leave) {
      if (this._toPhase)
        this._toPhase('leaving')

      else
        this.lifeCycle = LifeCycle.leaving

      const me = this
      try {
        transition.leave(this.el, () => {
          me._leave()
        })
        return
      }
      catch (e) {
        handleError(
          e,
          this.nodeType === 5 ? this.parentComponent : this.owner,
          'transitionLeave',
        )
      }
    }
  }

  this._leave()
}

// exports = module.exports = elementOwnDetach;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 销毁释放元素
 */

/**
 * 销毁释放元素
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementOwnDispose(noDetach, noTransition) {
  this.leaveDispose = 1
  this.disposeNoDetach = noDetach
  this.disposeNoTransition = noTransition

  this.detach()
}

// exports = module.exports = elementOwnDispose;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 为元素的 el 绑定事件
 */

// var on = require('../browser/on');

/**
 * 为元素的 el 绑定事件
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {boolean} capture 是否是捕获阶段触发
 */
function elementOwnOnEl(name, listener, capture) {
  capture = !!capture
  this._elFns.push([name, listener, capture])
  on(this.el, name, listener, capture)
}

// exports = module.exports = elementOwnOnEl;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 是否浏览器环境
 */

const isBrowser = typeof window !== 'undefined'

// exports = module.exports = isBrowser;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 开发时的警告提示
 */

// #[begin] error
/**
 * 开发时的警告提示
 *
 * @param {string} message 警告信息
 */
function warn(message) {
  message = `[SAN WARNING] ${message}`

  /* istanbul ignore next */
  if (typeof console === 'object' && console.warn) {
    console.warn(message)
  }
  else {
    // 防止警告中断调用堆栈
    setTimeout(() => {
      throw new Error(message)
    }, 0)
  }
/* eslint-enable no-console */
}
// #[end]

// exports = module.exports = warn;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file  事件绑定不存在的 warning
 */

// var each = require('../util/each');
// var warn = require('../util/warn');

// #[begin] error
/**
 * 事件绑定不存在的 warning
 *
 * @param {Object} eventBind 事件绑定对象
 * @param {Component} owner 所属的组件对象
 */
function warnEventListenMethod(eventBind, owner) {
  let valid = true
  let method = owner
  each(eventBind.expr.name.paths, (path) => {
    method = method[path.value]
    valid = !!method
    return valid
  })

  if (!valid) {
    const paths = []
    each(eventBind.expr.name.paths, (path) => {
      paths.push(path.value)
    })

    warn(`${eventBind.name} listen fail,"${paths.join('.')}" not exist`)
  }
}
// #[end]

// exports = module.exports = warnEventListenMethod;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 完成元素 attached 后的行为
 */

// var empty = require('../util/empty');
// var isBrowser = require('../browser/is-browser');
// var trigger = require('../browser/trigger');
// var NodeType = require('./node-type');
// var elementGetTransition = require('./element-get-transition');
// var getEventListener = require('./get-event-listener');
// var warnEventListenMethod = require('./warn-event-listen-method');
// var handleError = require('../util/handle-error');

/**
 * 双绑输入框CompositionEnd事件监听函数
 *
 * @inner
 */
function inputOnCompositionEnd() {
  if (!this.composing)
    return

  this.composing = 0
  trigger(this, 'input')
}

/**
 * 双绑输入框CompositionStart事件监听函数
 *
 * @inner
 */
function inputOnCompositionStart() {
  this.composing = 1
}

function getXPropOutputer(element, xProp, data) {
  return function () {
    xPropOutput(element, xProp, data)
  }
}

function getInputXPropOutputer(element, xProp, data) {
  return function () {
    // #[begin] allua
    /* istanbul ignore if */
    if (element.__bkph) {
      element.__bkph = false
      return
    }
    // #[end]

    if (!this.composing)
      xPropOutput(element, xProp, data)
  }
}

// #[begin] allua
/* istanbul ignore next */
function getInputFocusXPropHandler(element, xProp, data) {
  return function () {
    element._inputTimer = setInterval(() => {
      xPropOutput(element, xProp, data)
    }, 16)
  }
}

/* istanbul ignore next */
function getInputBlurXPropHandler(element) {
  return function () {
    clearInterval(element._inputTimer)
    element._inputTimer = null
  }
}
// #[end]

function xPropOutput(element, bindInfo, data) {
/* istanbul ignore if */
  if (!element.lifeCycle.created)
    return

  const el = element.el

  if (element.tagName === 'input' && bindInfo.name === 'checked') {
    const bindValue = getANodeProp(element.aNode, 'value')
    const bindType = getANodeProp(element.aNode, 'type')

    if (bindValue && bindType) {
      switch (el.type) {
        case 'checkbox':
          data[el.checked ? 'push' : 'remove'](bindInfo.expr, evalExpr(bindValue.expr, data))
          return

        case 'radio':
          el.checked && data.set(bindInfo.expr, evalExpr(bindValue.expr, data), {
            target: {
              node: element,
              prop: bindInfo.name,
            },
          })
          return
      }
    }
  }

  data.set(bindInfo.expr, el[bindInfo.name], {
    target: {
      node: element,
      prop: bindInfo.name,
    },
  })
}

/**
 * 完成元素 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
function elementOwnAttached() {
  if (this._rootNode)
    return

  const isComponent = this.nodeType === 5
  const data = isComponent ? this.data : this.scope

  // 处理自身变化时双向绑定的逻辑
  const xProps = this.aNode._xp
  for (var i = 0, l = xProps.length; i < l; i++) {
    const xProp = xProps[i]

    switch (xProp.name) {
      case 'value':
        switch (this.tagName) {
          case 'input':
          case 'textarea':
            if (isBrowser && window.CompositionEvent) {
              this._onEl('change', inputOnCompositionEnd)
              this._onEl('compositionstart', inputOnCompositionStart)
              this._onEl('compositionend', inputOnCompositionEnd)
            }

            // #[begin] allua
            /* istanbul ignore else */
            if ('oninput' in this.el) {
            // #[end]
              this._onEl('input', getInputXPropOutputer(this, xProp, data))
            // #[begin] allua
            }
            else {
              this._onEl('focusin', getInputFocusXPropHandler(this, xProp, data))
              this._onEl('focusout', getInputBlurXPropHandler(this))
            }
            // #[end]

            break

          case 'select':
            this._onEl('change', getXPropOutputer(this, xProp, data))
            break
        }
        break

      case 'checked':
        switch (this.tagName) {
          case 'input':
            switch (this.el.type) {
              case 'checkbox':
              case 'radio':
                this._onEl('click', getXPropOutputer(this, xProp, data))
            }
        }
        break
    }
  }

  const owner = isComponent ? this : this.owner
  for (var i = 0, l = this.aNode.events.length; i < l; i++) {
    var eventBind = this.aNode.events[i]

    // #[begin] error
    warnEventListenMethod(eventBind, owner)
    // #[end]

    this._onEl(
      eventBind.name,
      getEventListener(eventBind, owner, data, eventBind.modifier),
      eventBind.modifier.capture,
    )
  }

  if (isComponent) {
    for (var i = 0, l = this.nativeEvents.length; i < l; i++) {
      var eventBind = this.nativeEvents[i]

      // #[begin] error
      warnEventListenMethod(eventBind, this.owner)
      // #[end]

      this._onEl(
        eventBind.name,
        getEventListener(eventBind, this.owner, this.scope),
        eventBind.modifier.capture,
      )
    }
  }

  const transition = elementGetTransition(this)
  if (transition && transition.enter) {
    try {
      transition.enter(this.el, empty)
    }
    catch (e) {
      handleError(e, isComponent ? owner.parentComponent : owner, 'transitionEnter')
    }
  }
}

// exports = module.exports = elementOwnAttached;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 初始化节点的 s-bind 数据
 */

// var evalExpr = require('../runtime/eval-expr');

/**
 * 初始化节点的 s-bind 数据
 *
 * @param {Object} sBind bind指令对象
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @return {boolean}
 */
function nodeSBindInit(sBind, scope, owner) {
  if (sBind && scope)
    return evalExpr(sBind.value, scope, owner)
}

// exports = module.exports = nodeSBindInit;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 计算两个对象 key 的并集
 */

/**
 * 计算两个对象 key 的并集
 *
 * @param {Object} obj1 目标对象
 * @param {Object} obj2 源对象
 * @return {Array}
 */
function unionKeys(obj1, obj2) {
  const result = []
  let key

  for (key in obj1) {
    /* istanbul ignore else  */
    if (obj1.hasOwnProperty(key))
      result.push(key)
  }

  for (key in obj2) {
    /* istanbul ignore else  */
    if (obj2.hasOwnProperty(key))
      !obj1[key] && result.push(key)
  }

  return result
}

// exports = module.exports = unionKeys;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 更新节点的 s-bind 数据
 */

// var unionKeys = require('../util/union-keys');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');

/**
 * 更新节点的 s-bind 数据
 *
 * @param {Object} sBind bind指令对象
 * @param {Object} oldBindData 当前s-bind数据
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {Array} changes 变更数组
 * @param {Function} updater 绑定对象子项变更的更新函数
 */
function nodeSBindUpdate(sBind, oldBindData, scope, owner, changes, updater) {
  if (sBind) {
    let len = changes.length

    while (len--) {
      if (changeExprCompare(changes[len].expr, sBind.value, scope)) {
        const newBindData = evalExpr(sBind.value, scope, owner)
        const keys = unionKeys(newBindData, oldBindData)

        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i]
          const value = newBindData[key]

          if (value !== oldBindData[key])
            updater(key, value)
        }

        return newBindData
      }
    }

    return oldBindData
  }
}

// exports = module.exports = nodeSBindUpdate;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断元素是否不允许设置HTML
 */

// some html elements cannot set innerHTML in old ie
// see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx

/**
 * 判断元素是否不允许设置HTML
 *
 * @param {HTMLElement} el 要判断的元素
 * @return {boolean}
 */
function noSetHTML(el) {
  return /^(col|colgroup|frameset|style|table|tbody|tfoot|thead|tr|select)$/i.test(el.tagName)
}

// exports = module.exports = noSetHTML;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file  获取节点 stump 的 comment
 */

// var noSetHTML = require('../browser/no-set-html');
// var warn = require('../util/warn');

// #[begin] error
/**
 * 获取节点 stump 的 comment
 *
 * @param {HTMLElement} el HTML元素
 */
function warnSetHTML(el) {
// dont warn if not in browser runtime
/* istanbul ignore if */
  if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document))
    return

  // some html elements cannot set innerHTML in old ie
  // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
  if (noSetHTML(el))
    warn(`set html for element "${el.tagName}" may cause an error in old IE`)
}
// #[end]

// exports = module.exports = warnSetHTML;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取节点在组件树中的路径
 */

// var NodeType = require('./node-type');

// #[begin] reverse
/**
 * 获取节点在组件树中的路径
 *
 * @param {Node} node 节点对象
 * @return {Array}
 */
/* istanbul ignore next */
function getNodePath(node) {
  const nodePaths = []
  let nodeParent = node
  while (nodeParent) {
    switch (nodeParent.nodeType) {
      case 4:
        nodePaths.unshift(nodeParent.tagName)
        break

      case 2:
        nodePaths.unshift('if')
        break

      case 3:
        nodePaths.unshift(`for[${nodeParent.aNode.directives['for'].item}]`) // eslint-disable-line dot-notation
        break

      case 6:
        nodePaths.unshift(`slot[${nodeParent.name || 'default'}]`)
        break

      case 7:
        nodePaths.unshift('template')
        break

      case 5:
        nodePaths.unshift(`component[${nodeParent.source ? nodeParent.source.tagName : 'root'}]`)
        break

      case 1:
        nodePaths.unshift('text')
        break
    }

    nodeParent = nodeParent.parent
  }

  return nodePaths
}
// #[end]

// exports = module.exports = getNodePath;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解压缩 ANode
 */

// var ExprType = require('./expr-type');

/**
 * 解压缩 ANode
 *
 * @param {Array} packed ANode压缩数据
 * @return {Object}
 */
function unpackANode(packed) {
  let root
  const nodeStack = []
  const typeStack = []
  const stateStack = []
  const targetStack = []
  let stackIndex = -1

  for (let i = 0, l = packed.length; i < l; i++) {
    let current = nodeStack[stackIndex]
    let currentType = typeStack[stackIndex]
    let currentState = stateStack[stackIndex]
    let currentTarget = targetStack[stackIndex]

    while (current) {
      if (currentState === -3)
        currentState = stateStack[stackIndex] = packed[i++] || -1

      if (currentState === -1) {
        current = nodeStack[--stackIndex]
        currentType = typeStack[stackIndex]
        currentState = stateStack[stackIndex]
        currentTarget = targetStack[stackIndex]
      }
      else {
        break
      }
    }

    const type = packed[i]
    var node
    let state = -1
    let target = false

    switch (type) {
    // Node: Tag
      case 1:
        node = {
          directives: {},
          props: [],
          events: [],
          children: [],
        }
        var tagName = packed[++i]
        tagName && (node.tagName = tagName)
        state = packed[++i] || -1
        break

      case 3:
        node = {
          type: 1,
          value: packed[++i],
        }
        break

      case 4:
        node = {
          type: 2,
          value: packed[++i],
        }
        break

      case 5:
        node = {
          type: 3,
          value: !!packed[++i],
        }
        break

      case 19:
        node = {
          type: 13,
        }
        break

      case 6:
        target = []
        node = {
          type: 4,
          paths: target,
        }
        state = packed[++i] || -1
        break

      case 7:
        target = []
        node = {
          type: 5,
          filters: target,
        }
        packed[++i] && (node.original = 1)
        state = -2
        break

      case 8:
        target = []
        node = {
          type: 6,
          args: target,
        }
        state = -2
        break

      case 9:
        target = []
        node = {
          type: 7,
          segs: target,
        }

        packed[++i] && (node.original = 1)
        state = packed[++i] || -1
        break

      case 10:
        target = []
        node = {
          type: 8,
          operator: packed[++i],
          segs: target,
        }
        state = 2
        break

      case 11:
        node = {
          type: 9,
          operator: packed[++i],
        }
        state = -2
        break

      case 12:
        target = []
        node = {
          type: 10,
          segs: target,
        }
        state = 3
        break

      case 13:
        target = []
        node = {
          type: 11,
          items: target,
        }
        state = packed[++i] || -1
        break

      case 14:
        node = {}
        state = -2
        break

      case 15:
        node = { spread: true }
        state = -2
        break

      case 16:
        target = []
        node = {
          type: 12,
          items: target,
        }
        state = packed[++i] || -1
        break

      case 17:
      case 18:
        node = type === 18 ? { spread: true } : {}
        state = -2
        break

      case 2:
      case 33:
      case 34:
        node = {
          name: packed[++i],
        };
        (type === 33) && (node.noValue = 1);
        (type === 34) && (node.x = 1)
        state = -2
        break

      case 35:
        node = {
          name: packed[++i],
          modifier: {},
        }
        state = -2
        break

      case 36:
        node = {
          name: packed[++i],
        }
        state = -2
        break

      case 37:
        node = {
          item: packed[++i],
        }

        var forIndex = packed[++i]
        forIndex && (node.index = forIndex)

        var trackBy = packed[++i]
        if (trackBy) {
          node.trackByRaw = trackBy
          node.trackBy = parseExpr(trackBy)
        }

        state = -2
        break

      case 38:
      case 39:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
        node = {}
        state = -2
        break

        // else
      case 40:
        node = { value: {} }
        break

        // Node: Text
        // Event modifier
      default:
        if (!type) {
          node = {}
          state = -2
        }
    }

    if (!root)
      root = node

    if (current) {
      switch (currentType) {
        // Node: Tag
        case 1:
          if (currentTarget) {
            current.elses = current.elses || []
            current.elses.push(node)
            if (!(--stateStack[stackIndex]))
              stackIndex--
          }
          else {
            switch (type) {
              case 2:
              case 33:
              case 34:
                current.props.push(node)
                break

              case 35:
                current.events.push(node)
                break

              case 36:
                current.vars = current.vars || []
                current.vars.push(node)
                break

              case 37:
                current.directives.for = node
                break

              case 38:
                current.directives.if = node
                break

              case 39:
                current.directives.elif = node
                break

              case 40:
                current.directives.else = node
                break

              case 41:
                current.directives.ref = node
                break

              case 42:
                current.directives.bind = node
                break

              case 43:
                current.directives.html = node
                break

              case 44:
                current.directives.transition = node
                break

              case 45:
                current.directives.is = node
                break

              case 1:
              default:
                current.children.push(node)
            }

            if (!(--stateStack[stackIndex])) {
              if (current.directives.if) {
                targetStack[stackIndex] = 'elses'
                stateStack[stackIndex] = -3
              }
              else {
                stackIndex--
              }
            }
          }
          break

        // Expr: Interp
        case 7:
          if (currentState === -2) {
            stateStack[stackIndex] = -3
            current.expr = node
          }
          else {
            currentTarget.push(node)
            if (!(--stateStack[stackIndex]))
              stackIndex--
          }
          break

        // Expr: CALL
        case 8:
          if (currentState === -2) {
            stateStack[stackIndex] = -3
            current.name = node
          }
          else {
            currentTarget.push(node)
            if (!(--stateStack[stackIndex]))
              stackIndex--
          }
          break

        // Expr: ACCESSOR, TEXT, BINARY, TERTIARY, OBJECT, ARRAY
        case 6:
        case 9:
        case 10:
        case 12:
        case 13:
        case 16:
          currentTarget.push(node)
          if (!(--stateStack[stackIndex]))
            stackIndex--

          break

        // Expr: UNARY
        // Prop
        // var
        // Object Spread Item, Array Item
        case 11:
        case 2:
        case 33:
        case 34:
        case 36:
        case 15:
        case 17:
        case 18:
          current.expr = node
          stackIndex--
          break

        // Expr: Object Item
        case 14:
          if (currentState === -2) {
            stateStack[stackIndex] = -4
            current.name = node
          }
          else {
            current.expr = node
            stackIndex--
          }
          break

        // Event
        case 35:
          if (currentState === -2) {
            stateStack[stackIndex] = -3
            current.expr = node
          }
          else {
            current.modifier[type] = true
            if (!(--stateStack[stackIndex]))
              stackIndex--
          }
          break

        // Directive: for, if, elif, ref, bind, html, transition, is
        case 37:
        case 38:
        case 39:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
          current.value = node
          stackIndex--
          break

        // Node: Text
        default:
          current.textExpr = node
          stackIndex--
      }
    }

    if (state !== -1) {
      nodeStack[++stackIndex] = node
      typeStack[stackIndex] = type
      stateStack[stackIndex] = state
      targetStack[stackIndex] = target
    }
  }

  return root
}

// exports = module.exports = unpackANode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 给 devtool 发通知消息
 */

// var isBrowser = require('../browser/is-browser');

// #[begin] devtool
let san4devtool

/**
 * 给 devtool 发通知消息
 *
 * @param {string} name 消息名称
 * @param {*} arg 消息参数
 */
function emitDevtool(name, arg) {
/* istanbul ignore if */
  if (isBrowser && san4devtool && san4devtool.debug && window.__san_devtool__)
    window.__san_devtool__.emit(name, arg)
}

emitDevtool.start = function (main) {
  san4devtool = main
  emitDevtool('san', main)
}
// #[end]

// exports = module.exports = emitDevtool;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 组件类
 */

// var bind = require('../util/bind');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var nextTick = require('../util/next-tick');
// var emitDevtool = require('../util/emit-devtool');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var parseTemplate = require('../parser/parse-template');
// var unpackANode = require('../parser/unpack-anode');
// var removeEl = require('../browser/remove-el');
// var Data = require('../runtime/data');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var DataChangeType = require('../runtime/data-change-type');
// var insertBefore = require('../browser/insert-before');
// var un = require('../browser/un');
// var defineComponent = require('./define-component');
// var ComponentLoader = require('./component-loader');
// var createNode = require('./create-node');
// var preheatEl = require('./preheat-el');
// var parseComponentTemplate = require('./parse-component-template');
// var preheatANode = require('./preheat-a-node');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getEventListener = require('./get-event-listener');
// var reverseElementChildren = require('./reverse-element-children');
// var NodeType = require('./node-type');
// var styleProps = require('./style-props');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var elementOwnAttached = require('./element-own-attached');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var warnEventListenMethod = require('./warn-event-listen-method');
// var elementDisposeChildren = require('./element-dispose-children');
// var createDataTypesChecker = require('../util/create-data-types-checker');
// var warn = require('../util/warn');
// var handleError = require('../util/handle-error');

/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
function Component(options) {
// #[begin] error
  for (var key in Component.prototype) {
    if (this[key] !== Component.prototype[key])

      warn(`\`${key}\` is a reserved key of san components. Overriding this property may cause unknown exceptions.`)
    /* eslint-enable max-len */
  }
  // #[end]

  options = options || {}
  this.lifeCycle = LifeCycle.start
  this.id = guid++

  if (typeof this.construct === 'function')
    this.construct(options)

  this.children = []
  this._elFns = []
  this.listeners = {}
  this.slotChildren = []
  this.implicitChildren = []

  const clazz = this.constructor

  this.filters = this.filters || clazz.filters || {}
  this.computed = this.computed || clazz.computed || {}
  this.messages = this.messages || clazz.messages || {}

  if (options.transition)
    this.transition = options.transition

  this.owner = options.owner
  this.scope = options.scope
  this.el = options.el
  const parent = options.parent
  if (parent) {
    this.parent = parent
    this.parentComponent = parent.nodeType === 5
      ? parent
      : parent && parent.parentComponent
  }
  else if (this.owner) {
    this.parentComponent = this.owner
    this.scope = this.owner.data
  }

  this.sourceSlotNameProps = []
  this.sourceSlots = {
    named: {},
  }

  // #[begin] devtool
  this._toPhase('beforeCompile')
  // #[end]

  const proto = clazz.prototype

  // pre define components class
  /* istanbul ignore else  */
  if (!proto.hasOwnProperty('_cmptReady')) {
    proto.components = clazz.components || proto.components || {}
    const components = proto.components

    for (var key in components) { // eslint-disable-line
      const cmptClass = components[key]
      if (typeof cmptClass === 'object' && !(cmptClass instanceof ComponentLoader))
        components[key] = defineComponent(cmptClass)

      else if (cmptClass === 'self')
        components[key] = clazz
    }

    proto._cmptReady = 1
  }

  // compile
  if (!proto.hasOwnProperty('aNode')) {
    const aPack = clazz.aPack || proto.hasOwnProperty('aPack') && proto.aPack
    if (aPack) {
      proto.aNode = unpackANode(aPack)
      clazz.aPack = proto.aPack = null
    }
    else {
      proto.aNode = parseComponentTemplate(clazz)
    }
  }

  preheatANode(proto.aNode, this)

  this.tagName = proto.aNode.tagName
  this.source = typeof options.source === 'string'
    ? parseTemplate(options.source).children[0]
    : options.source

  preheatANode(this.source)
  proto.aNode._i++

  // #[begin] reverse
  // 组件反解，读取注入的组件数据
  if (this.el) {
    let firstCommentNode = this.el.firstChild
    if (firstCommentNode && firstCommentNode.nodeType === 3)
      firstCommentNode = firstCommentNode.nextSibling

    if (firstCommentNode && firstCommentNode.nodeType === 8) {
      const stumpMatch = firstCommentNode.data.match(/^\s*s-data:([\s\S]+)?$/)
      if (stumpMatch) {
        const stumpText = stumpMatch[1]

        // fill component data
        options.data = (new Function(`return ${
                    stumpText
                    .replace(/^[\s\n]*/, '')
                    .replace(
                        /"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z"/g,
                        (match, y, mon, d, h, m, s) => {
                            return `new Date(${+y},${+mon},${+d
                                    },${+h},${+m},${+s})`
                        },
                    )}`,
        ))()

        if (firstCommentNode.previousSibling)
          removeEl(firstCommentNode.previousSibling)

        removeEl(firstCommentNode)
      }
    }
  }
  // #[end]

  // native事件数组
  this.nativeEvents = []

  if (this.source) {
    // 组件运行时传入的结构，做slot解析
    this._initSourceSlots(1)

    for (var i = 0, l = this.source.events.length; i < l; i++) {
      const eventBind = this.source.events[i]
      // 保存当前实例的native事件，下面创建aNode时候做合并
      if (eventBind.modifier.native) {
        this.nativeEvents.push(eventBind)
      }
      else {
        // #[begin] error
        warnEventListenMethod(eventBind, options.owner)
        // #[end]

        this.on(
          eventBind.name,
          getEventListener(eventBind, options.owner, this.scope, 1),
          eventBind,
        )
      }
    }

    this.tagName = this.tagName || this.source.tagName
    this.binds = this.source._b

    // init s-bind data
    this._srcSbindData = nodeSBindInit(this.source.directives.bind, this.scope, this.owner)
  }

  this._toPhase('compiled')

  // #[begin] devtool
  this._toPhase('beforeInit')
  // #[end]

  // init data
  let initData
  try {
    initData = typeof this.initData === 'function' && this.initData()
  }
  catch (e) {
    handleError(e, this, 'initData')
  }
  initData = extend(initData || {}, options.data || this._srcSbindData)

  if (this.binds && this.scope) {
    for (var i = 0, l = this.binds.length; i < l; i++) {
      const bindInfo = this.binds[i]

      const value = evalExpr(bindInfo.expr, this.scope, this.owner)
      if (typeof value !== 'undefined') {
        // See: https://github.com/ecomfe/san/issues/191
        initData[bindInfo.name] = value
      }
    }
  }

  this.data = new Data(initData)

  this.tagName = this.tagName || 'div'
  // #[begin] allua
  // ie8- 不支持innerHTML输出自定义标签
  /* istanbul ignore if */
  if (ieOldThan9 && this.tagName.indexOf('-') > 0)
    this.tagName = 'div'

  // #[end]

  // #[begin] error
  // 在初始化 + 数据绑定后，开始数据校验
  // NOTE: 只在开发版本中进行属性校验
  const dataTypes = this.dataTypes || clazz.dataTypes
  if (dataTypes) {
    const dataTypeChecker = createDataTypesChecker(
      dataTypes,
      this.name || clazz.name,
    )
    this.data.setTypeChecker(dataTypeChecker)
    this.data.checkDataTypes()
  }
  // #[end]

  this.computedDeps = {}
  for (const expr in this.computed) {
    if (this.computed.hasOwnProperty(expr) && !this.computedDeps[expr])
      this._calcComputed(expr)
  }

  this._initDataChanger()
  this._sbindData = nodeSBindInit(this.aNode.directives.bind, this.data, this)
  this._toPhase('inited')

  // #[begin] reverse
  const reverseWalker = options.reverseWalker
  if (this.el || reverseWalker) {
    const RootComponentType = this.components[this.aNode.tagName]

    if (reverseWalker && (this.aNode.hasRootNode || RootComponentType)) {
      this._rootNode = createReverseNode(this.aNode, this, this.data, this, reverseWalker)
      this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode())
    }
    else if (this.el && RootComponentType) {
      this._rootNode = new RootComponentType({
        source: this.aNode,
        owner: this,
        scope: this.data,
        parent: this,
        el: this.el,
      })
    }
    else {
      if (reverseWalker) {
        const currentNode = reverseWalker.current
        if (currentNode && currentNode.nodeType === 1) {
          this.el = currentNode
          reverseWalker.goNext()
        }
      }

      reverseElementChildren(this, this.data, this)
    }

    this._toPhase('created')
    this._attached()
    this._toPhase('attached')
  }
// #[end]
}

/**
 * 初始化创建组件外部传入的插槽对象
 *
 * @protected
 * @param {boolean} isFirstTime 是否初次对sourceSlots进行计算
 */
Component.prototype._initSourceSlots = function (isFirstTime) {
  this.sourceSlots.named = {}

  // 组件运行时传入的结构，做slot解析
  if (this.source && this.scope) {
    const sourceChildren = this.source.children

    for (let i = 0, l = sourceChildren.length; i < l; i++) {
      const child = sourceChildren[i]
      var target

      const slotBind = !child.textExpr && getANodeProp(child, 'slot')
      if (slotBind) {
        isFirstTime && this.sourceSlotNameProps.push(slotBind)

        const slotName = evalExpr(slotBind.expr, this.scope, this.owner)
        target = this.sourceSlots.named[slotName]
        if (!target)
          target = this.sourceSlots.named[slotName] = []

        target.push(child)
      }
      else if (isFirstTime) {
        target = this.sourceSlots.noname
        if (!target)
          target = this.sourceSlots.noname = []

        target.push(child)
      }
    }
  }
}

/**
 * 类型标识
 *
 * @type {string}
 */
Component.prototype.nodeType = 5

/**
 * 在下一个更新周期运行函数
 *
 * @param {Function} fn 要运行的函数
 */
Component.prototype.nextTick = nextTick

Component.prototype._ctx = (new Date()).getTime().toString(16)

/**
 * 使节点到达相应的生命周期
 *
 * @protected
 * @param {string} name 生命周期名称
 */
Component.prototype._toPhase = function (name) {
  if (!this.lifeCycle[name]) {
    this.lifeCycle = LifeCycle[name] || this.lifeCycle
    if (typeof this[name] === 'function') {
      try {
        this[name]()
      }
      catch (e) {
        handleError(e, this, `hook:${name}`)
      }
    }

    this._afterLife = this.lifeCycle

    // 通知devtool
    // #[begin] devtool
    emitDevtool(`comp-${name}`, this)
    // #[end]
  }
}
/* eslint-enable operator-linebreak */

/**
 * 添加事件监听器
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {string?} declaration 声明式
 */
Component.prototype.on = function (name, listener, declaration) {
  if (typeof listener === 'function') {
    if (!this.listeners[name])
      this.listeners[name] = []

    this.listeners[name].push({ fn: listener, declaration })
  }
}

/**
 * 移除事件监听器
 *
 * @param {string} name 事件名
 * @param {Function=} listener 监听器
 */
Component.prototype.un = function (name, listener) {
  const nameListeners = this.listeners[name]
  let len = nameListeners && nameListeners.length

  while (len--) {
    if (!listener || listener === nameListeners[len].fn)
      nameListeners.splice(len, 1)
  }
}

/**
 * 派发事件
 *
 * @param {string} name 事件名
 * @param {Object} event 事件对象
 */
Component.prototype.fire = function (name, event) {
  const me = this
  // #[begin] devtool
  emitDevtool('comp-event', {
    name,
    event,
    target: this,
  })
  // #[end]

  each(this.listeners[name], (listener) => {
    try {
      listener.fn.call(me, event)
    }
    catch (e) {
      handleError(e, me, `event:${name}`)
    }
  })
}

/**
 * 计算 computed 属性的值
 *
 * @private
 * @param {string} computedExpr computed表达式串
 */
Component.prototype._calcComputed = function (computedExpr) {
  let computedDeps = this.computedDeps[computedExpr]
  if (!computedDeps)
    computedDeps = this.computedDeps[computedExpr] = {}

  const me = this
  try {
    const result = this.computed[computedExpr].call({
      data: {
        get(expr) {
        // #[begin] error
          if (!expr)
            throw new Error('[SAN ERROR] call get method in computed need argument')

          // #[end]

          if (!computedDeps[expr]) {
            computedDeps[expr] = 1

            if (me.computed[expr] && !me.computedDeps[expr])
              me._calcComputed(expr)

            me.watch(expr, () => {
              me._calcComputed(computedExpr)
            })
          }

          return me.data.get(expr)
        },
      },
    })
    this.data.set(computedExpr, result)
  }
  catch (e) {
    handleError(e, this, `computed:${computedExpr}`)
  }
}

/**
 * 派发消息
 * 组件可以派发消息，消息将沿着组件树向上传递，直到遇上第一个处理消息的组件
 *
 * @param {string} name 消息名称
 * @param {*?} value 消息值
 */
Component.prototype.dispatch = function (name, value) {
  let parentComponent = this.parentComponent

  while (parentComponent) {
    const handler = parentComponent.messages[name] || parentComponent.messages['*']
    if (typeof handler === 'function') {
    // #[begin] devtool
      emitDevtool('comp-message', {
        target: this,
        value,
        name,
        receiver: parentComponent,
      })
      // #[end]

      try {
        handler.call(
          parentComponent,
          { target: this, value, name },
        )
      }
      catch (e) {
        handleError(e, parentComponent, `message:${name || '*'}`)
      }
      return
    }

    parentComponent = parentComponent.parentComponent
  }

  // #[begin] devtool
  emitDevtool('comp-message', { target: this, value, name })
// #[end]
}

/**
 * 获取组件内部的 slot
 *
 * @param {string=} name slot名称，空为default slot
 * @return {Array}
 */
Component.prototype.slot = function (name) {
  const result = []
  const me = this

  function childrenTraversal(children) {
    each(children, (child) => {
      if (child.nodeType === 6 && child.owner === me) {
        if (child.isNamed && child.name === name
                || !child.isNamed && !name
        )
          result.push(child)
      }
      else {
        childrenTraversal(child.children)
      }
    })
  }

  childrenTraversal(this.children)
  return result
}

/**
 * 获取带有 san-ref 指令的子组件引用
 *
 * @param {string} name 子组件的引用名
 * @return {Component}
 */
Component.prototype.ref = function (name) {
  let refTarget
  const owner = this

  function childrenTraversal(children) {
    if (children) {
      for (let i = 0, l = children.length; i < l; i++) {
        elementTraversal(children[i])
        if (refTarget)
          return
      }
    }
  }

  function elementTraversal(element) {
    const nodeType = element.nodeType
    if (nodeType === 1)
      return

    if (element.owner === owner) {
      let ref
      switch (element.nodeType) {
        case 4:
          ref = element.aNode.directives.ref
          if (ref && evalExpr(ref.value, element.scope, owner) === name)
            refTarget = element.el

          break

        case 5:
          ref = element.source.directives.ref
          if (ref && evalExpr(ref.value, element.scope, owner) === name)
            refTarget = element
      }

      if (refTarget)
        return

      childrenTraversal(element.slotChildren)
    }

    if (refTarget)
      return

    childrenTraversal(element.children)
  }

  this._rootNode ? elementTraversal(this._rootNode) : childrenTraversal(this.children)

  return refTarget
}

/**
 * 视图更新函数
 *
 * @param {Array?} changes 数据变化信息
 */
Component.prototype._update = function (changes) {
  if (this.lifeCycle.disposed)
    return

  const me = this

  let needReloadForSlot = false
  this._notifyNeedReload = function () {
    needReloadForSlot = true
  }

  if (changes) {
    if (this.source) {
      this._srcSbindData = nodeSBindUpdate(
        this.source.directives.bind,
        this._srcSbindData,
        this.scope,
        this.owner,
        changes,
        (name, value) => {
          if (name in me.source._pi)
            return

          me.data.set(name, value, {
            target: {
              node: me.owner,
            },
          })
        },
      )
    }

    each(changes, (change) => {
      const changeExpr = change.expr

      each(me.binds, (bindItem) => {
        let relation
        let setExpr = bindItem.name
        let updateExpr = bindItem.expr

        if (!isDataChangeByElement(change, me, setExpr)
                && (relation = changeExprCompare(changeExpr, updateExpr, me.scope))
        ) {
          if (relation > 2) {
            setExpr = {
              type: 4,
              paths: [
                {
                  type: 1,
                  value: setExpr,
                },
              ].concat(changeExpr.paths.slice(updateExpr.paths.length)),
            }
            updateExpr = changeExpr
          }

          if (relation >= 2 && change.type === 2) {
            me.data.splice(setExpr, [change.index, change.deleteCount].concat(change.insertions), {
              target: {
                node: me.owner,
              },
            })
          }
          else {
            me.data.set(setExpr, evalExpr(updateExpr, me.scope, me.owner), {
              target: {
                node: me.owner,
              },
            })
          }
        }
      })

      each(me.sourceSlotNameProps, (bindItem) => {
        needReloadForSlot = needReloadForSlot || changeExprCompare(changeExpr, bindItem.expr, me.scope)
        return !needReloadForSlot
      })
    })

    if (needReloadForSlot) {
      this._initSourceSlots()
      this._repaintChildren()
    }
    else {
      let slotChildrenLen = this.slotChildren.length
      while (slotChildrenLen--) {
        const slotChild = this.slotChildren[slotChildrenLen]

        if (slotChild.lifeCycle.disposed)
          this.slotChildren.splice(slotChildrenLen, 1)

        else if (slotChild.isInserted)
          slotChild._update(changes, 1)
      }
    }
  }

  const dataChanges = this._dataChanges
  if (dataChanges) {
    // #[begin] devtool
    this._toPhase('beforeUpdate')
    // #[end]

    this._dataChanges = null

    this._sbindData = nodeSBindUpdate(
      this.aNode.directives.bind,
      this._sbindData,
      this.data,
      this,
      dataChanges,
      (name, value) => {
        if (me._rootNode || (name in me.aNode._pi))
          return

        getPropHandler(me.tagName, name)(me.el, value, name, me)
      },
    )

    const htmlDirective = this.aNode.directives.html

    if (this._rootNode) {
      this._rootNode._update(dataChanges)
      this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode())
    }
    else if (htmlDirective) {
      let len = dataChanges.length
      while (len--) {
        if (changeExprCompare(dataChanges[len].expr, htmlDirective.value, this.data)) {
        // #[begin] error
          warnSetHTML(this.el)
          // #[end]

          this.el.innerHTML = evalExpr(htmlDirective.value, this.data, this)
          break
        }
      }
    }
    else {
      const dynamicProps = this.aNode._dp
      for (var i = 0; i < dynamicProps.length; i++) {
        const prop = dynamicProps[i]

        for (let j = 0; j < dataChanges.length; j++) {
          const change = dataChanges[j]
          if (changeExprCompare(change.expr, prop.expr, this.data)
                    || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.data)
          ) {
            prop.handler(this.el, evalExpr(prop.expr, this.data, this), prop.name, this)
            break
          }
        }
      }

      for (var i = 0; i < this.children.length; i++)
        this.children[i]._update(dataChanges)
    }

    if (needReloadForSlot) {
      this._initSourceSlots()
      this._repaintChildren()
    }

    for (var i = 0; i < this.implicitChildren.length; i++)
      this.implicitChildren[i]._update(dataChanges)

    if (typeof this.updated === 'function')
      this.updated()

    if (this.owner && this._updateBindxOwner(dataChanges))
      this.owner._update()
  }

  this._notifyNeedReload = null
}

Component.prototype._updateBindxOwner = function (dataChanges) {
  const me = this
  let xbindUped

  each(dataChanges, (change) => {
    each(me.binds, (bindItem) => {
      const changeExpr = change.expr
      if (bindItem.x
            && !isDataChangeByElement(change, me.owner)
            && changeExprCompare(changeExpr, parseExpr(bindItem.name), me.data)
      ) {
        let updateScopeExpr = bindItem.expr
        if (changeExpr.paths.length > 1) {
          updateScopeExpr = {
            type: 4,
            paths: bindItem.expr.paths.concat(changeExpr.paths.slice(1)),
          }
        }

        xbindUped = 1
        me.scope.set(
          updateScopeExpr,
          evalExpr(changeExpr, me.data, me),
          {
            target: {
              node: me,
              prop: bindItem.name,
            },
          },
        )
      }
    })
  })

  return xbindUped
}

/**
 * 重新绘制组件的内容
 * 当 dynamic slot name 发生变更或 slot 匹配发生变化时，重新绘制
 * 在组件级别重绘有点粗暴，但是能保证视图结果正确性
 */
Component.prototype._repaintChildren = function () {
// TODO: repaint once?

  if (this._rootNode) {
    const parentEl = this._rootNode.el.parentNode
    const beforeEl = this._rootNode.el.nextSibling
    this._rootNode.dispose(0, 1)
    this.slotChildren = []

    this._rootNode = createNode(this.aNode, this, this.data, this)
    this._rootNode.attach(parentEl, beforeEl)
    this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode())
  }
  else {
    elementDisposeChildren(this.children, 0, 1)
    this.children = []
    this.slotChildren = []

    for (let i = 0, l = this.aNode.children.length; i < l; i++) {
      const child = createNode(this.aNode.children[i], this, this.data, this)
      this.children.push(child)
      child.attach(this.el)
    }
  }
}

/**
 * 初始化组件内部监听数据变化
 *
 * @private
 * @param {Object} change 数据变化信息
 */
Component.prototype._initDataChanger = function (change) {
  const me = this

  this._dataChanger = function (change) {
    if (me._afterLife.created) {
      if (!me._dataChanges) {
        nextTick(me._update, me)
        me._dataChanges = []
      }

      me._dataChanges.push(change)
    }
    else if (me.lifeCycle.inited && me.owner) {
      me._updateBindxOwner([change])
    }
  }

  this.data.listen(this._dataChanger)
}

/**
 * 监听组件的数据变化
 *
 * @param {string} dataName 变化的数据项
 * @param {Function} listener 监听函数
 */
Component.prototype.watch = function (dataName, listener) {
  const dataExpr = parseExpr(dataName)
  let value = evalExpr(dataExpr, this.data, this)
  const me = this

  this.data.listen((change) => {
    if (changeExprCompare(change.expr, dataExpr, me.data)) {
      const newValue = evalExpr(dataExpr, me.data, me)

      if (newValue !== value) {
        const oldValue = value
        value = newValue

        try {
          listener.call(
            me,
            newValue,
            {
              oldValue,
              newValue,
              change,
            },
          )
        }
        catch (e) {
          handleError(e, me, `watch:${dataName}`)
        }
      }
    }
  })
}

Component.prototype._getElAsRootNode = function () {
  return this.el
}

/**
 * 将组件attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
Component.prototype.attach = function (parentEl, beforeEl) {
  if (!this.lifeCycle.attached) {
    // #[begin] devtool
    this._toPhase('beforeAttach')
    // #[end]

    const aNode = this.aNode

    if (aNode.hasRootNode || this.components[aNode.tagName]) {
    // #[begin] devtool
      this._toPhase('beforeCreate')
      // #[end]
      this._rootNode = this._rootNode || createNode(aNode, this, this.data, this)
      this._rootNode.attach(parentEl, beforeEl)
      this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode())
      this._toPhase('created')
    }
    else {
      if (!this.el) {
        // #[begin] devtool
        this._toPhase('beforeCreate')
        // #[end]

        let props

        if (aNode._ce && aNode._i > 2) {
          props = aNode._dp
          this.el = (aNode._el || preheatEl(aNode)).cloneNode(false)
        }
        else {
          props = aNode.props
          this.el = createEl(this.tagName)
        }

        if (this._sbindData) {
          for (const key in this._sbindData) {
            if (this._sbindData.hasOwnProperty(key)) {
              getPropHandler(this.tagName, key)(
                this.el,
                this._sbindData[key],
                key,
                this,
              )
            }
          }
        }

        for (var i = 0, l = props.length; i < l; i++) {
          const prop = props[i]
          const value = evalExpr(prop.expr, this.data, this)

          if (value || !styleProps[prop.name])
            prop.handler(this.el, value, prop.name, this)
        }

        this._toPhase('created')
      }

      insertBefore(this.el, parentEl, beforeEl)

      if (!this._contentReady) {
        const htmlDirective = aNode.directives.html

        if (htmlDirective) {
        // #[begin] error
          warnSetHTML(this.el)
          // #[end]

          this.el.innerHTML = evalExpr(htmlDirective.value, this.data, this)
        }
        else {
          for (var i = 0, l = aNode.children.length; i < l; i++) {
            const childANode = aNode.children[i]
            const child = childANode.Clazz
              ? new childANode.Clazz(childANode, this, this.data, this)
              : createNode(childANode, this, this.data, this)
            this.children.push(child)
            child.attach(this.el)
          }
        }

        this._contentReady = 1
      }

      this._attached()
    }

    this._toPhase('attached')

    // element 都是内部创建的，只有动态创建的 component 才会进入这个分支
    if (this.owner && !this.parent)
      this.owner.implicitChildren.push(this)
  }
}

Component.prototype.detach = elementOwnDetach
Component.prototype.dispose = elementOwnDispose
Component.prototype._onEl = elementOwnOnEl
Component.prototype._attached = elementOwnAttached
Component.prototype._leave = function () {
  if (this.leaveDispose) {
    if (!this.lifeCycle.disposed) {
    // #[begin] devtool
      this._toPhase('beforeDetach')
      // #[end]
      this.data.unlisten()
      this.dataChanger = null
      this._dataChanges = null

      var len = this.implicitChildren.length
      while (len--)
        this.implicitChildren[len].dispose(0, 1)

      this.implicitChildren = null

      this.source = null
      this.sourceSlots = null
      this.sourceSlotNameProps = null

      // 这里不用挨个调用 dispose 了，因为 children 释放链会调用的
      this.slotChildren = null

      if (this._rootNode) {
        // 如果没有parent，说明是一个root component，一定要从dom树中remove
        this._rootNode.dispose(this.disposeNoDetach && this.parent)
      }
      else {
        var len = this.children.length
        while (len--)
          this.children[len].dispose(1, 1)

        len = this._elFns.length
        while (len--) {
          const fn = this._elFns[len]
          un(this.el, fn[0], fn[1], fn[2])
        }
        this._elFns = null

        // #[begin] allua
        /* istanbul ignore if */
        if (this._inputTimer) {
          clearInterval(this._inputTimer)
          this._inputTimer = null
        }
        // #[end]

        // 如果没有parent，说明是一个root component，一定要从dom树中remove
        if (!this.disposeNoDetach || !this.parent)
          removeEl(this.el)
      }

      this._toPhase('detached')

      // #[begin] devtool
      this._toPhase('beforeDispose')
      // #[end]

      this._rootNode = null
      this.el = null
      this.owner = null
      this.scope = null
      this.children = null

      this._toPhase('disposed')

      if (this._ondisposed)
        this._ondisposed()
    }
  }
  else if (this.lifeCycle.attached) {
    // #[begin] devtool
    this._toPhase('beforeDetach')
    // #[end]

    if (this._rootNode) {
      if (this._rootNode.detach) {
        this._rootNode.detach()
      }
      else {
        this._rootNode.dispose()
        this._rootNode = null
      }
    }
    else {
      removeEl(this.el)
    }

    this._toPhase('detached')
  }
}

// exports = module.exports = Component;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建组件类
 */

// var Component = require('./component');
// var inherits = require('../util/inherits');

/**
 * 创建组件类
 *
 * @param {Object} proto 组件类的方法表
 * @param {Function=} SuperComponent 父组件类
 * @return {Function}
 */
function defineComponent(proto, SuperComponent) {
// 如果传入一个不是 san component 的 constructor，直接返回不是组件构造函数
// 这种场景导致的错误 san 不予考虑
  if (typeof proto === 'function')
    return proto

  // #[begin] error
  if (typeof proto !== 'object')
    throw new Error('[SAN FATAL] defineComponent need a plain object.')

  // #[end]

  SuperComponent = SuperComponent || Component
  function ComponentClass(option) {
    SuperComponent.call(this, option)
  }

  ComponentClass.prototype = proto
  inherits(ComponentClass, SuperComponent)

  return ComponentClass
}

// exports = module.exports = defineComponent;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 组件Loader类
 */

// var nextTick = require('../util/next-tick');
// var each = require('../util/each');

/**
 * 组件Loader类
 *
 * @class
 *
 * @param {Function} load load方法
 * @param {Function=} placeholder loading过程中渲染的组件
 * @param {Function=} fallback load失败时渲染的组件
 */
function ComponentLoader(load, placeholder, fallback) {
  this.load = load
  this.placeholder = placeholder
  this.fallback = fallback

  this.listeners = []
}

/**
 * 开始加载组件
 *
 * @param {Function} onload 组件加载完成监听函数
 */
ComponentLoader.prototype.start = function (onload) {
  const me = this

  switch (this.state) {
    case 2:
      nextTick(() => {
        onload(me.Component)
      })
      break

    case 1:
      this.listeners.push(onload)
      break

    default:
      this.listeners.push(onload)
      this.state = 1

      var startLoad = this.load()
      var done = function (RealComponent) {
        me.done(RealComponent)
      }

      if (startLoad && typeof startLoad.then === 'function')
        startLoad.then(done, done)
  }
}

/**
 * 完成组件加载
 *
 * @param {Function=} ComponentClass 组件类
 */
ComponentLoader.prototype.done = function (ComponentClass) {
  this.state = 2
  ComponentClass = ComponentClass || this.fallback
  this.Component = ComponentClass

  each(this.listeners, (listener) => {
    listener(ComponentClass)
  })
}

// exports = module.exports = ComponentLoader;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 解析组件的模板
 */

// var warn = require('../util/warn');
// var parseTemplate = require('../parser/parse-template');
// var ExprType = require('../parser/expr-type');

/**
 * 解析组件的模板
 *
 * @param {Function} ComponentClass 组件类
 * @return {ANode}
 */
function parseComponentTemplate(ComponentClass) {
  const proto = ComponentClass.prototype

  const tplANode = parseTemplate(ComponentClass.template || proto.template, {
    trimWhitespace: proto.trimWhitespace || ComponentClass.trimWhitespace,
    delimiters: proto.delimiters || ComponentClass.delimiters,
  })

  let aNode = tplANode.children[0]
  if (aNode && aNode.textExpr)
    aNode = null

  // #[begin] error
  if (tplANode.children.length !== 1 || !aNode)
    warn('Component template must have a root element.')

  // #[end]

  aNode = aNode || {
    directives: {},
    props: [],
    events: [],
    children: [],
  }

  if (aNode.tagName === 'template')
    delete aNode.tagName

  if (proto.autoFillStyleAndId !== false && ComponentClass.autoFillStyleAndId !== false) {
    const extraPropExists = {}

    let len = aNode.props.length
    while (len--) {
      const prop = aNode.props[len]
      switch (prop.name) {
        case 'class':
        case 'style':
          extraPropExists[prop.name] = true
          prop.expr = {
            type: 5,
            expr: {
              type: 4,
              paths: [
                { type: 1, value: prop.name },
              ],
            },
            filters: [{
              type: 6,
              args: [prop.expr],
              name: {
                type: 4,
                paths: [
                  { type: 1, value: `_x${prop.name}` },
                ],
              },
            }],
          }
          break

        case 'id':
          extraPropExists[prop.name] = true
      }
    }

    if (!extraPropExists.class) {
      aNode.props.push({
        name: 'class',
        expr: {
          type: 5,
          expr: {
            type: 4,
            paths: [
              { type: 1, value: 'class' },
            ],
          },
          filters: [{
            type: 6,
            args: [],
            name: {
              type: 4,
              paths: [
                { type: 1, value: '_class' },
              ],
            },
          }],
        },
      })
    }

    if (!extraPropExists.style) {
      aNode.props.push({
        name: 'style',
        expr: {
          type: 5,
          expr: {
            type: 4,
            paths: [
              { type: 1, value: 'style' },
            ],
          },
          filters: [{
            type: 6,
            args: [],
            name: {
              type: 4,
              paths: [
                { type: 1, value: '_style' },
              ],
            },
          }],
        },
      })
    }

    if (!extraPropExists.id) {
      aNode.props.push({
        name: 'id',
        expr: {
          type: 4,
          paths: [
            { type: 1, value: 'id' },
          ],
        },
      })
    }
  }

  return aNode
}

// exports = module.exports = parseComponentTemplate;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 常用标签表，用于 element 创建优化
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 常用标签表
 *
 * @type {Object}
 */
const hotTags = splitStr2Obj(
  'div,span,img,ul,ol,li,dl,dt,dd,a,b,u,hr,'
+ 'form,input,textarea,button,label,select,option,'
+ 'table,tbody,th,tr,td,thead,main,aside,header,footer,nav',
)

// exports = module.exports = hotTags;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 判断是否结束桩
 */

// #[begin] reverse
/**
 * 判断是否结束桩
 *
 * @param {HTMLElement|HTMLComment} target 要判断的元素
 * @param {string} type 桩类型
 * @return {boolean}
 */
function isEndStump(target, type) {
  return target.nodeType === 8 && target.data === `/s-${type}`
}
// #[end]

// exports = module.exports = isEndStump;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file text 节点类
 */

// var guid = require('../util/guid');
// var isBrowser = require('../browser/is-browser');
// var removeEl = require('../browser/remove-el');
// var insertBefore = require('../browser/insert-before');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var warnSetHTML = require('./warn-set-html');
// var isEndStump = require('./is-end-stump');
// var getNodePath = require('./get-node-path');

/**
 * text 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TextNode(aNode, parent, scope, owner, reverseWalker) {
  this.aNode = aNode
  this.owner = owner
  this.scope = scope
  this.parent = parent

  // #[begin] reverse
  if (reverseWalker) {
    let currentNode = reverseWalker.current
    if (currentNode) {
      switch (currentNode.nodeType) {
        case 8:
          if (currentNode.data === 's-text') {
            this.id = this.id || guid++
            this.sel = currentNode
            currentNode.data = this.id
            reverseWalker.goNext()

                    while (1) { // eslint-disable-line
              currentNode = reverseWalker.current
              /* istanbul ignore if */
              if (!currentNode) {
                throw new Error(`[SAN REVERSE ERROR] Text end flag not found. \nPaths: ${
                                    getNodePath(this).join(' > ')}`)
              }

              if (isEndStump(currentNode, 'text')) {
                this.el = currentNode
                reverseWalker.goNext()
                currentNode.data = this.id
                break
              }

              reverseWalker.goNext()
            }
          }
          break

        case 3:
          reverseWalker.goNext()
          if (!this.aNode.textExpr.original)
            this.el = currentNode

          break
      }
    }
    else {
      this.el = document.createTextNode('')
      insertBefore(this.el, reverseWalker.target, reverseWalker.current)
    }
  }
// #[end]
}

TextNode.prototype.nodeType = 1

/**
 * 将text attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
TextNode.prototype.attach = function (parentEl, beforeEl) {
  this.content = evalExpr(this.aNode.textExpr, this.scope, this.owner)
  if (this.content == null)
    this.content = ''

  if (this.aNode.textExpr.original) {
    this.id = this.id || guid++
    this.sel = document.createComment(this.id)
    insertBefore(this.sel, parentEl, beforeEl)

    this.el = document.createComment(this.id)
    insertBefore(this.el, parentEl, beforeEl)

    const tempFlag = document.createElement('script')
    parentEl.insertBefore(tempFlag, this.el)
    tempFlag.insertAdjacentHTML('beforebegin', this.content)
    parentEl.removeChild(tempFlag)
  }
  else {
    this.el = document.createTextNode(this.content)
    insertBefore(this.el, parentEl, beforeEl)
  }
}

/**
 * 销毁 text 节点
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
TextNode.prototype.dispose = function (noDetach) {
  if (!noDetach) {
    removeEl(this.el)
    removeEl(this.sel)
  }

  this.el = null
  this.sel = null
}

const textUpdateProp = isBrowser
&& (typeof document.createTextNode('').textContent === 'string'
  ? 'textContent'
  : 'data')

/**
 * 更新 text 节点的视图
 *
 * @param {Array} changes 数据变化信息
 */
TextNode.prototype._update = function (changes) {
  if (this.aNode.textExpr.value)
    return

  let len = changes.length
  while (len--) {
    if (changeExprCompare(changes[len].expr, this.aNode.textExpr, this.scope)) {
      let text = evalExpr(this.aNode.textExpr, this.scope, this.owner)
      if (text == null)
        text = ''

      if (text !== this.content) {
        this.content = text

        if (this.aNode.textExpr.original) {
          let startRemoveEl = this.sel.nextSibling
          const parentEl = this.el.parentNode

          while (startRemoveEl !== this.el) {
            const removeTarget = startRemoveEl
            startRemoveEl = startRemoveEl.nextSibling
            removeEl(removeTarget)
          }

          // #[begin] error
          warnSetHTML(parentEl)
          // #[end]

          const tempFlag = document.createElement('script')
          parentEl.insertBefore(tempFlag, this.el)
          tempFlag.insertAdjacentHTML('beforebegin', text)
          parentEl.removeChild(tempFlag)
        }
        else {
          this.el[textUpdateProp] = text
        }
      }

      return
    }
  }
}

// exports = module.exports = TextNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file slot 节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var ExprType = require('../parser/expr-type');
// var evalExpr = require('../runtime/eval-expr');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');

/**
 * slot 节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function SlotNode(aNode, parent, scope, owner, reverseWalker) {
  this.owner = owner
  this.scope = scope
  this.parent = parent
  this.parentComponent = parent.nodeType === 5
    ? parent
    : parent.parentComponent

  this.id = guid++

  this.lifeCycle = LifeCycle.start
  this.children = []

  // calc slot name
  this.nameBind = getANodeProp(aNode, 'name')
  if (this.nameBind) {
    this.isNamed = true
    this.name = evalExpr(this.nameBind.expr, this.scope, this.owner)
  }

  // calc aNode children
  const sourceSlots = owner.sourceSlots
  let matchedSlots
  if (sourceSlots)
    matchedSlots = this.isNamed ? sourceSlots.named[this.name] : sourceSlots.noname

  if (matchedSlots)
    this.isInserted = true

  this.aNode = {
    directives: aNode.directives,
    props: [],
    events: [],
    children: matchedSlots || aNode.children.slice(0),
    vars: aNode.vars,
  }

  this._sbindData = nodeSBindInit(aNode.directives.bind, this.scope, this.owner)

  // calc scoped slot vars
  let initData
  if (this._sbindData)
    initData = extend({}, this._sbindData)

  if (aNode.vars) {
    initData = initData || {}
    each(aNode.vars, (varItem) => {
      initData[varItem.name] = evalExpr(varItem.expr, scope, owner)
    })
  }

  // child owner & child scope
  if (this.isInserted) {
    this.childOwner = owner.owner
    this.childScope = owner.scope
  }

  if (initData) {
    this.isScoped = true
    this.childScope = new Data(initData, this.childScope || this.scope)
  }

  owner.slotChildren.push(this)

  // #[begin] reverse
  if (reverseWalker) {
    const currentNode = reverseWalker.current
    let hasFlagComment

    // start flag
    if (currentNode && currentNode.nodeType === 8 && currentNode.data === 's-slot') {
      this.sel = reverseWalker.current
      hasFlagComment = 1
      reverseWalker.goNext()
    }
    else {
      this.sel = document.createComment(this.id)
      reverseWalker.current
        ? reverseWalker.target.insertBefore(this.sel, reverseWalker.current)
        : reverseWalker.target.appendChild(this.sel)
    }

    const aNodeChildren = this.aNode.children
    for (let i = 0, l = aNodeChildren.length; i < l; i++) {
      this.children.push(createReverseNode(
        aNodeChildren[i],
        this,
        this.childScope || this.scope,
        this.childOwner || this.owner,
        reverseWalker,
      ))
    }

    // end flag
    if (hasFlagComment) {
      this.el = reverseWalker.current
      reverseWalker.goNext()
    }
    else {
      this.el = document.createComment(this.id)
      reverseWalker.current
        ? reverseWalker.target.insertBefore(this.el, reverseWalker.current)
        : reverseWalker.target.appendChild(this.el)
    }

    this.lifeCycle = LifeCycle.attached
  }
// #[end]
}

SlotNode.prototype.nodeType = 6

/**
 * 销毁释放 slot
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
SlotNode.prototype.dispose = function (noDetach, noTransition) {
  this.childOwner = null
  this.childScope = null

  elementDisposeChildren(this.children, noDetach, noTransition)

  if (!noDetach) {
    removeEl(this.el)
    removeEl(this.sel)
  }

  this.sel = null
  this.el = null
  this.owner = null
  this.scope = null
  this.children = null

  this.lifeCycle = LifeCycle.disposed

  if (this._ondisposed)
    this._ondisposed()
}

SlotNode.prototype.attach = nodeOwnOnlyChildrenAttach

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 * @param {boolean=} isFromOuter 变化信息是否来源于父组件之外的组件
 * @return {boolean}
 */
SlotNode.prototype._update = function (changes, isFromOuter) {
  const me = this

  if (this.nameBind && evalExpr(this.nameBind.expr, this.scope, this.owner) !== this.name) {
    this.owner._notifyNeedReload()
    return false
  }

  if (isFromOuter) {
    if (this.isInserted) {
      for (var i = 0; i < this.children.length; i++)
        this.children[i]._update(changes)
    }
  }
  else {
    if (this.isScoped) {
      const varKeys = {}
      each(this.aNode.vars, (varItem) => {
        varKeys[varItem.name] = 1
        me.childScope.set(varItem.name, evalExpr(varItem.expr, me.scope, me.owner))
      })

      const scopedChanges = []

      this._sbindData = nodeSBindUpdate(
        this.aNode.directives.bind,
        this._sbindData,
        this.scope,
        this.owner,
        changes,
        (name, value) => {
          if (varKeys[name])
            return

          me.childScope.set(name, value)
          scopedChanges.push({
            type: 1,
            expr: {
              type: 4,
              paths: [
                { type: 1, value: name },
              ],
            },
            value,
            option: {},
          })
        },
      )

      each(changes, (change) => {
        if (!me.isInserted)
          scopedChanges.push(change)

        each(me.aNode.vars, (varItem) => {
          const name = varItem.name
          const relation = changeExprCompare(change.expr, varItem.expr, me.scope)

          if (relation < 1)
            return

          if (change.type !== 2) {
            scopedChanges.push({
              type: 1,
              expr: {
                type: 4,
                paths: [
                  { type: 1, value: name },
                ],
              },
              value: me.childScope.get(name),
              option: change.option,
            })
          }
          else if (relation === 2) {
            scopedChanges.push({
              expr: {
                type: 4,
                paths: [
                  { type: 1, value: name },
                ],
              },
              type: 2,
              index: change.index,
              deleteCount: change.deleteCount,
              value: change.value,
              insertions: change.insertions,
              option: change.option,
            })
          }
        })
      })

      for (var i = 0; i < this.children.length; i++)
        this.children[i]._update(scopedChanges)
    }
    else if (!this.isInserted) {
      for (var i = 0; i < this.children.length; i++)
        this.children[i]._update(changes)
    }
  }
}

// exports = module.exports = SlotNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file for 指令节点类
 */

// var inherits = require('../util/inherits');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var insertBefore = require('../browser/insert-before');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var nodeOwnCreateStump = require('./node-own-create-stump');

/**
 * 循环项的数据容器类
 *
 * @inner
 * @class
 * @param {Object} forElement for元素对象
 * @param {*} item 当前项的数据
 * @param {number} index 当前项的索引
 */
function ForItemData(forElement, item, index) {
  this.parent = forElement.scope
  this.raw = {}
  this.listeners = []

  this.directive = forElement.aNode.directives['for'] // eslint-disable-line dot-notation
  this.indexName = this.directive.index || '$index'

  this.raw[this.directive.item] = item
  this.raw[this.indexName] = index
}

/**
 * 将数据操作的表达式，转换成为对parent数据操作的表达式
 * 主要是对item和index进行处理
 *
 * @param {Object} expr 表达式
 * @return {Object}
 */
ForItemData.prototype.exprResolve = function (expr) {
  const directive = this.directive

  if (expr.type === 4 && expr.paths[0].value === directive.item) {
    expr = {
      type: 4,
      paths: directive.value.paths.concat(
        {
          type: 2,
          value: this.raw[this.indexName],
        },
        expr.paths.slice(1),
      ),
    }
  }

  const resolvedPaths = []

  for (let i = 0, l = expr.paths.length; i < l; i++) {
    let pathSeg = expr.paths[i]

    if (pathSeg.type === 4) {
      switch (pathSeg.paths[0].value) {
        case directive.item:
          pathSeg = {
            type: 4,
            paths: directive.value.paths.concat(
              {
                type: 2,
                value: this.raw[this.indexName],
              },
              pathSeg.paths.slice(1),
            ),
          }
          break

        case this.indexName:
          pathSeg = {
            type: 2,
            value: this.raw[this.indexName],
          }
          break
      }
    }

    resolvedPaths.push(pathSeg)
  }

  return {
    type: 4,
    paths: resolvedPaths,
  }
}

// 代理数据操作方法
inherits(ForItemData, Data)
each(
  ['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'],
  (method) => {
    ForItemData.prototype[`_${method}`] = Data.prototype[method]

    ForItemData.prototype[method] = function (expr) {
      expr = this.exprResolve(parseExpr(expr))
      this.parent[method].apply(
        this.parent,
        [expr].concat(Array.prototype.slice.call(arguments, 1)),
      )
    }
  },
)

/**
 * for 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function ForNode(aNode, parent, scope, owner, reverseWalker) {
  this.aNode = aNode
  this.owner = owner
  this.scope = scope
  this.parent = parent
  this.parentComponent = parent.nodeType === 5
    ? parent
    : parent.parentComponent

  this.id = guid++
  this.children = []

  this.param = aNode.directives['for'] // eslint-disable-line dot-notation

  this.itemPaths = [
    {
      type: 1,
      value: this.param.item,
    },
  ]

  this.itemExpr = {
    type: 4,
    paths: this.itemPaths,
    raw: this.param.item,
  }

  if (this.param.index) {
    this.indexExpr = {
      type: 4,
      paths: [{
        type: 1,
        value: `${this.param.index}`,
      }],
    }
  }

  // #[begin] reverse
  if (reverseWalker) {
    this.listData = evalExpr(this.param.value, this.scope, this.owner)
    if (Array.isArray(this.listData)) {
      for (var i = 0; i < this.listData.length; i++) {
        this.children.push(createReverseNode(
          this.aNode.forRinsed,
          this,
          new ForItemData(this, this.listData[i], i),
          this.owner,
          reverseWalker,
        ))
      }
    }
    else if (this.listData && typeof this.listData === 'object') {
      for (var i in this.listData) {
        if (this.listData.hasOwnProperty(i) && this.listData[i] != null) {
          this.children.push(createReverseNode(
            this.aNode.forRinsed,
            this,
            new ForItemData(this, this.listData[i], i),
            this.owner,
            reverseWalker,
          ))
        }
      }
    }

    this._create()
    insertBefore(this.el, reverseWalker.target, reverseWalker.current)
  }
// #[end]
}

ForNode.prototype.nodeType = 3
ForNode.prototype._create = nodeOwnCreateStump
ForNode.prototype.dispose = nodeOwnSimpleDispose

/**
 * 将元素attach到页面的行为
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
ForNode.prototype.attach = function (parentEl, beforeEl) {
  this._create()
  insertBefore(this.el, parentEl, beforeEl)
  this.listData = evalExpr(this.param.value, this.scope, this.owner)

  this._createChildren()
}

/**
 * 创建子元素
 */
ForNode.prototype._createChildren = function () {
  const parentEl = this.el.parentNode
  const listData = this.listData

  if (Array.isArray(listData)) {
    for (var i = 0; i < listData.length; i++) {
      var childANode = this.aNode.forRinsed
      var child = childANode.Clazz
        ? new childANode.Clazz(childANode, this, new ForItemData(this, listData[i], i), this.owner)
        : createNode(childANode, this, new ForItemData(this, listData[i], i), this.owner)

      this.children.push(child)
      child.attach(parentEl, this.el)
    }
  }
  else if (listData && typeof listData === 'object') {
    for (var i in listData) {
      if (listData.hasOwnProperty(i) && listData[i] != null) {
        var childANode = this.aNode.forRinsed
        var child = childANode.Clazz
          ? new childANode.Clazz(childANode, this, new ForItemData(this, listData[i], i), this.owner)
          : createNode(childANode, this, new ForItemData(this, listData[i], i), this.owner)
        this.children.push(child)
        child.attach(parentEl, this.el)
      }
    }
  }
}

/* eslint-disable fecs-max-statements */

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
ForNode.prototype._update = function (changes) {
  const listData = evalExpr(this.param.value, this.scope, this.owner)
  const oldIsArr = Array.isArray(this.listData)
  const newIsArr = Array.isArray(listData)

  if (this.children.length) {
    if (!listData || newIsArr && listData.length === 0) {
      this._disposeChildren()
      this.listData = listData
    }
    else if (oldIsArr !== newIsArr || !newIsArr) {
    // 就是这么暴力
    // 不推荐使用for遍历object，用的话自己负责
      this.listData = listData

      let isListChanged
      for (let cIndex = 0; !isListChanged && cIndex < changes.length; cIndex++)
        isListChanged = changeExprCompare(changes[cIndex].expr, this.param.value, this.scope)

      const dataHotspot = this.aNode._d
      if (isListChanged || dataHotspot && changesIsInDataRef(changes, dataHotspot)) {
        const me = this
        this._disposeChildren(null, () => {
          me._createChildren()
        })
      }
    }
    else {
      this._updateArray(changes, listData)
      this.listData = listData
    }
  }
  else {
    this.listData = listData
    this._createChildren()
  }
}

/**
 * 销毁释放子元素
 *
 * @param {Array?} children 要销毁的子元素，默认为自身的children
 * @param {Function} callback 释放完成的回调函数
 */
ForNode.prototype._disposeChildren = function (children, callback) {
  const parentEl = this.el.parentNode
  const parentFirstChild = parentEl.firstChild
  const parentLastChild = parentEl.lastChild

  let len = this.children.length

  const violentClear = !this.aNode.directives.transition
    && !children
    // 是否 parent 的唯一 child
    && len && parentFirstChild === this.children[0].el && parentLastChild === this.el

  if (!children) {
    children = this.children
    this.children = []
  }

  let disposedChildCount = 0
  len = children.length

  // 调用入口处已保证此处必有需要被删除的 child
  for (let i = 0; i < len; i++) {
    const disposeChild = children[i]

    if (violentClear) {
      disposeChild && disposeChild.dispose(violentClear, violentClear)
    }
    else if (disposeChild) {
      disposeChild._ondisposed = childDisposed
      disposeChild.dispose()
    }
    else {
      childDisposed()
    }
  }

  if (violentClear) {
    // #[begin] allua
    /* istanbul ignore next */
    if (ie) {
      parentEl.innerHTML = ''
    }
    else {
    // #[end]
      parentEl.textContent = ''
    // #[begin] allua
    }
    // #[end]

    this.el = document.createComment(this.id)
    parentEl.appendChild(this.el)
    callback && callback()
  }

  function childDisposed() {
    disposedChildCount++
    if (disposedChildCount >= len)
      callback && callback()
  }
}

ForNode.prototype.opti = typeof navigator !== 'undefined'
&& /chrome\/[0-9]+/i.test(navigator.userAgent)
/**
 * 数组类型的视图更新
 *
 * @param {Array} changes 数据变化信息
 * @param {Array} newList 新数组数据
 */
ForNode.prototype._updateArray = function (changes, newList) {
  const oldChildrenLen = this.children.length
  let childrenChanges = new Array(oldChildrenLen)
  const childIsElem = this.children[0].nodeType === 4

  function pushToChildrenChanges(change) {
    for (let i = 0, l = childrenChanges.length; i < l; i++)
      (childrenChanges[i] = childrenChanges[i] || []).push(change)

    childrenNeedUpdate = null
    isOnlyDispose = false
  }

  let disposeChildren = []

  // 控制列表是否整体更新的变量
  let isChildrenRebuild

  //
  var isOnlyDispose = true

  var childrenNeedUpdate = {}

  const newLen = newList.length
  const getItemKey = this.aNode._gfk

  for (let cIndex = 0; cIndex < changes.length; cIndex++) {
    let change = changes[cIndex]
    const relation = changeExprCompare(change.expr, this.param.value, this.scope)

    if (!relation) {
    // 无关时，直接传递给子元素更新，列表本身不需要动
      pushToChildrenChanges(change)
    }
    else {
      if (relation > 2) {
        // 变更表达式是list绑定表达式的子项
        // 只需要对相应的子项进行更新
        const changePaths = change.expr.paths
        const forLen = this.param.value.paths.length
        const changeIndex = +evalExpr(changePaths[forLen], this.scope, this.owner)

        if (isNaN(changeIndex)) {
          pushToChildrenChanges(change)
        }
        else if (!isChildrenRebuild) {
          isOnlyDispose = false
          childrenNeedUpdate && (childrenNeedUpdate[changeIndex] = 1)

          childrenChanges[changeIndex] = childrenChanges[changeIndex] || []
          if (this.param.index)
            childrenChanges[changeIndex].push(change)

          change = change.type === 1
            ? {
                type: change.type,
                expr: {
                  type: 4,
                  paths: this.itemPaths.concat(changePaths.slice(forLen + 1)),
                },
                value: change.value,
                option: change.option,
              }
            : {
                index: change.index,
                deleteCount: change.deleteCount,
                insertions: change.insertions,
                type: change.type,
                expr: {
                  type: 4,
                  paths: this.itemPaths.concat(changePaths.slice(forLen + 1)),
                },
                value: change.value,
                option: change.option,
              }

          childrenChanges[changeIndex].push(change)

          if (change.type === 1) {
            if (this.children[changeIndex]) {
              this.children[changeIndex].scope._set(
                change.expr,
                change.value,
                {
                  silent: 1,
                },
              )
            }
            else {
            // 设置数组项的索引可能超出数组长度，此时需要新增
            // 比如当前数组只有2项，但是set list[4]
              this.children[changeIndex] = 0
            }
          }
          else if (this.children[changeIndex]) {
            this.children[changeIndex].scope._splice(
              change.expr,
              [].concat(change.index, change.deleteCount, change.insertions),
              {
                silent: 1,
              },
            )
          }
        }
      }
      else if (isChildrenRebuild) {
        continue
      }
      else if (relation === 2 && change.type === 2
            && (this.owner.updateMode !== 'optimized' || !this.opti || this.aNode.directives.transition)
      ) {
        childrenNeedUpdate = null

        // 变更表达式是list绑定表达式本身数组的splice操作
        // 此时需要删除部分项，创建部分项
        const changeStart = change.index
        const deleteCount = change.deleteCount
        const insertionsLen = change.insertions.length
        const newCount = insertionsLen - deleteCount

        if (newCount) {
          var indexChange = this.param.index
            ? {
                type: 1,
                option: change.option,
                expr: this.indexExpr,
              }
            : null

          for (var i = changeStart + deleteCount; i < this.children.length; i++) {
            if (indexChange) {
              isOnlyDispose = false;
              (childrenChanges[i] = childrenChanges[i] || []).push(indexChange)
            }

            const child = this.children[i]
            if (child)
              child.scope.raw[child.scope.indexName] = i - deleteCount + insertionsLen
          }
        }

        let deleteLen = deleteCount
        while (deleteLen--) {
          if (deleteLen < insertionsLen) {
            isOnlyDispose = false
            var i = changeStart + deleteLen;
            // update
            (childrenChanges[i] = childrenChanges[i] || []).push({
              type: 1,
              option: change.option,
              expr: this.itemExpr,
              value: change.insertions[deleteLen],
            })
            if (this.children[i])
              this.children[i].scope.raw[this.param.item] = change.insertions[deleteLen]
          }
        }

        if (newCount < 0) {
          disposeChildren = disposeChildren.concat(
            this.children.splice(changeStart + insertionsLen, -newCount),
          )
          childrenChanges.splice(changeStart + insertionsLen, -newCount)
        }
        else if (newCount > 0) {
          isOnlyDispose = false
          const spliceArgs = [changeStart + deleteCount, 0].concat(new Array(newCount))
          this.children.splice.apply(this.children, spliceArgs)
          childrenChanges.splice.apply(childrenChanges, spliceArgs)
        }
      }
      else {
        childrenNeedUpdate = null
        isOnlyDispose = false

        isChildrenRebuild = 1

        // 变更表达式是list绑定表达式本身或母项的重新设值
        // 此时需要更新整个列表

        if (getItemKey && newLen && oldChildrenLen) {
        // 如果设置了trackBy，用lis更新。开始 ====
          const newListKeys = []
          const oldListKeys = []
          const newListKeysMap = {}
          const oldListInNew = []
          const oldListKeyIndex = {}

          for (var i = 0; i < newList.length; i++) {
            var itemKey = getItemKey(newList[i])
            newListKeys.push(itemKey)
            newListKeysMap[itemKey] = i
          }

          for (var i = 0; i < this.listData.length; i++) {
            var itemKey = getItemKey(this.listData[i])

            oldListKeys.push(itemKey)
            oldListKeyIndex[itemKey] = i

            if (newListKeysMap[itemKey] != null) {
              oldListInNew[i] = newListKeysMap[itemKey]
            }
            else {
              oldListInNew[i] = -1
              disposeChildren.push(this.children[i])
            }
          }

          let newIndexStart = 0
          let newIndexEnd = newLen
          let oldIndexStart = 0
          let oldIndexEnd = oldChildrenLen

          // 优化：从头开始比对新旧 list 项是否相同
          while (newIndexStart < newLen
                    && oldIndexStart < oldChildrenLen
                    && newListKeys[newIndexStart] === oldListKeys[oldIndexStart]
          ) {
            if (this.listData[oldIndexStart] !== newList[newIndexStart]) {
              this.children[oldIndexStart].scope.raw[this.param.item] = newList[newIndexStart];
              (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push({
                type: 1,
                option: change.option,
                expr: this.itemExpr,
                value: newList[newIndexStart],
              })
            }

            // 对list更上级数据的直接设置
            if (relation < 2)
              (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push(change)

            newIndexStart++
            oldIndexStart++
          }

          var indexChange = this.param.index
            ? {
                type: 1,
                option: change.option,
                expr: this.indexExpr,
              }
            : null

          // 优化：从尾开始比对新旧 list 项是否相同
          while (newIndexEnd > newIndexStart && oldIndexEnd > oldIndexStart
                    && newListKeys[newIndexEnd - 1] === oldListKeys[oldIndexEnd - 1]
          ) {
            newIndexEnd--
            oldIndexEnd--

            if (this.listData[oldIndexEnd] !== newList[newIndexEnd]) {
            // refresh item
              this.children[oldIndexEnd].scope.raw[this.param.item] = newList[newIndexEnd];
              (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push({
                type: 1,
                option: change.option,
                expr: this.itemExpr,
                value: newList[newIndexEnd],
              })
            }

            // refresh index
            if (newIndexEnd !== oldIndexEnd) {
              this.children[oldIndexEnd].scope.raw[this.children[oldIndexEnd].scope.indexName] = newIndexEnd

              if (indexChange)
                (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(indexChange)
            }

            // 对list更上级数据的直接设置
            if (relation < 2)
              (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(change)
          }

          const oldListLIS = []
          const lisIdx = []
          let lisPos = -1
          const lisSource = oldListInNew.slice(oldIndexStart, oldIndexEnd)
          const len = oldIndexEnd - oldIndexStart
          const preIdx = new Array(len)

          for (var i = 0; i < len; i++) {
            const oldItemInNew = lisSource[i]
            if (oldItemInNew === -1)
              continue

            let rePos = -1
            let rePosEnd = oldListLIS.length

            if (rePosEnd > 0 && oldListLIS[rePosEnd - 1] <= oldItemInNew) {
              rePos = rePosEnd - 1
            }
            else {
              while (rePosEnd - rePos > 1) {
                const mid = Math.floor((rePos + rePosEnd) / 2)
                if (oldListLIS[mid] > oldItemInNew)
                  rePosEnd = mid

                else
                  rePos = mid
              }
            }

            if (rePos !== -1)
              preIdx[i] = lisIdx[rePos]

            if (rePos === lisPos) {
              lisPos++
              oldListLIS[lisPos] = oldItemInNew
              lisIdx[lisPos] = i
            }
            else if (oldItemInNew < oldListLIS[rePos + 1]) {
              oldListLIS[rePos + 1] = oldItemInNew
              lisIdx[rePos + 1] = i
            }
          }

          for (var i = lisIdx[lisPos]; lisPos >= 0; i = preIdx[i], lisPos--)
            oldListLIS[lisPos] = i

          let oldListLISPos = oldListLIS.length
          let staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1

          const newChildren = []
          const newChildrenChanges = []

          let beforeEl = this.el
          const parentEl = childIsElem && beforeEl.parentNode
          for (var i = newLen - 1; i >= 0; i--) {
            if (i >= newIndexEnd) {
              newChildren[i] = this.children[oldChildrenLen - newLen + i]
              newChildrenChanges[i] = childrenChanges[oldChildrenLen - newLen + i]
              if (childIsElem)
                beforeEl = newChildren[i].el
            }
            else if (i < newIndexStart) {
              newChildren[i] = this.children[i]
              newChildrenChanges[i] = childrenChanges[i]
            }
            else {
              const oldListIndex = oldListKeyIndex[newListKeys[i]]
              const oldListNode = this.children[oldListIndex]

              if (oldListNode && (childIsElem || i === staticPos)) {
                const oldScope = oldListNode.scope

                // 如果数据本身引用发生变化，设置变更
                if (this.listData[oldListIndex] !== newList[i]) {
                  oldScope.raw[this.param.item] = newList[i];
                  (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push({
                    type: 1,
                    option: change.option,
                    expr: this.itemExpr,
                    value: newList[i],
                  })
                }

                // refresh index
                if (indexChange && i !== oldListIndex) {
                  oldScope.raw[oldScope.indexName] = i

                  if (indexChange)
                    (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(indexChange)
                }

                // 对list更上级数据的直接设置
                if (relation < 2)
                  (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(change)

                newChildren[i] = oldListNode
                newChildrenChanges[i] = childrenChanges[oldListIndex]

                if (i === staticPos)
                  staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1

                else
                  parentEl.insertBefore(oldListNode.el, beforeEl)

                if (childIsElem)
                  beforeEl = oldListNode.el
              }
              else {
                oldListNode && disposeChildren.push(oldListNode)
                newChildren[i] = 0
                newChildrenChanges[i] = 0
              }
            }
          }

          this.children = newChildren
          childrenChanges = newChildrenChanges
        // 如果设置了trackBy，用lis更新。结束 ====
        }
        else {
        // 老的比新的多的部分，标记需要dispose
          if (oldChildrenLen > newLen) {
            disposeChildren = disposeChildren.concat(this.children.slice(newLen))
            childrenChanges = childrenChanges.slice(0, newLen)
            this.children = this.children.slice(0, newLen)
          }

          // 剩下的部分整项变更
          for (var i = 0; i < newLen; i++) {
            // 对list更上级数据的直接设置
            if (relation < 2)
              (childrenChanges[i] = childrenChanges[i] || []).push(change)

            if (this.children[i]) {
              if (this.children[i].scope.raw[this.param.item] !== newList[i]) {
                this.children[i].scope.raw[this.param.item] = newList[i];
                (childrenChanges[i] = childrenChanges[i] || []).push({
                  type: 1,
                  option: change.option,
                  expr: this.itemExpr,
                  value: newList[i],
                })
              }
            }
            else {
              this.children[i] = 0
            }
          }
        }
      }
    }
  }

  // 标记 length 是否发生变化
  if (newLen !== oldChildrenLen && this.param.value.paths) {
    const lengthChange = {
      type: 1,
      option: {},
      expr: {
        type: 4,
        paths: this.param.value.paths.concat({
          type: 1,
          value: 'length',
        }),
      },
    }

    if (changesIsInDataRef([lengthChange], this.aNode._d))
      pushToChildrenChanges(lengthChange)
  }

  // 执行视图更新，先删再刷新
  this._doCreateAndUpdate = doCreateAndUpdate

  const me = this
  if (disposeChildren.length === 0) {
    doCreateAndUpdate()
  }
  else {
    this._disposeChildren(disposeChildren, () => {
      if (doCreateAndUpdate === me._doCreateAndUpdate)
        doCreateAndUpdate()
    })
  }

  function doCreateAndUpdate() {
    me._doCreateAndUpdate = null

    if (isOnlyDispose)
      return

    let beforeEl = me.el
    const parentEl = beforeEl.parentNode

    // 对相应的项进行更新
    // 如果不attached则直接创建，如果存在则调用更新函数
    let j = -1
    for (let i = 0; i < newLen; i++) {
      const child = me.children[i]

      if (child) {
        if (childrenChanges[i] && (!childrenNeedUpdate || childrenNeedUpdate[i]))
          child._update(childrenChanges[i])
      }
      else {
        if (j < i) {
          j = i + 1
          beforeEl = null
          while (j < newLen) {
            const nextChild = me.children[j]
            if (nextChild) {
              beforeEl = nextChild.sel || nextChild.el
              break
            }
            j++
          }
        }

        me.children[i] = createNode(me.aNode.forRinsed, me, new ForItemData(me, newList[i], i), me.owner)
        me.children[i].attach(parentEl, beforeEl || me.el)
      }
    }
  }
}

// exports = module.exports = ForNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file if 指令节点类
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');

/**
 * if 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function IfNode(aNode, parent, scope, owner, reverseWalker) {
  this.aNode = aNode
  this.owner = owner
  this.scope = scope
  this.parent = parent
  this.parentComponent = parent.nodeType === 5
    ? parent
    : parent.parentComponent

  this.id = guid++
  this.children = []

  // #[begin] reverse
  if (reverseWalker) {
    if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
      this.elseIndex = -1
      this.children[0] = createReverseNode(
        this.aNode.ifRinsed,
        this,
        this.scope,
        this.owner,
        reverseWalker,
      )
    }
    else {
      const me = this
      each(aNode.elses, (elseANode, index) => {
        const elif = elseANode.directives.elif

        if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
          me.elseIndex = index
          me.children[0] = createReverseNode(
            elseANode,
            me,
            me.scope,
            me.owner,
            reverseWalker,
          )
          return false
        }
      })
    }

    this._create()
    insertBefore(this.el, reverseWalker.target, reverseWalker.current)
  }
// #[end]
}

IfNode.prototype.nodeType = 2

IfNode.prototype._create = nodeOwnCreateStump
IfNode.prototype.dispose = nodeOwnSimpleDispose

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
IfNode.prototype.attach = function (parentEl, beforeEl) {
  const me = this
  let elseIndex
  let child

  if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
    child = createNode(this.aNode.ifRinsed, this, this.scope, this.owner)
    elseIndex = -1
  }
  else {
    each(this.aNode.elses, (elseANode, index) => {
      const elif = elseANode.directives.elif

      if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
        child = createNode(elseANode, me, me.scope, me.owner)
        elseIndex = index
        return false
      }
    })
  }

  if (child) {
    this.children[0] = child
    child.attach(parentEl, beforeEl)
    this.elseIndex = elseIndex
  }

  this._create()
  insertBefore(this.el, parentEl, beforeEl)
}

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
IfNode.prototype._update = function (changes) {
  const me = this
  let childANode = this.aNode.ifRinsed
  let elseIndex

  if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) { // eslint-disable-line dot-notation
    elseIndex = -1
  }
  else {
    each(this.aNode.elses, (elseANode, index) => {
      const elif = elseANode.directives.elif

      if (elif && evalExpr(elif.value, me.scope, me.owner) || !elif) {
        elseIndex = index
        childANode = elseANode
        return false
      }
    })
  }

  const child = this.children[0]
  if (elseIndex === this.elseIndex) {
    child && child._update(changes)
  }
  else {
    this.children = []
    if (child) {
      child._ondisposed = newChild
      child.dispose()
    }
    else {
      newChild()
    }

    this.elseIndex = elseIndex
  }

  function newChild() {
    if (typeof elseIndex !== 'undefined') {
      (me.children[0] = createNode(childANode, me, me.scope, me.owner))
        .attach(me.el.parentNode, me.el)
    }
  }
}

IfNode.prototype._getElAsRootNode = function () {
  const child = this.children[0]
  return child && child.el || this.el
}

// exports = module.exports = IfNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file is 指令节点类
 */

// var guid = require('../util/guid');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var TemplateNode = require('./template-node');

/**
 * is 指令节点类
 *
 * @class
 * @param {Object} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model} scope 所属数据环境
 * @param {Component} owner 所属组件环境
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function IsNode(aNode, parent, scope, owner, reverseWalker) {
  this.aNode = aNode
  this.owner = owner
  this.scope = scope
  this.parent = parent
  this.parentComponent = parent.nodeType === 5
    ? parent
    : parent.parentComponent

  this.id = guid++
  this.children = []
  this.tagName = this.aNode.tagName
  // #[begin] reverse
  if (reverseWalker) {
    this.cmpt = evalExpr(this.aNode.directives.is.value, this.scope) || this.tagName
    this.children[0] = createReverseNode(
      this.aNode.isRinsed,
      this,
      this.scope,
      this.owner,
      reverseWalker,
      this.cmpt,
    )
  }
// #[end]
}

IsNode.prototype.nodeType = 9

IsNode.prototype.dispose = nodeOwnSimpleDispose

/**
 * attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
IsNode.prototype.attach = function (parentEl, beforeEl) {
  this.cmpt = evalExpr(this.aNode.directives.is.value, this.scope) || this.tagName

  const child = createNode(this.aNode.isRinsed, this, this.scope, this.owner, this.cmpt)
  this.children[0] = child
  child.attach(parentEl, beforeEl)
}

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
IsNode.prototype._update = function (changes) {
  const child = this.children[0]
  const cmpt = evalExpr(this.aNode.directives.is.value, this.scope) || this.tagName

  if (cmpt === this.cmpt) {
    child._update(changes)
  }
  else {
    this.cmpt = cmpt

    const newChild = createNode(this.aNode.isRinsed, this, this.scope, this.owner, this.cmpt)
    const el = child.el
    newChild.attach(el.parentNode, el)

    child.dispose()
    this.children[0] = newChild
  }
}

IsNode.prototype._getElAsRootNode = function () {
  return this.children[0].el
}

// exports = module.exports = IsNode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ANode预热
 */

// var ExprType = require('../parser/expr-type');
// var each = require('../util/each');
// var kebab2camel = require('../util/kebab2camel');
// var hotTags = require('../browser/hot-tags');
// var createEl = require('../browser/create-el');
// var getPropHandler = require('./get-prop-handler');
// var getANodeProp = require('./get-a-node-prop');
// var isBrowser = require('../browser/is-browser');
// var TextNode = require('./text-node');
// var SlotNode = require('./slot-node');
// var ForNode = require('./for-node');
// var IfNode = require('./if-node');
// var IsNode = require('./is-node');
// var TemplateNode = require('./template-node');
// var Element = require('./element');

/**
 * ANode预热，分析的数据引用等信息
 *
 * @param {Object} aNode 要预热的ANode
 */
function preheatANode(aNode, componentInstance) {
  const stack = []

  function recordHotspotData(expr, notContentData) {
    const refs = analyseExprDataHotspot(expr)
    const refsLen = refs.length

    if (refsLen) {
      for (let i = 0, len = stack.length; i < len; i++) {
        if (!notContentData || i !== len - 1) {
          let data = stack[i]._d // hotspot: data
          if (!data)
            data = stack[i]._d = {}

          for (let j = 0; j < refsLen; j++)
            data[refs[j]] = 1
        }
      }
    }
  }

  function analyseANodeHotspot(aNode) {
    if (!aNode._ht) {
      stack.push(aNode)

      if (aNode.textExpr) {
        aNode._ht = true
        aNode.Clazz = TextNode
        recordHotspotData(aNode.textExpr)
      }
      else {
        aNode._ht = true
        aNode._i = 0 // hotspot: instance count
        aNode._dp = [] // hotspot: dynamic props
        aNode._xp = [] // hotspot: x props
        aNode._pi = {} // hotspot: props index
        aNode._b = [] // hotspot: binds
        aNode._ce = !aNode.directives.is // cache element
                && aNode.tagName && !aNode.tagName.includes('-')
                && !/^(template|select|input|option|button|video|audio|canvas|img|embed|object|iframe)$/i.test(aNode.tagName)

        // === analyse hotspot data: start
        each(aNode.vars, (varItem) => {
          recordHotspotData(varItem.expr)
        })

        const props = aNode.props
        const propsLen = props.length

        for (var i = 0; i < propsLen; i++) {
          var prop = props[i]
          aNode._b.push({
            name: prop.name,
            expr: prop.noValue != null
              ? { type: 3, value: true }
              : prop.expr,
            x: prop.x,
            noValue: prop.noValue,
          })
          recordHotspotData(prop.expr)
        }

        for (const key in aNode.directives) {
        /* istanbul ignore else  */
          if (aNode.directives.hasOwnProperty(key)) {
            const directive = aNode.directives[key]
            recordHotspotData(
              directive.value,
              !/^(html|bind)$/.test(key),
            )

            // init trackBy getKey function
            if (key === 'for') {
              const trackBy = directive.trackBy
              if (trackBy
                            && trackBy.type === 4
                            && trackBy.paths[0].value === directive.item
              ) {
                aNode._gfk = new Function( // hotspot: getForKey
                  directive.item,
                `return ${directive.trackByRaw}`,
                )
              }
            }
          }
        }

        each(aNode.elses, (child) => {
          analyseANodeHotspot(child)
        })

        for (var i = 0, l = aNode.children.length; i < l; i++)
          analyseANodeHotspot(aNode.children[i])

        // === analyse hotspot data: end

        // === analyse hotspot props: start
        for (var i = 0; i < propsLen; i++) {
          var prop = props[i]
          aNode._pi[prop.name] = i
          prop.handler = getPropHandler(aNode.tagName, prop.name)

          if (prop.expr.value == null) {
            if (prop.x)
              aNode._xp.push(prop)

            aNode._dp.push(prop)
          }
        }

        // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
        // 所以没有设置 value 时，默认把 option 的内容作为 value
        if (aNode.tagName === 'option'
                && !getANodeProp(aNode, 'value')
                && aNode.children[0]
        ) {
          const valueProp = {
            name: 'value',
            expr: aNode.children[0].textExpr,
            handler: getPropHandler(aNode.tagName, 'value'),
          }
          aNode.props.push(valueProp)
          aNode._dp.push(valueProp)
          aNode._pi.value = props.length - 1
        }

        if (aNode.directives['if']) { // eslint-disable-line dot-notation
          aNode.ifRinsed = {
            children: aNode.children,
            props,
            events: aNode.events,
            tagName: aNode.tagName,
            vars: aNode.vars,
            directives: aNode.directives,
            _ht: true,
            _i: 0,
            _d: aNode._d,
            _dp: aNode._dp,
            _xp: aNode._xp,
            _pi: aNode._pi,
            _b: aNode._b,
            _ce: aNode._ce,
          }
          aNode.hasRootNode = true
          aNode.Clazz = IfNode
          aNode = aNode.ifRinsed
        }

        if (aNode.directives['for']) { // eslint-disable-line dot-notation
          aNode.forRinsed = {
            children: aNode.children,
            props,
            events: aNode.events,
            tagName: aNode.tagName,
            vars: aNode.vars,
            directives: aNode.directives,
            _ht: true,
            _i: 0,
            _d: aNode._d,
            _dp: aNode._dp,
            _xp: aNode._xp,
            _pi: aNode._pi,
            _b: aNode._b,
            _ce: aNode._ce,
          }
          aNode.hasRootNode = true
          aNode.Clazz = ForNode
          aNode = aNode.forRinsed
        }

        if (aNode.directives.is) {
          aNode.isRinsed = {
            children: aNode.children,
            props,
            events: aNode.events,
            tagName: aNode.tagName,
            vars: aNode.vars,
            directives: aNode.directives,
            _ht: true,
            _i: 0,
            _d: aNode._d,
            _dp: aNode._dp,
            _xp: aNode._xp,
            _pi: aNode._pi,
            _b: aNode._b,
            _ce: aNode._ce,
          }
          aNode.hasRootNode = true
          aNode.Clazz = IsNode
          aNode = aNode.isRinsed
        }

        switch (aNode.tagName) {
          case 'slot':
            aNode.Clazz = SlotNode
            break

          case 'template':
          case 'fragment':
            aNode.hasRootNode = true
            aNode.Clazz = TemplateNode
            break

          default:
            if (!aNode.directives.is && hotTags[aNode.tagName]) {
              if (!componentInstance || !componentInstance.components[aNode.tagName])
                aNode.elem = true

              // #[begin] error
              if (componentInstance && componentInstance.components[aNode.tagName])
                warn(`\`${aNode.tagName}\` as sub-component tag is a bad practice.`)

            // #[end]
            }
        }
        // === analyse hotspot props: end
      }

      stack.pop()
    }
  }

  if (aNode)
    analyseANodeHotspot(aNode)
}

/**
 * 分析表达式的数据引用
 *
 * @param {Object} expr 要分析的表达式
 * @return {Array}
 */
function analyseExprDataHotspot(expr, accessorMeanDynamic) {
  let refs = []
  let isDynamic

  function analyseExprs(exprs, accessorMeanDynamic) {
    for (let i = 0, l = exprs.length; i < l; i++) {
      refs = refs.concat(analyseExprDataHotspot(exprs[i], accessorMeanDynamic))
      isDynamic = isDynamic || exprs[i].dynamic
    }
  }

  switch (expr.type) {
    case 4:
      isDynamic = accessorMeanDynamic

      var paths = expr.paths
      refs.push(paths[0].value)

      if (paths.length > 1)
        refs.push(`${paths[0].value}.${paths[1].value || '*'}`)

      analyseExprs(paths.slice(1), 1)
      break

    case 9:
      refs = analyseExprDataHotspot(expr.expr, accessorMeanDynamic)
      isDynamic = expr.expr.dynamic
      break

    case 7:
    case 8:
    case 10:
      analyseExprs(expr.segs, accessorMeanDynamic)
      break

    case 5:
      refs = analyseExprDataHotspot(expr.expr)
      isDynamic = expr.expr.dynamic

      each(expr.filters, (filter) => {
        analyseExprs(filter.name.paths)
        analyseExprs(filter.args)
      })

      break

    case 6:
      analyseExprs(expr.name.paths)
      analyseExprs(expr.args)
      break

    case 12:
    case 11:
      for (let i = 0; i < expr.items.length; i++) {
        refs = refs.concat(analyseExprDataHotspot(expr.items[i].expr))
        isDynamic = isDynamic || expr.items[i].expr.dynamic
      }
      break
  }

  isDynamic && (expr.dynamic = true)
  return refs
}

// exports = module.exports = preheatANode;

/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 创建组件Loader
 */

// var ComponentLoader = require('./component-loader');

/**
 * 创建组件Loader
 *
 * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
 * @param {Function} options.load load方法
 * @param {Function=} options.placeholder loading过程中渲染的占位组件
 * @param {Function=} options.fallback load失败时渲染的组件
 * @return {ComponentLoader}
 */
function createComponentLoader(options) {
  const placeholder = options.placeholder
  const fallback = options.fallback
  const load = typeof options === 'function' ? options : options.load

  return new ComponentLoader(load, placeholder, fallback)
}

// exports = module.exports = createComponentLoader;

//     var nextTick = require('./util/next-tick');
//     var inherits = require('./util/inherits');
//     var parseTemplate = require('./parser/parse-template');
//     var parseExpr = require('./parser/parse-expr');
//     var ExprType = require('./parser/expr-type');
//     var unpackANode = require('./parser/unpack-anode');
//     var LifeCycle = require('./view/life-cycle');
//     var NodeType = require('./view/node-type');
//     var Component = require('./view/component');
//     var parseComponentTemplate = require('./view/parse-component-template');
//     var defineComponent = require('./view/define-component');
//     var createComponentLoader = require('./view/create-component-loader');
//     var emitDevtool = require('./util/emit-devtool');
//     var Data = require('./runtime/data');
//     var evalExpr = require('./runtime/eval-expr');
//     var DataTypes = require('./util/data-types');

const san = {
/**
     * san版本号
     *
     * @type {string}
     */
  version: '3.11.1',

  // #[begin] devtool
  /**
     * 是否开启调试。开启调试时 devtool 会工作
     *
     * @type {boolean}
     */
  debug: true,
  // #[end]

  /**
     * 组件基类
     *
     * @type {Function}
     */
  Component,

  /**
     * 创建组件类
     *
     * @param {Object} proto 组件类的方法表
     * @return {Function}
     */
  defineComponent,

  /**
     * 创建组件Loader
     *
     * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
     * @param {Function} options.load load方法
     * @param {Function=} options.placeholder loading过程中渲染的占位组件
     * @param {Function=} options.fallback load失败时渲染的组件
     * @return {ComponentLoader}
     */
  createComponentLoader,

  /**
     * 解析组件 template
     *
     * @param {Function} ComponentClass 组件类
     * @return {ANode}
     */
  parseComponentTemplate,

  /**
     * 解压缩 ANode
     *
     * @param {Array} source ANode 压缩数据
     * @return {Object}
     */
  unpackANode,

  /**
     * 解析 template
     *
     * @inner
     * @param {string} source template 源码
     * @return {ANode}
     */
  parseTemplate,

  /**
     * 解析表达式
     *
     * @param {string} source 源码
     * @return {Object}
     */
  parseExpr,

  /**
     * 表达式类型枚举
     *
     * @const
     * @type {Object}
     */
  ExprType,

  /**
     * 生命周期
     */
  LifeCycle,

  /**
     * 节点类型
     *
     * @const
     * @type {Object}
     */
  NodeType,

  /**
     * 在下一个更新周期运行函数
     *
     * @param {Function} fn 要运行的函数
     */
  nextTick,

  /**
     * 数据类
     *
     * @class
     * @param {Object?} data 初始数据
     * @param {Data?} parent 父级数据对象
     */
  Data,

  /**
     * 计算表达式的值
     *
     * @param {Object} expr 表达式对象
     * @param {Data} data 数据对象
     * @param {Component=} owner 组件对象，用于表达式中filter的执行
     * @return {*}
     */
  evalExpr,

  /**
     * 构建类之间的继承关系
     *
     * @param {Function} subClass 子类函数
     * @param {Function} superClass 父类函数
     */
  inherits,

  /**
     * DataTypes
     *
     * @type {Object}
     */
  DataTypes,
}

// support esm
export default san
