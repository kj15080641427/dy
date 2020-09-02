import {
  getSiteWaterType,
  setPagination,
  addSiteWaterType,
  DELETE_SITE_WATER,
  UPDATA_SITE_WATER,
} from "./types";
import * as types from "./types";
import {} from "./types";
import { SHOW_MODAL, HIDE_MODAL } from "../../../redux/constants/home";
export const getSiteWaterAction = (data) => {
  // 获取站点数据

  return {
    type: getSiteWaterType,
    data,
  };
};
export const setPaginationType = (data) => {
  // 分页

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
// 删除站点水位

export const deleteSiteWater = (data) => {
  return {
    type: DELETE_SITE_WATER,
    data,
  };
};
// 修改站点水位

export const updateSiteWater = (data) => {
  return {
    type: UPDATA_SITE_WATER,
    data,
  };
};
// 删除权限

export const deletePermissionData = (data) => {
  return {
    type: types.DELETE_PERMISSION_DATA,
    data,
  };
};
// 添加权限

export const addPermissionData = (data) => {
  return {
    type: types.ADD_PERMISSION_DATA,
    data,
  };
};
// 修改权限

export const updatePermissionData = (data) => {
  return {
    type: types.UPDATE_PERMISSON_DATA,
    data,
  };
};
// 根据角色id查询权限

export const getPermissionDataById = (data) => {
  return {
    type: types.GET_PERMISSION_DATA_BY_ID,
    data,
  };
};
// 关闭modal

export const hideRPModal = (data) => {
  return {
    type: types.HIDE_R_P_MODAL,
    data,
  };
};
// 授权

export const setRolePermission = (data) => {
  return {
    type: types.SET_ROLE_PERMISSION,
    data,
  };
};
// 设置选中项
export const setSelectList = (data) => {
  return {
    type: types.SET_SELECT_LIST,
    data,
  };
};

// 查询

export const getBase = (data) => {
  return {
    type: types.GET_BASE,
    data,
  };
};
// 添加 /修改

export const addOrUpdateBase = (data) => {
  return {
    type: types.ADD_OR_UPD_BASE,
    data,
  };
};
// 删除

export const delBase = (data) => {
  return {
    type: types.DEL_BASE,
    data,
  };
};
//显示关联站点modal
export const showSiteRelationModal = (data) => {
  return {
    type: types.SITE_RELATION_MODAL,
    data,
  };
};
//添加站点关系
export const addSiteRelation = (data) => {
  return {
    type: types.ADD_SITE_RELATION,
    data,
  };
};
//只读table getall
export const readOnlyTableGetAll = (data) => {
  return {
    type: types.READ_ONLY_TABLE_GETALL,
    data,
  };
};

//选中
export const selectTable = (data) => {
  return {
    type: types.SELECT_TABLE,
    data,
  };
};
