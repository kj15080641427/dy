import * as actionTypes from '../constants/monitor';

export function test(data) {
  return {
    type: actionTypes.TEST,
    data
  };
}
export function initBaseData(data) {
  return {
    type: actionTypes.INIT_BASE_DATA,
    data
  };
}
export function setDetailData(data) {
  return {
    type: actionTypes.SET_DETAIL_DATA,
    data
  };
}
export function setMutiDetailData(data) {
  return {
    type: actionTypes.SET_MUTI_DETAIL_DATA,
    data
  };
}

export function addVideos(data) {
  return {
    type: actionTypes.ADD_VIDEOS,
    data
  };
}
export function addGates(data) {
  return {
    type: actionTypes.ADD_GATES,
    data
  };
}
export function addPumps(data) {
  return {
    type: actionTypes.ADD_PUMPS,
    data
  };
}
export function addWarehouse(data) {
  return {
    type: actionTypes.ADD_WAREHOUSE,
    data
  };
}


