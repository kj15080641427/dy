import * as ActionType from "../constants/rain";

/**
 *
 * @param state
 * @param action
 */
export default function rainReducers(state = {}, action) {
  let newState = Object.assign({}, state);
  let list = [];

  switch (action.type) {
    case ActionType.UPDATE_RAIN:
      newState = {
        ...state,
        rainData: { ...action.payload },
      };
      break;
    case ActionType.UPDATE_RAIN_STATION:
      let data = action.payload.data;
      for (let i in data) {
        if (data[i].raindataList && data[i].raindataList[0]) {
          list.push({
            ...data[i],
            ...data[i].raindataList[0],
            ...data[i].siteRain[0],
            type: "Point",
          });
        }
      }
      newState = {
        ...state,
        stations: list,
        rain: action.payload.data,
      };
      break;
    default:
      return newState;
  }
  return newState;
}
