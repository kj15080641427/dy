import { SET_RAIN_STORM } from "./types";
const initState = {
  rainStorm: [],
};

export default function taskReducers2(state = { initState }, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_RAIN_STORM:
      newState = { ...newState, rainStorm: action.data };
      break;

    default:
      break;
  }
  return newState;
}
