import { put, call, all, takeEvery } from "redux-saga/effects";
import {
  queryPermission,
  getBaseSite,
} from "@app/data/request";
import {
  getQueryPermissionType,
  changePermissionData,
  getQueryBaseSiteType,
} from "./types";
import { CURRENCY } from "@app/redux/constants/home";
/**
 * 权限分页查询
 */
function* asyncQueryPermission() {
  let data = [];
  try {
    let result = yield call(queryPermission, { current: 1, size: 100 });
    if (result.code === 200) {
      data = result.data.records;
      // data = [...result.data.record];
    }
  } catch (e) {
    console.warn(e);
  }
  //更新数据
  yield put({
    type: changePermissionData,
    payload: { data: data },
  });
}
/**
 *
 * 基础站点字典查询
 */
function* asyncQueryBaseSite() {
  let data = [];
  try {
    let result = yield call(getBaseSite, {
      current: 0,
      size: 10,
    });
    if (result.code === 200) {
      data = result.data;
    }
  } catch (e) {
    console.log(e);
  }

  yield put({
    type: CURRENCY,
    payload: { data: data, key: "baseSite" },
  });
}
/**
 * 初始化
 * @returns {IterableIterator<*>}
 */
export default function* permission() {
  yield all([
    takeEvery(getQueryPermissionType, asyncQueryPermission),
    takeEvery(getQueryBaseSiteType, asyncQueryBaseSite),
  ]);
}
