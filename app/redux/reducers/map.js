import * as types from "../constants/map";
import moment from "moment";
const initState = {
  water: [],
  initWater: [],
  waterWarning: 0,
  flood: [],
  count: {},
  floodId: "46660007",
  floodName: "东八路南涵洞（东）",
  waterId: "41801500", //stcd
  waterName: "石村站",
  historyFlood: [],
  historyWater: [],
  floodRain: [],
};
export default function mapAboutReducers(state = initState, action) {
  let newState = Object.assign({}, state);
  let waterList = [];
  let floodList = [];
  let historyWater = [];
  let historyFlood = [];
  switch (action.type) {
    case types.SET_WATER:
      action.data.forEach((item) => {
        if (item.riverwaterdataList && item.riverwaterdataList[0]) {
          const items = {
            ...item,
            ...item.riverwaterdataList[0],
            ...item.siteWaterLevels[0],
          };
          waterList.push(items);
          if (items.z >= item.warning) {
            newState.waterWarning++;
          }
        }
      });
      waterList.sort((a, b) => moment(b.tm).unix() - moment(a.tm).unix());
      newState.water = waterList;
      newState.initWater = action.data;
      break;
    case types.SET_FLOOD:
      action.data.forEach((item) => {
        if (
          item.riverwaterdataList &&
          item.riverwaterdataList[0] &&
          item.siteWaterPoints
        ) {
          floodList.push({
            ...item,
            ...item.riverwaterdataList[0],
            ...item.siteWaterPoints[0],
            z: (item.riverwaterdataList[0].z * 100).toFixed(2),
          });
        }
      });
      newState.flood = floodList;
      newState.initFlood = action.data;
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
    case types.SET_WATER_HISTORY: //水位实时数据
      action.data.data.records.map((item) => {
        let tm = item.tm.split(" ")[1].split(":");
        if (tm[0] % 2 == 0 && tm[1] == "00") {
          historyWater.unshift(item.z);
        }
      });
      newState = { ...newState, historyWater: historyWater };
      break;
    case types.CHANGE_FLOOD_ID: //改变易涝点id
      newState = {
        ...newState,
        floodId: action.data,
        floodName: action.data.name,
        floodWarning: action.data.siteWaterPoints
          ? action.data.siteWaterPoints[0].warning
          : null,
      };
      break;
    case types.CHANGE_WATER_ID: //改变水位id
      newState = {
        ...newState,
        waterId: action.data.id,
        waterName: action.data.name,
      };
      break;
    case types.SET_FLOOD_INFO_REALTIME: //易涝点实时数据
      action.data.records.map((item) => {
        let tm = item.tm.split(" ")[1].split(":");
        if (tm[0] % 2 == 0 && tm[1] == "00") {
          historyFlood.unshift(item.z * 10);
        }
      });
      newState = { ...newState, historyFlood: historyFlood };
      break;
    case types.SET_FLOOD_RAIN:
      let list = [];
      action.data.forEach((item) => {
        // console.log((item.raindataList && item.raindataList[0]));
        if (item.raindataList && item.raindataList[0]) {
          list.push({
            ...item,
            ...item.raindataList[0],
          });
        }
      });
      newState = { ...newState, floodRain: list };
      break;
    case types.SET_WAREHOUSE:
      let wareHouseTask = {};
      action.data.map((item) => {
        wareHouseTask[item.code] = item.materialList;
      });
      newState = {
        ...newState,
        wareHouse: action.data,
        wareHouseTask: wareHouseTask,
      };
      break;
    case types.SET_FLOOD_USER:
      action.data[1].phone = "18159774272";
      // action.data[0].phone = "1";
      newState = { ...newState, floodUser: action.data };
      break;
    case types.SET_FLOOD_EXPERT:
      newState = { ...newState, expert: action.data };
      break;
    case types.SET_MATERIAL_BY_ID:
      newState = { ...newState, material: action.data };
      break;
    case types.SET_FLOOD_RANK_USER:
      let count = 0;
      let rankSelect = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      let floodRanksUser = {
        city: [],
        dy: [],
        gr: [],
        lj: [],
        hk: [],
        kl: [],
      };
      action.data.map((item) => {
        switch (item.name) {
          case "市级防汛应急抢险队":
            floodRanksUser.city = item.userList;
            break;
          case "东营区防汛应急抢险队":
            floodRanksUser.dy = item.userList;
            break;
          case "垦利区防汛应急抢险队":
            floodRanksUser.kl = item.userList;
            break;
          case "利津县防汛应急抢险队":
            floodRanksUser.jl = item.userList;
            break;
          case "河口区防汛应急抢险队":
            floodRanksUser.hk = item.userList;
            break;
          case "广饶县防汛应急抢险队":
            floodRanksUser.gr = item.userList;
            break;
          default:
            break;
        }
        count = count + item.userList.length;
        item.userList.map((t) => {
          // console.log([`rank${item.floodRanksId}`][0]);
          rankSelect[item.floodRanksId].push(t.floodId);
        });
      });
      newState = {
        ...newState,
        floodRanks: action.data,
        floodRanksUser: floodRanksUser,
        expertCount: count,
        rankSelect: rankSelect,
      };
      break;
    case types.SET_WATER_WARNING:
      newState = { ...newState, warningInfo: action.data };
      break;
    default:
      return newState;
  }
  return newState;
}
