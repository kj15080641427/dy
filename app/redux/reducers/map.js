import * as types from "../constants/map";
import moment from "moment";
const initState = {
  water: [],
  initWater: [],
  waterLoading: true,
  waterWarning: 0,
  flood: [],
  count: {},
  floodId: { id: "46010128" },
  floodName: "沂河路（玉苑小区）",
  waterId: "41800264", //stcd
  waterName: "明海（闸前）",
  historyFlood: [],
  historyWater: [],
  floodRain: [],
  initFlood: [],
  floodUser: [],

  //按照防汛人员id 为key的映射
  floodUserMap: {},
  //按照防汛专家id为key 的映射
  expertMap: {},

  floodLoading: true,
  expert: { all: [] },
  userMenuList: [],
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
          const items = {
            ...item.siteWaterLevels[0],
            ...(item.stiteWaterRadios ? { ...item.stiteWaterRadios[0] } : {}),
            ...item.riverwaterdataList[0],
            ...item,
          };
          waterList.push(items);
          if (items.z >= item.warning) {
            newState.waterWarning++;
          }
        } else {
          waterList.push(item);
        }
      });
      // waterList.sort((a, b) => moment(b.tm).unix() - moment(a.tm).unix());
      newState.water = waterList;
      newState.initWater = waterList;
      newState.waterLoading = false;
      break;
    case types.SET_FLOOD:
      action.data.forEach((item) => {
        if (item.riverwaterdataList && item.riverwaterdataList[0]) {
          floodList.push({
            ...item.riverwaterdataList[0],
            ...item,
            ...item.siteWaterPoints[0],
          });
        } else {
          floodList.push(item);
        }
      });
      newState.flood = floodList;
      newState.initFlood = floodList;
      newState.floodId = floodList?.[0];
      newState.floodName = newState.floodId?.aliasName;
      newState.floodLoading = false;
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
        item.tm = item.tm.slice(5, -3);
        item.z = (item.z * 100).toFixed(2);
        // let tm = item.tm.split(" ")[1].split(":");
        // if (tm[0] % 2 == 0 && tm[1] == "00") {
        //   historyFlood.unshift(item.z * 100);
        // }
      });
      action?.data?.records?.reverse();
      newState = { ...newState, historyFlood: action?.data?.records };
      break;
    case types.SET_FLOOD_RAIN:
      let list = [];
      action.data.forEach((item) => {
        // console.log((item.raindataList && item.raindataList[0]));
        if (item.raindataList) {
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
      let userMap = {};
      //按照防汛人员的id 建立索引，便于前端进行查找
      if (action.data && action.data.length !== 0) {
        action.data.forEach((item) => {
          let userId = item.userid;
          if (userId) {
            userMap[userId] = item;
          }
        });
      }
      newState = { ...newState, floodUser: action.data, floodUserMap: userMap };
      break;
    case types.SET_FLOOD_EXPERT:
      //按照专家的id 生成映射表。便于按照专家id进行查找
      let expertMap = {};
      if (action.data && action.data.all && action.data.all.length !== 0) {
        action.data.all.forEach((item) => {
          let userId = item.userid;
          if (userId) {
            expertMap[userId] = item;
          }
        });
      }
      newState = {
        ...newState,
        expert: action.data,
        expertMap: { ...expertMap },
      };
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
        item.userList.sort((item1, item2) => {
          return item1.unit.localeCompare(item2.unit, "zh-CN");
        });
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
    case types.SET_USER_MENU:
      newState = { ...newState, userMenuList: action.data };
      break;
    default:
      return newState;
  }
  return newState;
}
