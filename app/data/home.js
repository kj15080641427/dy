import {
  fetchJSONData
} from "@app/utils/common";

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