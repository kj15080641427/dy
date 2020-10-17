import { put, call, all, takeEvery } from "redux-saga/effects";
import * as RainTypes from "./constants/rain";
import {
  countHoursRain,
  countMinutesRain,
  getAll,
  // queryPermission,
} from "../data/request";
import moment from "moment";

/**
 * 加载1小时雨量
 * @returns {IterableIterator<*>}
 */
function* loadHourRain() {
  let endTime = moment().startOf("hour");
  let beginTime = moment().subtract(1, "hour").startOf("hour");
  let data = [];

  try {
    let result = yield call(countHoursRain, {
      stcd: "",
      starttm: beginTime.format("YYYY-MM-DD HH:mm:ss"),
      endtm: endTime.format("YYYY-MM-DD HH:mm:ss"),
    });

    if (result.code === 200) {
      data = [...result.data];
    }
  } catch (e) {
    console.warn(e);
  }

  yield put({
    type: RainTypes.UPDATE_RAIN,
    payload: { rainDataType: 1, data: data },
  });
}

/**
 * 加载实时雨量
 * @returns {IterableIterator<*>}
 */
function* loadCurrentRain() {
  let endTime = moment().format("YYYY-MM-DD HH:mm:ss");
  let beginTime = moment().startOf("hour").format("YYYY-MM-DD HH:mm:ss");
  // let data = [];

  try {
    let result = yield call(countMinutesRain, {
      current: 0,
      size: -1,
      starttm: beginTime,
      endtm: endTime,
    });
    //let result = yield call(getByTimeMinute, {starttm: beginTime, endtm:endTime});
    if (result.code === 200) {
      // data = result.data;
      let data = result.data.records.map((item) => ({
        ...item,
        avgDrp: item.drp,
      }));
      yield put({
        type: RainTypes.UPDATE_RAIN,
        payload: {
          rainDataType: 0,
          data: data,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 *加载12小时雨量
 * @returns {IterableIterator<*>}
 */
function* load12HoursRain() {
  let endTime = moment().startOf("hour");
  let beginTime = moment().subtract(12, "hour").startOf("hour");
  let data = [];

  try {
    let result = yield call(countHoursRain, {
      stcd: "",
      starttm: beginTime.format("YYYY-MM-DD HH:mm:ss"),
      endtm: endTime.format("YYYY-MM-DD HH:mm:ss"),
    });

    if (result.code === 200) {
      data = [...result.data];
    }
  } catch (e) {
    console.warn(e);
  }

  yield put({
    type: RainTypes.UPDATE_RAIN,
    payload: { rainDataType: 3, data: data },
  });
}

/**
 * 加载24小时雨量
 * @returns {IterableIterator<*>}
 */
function* load24HourRain() {
  let endTime = moment().startOf("hour");
  let beginTime = moment().subtract(24, "hour").startOf("hour");
  let data = [];

  try {
    let result = yield call(countHoursRain, {
      stcd: "",
      starttm: beginTime.format("YYYY-MM-DD HH:mm:ss"),
      endtm: endTime.format("YYYY-MM-DD HH:mm:ss"),
    });

    if (result.code === 200) {
      data = [...result.data];
    }
  } catch (e) {
    console.warn(e);
  }

  yield put({
    type: RainTypes.UPDATE_RAIN,
    payload: { rainDataType: 4, data: data },
  });
}

/**
 * 加载3小时雨量
 * @returns {IterableIterator<*>}
 */
function* load3HoursRain() {
  let endTime = moment().startOf("hour");
  let beginTime = moment().subtract(3, "hour").startOf("hour");
  let data = [];

  try {
    let result = yield call(countHoursRain, {
      stcd: "",
      starttm: beginTime.format("YYYY-MM-DD HH:mm:ss"),
      endtm: endTime.format("YYYY-MM-DD HH:mm:ss"),
    });

    if (result.code === 200) {
      data = [...result.data];
    }
  } catch (e) {
    console.warn(e);
  }

  yield put({
    type: RainTypes.UPDATE_RAIN,
    payload: { rainDataType: 3, data: data },
  });
}

/**
 * 加载雨量站基础信息
 * @returns {IterableIterator<*>}
 */
function* loadRainStations() {
  let data = [];

  try {
    let result = yield call(getAll, { type: 1 });

    if (result.code == 200) {
      data = [...result.data];
    }
  } catch (e) {
    console.warn(e);
  }
  //更新数据
  yield put({
    type: RainTypes.UPDATE_RAIN_STATION,
    payload: { data: data },
  });
}

/**
 * 初始化
 * @returns {IterableIterator<*>}
 */
export default function* initialize() {
  yield all([
    takeEvery(RainTypes.LOAD_CURRENT_RAIN, loadCurrentRain),
    takeEvery(RainTypes.LOAD_HOUR_RAIN, loadHourRain),
    takeEvery(RainTypes.LOAD_THREE_HOURS_RAIN, load3HoursRain),
    takeEvery(RainTypes.LOAD_TWELVE_HOURS_RAIN, load12HoursRain),
    takeEvery(RainTypes.LOAD_TWENTY_FOUR_HOURS_RAIN, load24HourRain),
    takeEvery(RainTypes.LOAD_RAIN_STATION, loadRainStations),
  ]);
}
