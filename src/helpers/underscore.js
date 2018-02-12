// 当前时间戳
const now = Date.now || function() {
  return new Date().getTime();
};
const restArgs = (func, startIndex) => {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return () => {
    let [length,rest,index,args] =[Math.max(arguments.length - startIndex, 0),Array(length),0,Array(startIndex + 1)]
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};
const delay = restArgs((func, wait, args) => {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
});
/*
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
export function debounce(func, wait, immediate) {
  let timeout, result;
  const later = (context, args) => {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  const debounced = restArgs((args) => {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

/* options的默认值
*  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
*  options.leading = true;
* 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
*  options.trailing = true;
* 注意：当options.trailing = false时，效果与上面的简单实现效果相同
*/
export function throttle(func, wait, options ={}) {
  let timeout, context, args, result,previous = 0;
  const later  = () => {
    previous = options.leading === false ? 0 : now();
    // setTimeout 的 handler
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = () => {
    let now = now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}
