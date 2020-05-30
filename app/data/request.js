import { fetchData, fetchJSONData, fetchFormData } from "@app/utils/common";
// 获取所有基础数据
export function getAll() {
  return fetchJSONData("POST", "/station/getAll", {});
}
export function getAllVideo() {
  return fetchJSONData("POST", "/radio/getAll", {});
}
// 获取雨晴实时信息
export function getRainRealTime(data) {
  return fetchJSONData("POST", "/raindata/realTime", data);
}
// 获取实时水位信息
export function getWaterRealTime(data) {
  return fetchJSONData("POST", "/riverwaterdata/realTime", data);
}
//获取最新水位预警数据
export function getWaterWarning(data) {
  return fetchJSONData("POST", "/alarm/getWarning", data);
}
//获取历史预警数据
export function getwaterlevelAlarmLog(data) {
  return fetchJSONData("POST", "/waterlevelAlarmLog/getWarningInfo", data);
}
// 获取水闸
export function getGate(data) {
  return fetchJSONData("POST", "/gate/getAll", data);
}
// 获取泵站
export function getPump(data) {
  return fetchJSONData("POST", "/pump/getAll", data);
}
// 获取河流
export function getWfsRiver(data) {
  return fetchJSONData("POST", "/river/getAll", data);
}
// 获取实时天气信息
export function getWeatherdata() {
  return fetchJSONData("GET", "/weather/get", null);
}
// 获取五个区县平均降雨量信息
export function getFiveCitydata(data) {
  return fetchJSONData("POST", "/count/getAreaAvgRaindata", data);
}
// 获取雨晴历史信息
export function getRainHistory(data) {
  return fetchJSONData("POST", "/raindata/history", data);
}
// 获取历史水位信息
export function getWaterHistory(data) {
  return fetchJSONData("POST", "/riverwaterdata/history", data);
}
//获取卫星气象云图信息
export function getSatellite(data) {
  return fetchJSONData("POST", "/satellite/getSatellite", data);
}
//获取全市平均降水量信息
export function getCityAvgRaindata(data) {
  return fetchJSONData("POST", "/count/getCityAvgRaindata", data);
}
//获取基础站点信息
export function getBasicsAll(data) {
  return fetchJSONData("POST", "/station/getAll", data);
}
//获取视频站点信息
export function getRadioAll(data) {
  return fetchJSONData("POST", "/radio/getAll", data);
}
//获取防汛人员信息
export function getfloodUser(data) {
  return fetchJSONData("POST", "/floodUser/getAll", data);
}