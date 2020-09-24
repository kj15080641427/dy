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
    const result = yield call(req.getCountStation, {
      ...initSelect,
      isshow: 0,
    });
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
  // console.log(nowDate, "nowDate");
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
function* getWaterWarning() {
  try {
    const getDate = (day) => {
      return moment().subtract(day, "days").format("YYYY-MM-DD");
    };
    const last3 = getDate(30);
    const nowDate = moment(new Date()).format("YYYY-MM-DD");
    const result = yield call(req.getwaterlevelAlarmLog, {
      alarmtype: 1,
      startTime: `${last3} 00:00:00`,
      endTime: `${nowDate} 24:00:00`,
      // stcd: data,
    });
    if ((result.code = code)) {
      let warningInfo = {
        todayWaringInfo: [],
        mWarning: 0,
        wWarning: 0,
        //最近七天报警次数
        today: 0,
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
      };
      warningInfo.mWarning = result.data.length;
      result.data.map((item) => {
        const time = item.alarmtime.split(" ")[0];
        if (moment(time).isBetween(getDate(7), getDate(0))) {
          warningInfo.wWarning++;
        }
        if (moment(time).isSame(getDate(0))) {
          warningInfo.today++;
          warningInfo.todayWaringInfo.push(item);
        }
        if (moment(time).isSame(getDate(1))) {
          warningInfo.a++;
        }
        if (moment(time).isSame(getDate(2))) {
          warningInfo.b++;
        }
        if (moment(time).isSame(getDate(3))) {
          warningInfo.c++;
        }
        if (moment(time).isSame(getDate(4))) {
          warningInfo.d++;
        }
        if (moment(time).isSame(getDate(5))) {
          warningInfo.e++;
        }
        if (moment(time).isSame(getDate(6))) {
          warningInfo.f++;
        }
      });
      console.log(warningInfo);
      yield put({
        type: types.SET_WATER_WARNING,
        data: warningInfo,
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
//获取防汛仓库
function* getWarehouse() {
  try {
    const result = yield call(req.getWarehouse, {});
    if ((result.code = code)) {
      yield put({
        type: types.SET_WAREHOUSE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//根据仓库ID获取物资
function* getMaterialById({ data }) {
  try {
    const result = yield call(req.getWarehouseMt, {
      materialWarehouseId: data,
    });
    if ((result.code = code)) {
      yield put({
        type: types.SET_MATERIAL_BY_ID,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//获取防汛人员
function* getFloodUser() {
  try {
    const result = yield call(req.getfloodUser, {});
    if ((result.code = code)) {
      yield put({
        type: types.SET_FLOOD_USER,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//获取防汛队伍下的防汛人员
function* getFloodRankUser() {
  try {
    const result = yield call(req.getFloodRanksAll, {});
    if ((result.code = code)) {
      yield put({
        type: types.SET_FLOOD_RANK_USER,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//获取防汛专家
function* getFloodExpert() {
  try {
    const result = yield call(req.getFloodControlExpertAll, {});
    if ((result.code = code)) {
      let city = [];
      let county = [];
      let town = [];

      let gr = [];
      let lj = [];
      let dy = [];
      let kl = [];
      let hk = [];
      result.data.map((item) => {
        switch (item.region) {
          case "370502":
            dy++;
            // this.setState({
            //   dy: this.state.dy + 1,
            // });
            break;
          case "370523":
            gr++;
            // this.setState({
            //   gr: this.state.gr + 1,
            // });
            break;
          case "370522":
            lj++;
            // this.setState({
            //   lj: this.state.lj + 1,
            // });
            break;
          case "370521":
            kl++;
            // this.setState({
            //   kl: this.state.kl + 1,
            // });
            break;
          case "370503":
            hk++;
            // this.setState({
            //   hk: this.state.hk + 1,
            // });
            break;
          default:
            // console.log(item, "ITEM");
            break;
        }

        if (item.type == 1) {
          city.push(item);
        } else if (item.type == 2) {
          county.push(item);
        } else if (item.type == 3) {
          town.push(item);
        }
      });
      yield put({
        type: types.SET_FLOOD_EXPERT,
        data: {
          city: city,
          county: county,
          town: town,
          count: { dy: dy, gr: gr, kl: kl, hkk: hk, lj: lj },
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
}
function* getAlarmData() {
  try {
    const result = yield call(req.getAlarmWarning, {});
    if ((result.code = code)) {
      yield put({
        type: types.SET_ALARM_DATA,
        data: result.data,
      });
    }
  } catch (e) {
    console.log(e);
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
    takeEvery(types.GET_WAREHOUSE, getWarehouse),
    takeEvery(types.GET_FLOOD_USER, getFloodUser),
    takeEvery(types.GET_FLOOD_EXPERT, getFloodExpert),
    takeEvery(types.GET_MATERIAL_BY_ID, getMaterialById),
    takeEvery(types.GET_FLOOD_RANK_USER, getFloodRankUser),
    takeEvery(types.GET_ALARM_DATA, getAlarmData),
  ]);
}
