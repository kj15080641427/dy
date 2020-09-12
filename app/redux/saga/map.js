import { call, put, all, takeEvery } from "redux-saga/effects";
import * as types from "../constants/map";
// import { getAll, getRadioAll } from "../../data/request";
import * as req from "../../data/request";
const code = 200;
const initSelect = {
  current: 1,
  size: 10,
};
/**
 * 加载水位数据 @param {type:2}
 */
function* getWater() {
  try {
    const result = yield call(req.getAll, { type: 2 });
    if (result.code == code) {
      yield put({
        type: types.SET_WATER,
        data: result.data,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
/**
 * 易涝点
 */
function* getFlood() {
  try {
    const result = yield call(req.getAll, { type: 3 });
    if (result.code == code) {
      yield put({
        type: types.SET_FLOOD,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 视频
 */
function* getVideo() {
  try {
    const result = yield call(req.getRadioAll, { isShow: 0 });
    if (result.code == code) {
      yield put({
        type: types.SET_VIDEO,
        data: result.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
/**
 * 获取站点来源
 */
// 获取站点来源
function* getCountStation() {
  try {
    const result = yield call(req.getCountStation, initSelect);
    if (result.code == code) {
      yield put({
        type: types.SET_COUNT_STATION,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
export default function* mapAbout() {
  yield all([
    takeEvery(types.GET_WATER, getWater),
    takeEvery(types.GET_FLOOD, getFlood),
    takeEvery(types.GET_VIDEO, getVideo),
    takeEvery(types.GET_COUNT_STATION, getCountStation),
  ]);
}
