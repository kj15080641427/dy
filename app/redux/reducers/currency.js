import * as actionTypes from "../constants/home";
import * as types from "../constants/map";
export default function currency(state = {}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.CURRENCY:
      //saga在put时在payload对象中传入key作为store的key值	payload: { data: data,key:'baseSite' }
      newState[action.payload.key] = action.payload.data;
      // console.log(action,'ACTION')
      break;
    case actionTypes.SHOW_MODAL:
      newState = { ...newState, visible: true };
      break;
    case actionTypes.HIDE_MODAL:
      newState = { ...newState, visible: false };
      break;
    case actionTypes.SET_DICT:
      newState = { ...newState, dict: action.data };
      break;
    case types.SET_ALARM_DATA:
      newState = { ...newState, alarmData: action.data };
      break;
    default:
      return state;
  }

  return newState;
}
