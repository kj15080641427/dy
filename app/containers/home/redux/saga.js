import { put, call, takeEvery, all } from "redux-saga/effects";

import * as req from "@app/data/home";
import { CURRENCY } from "@app/redux/constants/home";
import * as types from "./types";
import { message } from "antd";
const initSelect = {
  current: 1,
  size: 10,
};
/**
 * getbase //获取数据
 * @param {request} 请求地址
 */
function* getbaseData({ data }) {
  const { request, key, param = initSelect } = data;
  yield put({
    type: types.startLoading,
  });
  let res = [];
  try {
    const result = yield call(request, param);
    if (result.code === 200) {
      res = result.data;
    }
  } catch (e) {
    console.log(e);
  }
  yield put({ type: types.endLoading });
  yield put({
    type: CURRENCY,
    payload: { data: res, key: key },
  });
}
/**
 * 删除数据
 * @param {*} param0
 */
function* delBaseData({ data }) {
  const { request, key, param, query } = data;
  const { id, current, recordLength, size } = param;
  try {
    const result = yield call(request, id);
    if (result.code == 200) {
      yield put({
        type: types.GET_BASE,
        data: {
          request: query,
          key: key,
          param: {
            current: recordLength == 1 && current != 1 ? current - 1 : current,
            size: size,
          },
        },
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {}
}
/**
 * 添加数据
 * @param {*} param
 */
function* addOrUpdateBaseData({ data }) {
  const { request, key, param, query } = data;
  const {} = param;
  try {
    const result = yield call(request, param);
    if (result.code == 200) {
      yield put({
        type: types.HIDE_MODAL,
      });
      yield put({
        type: types.GET_BASE,
        data: { request: query, key: key, param: { current: 1, size: 10 } },
      });
    }
  } catch (error) {}
}

/**
 * 获取角色权限
 */
function* rolePermission({ data }) {
  yield put({
    type: types.SHOW_R_P_MODAL,
  });
  try {
    let res = [];
    const result = yield call(req.getPermissionById, data);
    if (result.code == 200) {
      res = result ? result.data.map((item) => item.permissionId) : [];
      yield put({
        type: types.SET_R_P_SELECT_LIST,
        data: res,
      });
    }
  } catch (e) {}
}
/**
 * 授权
 */
function* setRolePermission({ data }) {
  try {
    const result = yield call(req.setRollPermission, data);
    if (result.code == 200) {
      yield put({
        type:types.HIDE_R_P_MODAL
      })
      message.success(result.msg);
    }
  } catch (e) {}
}
export default function* management() {
  yield all([
    takeEvery(types.GET_BASE, getbaseData),
    takeEvery(types.DEL_BASE, delBaseData),
    takeEvery(types.ADD_OR_UPD_BASE, addOrUpdateBaseData),
    takeEvery(types.GET_PERMISSION_DATA_BY_ID, rolePermission),
    takeEvery(types.SET_ROLE_PERMISSION, setRolePermission),
  ]);
}
