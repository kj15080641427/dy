const host = "http://2287ym5502.51mypc.cn";
// element判断是否含有className
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
    },
    // 注意 post 时候参数的形式
    body: data ? appendParam(data) : null
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
    },
    // 注意 post 时候参数的形式
    body: data ? JSON.stringify(data) : null
  }).then((res) => {
      return res.ok ? res.json() : Promise.reject("接口出错");
  });
}
/*
*   请求formdate数据
*/
export function fetchFormData(url, data) {
  url = ("/api" + url);
  return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
          // 'Accept': 'application/json, text/plain, */*',
          // 'Content-Type': 'application/json'
      },
      // 注意 post 时候参数的形式
      body: data
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject("接口出错");
  });
}
/*
*   拼接参数
*/
function appendParam(data) {
	if (data) {
		var str = "";
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				str += key + "=" + data[key] + "&";
			}
		}
		return str;
	}
}