import { call, put, all, takeEvery } from "redux-saga/effects";
import * as types from "../constants/handStateType";
// import { getAll, getRadioAll } from "../../data/request";
import * as req from "../../data/request";
import moment from "moment";
const code = 200;
const initSelect = {
  current: 1,
  size: 10,
};
//获取1小时雨量
function* getHourRain({ data }) {
  try {
    const result = yield call(req.getByTimeMinute, {
      stcd: data,
      starttm: moment(new Date().getTime() - 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endtm: moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result.code == code) {
      yield put({
        type: types.SET_HOUR_RAIN,
        data: result.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//获取1天雨量
function* getDayRain({ data }) {
  // const {stcd,} = data
  try {
    const result = yield call(req.countHoursRain, {
      stcd: data,
      starttm: moment(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endtm: moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result.code == code) {
      yield put({
        type: types.SET_DAY_RAIN,
        data: result.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//获取7天雨量
function* getSevenDayRain({ data }) {
  // const {stcd,} = data
  try {
    const result = yield call(req.getByTimeDay, {
      stcd: data,
      starttm: moment(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endtm: moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result.code == code) {
      yield put({
        type: types.SET_SEVEN_DAY_RAIN,
        data: result.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//获取一天降雨
function* getDayWater({ data }) {
  // const {stcd,} = data
  try {
    const result = yield call(req.getWaterHistory, {
      current: 1,
      size: -1,
      stcd: data,
      starttm: moment(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endtm: moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result.code == code) {
      yield put({
        type: types.SET_DAY_WATER,
        data: result.data.records,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//24小时水位
function* getDisplayWater({ data }) {
  // const {stcd,} = data
  try {
    const result = yield call(req.getWaterHistory, {
      current: 1,
      size: -1,
      stcd: data,
      starttm: moment(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endtm: moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result.code == code) {
      if (result?.data?.records) {
        result?.data?.records?.map((item) => {
          item.tm = item.tm.slice(5, -3);
        });
        result?.data?.records?.reverse();
      }
      yield put({
        type: types.SET_DISPLAY_WATER,
        data: result.data.records,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
export default function* handState() {
  yield all([takeEvery(types.GET_HOUR_RAIN, getHourRain)]);
  yield all([takeEvery(types.GET_DAY_RAIN, getDayRain)]);
  yield all([takeEvery(types.GET_SEVEN_DAY_RAIN, getSevenDayRain)]);
  yield all([takeEvery(types.GET_DAY_WATER, getDayWater)]);
  yield all([takeEvery(types.GET_DISPLAY_WATER, getDisplayWater)]);
}
