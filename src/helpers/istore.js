
/*export default {
  /!**
   * sessionStorage
   *!/
  setItem :  (key,value) => sessionStorage.setItem(key,JSON.stringify(value)),
  getItem :  key => sessionStorage.getItem(key),
  removeItem : key => sessionStorage.removeItem(key),
  /!**
   * localStorage
   *!/
  setItemLocal :  (key,value) => localStorage.setItem(key,JSON.stringify(value)),
  getItemLocal :  key => localStorage.getItem(key),
  removeItemLocal : key => localStorage.removeItem(key),

};*/
export const setItem = (key,value) => {
  sessionStorage.setItem(key,JSON.stringify(value))
}
export const getItem = key => {
  return window.sessionStorage.getItem(key);
}
export const removeItem = key => {
  sessionStorage.removeItem(key);
}

export const setItemLocal = (key,value) => {
  localStorage.setItem(key,JSON.stringify(value))
}
export const getItemLocal = key => {
  return window.localStorage.getItem(key);
}
export const removeItemLocal = key => {
  localStorage.removeItem(key);
}



