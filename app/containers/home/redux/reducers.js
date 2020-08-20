import {
  setPagination,
  startLoading,
  endLoading,
  addSiteWaterType,
  DELETE_SITE_WATER
} from "./types";

const initState = {
  loading: false,
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
    case addSiteWaterType: //添加
      newState = { ...newState, showModal: true };
      break;
    case DELETE_SITE_WATER: //删除
      // newState = { ...newState, showModal: true };
      break;
    default:
      break;
  }
  // console.log(newState, "NEWSTATE");
  return newState;
}
