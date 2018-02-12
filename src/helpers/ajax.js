
import Axios from 'axios' // 处理http请求
// import config from './axios_config' //引入 Axios 请求数据所需要的配置文件

//封装请求数据的对象方法
class Ajax {
  get(url){
    // 通过Promise完成异步操作，将数据进行初步处理输出为Json对象
    var P = new Promise(function(resolve, reject){
      Axios.get(url,Config)
        .then((res)=>{
              //判断后台返回状态码，作出相应行为
              switch(res.data.status){
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
  post(url){
    var P = new Promise(function(resolve, reject){
      Axios.get(url,data,Config)
        .then((res)=>{
          console.log(res.data.data)
          switch(res.data.status){
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
}

// 将封装好的 Ajax函数方法输出，方便调用
export const ajax = new Ajax();

