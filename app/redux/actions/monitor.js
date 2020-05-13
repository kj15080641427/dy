import * as actionTypes from '../constants/monitor';

export function test(data) {
  return {
    type: actionTypes.TEST,
    data
  };
}