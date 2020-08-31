import {
  setPagination,
  startLoading,
  endLoading,
  SHOW_R_P_MODAL,
  HIDE_R_P_MODAL,
  SET_R_P_SELECT_LIST,
  SET_SELECT_LIST,
} from "./types";

const initState = {
  loading: false,
  permissionList: [],
  modalVisible: false,
};

export default function management(state = initState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case setPagination: //查询
      newState = { ...newState, ...action.data };
      break;
    case startLoading:
      newState = { ...newState, loading: true };
      break;
    case endLoading:
      newState = { ...newState, loading: false };
      break;
    case SET_R_P_SELECT_LIST: //根据角色获取权限 选中已有权限
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
      newState = { ...newState, modalVisible: true };
      break;
    case SET_SELECT_LIST:
      newState = {
        ...newState,
        permissionList: action.data,
      };
      break;
    default:
      break;
  }
  // console.log(newState, "NEWSTATE");
  return newState;
}
