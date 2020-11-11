import * as types from "../constants/taskEvent";
const initState = {
  tasMaterialkUser: [],
  tableNumber: [],
  tableInput: [],
  taskUpdateMidal: false,
  taskTimeLine: [],
  feedTaskModalVisible: false,
  dispatchMaterial: [],
  listRender: [],
  userPosition: [],
  taskCountSource: [],
  taskCountGrade: [],
  taskCountState: [],
  taskDanger: [],
  taskdangerModalVisible: false,
  taskWarning: [],
  //当前点击的用户轨迹列表
  selectedPersonTrack: [],
  //人员最后一次位置
  floodAddress: []
};
let selected = [];

// eslint-disable-next-line complexity
export default function taskReducers(state = initState, action) {
    let newState = Object.assign({}, state);
  switch (action.type) {
    case types.SET_MATERIAL_TABLE_INPUT: // 设置物资数量
      let data = action.data;
      data = { ...data.row, number: data.number };
      let a = selected.filter((item) => item.materialId == data.materialId);
      if (a[0]) {
        selected.map((t) => {
          if (t.materialId == data.materialId) {
            t.number = data.number;
          }
        });
      } else {
        selected.push(data);
      }
      newState = { ...newState, tableNumber: selected };
      break;
    case types.SET_TASKUPDATE_MODAL:
      newState = { ...newState, taskUpdateMidal: action.data };
      break;
    case types.SET_TASK_TIMELINE:
      newState = { ...newState, taskTimeLine: action.data };
      break;
    case types.FEED_TASK_MODAL:
      newState = { ...newState, feedTaskModalVisible: action.data };
      break;
    case types.SET_TASKEVENT_LIST:
      console.log("reduer", action.data, "asdasd");
      newState = { ...newState, taskList: action.data };
      break;
    case types.SET_MODAL_VISIBLE:
      newState = { ...newState, taskModalVisible: action.data };
      break;
    case types.CHANGE_TASK_INPUT:
      newState = { ...newState, taskInput: action.data };
      break;
    case types.SET_MESSAGE:
      newState = { ...newState, messageList: action.data };
      break;
    case types.SET_TASK_INFO:
      newState = { ...newState, taskInfo: action.data };
      break;
    case types.SET_EXPERT_MODAL:
      newState = { ...newState, expertVisible: action.data };
      break;
    case types.SET_FLOOD_ADDRESS:
      newState = { ...newState, floodAddress: action.data };
      break;
    case types.SET_TASK_DISPATCH_EXPERT:
      newState = { ...newState, dispatchExpert: action.data };
      break;
    case types.CHANGE_TASK_RENDER_LIST:
      newState = { ...newState, listRender: action.data };
      break;
    case types.CHANGE_TASK_RADIO:
      newState = { ...newState, taskRadioType: action.data };
      break;
    case types.SET_USER_DISPATCH:
      newState = { ...newState, dispatchUser: action.data };
      break;
    case types.SET_MATERIAL_DISPATCH:
      newState = { ...newState, dispatchMaterial: action.data };
      break;
    case types.SET_FORM_USER:
      let b = [];
      b.push(...action.data);
      newState = { ...newState, formUser: b };
      break;
    case types.SET_MAP_USER_POSITION:
      newState = { ...newState, userPosition: action.data };
      break;
    case types.SET_TASK_COUNT_SOURCE: //来源统计
      newState = { ...newState, taskCountSource: action.data };
      break;
    case types.SET_TASK_COUNT_GRADE: //等级统计
      newState = { ...newState, taskCountGrade: action.data };
      break;
    case types.SET_TASK_COUNT_STATE: //状态统计
      newState = { ...newState, taskCountState: action.data };
      break;
    case types.SET_TASK_DANGER: //状态统计
      newState = { ...newState, taskDanger: action.data };
      break;
    case types.SET_TASK_DANGER_MODAL: //
      newState = { ...newState, taskdangerModalVisible: action.data };
      break;
    case types.SET_TASK_WARNING_MODAL: //
      newState = { ...newState, taskWarningModalVisible: action.data };
      break;
    case types.SET_TASK_WARNING: //
      newState = { ...newState, taskWarning: action.data };
      break;
    case types.FLOOD_TRACK_UPDATE:
      newState = {...newState, selectedPersonTrack: action.data};
      break;
    default:
      break;
  }
  return newState;
}
