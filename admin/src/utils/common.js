//判断是否是pc打开
export function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * 微信内打开
 */
export function  isWeixn () {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}


//去空格
export function trims(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//数组去重
export function uniquer(arr) {
  var result = [];
  for(var i = 0; i < arr.length; i++) {
    if(result.indexOf(arr[i]) == -1) {
      result.push(arr[i]);
    }
  }
  return result;
}

//数组去空值
export function delnull(arr) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == "" || typeof(arr[i]) == "undefined") {
      arr.splice(i, 1);
      i = i - 1;
    }
  }
  return arr;
}

//时间格式更改2018-11-7 12:12:46 new Date().timeFormat('yyyy-MM-dd hh:mm:ss') || new Date().timeFormat('yyyy-MM-dd')
export function timeFormat(date,fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth()+1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  }
  for(let k in o){    
      let str = o[k]+'';
      if(new RegExp(`(${k})`).test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:padLeftZero(str));
      }
  }
  return fmt;
}

export function padLeftZero(str){
  return ('00'+str).substr(str.length);
}
