import Axios from 'axios'; // 处理http请求
// Axios.defaults.baseURL = '';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.timeout = 2500;

var submitUrl,baseURL='https://www.test.com/api/';
/**
 * ajax方法，通用
 * @param {String} id
 * @param {String} param
 * @param {String} appid
 * @param {String} method
 */
export const ajax = (id,param={},appid=contextPath(),method='post',timeout) => {
    submitUrl = getURL();
    if(!submitUrl)
        return undefined;
    let headers = {};
    try{
        headers.Token = token;
    }catch(e){
        headers = {};
    }
    let url = `${baseURL}${appid}/${id}`;

    if (method == 'post'){
        let P = new Promise(function(resolve, reject){
            console.log(url);
            let con = {};
            timeout ? con = {param,timeout}: con = {param};
            console.log(con)
            Axios.post(url,con)
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
            Axios.get(url,{params:param})
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

    console.log(getSubmitURL())
    if(submitUrl){
        return submitUrl;
    }else if(typeof getSubmitURL === 'function'){
        console.log(getSubmitURL())
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
                    ajaxChain(arr,resultBefore);
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