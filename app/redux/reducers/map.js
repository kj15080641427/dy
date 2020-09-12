import * as types from "../constants/map";

const initState = {
  water: [],
  flood: [],
  count: {},
};
export default function mapAboutReducers(state = initState, action) {
  let newState = Object.assign({}, state);
  let waterList = [];
  let floodList = [];
  switch (action.type) {
    case types.SET_WATER:
      action.data.forEach((item) => {
        if (item.riverwaterdataList && item.riverwaterdataList[0]) {
          waterList.push({
            ...item,
            ...item.riverwaterdataList[0],
            ...item.siteWaterLevels[0],
          });
        }
        newState.water = waterList;
      });
      break;
    case types.SET_FLOOD:
      console.log(action.data, "REDUCER");
      action.data.forEach((item) => {
        if (item.riverwaterdataList && item.riverwaterdataList[0]) {
          floodList.push({
            ...item,
            ...item.riverwaterdataList[0],
          });
        }
      });
      newState.flood = floodList;
      break;
    case types.SET_COUNT_STATION:
      newState = {
        ...newState,
        count: {
          raincount: action.data[0],
          watercount: action.data[1],
          floodcount: action.data[2],
          vodeocount: action.data[3],
        },
      };
      break;
    default:
      return newState;
  }
  return newState;
}
