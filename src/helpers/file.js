import Axios from 'axios' // 处理http请求
class File {
  constructor() {
    this.defaultAllowList = new Array("jpg","png","jpeg","txt","xls","doc","docx","xlsx","pdf","JPG","PNG","JPEG","TXT","XLS","DOC","DOCX","XLSX","PDF");
  }
  /**
   * 设定允许列表
   * @param list
   */
   setAllow(list){
      if(list.push){
        this.defaultAllowList = setAllowList;
      }
   }

  /**
   * 检查是否允许
   * @param fileToUpload
   * @param f
   * @returns {{status: string, retMsg: string}}
   */
  checkFile(fileToUpload,f){
    var result = {
      status:"000",
      retMsg:"校验成功"
    };

    if(fileToUpload.type.indexOf("image")>-1 && typeof f == "function"){
      let reader = new FileReader();
      reader.onload = function(event){
        f(event.target.result);
      };
      reader.readAsDataURL(fileToUpload);
    }

    var extName;
    if(fileToUpload.name.lastIndexOf(".")>-1){
      extName = fileToUpload.name.substring(fileToUpload.name.lastIndexOf(".")+1);
    }
    //支持常用的图片及文本格式
    var listExtName = this.defaultAllowList;
    var flag = 0;
    for(let i = 0;i < listExtName.length; i++){
      if(listExtName[i]==extName){
        flag++;
      }
    }
    if(flag == 0){
      result = {
        status:"400",
        retMsg:"不能上传此种格式的文件"
      };
    }else{
      if(fileToUpload.size > 512000){
        result = {
          status:"400",
          retMsg:"文件不能超过500KB"
        };
      }
    }
    return result;
  }

  /**
   * 上传文件
   * @param fileToUpload  上传的文件
   * @param data  带数据的上传
   * @param url 上传地址
   */
  upload(fileToUpload,data = {},url){
    var fd = new FormData();
    fd.append("file",fileToUpload);
    if(typeof data === "object"){
      for(let key in data){
        fd.append(key,data[key]);
      }
    }
    var uploadURL;
    if(url != undefined){
      uploadURL = url;
    }else if(typeof getUploadURL == 'function'){
      uploadURL = getUploadURL();
    }
    if(uploadURL == undefined){
      throw new Error("未定义的上传文件地址, 请通过公共函数getUploadURL来定义上传地址.");
    }else{
      let P = new Promise(function(resolve, reject){
        Axios.post(uploadURL,fd)
          .then((res)=>{
            //目前假的---200
            console.log(res)
            // var retData =  JSON.parse(res.data);
            var retData = res.data;
            if(retData["ESPRESSO_RETURN_VERSION"]) {
              if (retData.status === "001" || retData.status === "002" || retData.status === "003") {
                retData.retCode = '400';
              } else{
                retData = retData.data;
              }
            }
            resolve(retData);
          })
          .catch((error)=>{
            console.log(error);
            reject(error);
          });
      });
      return P;
    }
  }
}

export const file = new File();
