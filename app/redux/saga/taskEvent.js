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
      message.success("发送成功");
      yield put({
        type: types.GET_MESSAGE,
        data: { taskEventsID: data.taskEventsID, type: 101 },
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
//查询消息
function* getMessage({ data }) {
  try {
    let result = yield call(req.getMessage, data);
    if (result.code == successCode) {
      yield put({
        type: types.SET_MESSAGE,
        data: result.data.taskDynamicResultDos,
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
      // console.log("saga");
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
          size: 6,
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
    const result = yield call(req.getTaskDispatchExpert, data);
    if (result.code == successCode) {
      yield put({
        type: types.SET_TASK_DISPATCH_EXPERT,
        data: result.data.taskDynamicResultDos,
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
        data: { taskEventsID: data[0].taskEventsID, type: 103 },
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
    const result = yield call(req.getUserDispatch, data);
    if (result.code == successCode) {
      yield put({
        type: types.SET_USER_DISPATCH,
        data: result.data.taskDynamicResultDos,
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
        data: { taskEventsID: data[0].taskEventsID, type: 102 },
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
      let list = [];
      result.data.map((item) => {
        list.push({ ...item, ...item.taskMaterialListList[0] });
      });
      yield put({
        type: types.SET_MATERIAL_DISPATCH,
        data: list,
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
    if (result.code === successCode) {
      const nowTaskInfo = result.data?.records.filter(
        (item) => item.taskEventsID === data
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
      hashHistory.push("/taskList");
    }
  } catch (e) {
    console.error(e);
  }
}
//取消事件
function* endTask({ data }) {
  const { param, eventType } = data;
  let reqType = eventType === "终止事件" ? req.offTask : req.completeTask;
  try {
    const result = yield call(reqType, param);
    if (result.code === successCode) {
      yield put({
        type: types.FEED_TASK_MODAL,
        data: false,
      });
      message.info(`${eventType}成功`);
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
    if (result.code === successCode) {
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
    if (result.code === successCode) {
      yield put({
        type: types.SET_TASK_TIMELINE,
        data: result.data.taskDynamicResultDos,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

//事件来源统计
function* getTaskCountSource({ data }) {
  try {
    const result = yield call(req.getTaskCountDataSource, data);
    if (result.code === successCode) {
      yield put({
        type: types.SET_TASK_COUNT_SOURCE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//事件等级统计
function* getTaskCountGrade({ data }) {
  try {
    const result = yield call(req.getTaskCountGrade, data);
    if (result.code === successCode) {
      yield put({
        type: types.SET_TASK_COUNT_GRADE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//事件状态统计
function* getTaskCountState({ data }) {
  try {
    const result = yield call(req.getTaskCountState, data);
    if (result.code === successCode) {
      yield put({
        type: types.SET_TASK_COUNT_STATE,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//查询险情上报
function* getTaskDanger({ data }) {
  try {
    const result = yield call(req.getTaskDanger, data);
    if (result.code === successCode) {
      yield put({
        type: types.SET_TASK_DANGER,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
//超警戒
function* getTaskWarning({ data }) {
  try {
    const result = yield call(req.getAlarmWarning, data);
    if (result.code === successCode) {
      yield put({
        type: types.SET_TASK_WARNING,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
// <<<<<<< HEAD
//防汛人员/专家定位
function* getFloodUserExpertAddress() {
  try {
    const address = yield call(req.getFloodAddress, { current: 1, size: -1 });
    const expert = yield call(req.getFloodControlExpertAll, {});
    const rankUser = yield call(req.getFloodRanksAll, {});
    if (address.code == 200 && expert.code == 200 && rankUser.code == 200) {
      const city = [];
      const county = [];
      const town = [];
      const allRankUser = [];
      expert.data.map((item) => {
        if (item.type == 1) {
          city.push(item);
        } else if (item.type == 2) {
          county.push(item);
        } else if (item.type == 3) {
          town.push(item);
        }
        address.data?.records?.forEach((t) => {
          if (item.userid && item.userid === t.userId) {
            item.lon = t.longitude;
            item.lat = t.latitude;
            return;
          }
        });
      });
      rankUser.data.forEach((i) => {
        i.userList.forEach((item) => {
          address.data?.records?.forEach((t) => {
            if (item.userid && item.userid === t.userId) {
              item.lon = t.longitude;
              item.lat = t.latitude;
              return;
            }
          });
        });
        allRankUser.push(...i.userList);
      });
      yield put({
        type: types.SET_FLOOD_RANK_ADDRESS,
        data: { rankUser: rankUser.data, allRankUser: allRankUser },
      });
      yield put({
        type: types.SET_FLOOD_EXPERT_ADDRESS,
        data: { all: expert.data, city: city, county: county, town: town },
      });
    }
  } catch (e) {
    console.error(e);
  }
}
// =======

function *getPersonTrack({data}) {
  try {
    const {userId, beginTime, endTime} = data;
    const result = yield call(req.queryFloodPosLog, {
      userId: userId ? userId : 6,
      startTime: beginTime.format('YYYY-MM-DD HH:mm:00'),
      endTime: endTime.format('YYYY-MM-DD HH:mm:00'),
      current: 0,
      size: -1,
    });

    if (result.code === successCode) {
      yield put({
        type: types.FLOOD_TRACK_UPDATE,
        data: result.data.records,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

// >>>>>>> c8cd550299825242c8af38c6acf816b56258f26f
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
    takeEvery(types.END_TASK, endTask),
    takeEvery(types.COMPLETE_TASK, completeTask),
    takeEvery(types.GET_TASK_TIMELINE, getTaskTimeLine),

    takeEvery("GET_TASK_THEN_UPDATE", getTaskInfoThenUpdate),

    takeEvery(types.GET_TASK_COUNT_SOURCE, getTaskCountSource),
    takeEvery(types.GET_TASK_COUNT_GRADE, getTaskCountGrade),
    takeEvery(types.GET_TASK_COUNT_STATE, getTaskCountState),
    takeEvery(types.GET_TASK_DANGER, getTaskDanger),
    takeEvery(types.GET_PERSON_TRACK, getPersonTrack),
    takeEvery(types.GET_TASK_WARNING, getTaskWarning),
    takeEvery(types.GET_FLOOD_USER_EXPERT_ADDREDD, getFloodUserExpertAddress),
  ]);
}
