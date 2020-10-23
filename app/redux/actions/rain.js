import * as RainActionTypes from "../constants/rain";

//加载实时雨量
export function rainCurrent() {
  return {
    type: RainActionTypes.LOAD_CURRENT_RAIN,
  };
}

//加载1小时雨量
export function rain1Hour() {
  return {
    type: RainActionTypes.LOAD_HOUR_RAIN,
  };
}

//加载3小时雨量
export function rain3Hours() {
  return {
    type: RainActionTypes.LOAD_THREE_HOURS_RAIN,
  };
}

//加载12小时雨量
export function rain12Hours() {
  return {
    type: RainActionTypes.LOAD_TWELVE_HOURS_RAIN,
  };
}

//加载24小时雨量
export function rain24Hours() {
  return {
    type: RainActionTypes.LOAD_TWENTY_FOUR_HOURS_RAIN,
  };
}
//加载24小时雨量
export function getDayRainByCity() {
  return {
    type: RainActionTypes.GET_DAY_RAIN_BY_CITY,
  };
}
//加载雨量站点基础信息
export function getAllRainStation() {
  return {
    type: RainActionTypes.LOAD_RAIN_STATION,
  };
}
