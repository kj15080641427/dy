import * as types from "./types";
//查询权限
export const getQueryPermissionActions = () => {
  return {
    type: types.getQueryPermissionType,
  };
};
//查询站点字典
export const getQueryBaseSiteActions = () => {
  return {
    type: types.getQueryBaseSiteType,
  };
};

