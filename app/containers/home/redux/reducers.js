import {
  setPagination,
  startLoading,
  endLoading,
  SHOW_R_P_MODAL,
  HIDE_R_P_MODAL,
  SET_R_P_SELECT_LIST,
  SET_SELECT_LIST,
  HAND_ONLY_TABLE,
  READ_ONLY_TABLE_LOADING,
  SELECT_TABLE,
} from "./types";
import * as types from "./types";
import { abstract } from "ol/util";
const initState = {
  loading: false,
  readOnlyLoading: false,
  permissionList: [],
  modalVisible: false,
  readOnlyData: [],
  selected: [],
  taskModalVisible: false,
  expertVisible: false,
  floodAddress: [],
  listRender: [],
  taskRadioType: "city",
  dispatchUser: [],
  dispatchMaterial: [],
  materialWarehouseID: [],
};

export default function management(state = initState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case setPagination: // 查询
      newState = { ...newState, ...action.data };
      break;
    case startLoading:
      newState = { ...newState, loading: true };
      break;
    case endLoading:
      newState = { ...newState, loading: false };
      break;
    case SET_R_P_SELECT_LIST: // 根据角色获取权限 选中已有权限
      newState = {
        ...newState,
        // modalVisible: true,
        permissionList: action.data,
      };
      break;
    case HIDE_R_P_MODAL:
      newState = { ...newState, modalVisible: false, permissionList: [] };
      break;
    case SHOW_R_P_MODAL:
      newState.modalVisible = true;
      break;
    case HAND_ONLY_TABLE: //只读table赋值
      newState = { ...newState, readOnlyData: action.data };
      break;
    case READ_ONLY_TABLE_LOADING: //只读table赋值
      newState = { ...newState, readOnlyLoading: action.data };
      break;
    case SELECT_TABLE: //选中
      newState = {
        ...newState,
        selected: {
          ...newState.selected,
          [action.data.key]: action.data.value,
        },
      };
      break;
    case SET_SELECT_LIST:
      newState = {
        ...newState,
        permissionList: action.data,
      };
      break;
    case types.SET_COUNT_STATION:
      newState = {
        ...newState,
        count: {
          raincount: action.data[0],
          watercount: action.data[1],
          floodcount: action.data[2],
          vodeocount: action.data[3],
        },
      };
      break;
    case types.SET_TASKEVENT_LIST:
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
      console.log(action.data, "DDs");
      newState = { ...newState, dispatchMaterial: action.data };
      break;
    case types.SET_FORM_USER:
      let a = [];
      a.push(...action.data);
      newState = { ...newState, formUser: a };
      break;
    default:
      break;
  }
  return newState;
}
