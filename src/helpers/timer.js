/**
 *  计时器
 * @param f
 * @param start
 * @param interval
 * @param end
 */
const invoke = (f,start = 0,interval,end) => {
  if(arguments.length <=2)
    setTimeout(f,start);
  else{
    const repeat =function (){
      let h = setInterval(f,interval);
      if(end)
        setTimeout(function(){clearInterval(h);},end);
    };
    setTimeout(repeat,start);
  }
};

  /**
   * 定时开始，只执行一次
   * @param fn    执行函数
   * @param start 开始时间
   */
  export const timeout = (fn,start) =>{
    invoke(fn,start)
  };

  /**
   * 定时开始，循环执行
   * @param fn 执行的函数
   * @param start  开始时间
   * @param interval  执行间隔
   * @param end   结束时间
   */
  export const interval = (fn,start,interval,end) => {
    invoke(fn,start,interval,end);
  };
