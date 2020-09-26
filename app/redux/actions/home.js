import * as actionTypes from "../constants/home";
export function addUserInfo(data) {
  return {
    type: actionTypes.SET_USERINFO,
    data,
  };
}
export function currency(data) {
  return {
    type: actionTypes.CURRENCY,
    data,
  };
}
export function showModal(data) {
  return {
    type: actionTypes.SHOW_MODAL,
    data,
  };
}
