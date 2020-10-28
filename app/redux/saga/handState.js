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
    const result = yield call(req.getByTimeHour, {
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
      yield put({
        type: types.SET_DAY_WATER,
        data: result.data.records,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function* getDayRainBySite({ data }) {
  let endTime = moment().startOf("hour");
  let beginTime = moment().subtract(24, "hour").startOf("hour");
  try {
    const result = yield call(req.getByTimeHour, {
      stcd: data,
      starttm: beginTime.format("YYYY-MM-DD HH:mm:ss"),
      endtm: endTime.format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result.code == code) {
      result.data.forEach((item) => {
        item.tm = item.endTime.slice(0, -3);
      });
      yield put({
        type: types.SET_DAY_RAIN_BY_SITE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//获取河流下的水位站点
function* getSiteWaterByRiver({ data }) {
  try {
    const result = yield call(req.getWfsRiverByName, { name: data.name });
    if (result.code == code) {
      const stcd = result.data[0].siteBaseDo.siteWaterLevels.map(
        (item) => item.stcd
      );
      const waterResult = yield call(req.getWaterRealTime, {
        current: 1,
        size: -1,
        stcd: stcd.toString(),
      });
      if (waterResult.code == code) {
        console.log(data, "TTT");
        if (data.type) {
          yield put({
            type: types.SET_SITE_RIVER_TABLE,
            data: waterResult.data.records.map((item) => ({
              ...item,
              name: item.stnm,
              aliasName: item.stnm,
              siteWaterLevels: [{ stcd: item.stcd }],
            })),
          });
        } else {
          yield put({
            type: types.SET_SITE_WATER_BY_RIVER,
            data: waterResult.data.records,
          });
        }
      }
    }
    // const waterResult = yield call(req.getWaterRealTime, {});
    // if (result.code == code) {
    // }
  } catch (e) {
    console.error(e);
  }
}
export default function* handState() {
  yield all([takeEvery(types.GET_HOUR_RAIN, getHourRain)]);
  yield all([takeEvery(types.GET_DAY_RAIN, getDayRain)]);
  yield all([takeEvery(types.GET_SEVEN_DAY_RAIN, getSevenDayRain)]);
  yield all([takeEvery(types.GET_DAY_WATER, getDayWater)]);
  yield all([takeEvery(types.GET_DISPLAY_WATER, getDisplayWater)]);
  yield all([takeEvery(types.GET_DAY_RAIN_BY_SITE, getDayRainBySite)]);
  yield all([takeEvery(types.GET_SITE_WATER_BY_RIVER, getSiteWaterByRiver)]);
}
