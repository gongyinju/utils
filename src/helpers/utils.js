
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
 * 日期格式化
 * */
Date.prototype.format = fmt => {
    var o = {
        "M+":this.getMonth()+1,// 月份
        "d+":this.getDate(), //日期
        "H+":this.getHours(),  //小时
        "m+":this.getMinutes(), //分
        "s+":this.getSeconds(), //秒,
        "q+":Math.floor((this.getMonth()+3)/3),//季度
        "S+":this.getMilliseconds() //毫秒
    },k;
    if(!fmt) fmt = "yyyy-MM-dd";
    if(/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
    for(k in o)
        if (new RegExp("("+k+")").test(fmt))
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1)?(o[k]):(('00' + o[k]).substr((""+o[k]).length)));
    return fmt;
};





