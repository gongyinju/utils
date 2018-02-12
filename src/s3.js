
import {setItem,getItem,removeItem,setItemLocal,getItemLocal,removeItemLocal} from './helpers/istore'
import {debounce,throttle} from "./helpers/underscore";
import {isWeixin,isPlainObject} from './helpers/utils'
import {timeout,interval} from "./helpers/timer";
import {ABCSort,groupSort} from "./helpers/sort";
import {ajax} from "./helpers/ajax";
import {file} from "./helpers/file";
import './helpers/calculartor'


const version = '2.0.0';

const contextPath = (function () {
  let pathName = window.location.pathname
  let pathAry = pathName.split('/')
  if (pathAry.length > 2) {
    return pathAry[1]
  } else {
    return 's3Core'
  }
})();


export default {
  setItem,getItem,removeItem,setItemLocal,getItemLocal,removeItemLocal,
  isWeixin,isPlainObject,
  debounce,throttle,
  ABCSort,groupSort,
  timeout,interval,
  contextPath,
  version,
  ajax,
  file,
}
