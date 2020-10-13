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
export const setVideoInfo = (data) => {
  return {
    type: types.SET_VIDEO_INFO,
    data,
  };
};
//获取视频站点列表
export const setVideoData = (data) => {
  return {
    type: types.GET_VIDEO_DATA,
    data,
  };
};
//视频旋转
export const rotateVideo = (data) => {
  return {
    type: types.ROTATE_VIDEO,
    data,
  };
};
//水位站点视频
export const changeWaterVideo = (data) => {
  return {
    type: types.CHANGE_WATER_VIDEO,
    data,
  };
};
