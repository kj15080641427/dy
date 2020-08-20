import * as actionTypes from "../constants/home";

export default function currency(state = {}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.CURRENCY:
      //saga在put时在payload对象中传入key作为store的key值	payload: { data: data,key:'baseSite' }
      newState[action.payload.key] = action.payload.data;
      break;
    case actionTypes.SHOW_MODAL:
      console.log(action,'ACTION')
      newState = { ...newState, visible: true };
      break;
    case actionTypes.HIDE_MODAL:
      newState = { ...newState, visible: false };
      break;
    default:
      return state;
  }

  return newState;
}
