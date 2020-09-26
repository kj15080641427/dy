import * as types from "../constants/handStateType";
export const changeModalVisible = (data) => {
  return {
    type: types.CHANGE_MODAL_VISIBLE,
    data,
  };
};

export const getHourRain = (data) => {
  return {
    type: types.GET_HOUR_RAIN,
    data,
  };
};
export const getDayRain = (data) => {
  return {
    type: types.GET_DAY_RAIN,
    data,
  };
};
export const getSevenDayRain = (data) => {
  return {
    type: types.GET_SEVEN_DAY_RAIN,
    data,
  };
};

export const getDayWater = (data) => {
  return {
    type: types.GET_DAY_WATER,
    data,
  };
};
export const getDsplayWater = (data) => {
  return {
    type: types.GET_DISPLAY_WATER,
    data,
  };
};
