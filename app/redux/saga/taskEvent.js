import { put, call, takeEvery, all } from "redux-saga/effects";
import { createHashHistory } from "history";
import * as req from "@app/data/home";
import * as types from "../constants/taskEvent";
import { message } from "antd";
const hashHistory = createHashHistory();

const successCode = 200;

//发送消息
function* sendMessage({ data }) {
  try {
    let result = yield call(req.sendMessage, data);
    if (result.code == successCode) {
      yield put({
        type: types.GET_MESSAGE,
      });
      message.success("发送成功");
    }
  } catch (e) {
    console.error(e);
  }
}
//查询消息
function* getMessage() {
  try {
    let result = yield call(req.getMessage, {});
    if (result.code == successCode) {
      yield put({
        type: types.SET_MESSAGE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//查询事件
function* getTaskList({ data }) {
  try {
    let result = yield call(req.getTaskList, data);
    if (result.code == successCode) {
      yield put({
        type: types.SET_TASKEVENT_LIST,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//新增事件
function* addTaskEvent({ data }) {
  try {
    const result = yield call(req.addTaskEvent, data);
    if (result.code == successCode) {
      yield put({
        type: types.SET_MODAL_VISIBLE,
        data: false,
      });
      yield put({
        type: types.CHANGE_TASK_INPUT,
        data: "",
      });
      yield put({
        type: types.GET_TASKEVENT_LIST,
        data: {
          current: 1,
          name: "",
          size: 10,
        },
      });
      message.success("新增成功");
    } else {
      message.warning(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
//定位
function* getFloodAddress() {
  try {
    const result = yield call(req.getFloodAddress, { current: 1, size: -1 });
    if (result.code == successCode) {
      yield put({
        type: types.SET_FLOOD_ADDRESS,
        data: result.data,
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
//根据事件查询已调度专家
function* getTaskDispatchExpert({ data }) {
  try {
    const result = yield call(req.getTaskDispatchExpert, {
      taskEventsID: data,
    });
    if (result.code == successCode) {
      yield put({
        type: types.SET_TASK_DISPATCH_EXPERT,
        data: result.data,
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
//新增专家调度
function* addExpertDispatch({ data }) {
  try {
    const result = yield call(req.addExpertDispatch, data);
    if (result.code == successCode) {
      message.success("成功");
      yield put({
        type: types.SET_EXPERT_MODAL,
        data: false,
      });
      yield put({
        type: types.GET_TASK_DISPATCH_EXPERT,
        data: data[0].taskEventsID,
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
//根据事件查询已调度人员
function* getUserDispatch({ data }) {
  try {
    const result = yield call(req.getUserDispatch, {
      taskEventsID: data,
    });
    if (result.code == successCode) {
      yield put({
        type: types.SET_USER_DISPATCH,
        data: result.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//新增人员调度
function* addUserDispatch({ data }) {
  try {
    const result = yield call(req.addUserDispatch, data);
    if (result.code == successCode) {
      message.success("新增成功");
      yield put({
        type: types.SET_EXPERT_MODAL,
        data: false,
      });
      yield put({
        type: types.GET_USER_DISPATCH,
        data: data[0].taskEventsID,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//根据事件查询已调度物资
function* getMaterialDispatch({ data }) {
  try {
    const result = yield call(req.getMaterialDispatch, {
      taskEventsID: data,
    });
    if (result.code == successCode) {
      let a = [];
      result.data.map((item) => {
        item.taskMaterialListList?.map((t) => {
          a.push({ ...item, ...t });
        });
      });
      yield put({
        type: types.SET_MATERIAL_DISPATCH,
        data: a,
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.log(e);
  }
}
//新增物资调度
function* addMaterialDispatch({ data }) {
  try {
    const result = yield call(req.addMaterialDispatch, data);
    if (result.code == successCode) {
      message.success("新增物资调度成功");
      yield put({
        type: types.SET_EXPERT_MODAL,
        data: false,
      });
      yield put({
        type: types.GET_MATERIAL_DISPATCH,
        data: data.taskEventsID,
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.log(e);
  }
}
//修改事件
function* updateTaskInfo({ data }) {
  try {
    const result = yield call(req.updateTaskEvent, data);
    if ((result.code = successCode)) {
      yield put({
        type: "GET_TASK_THEN_UPDATE",
        data: data.taskEventsID,
      });
      yield put({
        type: types.SET_TASKUPDATE_MODAL,
        data: false,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//修改事件后查询事件设置事件详情
function* getTaskInfoThenUpdate({ data }) {
  try {
    const result = yield call(req.getTaskList, { current: 1, size: -1 });
    if (result.code == successCode) {
      const nowTaskInfo = result.data?.records.filter(
        (item) => item.taskEventsID == data
      );
      yield put({
        type: types.SET_TASK_INFO,
        data: nowTaskInfo[0],
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//删除事件
function* deleteTaskInfo({ data }) {
  try {
    const result = yield call(req.deleteTaskEvent, data);
    if ((result.code = successCode)) {
      message.info("删除成功");
      yield put({
        type: types.SET_TASKUPDATE_MODAL,
        data: false,
      });
      hashHistory.push("/home/taskList");
    }
  } catch (e) {
    console.error(e);
  }
}
//取消事件
function* recallTask({ data }) {
  try {
    const result = yield call(req.offTask, data);
    if (result.code == successCode) {
      yield put({});
      message.info("取消成功");
    } else {
      message.success(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
//完成事件
function* completeTask({ data }) {
  try {
    const result = yield call(req.completeTask, data);
    if (result.code == successCode) {
      message.info("成功");
    }
  } catch (e) {
    console.error(e);
  }
}

//查询事件流程
function* getTaskTimeLine({ data }) {
  try {
    const result = yield call(req.getTaskTimeLine, data);
    if (result.code == successCode) {
      yield put({
        type: types.SET_TASK_TIMELINE,
        data: result.data,
      });
      message.info("成功");
    }
  } catch (e) {
    console.error(e);
  }
}
export default function* management() {
  yield all([
    takeEvery(types.SEND_MESSAGE, sendMessage),
    takeEvery(types.GET_TASKEVENT_LIST, getTaskList),
    takeEvery(types.ADD_TASK_EVENT, addTaskEvent),
    takeEvery(types.GET_MESSAGE, getMessage),
    takeEvery(types.GET_FLOOD_ADDRESS, getFloodAddress),
    takeEvery(types.GET_TASK_DISPATCH_EXPERT, getTaskDispatchExpert),
    takeEvery(types.ADD_EXPERT_DISPATCH, addExpertDispatch),
    takeEvery(types.GET_USER_DISPATCH, getUserDispatch),
    takeEvery(types.ADD_USER_DISPATCH, addUserDispatch),
    takeEvery(types.GET_MATERIAL_DISPATCH, getMaterialDispatch),
    takeEvery(types.ADD_MATERIAL_DISPATCH, addMaterialDispatch),
    takeEvery(types.UPDATE_TASK_INFO, updateTaskInfo),
    takeEvery(types.DELETE_TASK_INFO, deleteTaskInfo),
    takeEvery(types.RECALL_TASK, recallTask),
    takeEvery(types.COMPLETE_TASK, completeTask),
    takeEvery(types.GET_TASK_TIMELINE, getTaskTimeLine),

    takeEvery("GET_TASK_THEN_UPDATE", getTaskInfoThenUpdate),
  ]);
}