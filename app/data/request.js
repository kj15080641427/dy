import { fetchJSONData, fetchOutData, fetchGet } from "@app/utils/common";
//  获取所有基础数据
export function getAll(data = {}) {
  return fetchJSONData("POST", "/base/SiteBase/getAll", data);
}
// 用户登录
export function login(data) {
  // return testLogin("api/users/login", data);
  return fetchJSONData("POST", "/base/Users/login", data);
}
// 获取所有视频站点信息
export function getAllVideo(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/getAll", data);
}
// 获取所有视频站点信息
export function getAllVideo2(data) {
  return fetchJSONData("POST", "/base/SiteBase/getAll", data);
}
// 分区获取视频站点
export function getAllAreaVideo(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/getAllArea", data);
}
export function getVideosByCode(data) {
  return fetchJSONData("POST", "/base/SiteBase/code", data);
}
// 根据视频站点唯一编码获取关联的水位站点
export function getWaterStationByVideoCode(data) {
  return fetchJSONData("POST", "/base/SiteBase/radioCode", data);
}
//  获取雨晴实时信息
export function getRainRealTime(data) {
  return fetchJSONData("POST", "/raindata/realTime", data);
}
//  获取实时水位信息
export function getWaterRealTime(data) {
  return fetchJSONData("POST", "/base/Riverwaterdata/realTime", data);
}
// 获取最新水位预警数据
export function getWaterWarning(data) {
  return fetchJSONData("POST", "/base/Alarm/getWarning", data);
}
// 获取最新水位预警数据
export function getAlarmWarning(data) {
  return fetchJSONData("POST", "/base/Alarm/getWarning", data);
}
// 获取历史预警数据
export function getwaterlevelAlarmLog(data) {
  return fetchJSONData("POST", "/base/WaterlevelAlarmLog/getWarningInfo", data);
}
//  获取水闸
export function getGate(data) {
  return fetchJSONData("POST", "/base/Gate/getAll", data);
}
//  获取泵站
export function getPump(data) {
  return fetchJSONData("POST", "/base/Pump/getAll", data);
}
//  获取河流
export function getWfsRiver(data) {
  return fetchJSONData("POST", "/base/River/getAll", data);
}
//  获取河流下面的基础站点
export function getWfsRiverByName(data) {
  return fetchJSONData("POST", "/base/River/getByName", data);
}
//  获取实时天气信息
export function getWeatherdata() {
  return fetchJSONData("POST", "/base/Weather/get", null);
}
//  获取五个区县平均降雨量信息
export function getFiveCitydata(data) {
  return fetchJSONData("POST", "/base/SiteBase/getAreaAvgRaindata", data);
}
//  获取雨晴历史信息
export function getRainHistory(data) {
  return fetchJSONData("POST", "/base/RaindataLog/history", data);
}
//  获取历史水位信息
export function getWaterHistory(data) {
  return fetchJSONData("POST", "/base/RiverwaterdataLog/history", data);
}
// 获取卫星气象云图信息
export function getSatellite(data) {
  return fetchJSONData("POST", "/base/satellite/getSatellite", data);
}
// 获取全市平均降水量信息
export function getCityAvgRaindata(data) {
  return fetchJSONData("POST", "/base/SiteBase/getCityAvgRaindata", data);
}
// 获取基础站点信息
export function getBasicsAll(data) {
  return fetchJSONData("POST", "/base/SiteBase/getAll", data);
}
// 获取所有视频站点信息
export function getRadioAll(data) {
  return fetchJSONData("POST", "/base/SiteBase/getAll", data);
}
//查询防汛队伍下的防汛人员
export function getFloodRanksAll(data) {
  return fetchJSONData("POST", "/base/FloodRanks/getAll", data);
}
// 获取所有防汛人员信息
export function getfloodUser(data) {
  return fetchJSONData("POST", "/base/floodUser/getAll", data);
}
// 获取东营市预警信息
export function GetEarlyWarnning() {
  return fetchOutData("GET", "/Forecast/GetEarlyWarnning?cnty=东营", null);
}
// 获取东营市未来五天天气
export function GetProductsForecast() {
  return fetchOutData("GET", "/Forecast/GetProductsForecast", null);
}
// 分页查询防汛仓库
export function QueryMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/page", data);
}
// 获取所有防汛物资仓库
export function getWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/getAll", data);
}
// 增加防汛物资仓库
export function saveMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/save", data);
}
// 删除防汛物资仓库
export function deleteMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/delete", data);
}
// 修改防汛物资仓库
export function updateMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/update", data);
}
// 获取所有防汛物资
export function getWarehouseMt(data) {
  return fetchJSONData("POST", "/base/Material/getAll", data);
}
// 分页查询防汛物资
export function queryMaterial(data) {
  return fetchJSONData("POST", "/base/Material/page", data);
}
// 增加防汛物资
export function saveMaterial(data) {
  return fetchJSONData("POST", "/base/Material/save", data);
}
// 删除防汛物资
export function deleteMaterial(data) {
  return fetchJSONData("POST", "/base/Material/delete", data);
}
// 修改防汛物资
export function updateMaterial(data) {
  return fetchJSONData("POST", "/base/Material/update", data);
}

// 分页查询防汛人员
export function queryFloodUser(data) {
  return fetchJSONData("POST", "/base/floodUser/page", data);
}
// 增加防汛人员
export function saveFloodUser(data) {
  return fetchJSONData("POST", "/base/floodUser/save", data);
}
// 删除防汛人员
export function deleteFloodUser(data) {
  return fetchJSONData("POST", "/base/floodUser/delete", data);
}
// 修改防汛人员
export function updateFloodUser(data) {
  return fetchJSONData("POST", "/base/floodUser/update", data);
}
// 查询所有专家库
export function getFloodControlExpertAll(data) {
  return fetchJSONData("POST", "/base/FloodControlExpert/getAll", data);
}
// 查询防汛专家分类下的防汛专家
export function floodControlExpertCategoryAll(data) {
  return fetchJSONData("POST", "/base/FloodControlExpertCategory/getAll", data);
}
// 获取小时降雨量
export function getByTimeHour(data) {
  return fetchJSONData("POST", "/base/RaindataHour/getByTime", data);
}
// 获取5分钟降雨量
export function getByTimeMinute(data) {
  return fetchJSONData("POST", "/base/RaindataMinute/getByTime", data);
}
// 获取日降雨量
export function getByTimeDay(data) {
  return fetchJSONData("POST", "/base/RaindataDay/getByTime", data);
}
// =====================================统计==============================================================
// 统计分钟雨量数据
export function countMinutesRain(data) {
  return fetchJSONData("POST", "/base/Raindata/realTime", data);
}

// 统计小时雨量数据
export function countHoursRain(data) {
  // return fetchJSONData("POST", "/base/RaindataHour/getByTime", data);
  return fetchJSONData("POST", "/base/RaindataHour/getByCount", data);
}

// 统计各来源的站点数
export function getCountStation(data) {
  //  return fetchJSONData("POST", "/count/getCountStation", data);
  return fetchJSONData("POST", "/base/SiteBase/getCountStation", data);
}
// 统计各来源的视频站点数
export function getCountRadio(data) {
  return fetchJSONData("POST", "/count/getCountRadio", data);
}
// 视频旋转接口
export function getRotateRadio(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/rotate", data);
}
// ==============================================================系统设置=======================================================================

// 分页查询用户
export function queryUser(data) {
  return fetchJSONData("POST", "/base/Users/page", data);
}
// 删除用户
export function deleteUser(data) {
  return fetchJSONData("POST", "/base/Users/delete", data);
}
// 更新用户
export function updateUser(data) {
  return fetchJSONData("POST", "/base/Users/update", data);
}
// 保存用户
export function saveUser(data) {
  return fetchJSONData("POST", "/base/Users/save", data);
}
// 分页查询权限
export function queryPermission(data) {
  return fetchJSONData("POST", "/base/Permission/page", data);
}
// 删除权限
export function deletePermission(data) {
  return fetchJSONData("POST", "/base/Permission/delete", data);
}
// 更新权限
export function updatePermission(data) {
  return fetchJSONData("POST", "/base/Permission/update", data);
}
// 保存权限
export function savePermission(data) {
  return fetchJSONData("POST", "/base/Permission/save", data);
}
// 分页查询角色
export function queryRole(data) {
  return fetchJSONData("POST", "/base/Role/page", data);
}
// 删除角色
export function deleteRole(data) {
  return fetchJSONData("POST", "/base/Role/delete", data);
}
// 更新角色
export function updateRole(data) {
  return fetchJSONData("POST", "/base/Role/update", data);
}
// 保存角色
export function saveRole(data) {
  return fetchJSONData("POST", "/base/Role/save", data);
}
// 给角色授权
export function rolePermission(data) {
  return fetchJSONData("POST", "/role/rolePermission", data);
}
// 根据角色ID查询权限
export function queryByRoleId(data) {
  return fetchJSONData("POST", "/base/Permission/queryByRoleId", data);
}
// 分页查询用户登录日志
export function usersLoginLog(data) {
  return fetchJSONData("POST", "/base/UsersLoginLog/page", data);
}
// ==============================================================业务基础站点配置接口=======================================================================
// 分页查询视频站点
export function radioQuery(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/page", data);
}
// 导出站点数据
export function radioExportExcel(data) {
  return fetchJSONData("GET", "/radio/exportExcel", data);
}
// 新增视频站点
export function radioSave(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/save", data);
}
// 修改视频站点
export function radioUpdate(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/update", data);
}
// 删除视频站点
export function radioDelete(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/delete", data);
}
// 分页查询基础站点
export function stationQuery(data) {
  return fetchJSONData("POST", "/base/SiteBase/page", data);
}
// 导出站点数据
export function stationExportExcel(data) {
  return fetchJSONData("GET", "/station/exportExcel", data);
}
// 新增基础站点
export function stationSave(data) {
  return fetchJSONData("POST", "/base/SiteBase/save", data);
}
// 修改基础站点
export function stationUpdate(data) {
  return fetchJSONData("POST", "/base/SiteBase/update", data);
}
// 删除基础站点
export function stationDelete(data) {
  return fetchJSONData("POST", "/base/SiteBase/delete", data);
}
// 分页查询基础站点和视频站点关联信息
export function stationRadioQuery(data) {
  return fetchJSONData("POST", "/base/SiteRelation/page", data);
}
// 导出基础站点和视频站点关联信息
export function stationRadioExportExcel(data) {
  return fetchJSONData("GET", "/stationRadio/exportExcel", data);
}
// 新增基础站点和视频站点关联信息
export function stationRadioSave(data) {
  return fetchJSONData("POST", "/stationRadio/save", data);
}
// 修改基础站点和视频站点关联信息
export function stationRadioUpdate(data) {
  return fetchJSONData("POST", "/stationRadio/update", data);
}
// 删除基础站点和视频站点关联信息
export function stationRadioDelete(data) {
  return fetchJSONData("POST", "/base/SiteRelation/delete", data);
}
// 获取基础站点字典
export function getBaseSite(data) {
  return fetchJSONData("POST", "/base/SiteDictionaries/page", data);
}
// ==============================================================业务报表配置接口=======================================================================
//  获取河道信息word
export function downlRiverdata(data) {
  //  return fetchGet("/download/riverdata", data);
  return fetchJSONData("POST", "/base/River/page", data);
}
//  导出河道信息word
export function downlRiver(data) {
  return fetchGet("/download/river", data);
}
//  获取积水点实时情况数据word
export function downlPointdata(data) {
  return fetchGet("/download/pointdata", data);
}
//  获取降水统计信息数据word
export function downlRaindata(data) {
  return fetchGet("/download/raindata", data);
}
//  获取所有统计信息数据word
export function downlWordData(data) {
  return fetchGet("/base/SiteBase/worddata", data);
}
//  导出统计信息数据word
export function downloadExcel(data) {
  return fetchGet("/base/SiteBase/word", data);
}

//==============================================================洪涝模型接口================================================================================
//查询洪涝模型的节点
export function queryModelNodes(data) {
  return fetchJSONData("POST", "/base/ModelNodes/query", data);
}
//查询洪涝模型的预报
export function queryPrediction(data) {
  return fetchJSONData("POST", "/base/ModelPrediction/query", data);
}
//查询预报结果
export function queryPredictionResult(data) {
  return fetchJSONData("POST", "/base/ModelPredictionresult/query", data);
}

//查询模型运行状态
export function queryModelRunningState(data) {
  return fetchJSONData("POST", "/base/ModelSitenoderel/queryPython", data);
}
//运行python
export function startRunModel(data) {
  return fetchJSONData("POST", "/base/ModelSitenoderel/startPython", data);
}

export function getModelWater(data) {
  return fetchJSONData("POST", "/base/ModelNodes/getWater", data);
}
export function getModelFlood(data) {
  return fetchJSONData("POST", "/base/ModelNodes/getPoint", data);
}
export function getModelResult(data) {
  return fetchJSONData("POST", "/base/ModelPredictionresult/query", data);
}
export function getRainPred(data) {
  return fetchJSONData("POST", "/base/RainPrediction/query", data);
}
//查询菜单
export function getUserMenu(data) {
  return fetchJSONData("POST", "/base/Users/getMenu", data);
}
//退出登录
export function loginOut(data) {
  return fetchJSONData("POST", "/base/Users/logout", data);
}

//历史数据查询实时降雨
export function getHisNowRain(data) {
  return fetchJSONData("POST", "/base/pagedata/pageRaindataLog", data);
}

//历史数据查询5分钟降雨
export function getHisFiveRain(data) {
  return fetchJSONData("POST", "/base/pagedata/pageRaindataMinute", data);
}

//历史数据查询1小时降雨
export function getHisHourRain(data) {
  return fetchJSONData("POST", "/base/pagedata/pageRaindataHour", data);
}

//历史数据查询24小时降雨
export function getHisDayRain(data) {
  return fetchJSONData("POST", "/base/pagedata/pageRaindataDay", data);
}

//历史数据查询实时水位
export function getHisNowWater(data) {
  return fetchJSONData("POST", "/base/pagedata/pageWaterLevels", data);
}

//历史数据查询积水点
export function getHisPoint(data) {
  return fetchJSONData("POST", "/base/pagedata/pageSiteWaterPoint", data);
}

//导出实时降雨量
export function exportNowRain() {
  return "/api/v2/base/pagedata/exportPageRaindataLog";
}
//导出5分钟降雨量
export function exportFiveRain() {
  return "/api/v2/base/pagedata/exportPageRaindataMinute";
}
//导出1小时降雨量
export function exportHourRain() {
  return "/api/v2/base/pagedata/exportPageRaindataHour";
}
//导出24小时降雨量
export function exportDayRain() {
  return "/api/v2/base/pagedata/exportPageRaindataDay";
}

//导出实时水位
export function exportWater() {
  return "/api/v2/base/pagedata/exportPageWaterLevels";
}

//导出积水点
export function exportPoint() {
  return "/api/v2/base/pagedata/exportPageSiteWaterPoint";
}

//历史数据查询区域
export function getArea(data) {
  return fetchJSONData("POST", "/base/area/query", data);
}
