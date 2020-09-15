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
  let historyWater = [];
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
    case types.SET_WATER_HISTORY:
      action.data.data.records.map((item) => {
        let tm = item.tm.split(" ")[1].split(":");
        if (tm[0] % 2 == 0 && tm[1] == "00") {
          console.log(item);
          historyWater.unshift(item.z);
        }
      });
      newState = { ...newState, historyWater: historyWater };
      break;
    default:
      return newState;
  }
  return newState;
}
