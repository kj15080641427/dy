import * as actionTypes from '../constants/home';
export function addUserInfo(data) {
    return {
      type: actionTypes.SET_USERINFO,
      data
    };
  }