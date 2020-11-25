/*
 *  reducer
 */
import * as actionTypes from "../constants/home";

const defaultState = {
  userinfo: {}, //用户登录信息
};

export default function main(state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.SET_USERINFO: {
      let data = action.data;
      if (data && data.length) {
        newState.userinfo = data;
      }
      break;
    }
    case actionTypes.SET_TOKEN:
      newState.token = action.data;
      break;
    default:
      return state;
  }

  return newState;
}
