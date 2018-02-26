import Axios from 'axios'; // 处理http请求
// Axios.defaults.baseURL = '';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//封装请求数据的对象方法
/*class Ajax {
  get(url){
    // 通过Promise完成异步操作，将数据进行初步处理输出为Json对象
    var P = new Promise(function(resolve, reject){
      Axios.get(url)
        .then((res)=>{
              //判断后台返回状态码，作出相应行为
              switch(res.status){
                case 0:
                  Notification({
                    title : '错误提示',
                    message : res.data.message,
                    type : 'error'
                  });
                  break;
                default:
              resolve(res.data);
              break;
          }
        }).catch((error)=>{
        console.log(error)
        reject(error);
      });
    });
    return P
  }
  post(url){
    var P = new Promise(function(resolve, reject){
      Axios.post(url,parma={})
        .then((res)=>{
          console.log(res.data)
          switch(res.status){
            case 0:
              Notification({
                title : '错误提示',
                message : res.data.message,
                type : 'error'
              });
              break;
            default:
              resolve(res.data.data);
              break;
          }
        }).catch((error)=>{
        console.log(error)
        reject(error);
      });
    });
    return P
  }
}*/
var submitUrl;
/**
 * ajax方法，通用
 * @param {String} bean
 * @param {String} param
 * @param {String} appid
 * @param {String} method
 */
export const ajax = (bean,param={},appid,method='post') => {
    submitUrl = getURL();
    if(!submitUrl)
        return undefined;
    let headers = {};
    try{
        headers.Token = token;
    }catch(e){
        headers = {};
    }
    //paramStr = CoreSupport.dataSetIdList + '=' + encodeURIComponent(id) + '&' + CoreSupport.dataSetParams + '=' + encodeURIComponent(JSON.stringify(paramObj)) + '&__appId=' + encodeURIComponent(appid) + '&__code=' + encodeURIComponent("");

    if (method == 'post'){
        let P = new Promise(function(resolve, reject){
            console.log(submitUrl);
            console.log(param)

            Axios.post(submitUrl,param)
                .then((res)=>{
                    console.log(res);
                    var retData =  res;
                    if(retData["ESPRESSO_RETURN_VERSION"]){
                        if(retData.status === "001"||retData.status === "002"||retData.status === "003"){
                            retData.retCode = '400';
                        }else
                            retData = retData.data;
                    }
                    resolve(retData);
                }).catch((error)=>{
                    console.log(error)
                    reject({
                        status:"400",
                        retCode:"400",
                        retMsg:error
                    });
                    throw new Error(error);
                });
        });
        return P;

    }else if (method == 'get'){
        let P = new Promise(function(resolve, reject){
            Axios.get(submitUrl,{params:param})
                .then((res)=>{
                    console.log(res);
                    var retData =  res;
                    if(retData["ESPRESSO_RETURN_VERSION"]){
                        if(retData.status === "001"||retData.status === "002"||retData.status === "003"){
                            retData.retCode = '400';
                        }else
                            retData = retData.data;
                    }
                    resolve(retData);
                }).catch((error)=>{
                console.log(error)
                reject({
                    status:"400",
                    retCode:"400",
                    retMsg:error
                });
                throw new Error(error);
            });
        });
        return P
    }

};
/**
 *  指定提交的地址
 * @param url
 * @returns {*}
 */
export const setURL = url => {
    return submitUrl = url;
};

/**
 * 内部方法，获取提交地址
 * @returns {*}
 */
const getURL = () => {
    if(submitUrl){
        return submitUrl;
    }else if(typeof getSubmitURL === 'function'){
        return getSubmitURL();
    }else {
        throw new Error("Undefined getSubmitURL。未定义的ajax提交地址 请通过公共函数getSubmitURL来定义ajax的提交地址.");
    }
};

/**
 * 循环调用，仅支持异步调用方式,接受一个先后有调用关系的数组
 * @param arr
 * @param resultBefore
 * @returns {*}
 */
export const  ajaxChain = (arr,resultBefore) => {
    try{
        if(arr.length > 0){
            var currentFunc = arr.shift();
            return execute(currentFunc,resultBefore).then(function(resultBefore){
                if(arr.length > 0){
                    recursiveAjax(arr,resultBefore);
                }
            });
        }
    }catch(e){
        throw new Error(e);
    }

    function execute(func,resultBefore){
        return func(resultBefore);
    }
};