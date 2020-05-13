/*
 *  reducer
 */
import * as actionTypes from '../constants/monitor';

const defaultState = {
  
}

export default function main (state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.TEST:{
      
      break;
    }
    
    default:
      return state;
  }
  
  return newState;
}