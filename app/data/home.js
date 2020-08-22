import { fetchJSONData } from "@app/utils/common";

//获取站点水位
export const getSiteWaterData = (data) => {
  return fetchJSONData("POST", "/base/SiteWaterLevels/page", data);
};
//添加站点水位
export const addSiteWaterData = (data) => {
  return fetchJSONData("POST", "/base/SiteWaterLevels/save", data);
};
//删除站点水位
export const deleteSiteWaterData = (data) => {
  return fetchJSONData("POST", "/base/SiteWaterLevels/delete", data);
};
//修改站点水位
export const updateSiteWaterData = (data) => {
  return fetchJSONData("POST", "/base/SiteWaterLevels/update", data);
};

//分页查询站点视频
export const getSiteVedioData = (data) => {
  return fetchJSONData("POST", "/base/StiteWaterRadio/page", data);
};

//获取所有站点视频信息
export const getAllSiteVedioData = (data) => {
  return fetchJSONData("POST", "/base/StiteWaterRadio/getAll", data);
};

//分区域查询站点视频信息
export const getAllAreaSiteVedioData = (data) => {
  return fetchJSONData("POST", "/base/StiteWaterRadio/getAllArea", data);
};
//删除站点视频信息
export const deleteSiteVedioData = (data) => {
  return fetchJSONData("POST", "/base/StiteWaterRadio/delete", data);
};

//分页查询权限
export function queryPermission(data) {
  return fetchJSONData("POST", "/base/Permission/page", data);
}
//删除权限
export function deletePermission(data) {
  return fetchJSONData("POST", "/base/Permission/delete", data);
}
//更新权限
export function updatePermission(data) {
  return fetchJSONData("POST", "/base/Permission/update", data);
}
//添加权限
export function savePermission(data) {
  return fetchJSONData("POST", "/base/Permission/save", data);
}
//根据角色查询权限
export function getPermissionById(data) {
  return fetchJSONData("POST", "/base/Permission/queryByRoleId", data);
}

/**
 * 
 * 角色模块
 */
//查询角色
export function getRole(data) {
  return fetchJSONData("POST", "/base/Role/page", data);
}
//添加角色
export function addRole(data) {
  return fetchJSONData("POST", "/base/Role/save", data);
}
//修改角色
export function updateRole(data) {
  return fetchJSONData("POST", "/base/Role/update", data);
}
//删除角色
export function delRole(data) {
  return fetchJSONData("POST", "/base/Role/delete", data);
}
//给角色分配权限
export function setRollPermission(data) {
  return fetchJSONData("POST", "/base/Role/rolePermission", data);
}

//查询站点视频
export function getSiteVeioData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/page", data);
}


//新增站点视频
export function addSiteVeioData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/save", data);
}
//修改站点视频
export function updateSiteVeioData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/update", data);
}

//站点视频旋转功能
export function rotateSiteVeioData(data) {
  return fetchJSONData("POST", "/base/StiteWaterRadio/rotate", data);
}

//查询站点雨量
export function getSIteRainData(data) {
  return fetchJSONData("POST", "/base/SiteRain/page", data);
}


