/*
 *  reducer
 */
import * as actionTypes from '../constants/home';

const defaultState = {
  
};

export default function main (state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.INIT_BASE_DATA: {
      let data = action.data;
      newState = Object.assign({}, newState, data);
      break;
    }
    default:
      return state;
  }
  
  return newState;
}