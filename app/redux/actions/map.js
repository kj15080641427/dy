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
