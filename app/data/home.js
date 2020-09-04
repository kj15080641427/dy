import { fetchJSONData } from "@app/utils/common";

// 获取站点水位
export const getSiteWaterData = (data) =>
  fetchJSONData("POST", "/base/SiteWaterLevels/page", data);
// 添加站点水位
export const addSiteWaterData = (data) =>
  fetchJSONData("POST", "/base/SiteWaterLevels/save", data);

// 删除站点水位
export const deleteSiteWaterData = (data) =>
  fetchJSONData("POST", "/base/SiteWaterLevels/delete", data);

// 修改站点水位
export const updateSiteWaterData = (data) =>
  fetchJSONData("POST", "/base/SiteWaterLevels/update", data);

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
// 添加权限
export function savePermission(data) {
  return fetchJSONData("POST", "/base/Permission/save", data);
}
// 根据角色查询权限
export function getPermissionById(data) {
  return fetchJSONData("POST", "/base/Permission/queryByRoleId", data);
}

// 查询角色
export function getRole(data) {
  return fetchJSONData("POST", "/base/Role/page", data);
}
// 添加角色
export function addRole(data) {
  return fetchJSONData("POST", "/base/Role/save", data);
}
// 修改角色
export function updateRole(data) {
  return fetchJSONData("POST", "/base/Role/update", data);
}
// 删除角色
export function delRole(data) {
  return fetchJSONData("POST", "/base/Role/delete", data);
}
// 给角色分配权限
export function setRollPermission(data) {
  return fetchJSONData("POST", "/base/Role/rolePermission", data);
}

// 查询站点视频
export function getSiteVideoData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/page", data);
}
// 新增站点视频
export function addSiteVideoData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/save", data);
}
// 修改站点视频
export function updateSiteVideoData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/update", data);
}
// 站点视频旋转功能
export function rotateSiteVideoData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/rotate", data);
}
// 删除站点视频
export function delSiteVideoData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/delete", data);
}

// 查询站点雨量
export function getSIteRainData(data) {
  return fetchJSONData("POST", "/base/SiteRain/page", data);
}
// 删除站点雨量
export function delSIteRainData(data) {
  return fetchJSONData("POST", "/base/SiteRain/delete", data);
}
// 修改站点雨量
export function updateSIteRainData(data) {
  return fetchJSONData("POST", "/base/SiteRain/update", data);
}
// 添加站点雨量
export function addSIteRainData(data) {
  return fetchJSONData("POST", "/base/SiteRain/save", data);
}

// 添加河流信息
export function addSiteRiver(data) {
  return fetchJSONData("POST", "/base/River/save", data);
}
// 查询河流信息
export function getSiteRiver(data) {
  return fetchJSONData("POST", "/base/River/page", data);
}
// 修改河流信息
export function updSiteRiver(data) {
  return fetchJSONData("POST", "/base/River/update", data);
}
// 删除河流信息
export function delSiteRiver(data) {
  return fetchJSONData("POST", "/base/River/delete", data);
}

// 删除泵站信息
export function delSitePump(data) {
  return fetchJSONData("POST", "/base/Pump/delete", data);
}
// 查询泵站信息
export function getSitePump(data) {
  return fetchJSONData("POST", "/base/Pump/page", data);
}
// 添加泵站信息
export function addSitePump(data) {
  return fetchJSONData("POST", "/base/Pump/save", data);
}
// 修改泵站信息
export function updSitePump(data) {
  return fetchJSONData("POST", "/base/Pump/update", data);
}

// 查询字典
export function getSiteDict(data) {
  return fetchJSONData("POST", "/base/SiteDictionaries/page", data);
}
// 删除字典
export function delSiteDict(data) {
  return fetchJSONData("POST", "/base/SiteDictionaries/delete", data);
}
// 添加字典
export function addSiteDict(data) {
  return fetchJSONData("POST", "/base/SiteDictionaries/save", data);
}
// 修改字典
export function updSiteDict(data) {
  return fetchJSONData("POST", "/base/SiteDictionaries/update", data);
}

// 查询站点积水点
export function getSiteWaterPonit(data) {
  return fetchJSONData("POST", "/base/SiteWaterPoint/page", data);
}
// 添加站点积水点
export function addSiteWaterPonit(data) {
  return fetchJSONData("POST", "/base/SiteWaterPoint/save", data);
}
// 修改站点积水点
export function updSiteWaterPonit(data) {
  return fetchJSONData("POST", "/base/SiteWaterPoint/update", data);
}
// 删除站点积水点
export function delSiteWaterPonit(data) {
  return fetchJSONData("POST", "/base/SiteWaterPoint/delete", data);
}

// 删除水库信息
export function delSiteReservoir(data) {
  return fetchJSONData("POST", "/base/Reservoir/delete", data);
}
// 查询水库信息
export function getSiteReservoir(data) {
  return fetchJSONData("POST", "/base/Reservoir/page", data);
}
// 修改水库信息
export function updSiteReservoir(data) {
  return fetchJSONData("POST", "/base/Reservoir/update", data);
}
// 添加水库信息
export function addSiteReservoir(data) {
  return fetchJSONData("POST", "/base/Reservoir/save", data);
}

// 查询堤防工程
export function getSiteDikeAll(data = {}) {
  return fetchJSONData("POST", "/base/Dike/getAll", data);
}

// 查询闸信息
export function getSiteGate(data) {
  return fetchJSONData("POST", "/base/Gate/page", data);
}
// 删除闸信息
export function delSiteGate(data) {
  return fetchJSONData("POST", "/base/Gate/delete", data);
}
// 添加闸信息
export function addSiteGate(data) {
  return fetchJSONData("POST", "/base/Gate/save", data);
}
// 修改闸信息
export function updSiteGate(data) {
  return fetchJSONData("POST", "/base/Gate/update", data);
}

// 分页查询用户
export function getUser(data) {
  return fetchJSONData("POST", "/base/Users/page", data);
}
// 删除用户
export function delUser(data) {
  return fetchJSONData("POST", "/base/Users/delete", data);
}
// 更新用户
export function updUser(data) {
  return fetchJSONData("POST", "/base/Users/update", data);
}
// 保存用户
export function addUser(data) {
  return fetchJSONData("POST", "/base/Users/save", data);
}

// 查询所有基础站点
export function getSiteAll() {
  return fetchJSONData("POST", "/base/SiteBase/getAll", {});
}
// 分页查询基础站点
export function getSiteBase(data) {
  return fetchJSONData("POST", "/base/SiteBase/page", data);
}
// 新增基础站点
export function addSiteBase(data) {
  return fetchJSONData("POST", "/base/SiteBase/save", data);
}
// 修改基础站点
export function updSiteBase(data) {
  return fetchJSONData("POST", "/base/SiteBase/update", data);
}
// 删除基础站点
export function delSiteBase(data) {
  return fetchJSONData("POST", "/base/SiteBase/delete", data);
}

// 分页查询用户登录日志
export function usersLoginLog(data) {
  return fetchJSONData("POST", "/base/UsersLoginLog/page", data);
}

// 查询所有专家库
export function getFloodControlExpertAll(data = {}) {
  return fetchJSONData("POST", "/base/FloodControlExpert/getAll", data);
}

// 分页查询防汛仓库
export function getMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/page", data);
}
// 获取所有防汛仓库
export function getMaterialWarehouseAll(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/getAll", data);
}
// 增加防汛仓库
export function addMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/save", data);
}
// 删除防汛仓库
export function delMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/delete", data);
}
// 修改防汛仓库
export function updMaterialWarehouse(data) {
  return fetchJSONData("POST", "/base/MaterialWarehouse/update", data);
}

// 获取所有防汛物资
export function getMaterialAll(data) {
  return fetchJSONData("POST", "/base/Material/getAll", data);
}
// 分页查询防汛物资
export function getMaterial(data) {
  return fetchJSONData("POST", "/base/Material/page", data);
}
// 增加防汛物资
export function addMaterial(data) {
  return fetchJSONData("POST", "/base/Material/save", data);
}
// 删除防汛物资
export function delMaterial(data) {
  return fetchJSONData("POST", "/base/Material/delete", data);
}
// 修改防汛物资
export function updMaterial(data) {
  return fetchJSONData("POST", "/base/Material/update", data);
}

//添加站点关系
export function addSiteRelation(data) {
  return fetchJSONData("POST", "/base/SiteRelation/save", data);
}
//查询站点关系
export function getSiteRelation(data) {
  return fetchJSONData("POST", "/base/SiteRelation/page", data);
}
//修改站点关系
export function updSiteRelation(data) {
  return fetchJSONData("POST", "/base/SiteRelation/update", data);
}
//删除站点关系
export function delSiteRelation(data) {
  return fetchJSONData("POST", "/base/SiteRelation/delete", data);
}
// 获取卫星云图
//  export function getSatellite(data) {
//    return fetchJSONData("POST", "/base/satellite/getSatellite", data);
//  }

//  // 获取东营天气
//  export function getSatellite() {
//    return fetchJSONData("GET", "/base/Weather/get");
//  }

//  // 获取东营天气
//  export function getSatellite() {
//    return fetchJSONData("GET", "/base/Weather/get");
//  }
