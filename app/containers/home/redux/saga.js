import { put, call, takeEvery, all } from "redux-saga/effects";
import {
  getSiteWaterData,
  addSiteWaterData,
  deleteSiteWaterData,
} from "@app/data/home";
import { CURRENCY, HIDE_MODAL } from "@app/redux/constants/home";
import {
  getSiteWaterType,
  startLoading,
  endLoading,
  addSiteWaterType,
  DELETE_SITE_WATER,
} from "./types";
const initSelect = {
  current: 1,
  size: 10,
};
/**
 * 获取站点水位
 * @param {*} arg
 */
function* getSiteWater({ data = initSelect }) {
  yield put({
    type: startLoading,
  });
  let res = [];
  try {
    const result = yield call(getSiteWaterData, data);
    if (result.code === 200) {
      res = result.data;
    }
  } catch (e) {
    console.log(e);
  }
  yield put({
    type: endLoading,
  });
  yield put({
    type: CURRENCY,
    payload: { data: res, key: "siteWater" },
  });
}
/**
 * 添加站点水位
 * @param {参数} param0
 */
function* addSiteWater({ data }) {
  let res = [];
  try {
    const result = yield call(addSiteWaterData, data);
    if (result.code === 200) {
      // res = result.data;
      yield put({
        type: HIDE_MODAL,
      });
      yield put({
        type: getSiteWaterType,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
/**删除站点水位
 * @param {id}
 */
function* deleteSiteWater({ data }) {
  const result = yield call(deleteSiteWaterData, data);
  if (result.code === 200) {
    yield put({
      type: getSiteWaterType,
    });
  }
}
export default function* management() {
  yield all([
    takeEvery(getSiteWaterType, getSiteWater),
    takeEvery(addSiteWaterType, addSiteWater),
    takeEvery(DELETE_SITE_WATER, deleteSiteWater),
  ]);
}
