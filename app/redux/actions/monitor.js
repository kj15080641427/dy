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
export function addVideos(data) {
  return {
    type: actionTypes.ADD_VIDEOS,
    data
  };
}

