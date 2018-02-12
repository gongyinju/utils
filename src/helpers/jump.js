import utils from './helpers/utils'

export function jump (url,data){
  if(url == undefined){
    throw Error("未定义的跳转地址，请传入正确的跳转地址");
  }else{
    if(data && 	utils.isPlainObject(data)){
      var fd = document.createElement('form');
      fd.method = 'POST';
      for(let key in data){
        let el = document.createElement("input");
        el.setAttribute("name",key);
        el.setAttribute("type","hidden");
        fd.setAttribute("type","hidden");
        fd.appendChild(el);
        el.value = data[key];
      }
      document.body.appendChild(fd);
      fd.action = url;
      fd.submit();
    }else{
      window.location.href=url;
    }
  }
};
