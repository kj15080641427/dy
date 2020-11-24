import { put, call, takeEvery, all } from "redux-saga/effects";
import * as req from "@app/data/home";
import { CURRENCY } from "@app/redux/constants/home";
import * as types from "./types";
import { message } from "antd";
const initSelect = {
  current: 1,
  size: 10,
};
const successCode = 200;
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
    if (result.code === successCode) {
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
    if (result.code == successCode) {
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
  } catch (e) {
    console.error(e);
  }
}
/**
 * 添加数据
 * @param {*} param
 */
function* addOrUpdateBaseData({ data }) {
  const { request, key, param, query } = data;
  try {
    const result = yield call(request, param);
    if (result.code == successCode) {
      yield put({
        type: types.HIDE_MODAL,
      });
      yield put({
        type: types.GET_BASE,
        data: { request: query, key: key, param: { current: 1, size: 10 } },
      });
    }
  } catch (error) {
    console.error(error);
  }
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
    if (result.code == successCode) {
      // result.data.map((item) => console.log(item, "??"));
      res = result.data ? result.data.map((item) => item?.permissionId) : [];
      yield put({
        type: types.SET_R_P_SELECT_LIST,
        data: res,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 授权
 */
function* setRolePermission({ data }) {
  try {
    const result = yield call(req.setRollPermission, data);
    if (result.code == successCode) {
      yield put({
        type: types.HIDE_R_P_MODAL,
      });
      message.success(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 显示关联站点modal
 */
function* showSiteRelationModal({ data }) {
  try {
    yield put({
      type: types.SHOW_R_P_MODAL,
    });
    const result = yield call(req.getSiteRelation, {
      ...initSelect,
      siteDictionariesID: data,
    });
    if (result.code == successCode) {
      console.log(result);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 关联站点
 */
function* addSiteRelation({ data }) {
  try {
    const result = yield call(req.addSiteRelation, data);
    if (result.code == successCode) {
      message.info("关联成功");
      yield put({
        type: types.HIDE_R_P_MODAL,
        data: false,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 只读table  getAll
 */
function* readOnlyGetAll({ data }) {
  const { request, param } = data;
  try {
    yield put({
      type: types.READ_ONLY_TABLE_LOADING,
      data: true,
    });
    const result = yield call(request, param);
    if (result.code == successCode) {
      yield put({
        type: types.READ_ONLY_TABLE_LOADING,
        data: false,
      });
      yield put({
        type: types.HAND_ONLY_TABLE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//获取字典数据
function* getDict() {
  try {
    const result = yield call(req.getSiteDict, { current: 1, size: -1 });
    if (result.code == successCode) {
      let type = {};
      let obj = {};
      result.data.records.map((item) => {
        obj[item.stateRelationID] = item.name;
      });
      yield put({
        type: types.SET_DICT,
        data: { obj: obj, baseDict: result.data.records },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* management() {
  yield all([
    takeEvery(types.GET_BASE, getbaseData),
    takeEvery(types.DEL_BASE, delBaseData),
    takeEvery(types.ADD_OR_UPD_BASE, addOrUpdateBaseData),
    takeEvery(types.GET_PERMISSION_DATA_BY_ID, rolePermission),
    takeEvery(types.SET_ROLE_PERMISSION, setRolePermission),
    takeEvery(types.SITE_RELATION_MODAL, showSiteRelationModal),
    takeEvery(types.READ_ONLY_TABLE_GETALL, readOnlyGetAll),
    takeEvery(types.ADD_SITE_RELATION, addSiteRelation),
    takeEvery(types.GET_DICT, getDict),
  ]);
}
