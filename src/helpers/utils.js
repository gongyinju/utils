
/**
 *判断是否是纯对象 纯{}下的
 * @param obj
 * @return {boolean}
 */
export const isPlainObject  = obj => {
  if(obj && Object.prototype.toString.call(obj) === "[object Object]"&& obj.constructor === Object
    && !Object.hasOwnProperty.call(obj,"constructor")){
    let key;
    for(key in obj){};
    return key === undefined || Object.hasOwnProperty.call(obj,key);
  }
  return false;
}
/**
 * 判断是否微信浏览器
 * @returns {boolean}
 */
export const isWeixin = () => {
  let ua;
  ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }else{
    return false;
  }
}



/**
 * 判断是否数组
 */
export const isArray =  (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * 是否是类数组的结构
 * @param obj
 * @returns {boolean}
 * */

export const isArrayLike =  obj => {
  return !!(isArray(obj) || obj.length);
};


/**
 *
 * @param str
 * @returns {*|{dist}|XML|{example, overwrite, disable_template_processing}|void|string}
 */
export const trim =  str => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};
if(!Array.prototype.trim){
    Array.prototype.trim = function () {
        return trim(this)
    }
}
/**
 * 迭代器，用来兼容IE8-的数组迭代
 * @returns {boolean}
 * @param array
 * @param fn
 */
export const forEach =  (array,fn) => {
  if(s3.isArrayLike(array)){
    for(let i=0;i<array.length;i++){
      fn(array[i],i)
    }
  }else{
    throw new Error('请传入正确的参数');
  }
};
if(!Array.prototype.forEach){
    Array.prototype.forEach = function (fn) {
        return forEach(this,fn)
    }
}

/**
 *
 * @param array
 * @param fn
 * @returns {Array}
 */

export const filter =  (array,fn) => {
  if(isArrayLike(array)){
    var newAry = [];
    for(let i = 0;i<array.length;i++){
      if(fn(array[i]),i)
        newAry.push(array[i]);
    }
    return newAry;
  }
};
if(!Array.prototype.filter){
    Array.prototype.filter = function (fn) {
        return filter(this,fn)
    }
}
/**
 * 数组函数，对每一个元素执行fn 只要一个返回真，则为真
 * @param array
 * @param fn
 * @returns {boolean}
 */
export const some =  (array,fn) => {
  if(isArrayLike(array)){
    var i;
    for(i=0;i<array.length;i++){
      if(fn(array[i],i))
        return true;
    }
    return false;
  }else{
    throw new Error('请传入正确的参数');
  }
};
if(!Array.prototype.some){
    Array.prototype.some = function (fn) {
        return some(this,fn)
    }
}

/**
 * 数组函数，对每一个元素执行fn 只要一个返回真，则为真
 * @param array
 * @param fn
 * @returns {boolean}
 */
export const every =  (array,fn) => {
  if(isArrayLike(array)){
    for(let i=0;i<array.length;i++){
      if(!fn(array[i],i))
        return false;
    }
    return true;
  }else{
    throw new Error('请传入正确的参数');
  }
};
if(!Array.prototype.every){
    Array.prototype.every = function (fn) {
        return every(this,fn)
    }
}
/**
 * 重定义array.map
 * @param array
 * @param fn
 * @returns {Array}
 */
export const map = function(array,fn){
  if(isArrayLike(array)){
    var newAry = [];
    for(let i =0;i<array.length;i++){
      newAry.push(fn(array[i],i));
    }
    return newAry;
  }else{
    throw new Error('请传入正确参数');
  }
};
if(!Array.prototype.map){
    Array.prototype.map = function (fn) {
        return map(this,fn)
    }
}


