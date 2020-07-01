import { fetchData, fetchJSONData, fetchFormData, fetchOutData } from "@app/utils/common";
// 获取所有基础数据
export function getAll() {
  return fetchJSONData("POST", "/station/getAll", {});
}
//用户登录
export function login(data) {
  return fetchJSONData("POST", "/users/login", data);
}
//获取所有视频站点信息
export function getAllVideo(data) {
  return fetchJSONData("POST", "/radio/getAll", data);
}
export function getVideosByCode(data) {
  return fetchJSONData("POST", "/station/code", data);
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
//获取所有视频站点信息
export function getRadioAll(data) {
  return fetchJSONData("POST", "/radio/getAll", data);
}

//获取所有防汛人员信息
export function getfloodUser(data) {
  return fetchJSONData("POST", "/floodUser/getAll", data);
}
//获取东营市预警信息
export function GetEarlyWarnning() {
  return fetchOutData("GET", "/Forecast/GetEarlyWarnning?cnty=东营", null);
}
//获取东营市未来五天天气
export function GetProductsForecast() {
  return fetchOutData("GET", "/Forecast/GetProductsForecast", null);
}
//分页查询防汛仓库
export function QueryMaterialWarehouse(data) {
  return fetchJSONData("POST", "/materialWarehouse/query", data);
}
//获取所有防汛物资仓库
export function getWarehouse(data) {
  return fetchJSONData("POST", "/materialWarehouse/getAll", data);
}
//增加防汛物资仓库
export function saveMaterialWarehouse(data) {
  return fetchJSONData("POST", "/materialWarehouse/save", data);
}
//删除防汛物资仓库
export function deleteMaterialWarehouse(data) {
  return fetchJSONData("POST", "/materialWarehouse/delete", data);
}
//修改防汛物资仓库
export function updateMaterialWarehouse(data) {
  return fetchJSONData("POST", "/materialWarehouse/update", data);
}
//获取所有防汛物资
export function getWarehouseMt(data) {
  return fetchJSONData("POST", "/material/getAll", data);
}
//分页查询防汛物资
export function queryMaterial(data) {
  return fetchJSONData("POST", "/material/query", data);
}
//增加防汛物资
export function saveMaterial(data) {
  return fetchJSONData("POST", "/material/save", data);
}
//删除防汛物资
export function deleteMaterial(data) {
  return fetchJSONData("POST", "/material/delete", data);
}
//修改防汛物资
export function updateMaterial(data) {
  return fetchJSONData("POST", "/material/update", data);
}
//分页查询防汛人员
export function queryFloodUser(data) {
  return fetchJSONData("POST", "/floodUser/query", data);
}
//增加防汛人员
export function saveFloodUser(data) {
  return fetchJSONData("POST", "/floodUser/save", data);
}
//删除防汛人员
export function deleteFloodUser(data) {
  return fetchJSONData("POST", "/floodUser/delete", data);
}
//修改防汛人员
export function updateFloodUser(data) {
  return fetchJSONData("POST", "/floodUser/update", data);
}
//查询所有专家库
export function getFloodControlExpertAll(data) {
  return fetchJSONData("POST", "/floodControlExpert/getAll", data);
}
//获取小时降雨量
export function getByTimeHour(data) {
  return fetchJSONData("POST", "/raindataHour/getByTime", data);
}
//获取日降雨量
export function getByTimeDay(data) {
  return fetchJSONData("POST", "/raindataDay/getByTime", data);
}
//统计各来源的站点数
export function getCountStation(data) {
  return fetchJSONData("POST", "/count/getCountStation", data);
}
//统计各来源的视频站点数
export function getCountRadio(data) {
  return fetchJSONData("POST", "/count/getCountRadio", data);
}

//==============================================================系统设置=======================================================================

//分页查询用户
export function queryUser(data) {
  return fetchJSONData("POST", "/users/query", data);
}
//删除用户
export function deleteUser(data) {
  return fetchJSONData("POST", "/users/delete", data);
}
//更新用户
export function updateUser(data) {
  return fetchJSONData("POST", "/users/update", data);
}
//保存用户
export function saveUser(data) {
  return fetchJSONData("POST", "/users/save", data);
}
//分页查询权限
export function queryPermission(data) {
  return fetchJSONData("POST", "/permission/query", data);
}
//删除权限
export function deletePermission(data) {
  return fetchJSONData("POST", "/permission/delete", data);
}
//更新权限
export function updatePermission(data) {
  return fetchJSONData("POST", "/permission/update", data);
}
//保存权限
export function savePermission(data) {
  return fetchJSONData("POST", "/permission/save", data);
}
//分页查询角色
export function queryRole(data) {
  return fetchJSONData("POST", "/role/query", data);
}
//删除角色
export function deleteRole(data) {
  return fetchJSONData("POST", "/role/delete", data);
}
//更新角色
export function updateRole(data) {
  return fetchJSONData("POST", "/role/update", data);
}
//保存角色
export function saveRole(data) {
  return fetchJSONData("POST", "/role/save", data);
}
//给角色授权
export function rolePermission(data) {
  return fetchJSONData("POST", "/role/rolePermission", data);
}
//根据角色ID查询权限
export function queryByRoleId(data) {
  return fetchJSONData("POST", "/permission/queryByRoleId", data);
}
//分页查询用户登录日志
export function usersLoginLog(data) {
  return fetchJSONData("POST", "/usersLoginLog/query", data);
}