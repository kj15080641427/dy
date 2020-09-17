import { call, put, all, takeEvery } from "redux-saga/effects";
import * as types from "../constants/map";
// import { getAll, getRadioAll } from "../../data/request";
import * as req from "../../data/request";
import moment from "moment";
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
//根据ID获取水位实时数据
function* getWaterHistory({ data }) {
  const nowDate = moment(new Date()).format("YYYY-MM-DD");
  console.log(nowDate, "nowDate");
  try {
    const result = yield call(req.getWaterHistory, {
      current: 1,
      starttm: `${nowDate} 00:00:00`,
      isOrder: "1",
      size: -1,
      endtm: `${nowDate} 24:00:00`,
      stcd: data,
    });
    if (result.code == code) {
      yield put({
        type: types.SET_WATER_HISTORY,
        data: result,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//获取水位报警日志
function* getWaterWarning({ data }) {
  try {
    const nowDate = moment(new Date()).format("YYYY-MM-DD");
    console.log(moment().subtract(1, "days").calendar(), "DDDDDDD");
    const result = yield call(req.getwaterlevelAlarmLog, {
      alarmtype: 1,
      startTime: `2020-09-15 00:00:00`,
      endTime: `2020-09-15 24:00:00`,
      // stcd: data,
    });
    if ((result.code = code)) {
      yield put({
        type: types.SET_WATER_WARNING,
        data: result.data,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
//获取城市防汛雨量站点
function* getFloodRain() {
  try {
    const result = yield call(req.getAll, {
      type: "1",
      isshow: "1",
      datasource: "3",
    });
    if ((result.code = code)) {
      yield put({
        type: types.SET_FLOOD_RAIN,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//根据id获取易涝点实时数据
function* getFloodInfoRealTime({ data }) {
  // console.log(data, "DDDDa");
  try {
    const nowDate = moment(new Date()).format("YYYY-MM-DD");
    const result = yield call(req.getWaterHistory, {
      current: 1,
      starttm: `${nowDate} 00:00:00`,
      isOrder: "1",
      size: -1,
      endtm: `${nowDate} 24:00:00`,
      stcd: data,
    });
    if ((result.code = code)) {
      yield put({
        type: types.SET_FLOOD_INFO_REALTIME,
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
    takeEvery(types.GET_WATER_HISTORY, getWaterHistory),
    takeEvery(types.GET_WATER_WARNING, getWaterWarning),
    takeEvery(types.GET_FLOOD_RAIN, getFloodRain),
    takeEvery(types.GET_FLOOD_INFO_REALTIME, getFloodInfoRealTime),
  ]);
}
