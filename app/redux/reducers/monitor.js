/* eslint-disable complexity */
/*
 *  reducer
 */
import * as actionTypes from '../constants/monitor';

const defaultState = {
  rain: [], // 雨量基础数据
  water: [], // 水位基础数据
  ponding: [], // 积水基础数据
  video: [], // 视频基础信息
  gate: [], // 水闸信息
  pump: [], // 水泵信息
  warehouse: [],// 防汛物资仓库
  details: {
    rain: {},
    water: {},
    wfsRiver: {},
    ponding: {},
    warehouse: {}, // 防汛物资详情(即仓库物资)
  },
  userinfo: {}
};

export default function main(state = defaultState, action) {
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
      let detailIdKey = action.data.idKey || 'stcd';
      if (value && value[detailIdKey]) {
        let oldV = newState.details[key][value[detailIdKey]];
        if (oldV) {
          newState.details[key][value[detailIdKey]] = { ...oldV, ...value };
        } else {
          newState.details[key][value[detailIdKey]] = value;
        }
      }
      break;
    }
    case actionTypes.SET_MUTI_DETAIL_DATA: {
      let key = action.data.key;
      let arr = action.data.value;
      if (arr && arr.length) {
        arr.forEach((value) => {
          if (value && value.stcd) {
            let oldV = newState.details[key][value.stcd];
            if (oldV) {
              newState.details[key][value.stcd] = { ...oldV, ...value };
            } else {
              newState.details[key][value.stcd] = value;
            }
          }
        });
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
    case actionTypes.ADD_GATES: {
      let data = action.data;
      if (data && data.length) {
        newState.gate = data;
      }
      break;
    }
    case actionTypes.ADD_PUMPS: {
      let data = action.data;
      if (data && data.length) {
        newState.pump = data;
      }
      break;
    }
    case actionTypes.ADD_WAREHOUSE: {
      let data = action.data;
      if (data && data.length) {
        newState.warehouse = data;
      }
      break;
    }
    default:
      return state;
  }

  return newState;
}