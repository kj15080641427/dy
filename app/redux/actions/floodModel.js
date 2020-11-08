import * as types from "../constants/floodModel";

export function queryModelNodesAction() {
  return {
    type: types.QUERY_MODEL_NODES,
  };
}

export function queryPredictions() {
  return {
    type: types.QUERY_PREDICTIONS,
  };
}

export function selectPrediction(id) {
  return {
    type: types.SELECT_PREDICTION,
    data: {
      selectedId: id,
    },
  };
}

export function queryPredictionResult(id) {
  return {
    type: types.QUERY_PREDICTION_RESULT,
    data: {
      predictionId: id,
    },
  };
}

export function loading(flag) {
  return {
    type: types.LOADING,
    data: {
      loading: flag,
    },
  };
}

export function updateModelState(state) {
  return {
    type: types.MODEL_STATE_UPDATE,
    data: {
      state: state,
    },
  };
}

export function queryModelState() {
  return {
    type: types.QUERY_MODEL_STATE,
  };
}

export function runModel(time) {
  return {
    type: types.RUN_MODEL,
    data: {
      runTimeString: time.format("yyyyMMDDHH00"),
    },
  };
}
export const getModelWaterType = (data) => {
  return {
    type: types.GET_MODEL_WATER,
    data,
  };
};
export const getModelFloodType = (data) => {
  return {
    type: types.GET_MODEL_FLOOD,
    data,
  };
};
export const getModelResult = (data) => {
  return {
    type: types.GET_MODEL_RESULT,
    data,
  };
};
export const getModelFloodResult = (data) => {
  return {
    type: types.GET_MODEL_FLOOD_RESULT,
    data,
  };
};
//默认预报
export const setDefaultPred = (data) => {
  return {
    type: types.SET_DEFAULT_PRED,
    data,
  };
};
//降雨预报
export const getRainPred = (data) => {
  return {
    type: types.GET_RAIN_PREDICTION,
    data,
  };
};