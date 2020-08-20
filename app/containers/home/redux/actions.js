import { getSiteWaterType, setPagination, addSiteWaterType,DELETE_SITE_WATER } from "./types";
import {} from "./types";
import { SHOW_MODAL, HIDE_MODAL } from "../../../redux/constants/home";
export const getSiteWaterAction = (data) => {
  //获取站点数据
  return {
    type: getSiteWaterType,
    data,
  };
};
export const setPaginationType = (data) => {
  //分页
  return {
    type: setPagination,
    data,
  };
};
export const addSiteWater = (data) => {
  return {
    type: addSiteWaterType,
    data,
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
  };
};
export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};
/**
 * 删除站点水位
 */
export const deleteSiteWater = (data)=>{
  return {
    type:DELETE_SITE_WATER,
    data
  }
}