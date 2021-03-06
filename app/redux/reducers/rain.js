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
        // type:action.
      };
      break;
    case ActionType.UPDATE_RAIN_STATION:
      let data = action.payload.data;
      let tableList = data.map((item) => ({
        ...item,
        type: "Point",
        ...item?.raindataList[0],
      }));

      // for (let i in data) {
      //   if (data[i].raindataList && data[i].raindataList[0]) {
      //     if (data[i].raindataList[0].dayDrp) {
      //       tableList.push({ ...data[i], ...data[i].raindataList[0] });
      //     }
      //     list.push({
      //       ...data[i],
      //       ...data[i].raindataList[0],
      //       ...data[i].siteRain[0],
      //       type: "Point",
      //     });
      //   }
      // }
      newState = {
        ...state,
        stations: tableList,
        rain: action.payload.data,
        tableList: list,
      };
      break;
    default:
      return newState;
  }
  return newState;
}
