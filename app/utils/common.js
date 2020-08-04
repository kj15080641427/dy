// const host = "http://2287ym5502.51mypc.cn";
const host = "http://172.19.112.74:8080/";
//const host = "http://10.1.4.187:8080/";
// element判断是否含有className
//拿到token值
const token = localStorage.getItem("token")


export function hasClassName(obj, name) {
  let tmpName = obj.className;
  let tmpReg = new RegExp(name, 'g');
  if (tmpReg.test(tmpName)) {
    return true;
  } else {
    return false;
  }
}
/*
*   请求外部数据
*/
export function fetchOutData(method, url, data) {
  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'token': token
    },
    // 注意 post 时候参数的形式
    body: data ? JSON.stringify(data) : null
  }).then((res) => {
    console.log(res)
    return res.ok ? res.json() : Promise.reject("接口出错");
  });
}
/*
*   请求数据
*/
export function fetchData(method, url, data) {
  url = ("/api" + url);
  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    },
    // 注意 post 时候参数的形式
    body: data ? appendParam(url, data) : null

  }).then((res) => {

    return res.ok ? res.json() : Promise.reject("接口出错");
  });

}
export function fetchJSONData(method, url, data) {
  url = ("/api" + url);
  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'token': token
    },
    // 注意 post 时候参数的形式
    body: data ? JSON.stringify(data) : null
  }).then((res) => {
    if (url === '/api/users/login') {
      return res.ok ? res : Promise.reject("接口出错");
    } else {
      return res.ok ? res.json() : Promise.reject("接口出错");
    }
  });
}
/*
*   请求数据
*/
export function fetchGet(url, params) {
  url = ("/api" + url);
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  console.log(url, params)
  // fetch 请求
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'token': token
    },
  }).then((res) => {
    // download(res)
    return res.ok ? res.json() : Promise.reject("接口出错");
  });

}
//下载文件
function download(data) {
  if (!data) {
    return
  }
  var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
  var url = window.URL.createObjectURL(blob);
  var aLink = document.createElement("a");
  aLink.style.display = "none";
  aLink.href = url;
  aLink.setAttribute("download", "excel.xls");
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink); //下载完成移除元素
  window.URL.revokeObjectURL(url); //释放掉blob对象
}
/*
*   拼接参数
*/
function appendParam(url, params) {
  if (data) {
    var str = "";
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        str += key + "=" + data[key] + "&";
      }
    }
    return '?' + str;
  }

}
/*
*   拼接基础信息中站点名称和来源
*/
export function SpliceSite(result) {
  let dataArr = []
  for (let i = 0; i < result.data.length; i++) {
    dataArr.push({
      SpliceSiteName: result.data[i].name + "(" + result.data[i].dataSourceDesc + ")",
      warning: result.data[i].warning,
      dataSource: result.data[i].dataSource,
      hourAvg: result.data[i].hourAvg,
      dayAvg: result.data[i].dayAvg,
      tm: result.data[i].tm,
      dataSourceName: result.data[i].dataSourceName,
      z: result.data[i].z,
      ztm: result.data[i].ztm,
      address: result.data[i].address,
      name: result.data[i].name,
      region: result.data[i].region,
      level: result.data[i].level,
      stcd: result.data[i].stcd,
      stationID: result.data[i].stationID,
      baseadjust: result.data[i].baseadjust,
      stationdesc: result.data[i].stationdesc,
      focustype: result.data[i].focustype,
      no: result.data[i].no,
      isshow: result.data[i].isshow,
      isenable: result.data[i].isenable,
      areawatercoll: result.data[i].areawatercoll,
      spellcode: result.data[i].spellcode,
      indname: result.data[i].indname,
      direction: result.data[i].direction,
      memerof: result.data[i].memerof,
      exchangeorg: result.data[i].exchangeorg,
      flowarea: result.data[i].flowarea,
      startreport: result.data[i].startreport,
      indtype: result.data[i].indtype,
      baseele: result.data[i].baseele,
      basename: result.data[i].basename,
      basinname: result.data[i].basinname,
      iscontrolsite: result.data[i].iscontrolsite,
      distancetoport: result.data[i].distancetoport,
      antifloodreportlevel: result.data[i].antifloodreportlevel,
      sttype: result.data[i].sttype,
      riverside: result.data[i].riverside,
      rivername: result.data[i].rivername,
      buildtime: result.data[i].buildtime,
      riverID: result.data[i].riverID,
      gmtmodify: result.data[i].gmtmodify,
      gmtcreate: result.data[i].gmtcreate,
      lat: result.data[i].lat,
      lon: result.data[i].lon,
      minuteAvg: result.data[i].minuteAvg
    })
  }
  return dataArr;
}