
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

const contextPath = (function () {
  let pathName = window.location.pathname
  let pathAry = pathName.split('/')
  if (pathAry.length > 2) {
    return pathAry[1]
  } else {
    return ''
  }
})()
