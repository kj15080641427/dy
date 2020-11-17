import * as types from "../constants/floodModel";

const initState = {
  //当前参与计算的节点
  nodes: [],
  //节点集合
  nodesMap: {},
  //当前所有站点基础信息
  stations: [],
  //当前预报列表
  predictions: [],
  //当前正在查看的预报id
  selectedPredictionId: -1,
  //预报结果列表
  result: {},
  //是否正在请求
  loading: false,
  //模型是否正在运行中
  modelIsRunning: false,
  //水位
  modelWater: [],
  //积水点
  modelFlood: [],
  //水位预报结果
  modelResult: [],
  //积水预报结果
  modelFloodResult: [],
  //默认选择预报
  defaultPred: {},
  defaultWater: {},
  defaultFlood: {},
  rainPred: [],
};

export default function floodModel(state = initState, action) {
  const { type, data } = action;
  let newState = { ...state };

  switch (type) {
    case types.MODEL_NODES_UPDATE:
      let nodesMap = {};
      data.forEach((item) => {
        nodesMap[item.siteNodeId] = { ...item };
      });
      newState.nodes = [...data];
      newState.nodesMap = nodesMap;
      break;
    case types.PREDICTIONS_UPDATE:
      let pres = [...data];
      //倒序排列
      pres = pres.reverse();
      newState.predictions = pres;
      newState.defaultPred = pres[0];
      break;
    case types.PREDICTION_RESULT_UPDATE:
      newState.result = {};

      data.forEach((item) => {
        let key = item.siteNodeId;
        if (!newState.result[key]) {
          newState.result[key] = [];
        }

        let values = newState.result[key];
        values.push(item);
      });
      break;
    case types.SELECT_PREDICTION:
      newState.selectedPredictionId = data.selectedId;
      break;
    case types.MODEL_STATE_UPDATE:
      newState.modelIsRunning = data.status;
      break;
    case types.SET_DEFAULT_WATER:
      newState.defaultWater = data.data[0];
      newState.modelWater = data.data;
      break;
    case types.SET_DEFAULT_FLOOD:
      newState.defaultFlood = data.data[0];
      newState.modelFlood = data.data;
      break;
    case types.SET_MODEL_RESULT:
      newState.modelResult = data.data;
      break;
    case types.SET_MODEL_FLOOD_RESULT:
      newState.modelFloodResult = data.data;
      break;
    case types.SET_DEFAULT_PRED:
      newState.defaultPred = data;
      break;
    case types.SET_RAIN_PREDICTION:
      console.log(data, "DD");
      newState.rainPred = data.data;
      break;
    default:
      break;
  }

  return newState;
}
