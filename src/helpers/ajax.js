import Axios from 'axios'; // 处理http请求
/*Axios.defaults.baseURL = '';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';*/
//封装请求数据的对象方法
class Ajax {
  get(url){
    // 通过Promise完成异步操作，将数据进行初步处理输出为Json对象
    var P = new Promise(function(resolve, reject){
      Axios.get(url)
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
      Axios.post(url,parma={})
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

