import * as types from "../constants/handStateType";
const initState = {
  visible: false,
  hourRain: "",
};
export default function handState(state = initState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.CHANGE_MODAL_VISIBLE: {
      newState = { ...newState, visible: action.data };
      break;
    }
    case types.SET_HOUR_RAIN:
      newState = { ...newState, hourRain: action.data };
      break;
    case types.SET_DAY_RAIN:
      newState = { ...newState, dayRain: action.data };
      break;
    case types.SET_SEVEN_DAY_RAIN:
      newState = { ...newState, sevenDayRain: action.data };
      break;
    case types.SET_DAY_WATER:
      newState = { ...newState, dayWater: action.data };
      break;
    case types.SET_DISPLAY_WATER:
      newState = { ...newState, displayWater: action.data };
      break;
    default:
      return state;
  }
  return newState;
}
