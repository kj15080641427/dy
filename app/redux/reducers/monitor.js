/*
 *  reducer
 */
import * as actionTypes from '../constants/monitor';

const defaultState = {
  rain: [], // 雨量基础数据
  water: [],// 水位基础数据
  video: [], // 视频基础信息
  details: {
    rain: {},
    water: {},
  }
};

export default function main (state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.INIT_BASE_DATA: {
      let data = action.data;
      newState = Object.assign({}, newState, data);
      break;
    }
    case actionTypes.SET_DETAIL_DATA: {
      let key = action.data.key;
      let value = action.data.value;
      if (value && value.stcd) {
        newState.details[key][value.stcd] = value;
      }
      break;
    }
    case actionTypes.ADD_VIDEOS: {
      let data = action.data;
      if (data && data.length) {
        newState.video = data;
      }
      break;
    }
    default:
      return state;
  }
  
  return newState;
}