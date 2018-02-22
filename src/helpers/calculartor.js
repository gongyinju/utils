/**
 * 保证精确性的数值乘法
 * @param n1
 * @param n2
 * @returns {Number}
 */
const multiply = (n1, n2) => {
  let [m,s1,s2,t] = [0,Number(n1).toString(),Number(n2).toString(),];
  t= s1.split(".");
  //判断小数点
  if (t[1]) {
    m += t[1].length;
  }
  t = s2.split(".");
  if (t[1]) {
    m += t[1].length;
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
/**
 * 确保精度的数值加法
 * @param n1
 * @param n2
 * @returns {Number}
 */
const add = (n1, n2) => {
  let [m1,m2,t,m] = [0,0,Number(n1).toString().split(".")];
  if (t[1]) {
    m1 = t[1].length;
  }
  t =  Number(n2).toString().split(".");
  if (t[1]) {
    m2 = t[1].length;
  }
  m = Math.pow(10, Math.max(m1, m2));
  return Math.round(Number(n1) * m + Number(n2) * m) / m;
};
/**
 * 确保精度的数值减法
 * @param n1
 * @param n2
 * @returns {Number}
 */
const sub = (n1, n2) => {
  let [m1,m2,t,m] = [0,0,Number(n1).toString().split(".")];
  if (t[1]) {
    m1 = t[1].length;
  }
  t =  Number(n2).toString().split(".");
  if (t[1]) {
    m2 = t[1].length;
  }
  m = Math.pow(10, Math.max(m1, m2));
  return Number((Math.round(Number(n1) * m - Number(n2) * m) / m).toFixed(Math.max(m1, m2)));
};

/**
 * 相对精确的数值除法
 *
 * @param n1
 * @param n2
 * @param num  保留几位小数
 * @returns {Number}
 */
const divide = (n1, n2,num = 2)  => {
  let [m,m1,m2,s1,s2,t] = [,0,0,Number(n1).toString(),Number(n2).toString(),];
  t = s1.split(".");
  if (t[1]) {
    m1 += t[1].length;
  }
  t = s2.split(".");
  if (t[1]) {
    m2 += t[1].length;
  }
  m = Math.pow(10, m2 - m1);
  return Number((Number(s1.replace(".", "")) / Number(s2.replace(".", "")) * m).toFixed(num));
};
const mod = (n1,n2) => {
  let [m,m1,m2,s1,s2,t] = [,0,0,Number(n1).toString(),Number(n2).toString(),];
  t = s1.split(".");
  if (t[1]) {
    m1 += t[1].length;
  }
  t = s2.split(".");
  if (t[1]) {
    m2 += t[1].length;
  }
  m = Math.pow(10, Math.max(m1, m2));
  return  (Number(n1) * m) % (Number(n2) * m) / m;
};

/**
 * 数字格式化为金额表达式
 * @param value
 * @returns {*}
 */
const addComma = value => {
  value = value.toString();
  let [hasMinus,reg,index] = [false,/(-?\d+)(\d{3})/,value.indexOf('.')];
  //为负数
  if (value.indexOf('-') != -1) {
    value = value.replace(/[-]/g, '');
    hasMinus = true;
  }
  //没有小数点
  if (index == -1){
    while (reg.test(value)){
      value =  value.replace(reg,"$1,$2");
    }
  }else {
    let [intPart,pointPart] = [value.substring(0,index),value.substring(index ,value.length)]
    while (reg.test(intPart)){
      intPart =  intPart.replace(reg,"$1,$2");
    }
    value = `${intPart}${pointPart}`;
  }
  if (hasMinus) {
    return `-${value}`;
  } else {
    return value;
  }
};
/**
 * 价钱单位转换
 * @param n1 传入数值
 * @param n2 保留位数
 * @returns {String}
 */
const numFormat = (n1,n2) => {
  if (isNaN(n1)) {
    return NaN;
  }
  n1 = n1.toString();
  let [hasMinus,num,index,n1Index,pointPart,len] = [false, , ,n1.indexOf('.'),];
  pointPart= n1.slice(n1Index);
  n1Index != -1 ? n1 = n1.slice(0,n1Index):n1;
  n2 == "" || n2 == undefined? n2=2:n2;

  //为负数
  if (n1.indexOf('-') != -1) {
    n1 = n1.replace(/[-]/g, '');
    hasMinus = true;
  }
  num = Number(n1);
  len = num.length - 1;
  if (num>=11000 && num<110000000) {
    num = num /10000;
    if(num.toString().indexOf('.') == -1){
      n1 = `${num}万元`;
    }else{
      index = num.toString().indexOf('.');
      len = index+n2+1;
      n1 = `${num.toString().slice(0,len)}万元`;
    }
  }else if (num >= 110000000) {
    num = num / 100000000;
    if(num.toString().indexOf('.') == -1){
      n1 = `${num}亿元`;
    }else{
      index = num.toString().indexOf('.');
      len = index+n2+1;
      n1 = `${num.toString().slice(0,len)}亿元`;
    }
  }else{
    pointPart = pointPart.slice(0,n2+1);
    n1Index != -1 ? n1 = `${num}${pointPart}元` :n1 =`${num}元`;
  }
  if (hasMinus) {
    return `-${n1}`;
  } else {
    return n1;
  }
};

/**
 * 金额类型转换
 * @param {}
 * @type  转换类型 0单价 | 1小计 | 2总和 | 3其他
 * @returns {number || string}
 */
const moneyFormat = function (num,obj) {
  //默认最少保留两位
  obj.bitLength !== ''  ? Number(obj.bitLength) : obj.bitLength = 2;
  //默认配置单位为元
  obj.unit ? obj.unit :obj.unit = "0";
  num = num * Math.pow(10, obj.bitLength);
  // 判断舍取方式
  switch(true){
    case obj.roundOff == '1' :
      num = Number(Math.floor(num)).toString().split(".")[0];
      break;
    case obj.roundOff == '2' :
      num = Number(Math.round(num)).toString().split(".")[0];
      break;
    case obj.roundOff == '3' :
      num = Number(Math.ceil(num)).toString().split(".")[0];
      break;
  }
  num = Number(num) / Math.pow(10, obj.bitLength);
  //当保留位数为整数时
  if(obj.bitLength == 0){
    return num
  }else{
    //当有保留位数但目前为整数时
    if(num.toString().indexOf('.') == -1){
      let len = Math.pow(10, obj.bitLength).toString().replace('1','');
      return `${num}.${len}`;
    }else{
      var now_len = num.toString().length - num.toString().indexOf('.') -1;
      if(now_len !=  obj.bitLength){
        let len = Math.pow(10, obj.bitLength-now_len).toString().replace('1','');
        num = `${num}${len}`;
      }
      return num
    }
  }

};

/**
 * 移除逗号分隔符
 * @param value
 * @returns {*|string|{example, overwrite, disable_template_processing}|void|XML}
 */
const removeComma = (value) => {
  return value === undefined ? value : value.replace(/,/g, '');
};

//Number.prototype 扩展
Number.prototype.add = function(n){
  n = Number(n);
  if(isNaN(n))
    return NaN;
  return add(this,n);
};
Number.prototype.sub = function(n){
  n = Number(n);
  if(isNaN(n))
    return NaN;
  return sub(this,n);
};
Number.prototype.mul = function(n){
  n = Number(n);
  if(isNaN(n))
    return NaN;
  return multiply(this,n);
};
Number.prototype.divide = function (n,num) {
  n = Number(n);
  if(isNaN(n))
    return NaN;
  return divide(this,n,num);
};
Number.prototype.mod = function(n){
  n = Number(n);
  if(isNaN(n))
    throw new TypeError("parameter n must be Number");
  return mod(this,n);
};
Number.prototype.money = function(){
  return addComma(this);
};
String.prototype.money = function(){
  return addComma(this);
};
String.prototype.removeComma = function(){
  return removeComma(this);
};
Number.prototype.numFormat = function(n){
  return numFormat(this,n);
};
Number.prototype.moneyFormat =  function(obj){
  return moneyFormat(this,obj);
};


