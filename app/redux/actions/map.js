import * as types from "../constants/map";

export const getWaterType = (data) => {
  return {
    type: types.GET_WATER,
    data,
  };
};

export const getFloodType = (data) => {
  return {
    type: types.GET_FLOOD,
    data,
  };
};

export const getVideoType = (data) => {
  return {
    type: types.GET_VIDEO,
    data,
  };
};

export const getCountStation = (data) => {
  return {
    type: types.GET_COUNT_STATION,
    data,
  };
};

export const getWaterHistory = (data) => {
  return {
    type: types.GET_WATER_HISTORY,
    data,
  };
};

export const getWaterWarning = (data) => {
  return {
    type: types.GET_WATER_WARNING,
    data,
  };
};

export const getFloodRain = (data) => {
  return {
    type: types.GET_FLOOD_RAIN,
    data,
  };
};
//根据id获取易涝点实时数据
export const getFloodInfoRealTime = (data) => {
  return {
    type: types.GET_FLOOD_INFO_REALTIME,
    data,
  };
};
//改变易涝点ID
export const changeFloodId = (data) => {
  return {
    type: types.CHANGE_FLOOD_ID,
    data,
  };
};
//改变水位ID
export const changeWaterId = (data) => {
  return {
    type: types.CHANGE_WATER_ID,
    data,
  };
};
//获取防汛仓库
export const getWarehouse = (data) => {
  return {
    type: types.GET_WAREHOUSE,
    data,
  };
};
//防汛人员
export const getFloodUser = (data) => {
  return {
    type: types.GET_FLOOD_USER,
    data,
  };
};
//防汛专家
export const getFloodExpert = (data) => {
  return {
    type: types.GET_FLOOD_EXPERT,
    data,
  };
};
//根据仓库ID获取物资
export const getMaterialById = (data) => {
  return {
    type: types.GET_MATERIAL_BY_ID,
    data,
  };
};
//获取防汛队伍人员
export const getFloodRankUser = (data) => {
  return {
    type: types.GET_FLOOD_RANK_USER,
    data,
  };
};
