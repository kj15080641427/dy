import { put, call, takeEvery, all, select } from "redux-saga/effects";
import * as types from "../constants/floodModel";
import * as actions from "../actions/floodModel";
import {
  queryModelNodes,
  queryPrediction,
  queryPredictionResult as queryResult,
  queryModelRunningState,
  startRunModel,
  getModelWater,
  getModelFlood,
  getModelResult,
  getRainPred,
} from "../../data/request";

function* queryModelNodesReq(data) {
  try {
    yield put({ type: types.LOADING, data: { loading: true } });
    let result = yield call(queryModelNodes);

    if (result.code === 200) {
      yield put({ type: types.MODEL_NODES_UPDATE, data: result.data });
    }

    yield put({ type: types.LOADING, data: { loading: false } });
  } catch (e) {
    console.log(e);
  }
}
//预报列表
function* queryPredictions() {
  try {
    yield put({ type: types.LOADING, data: { loading: true } });
    //模型列表
    let result = yield call(queryPrediction);
    if (result.code === 200) {
      yield put({ type: types.PREDICTIONS_UPDATE, data: result.data });
      //水位列表
      let water = yield call(getModelWater, {});
      if (water.code === 200 && result.data) {
        yield put({ type: types.SET_DEFAULT_WATER, data: water });
      }
      //积水点列表
      let flood = yield call(getModelFlood, {});
      if (flood.code === 200 && result.data) {
        yield put({ type: types.SET_DEFAULT_FLOOD, data: flood });
      }
    }
    //loading
    yield put({ type: types.LOADING, data: { loading: false } });
  } catch (e) {
    console.log(e);
  }
}

function* queryPredictionResult(action) {
  try {
    yield put({ type: types.LOADING, data: { loading: true } });
    let result = yield call(queryResult, {
      predictid: action.data.predictionId,
    });

    if (result.code === 200) {
      yield put({ type: types.PREDICTION_RESULT_UPDATE, data: result.data });
    }

    yield put({ type: types.LOADING, data: { loading: false } });
  } catch (e) {
    console.log(e);
  }
}

function* selectPrediction(action) {
  try {
    yield put({ type: types.LOADING, data: { loading: true } });
    yield put({
      type: types.QUERY_PREDICTION_RESULT,
      data: { predictionId: action.data.selectedId },
    });
    yield put({
      type: types.PREDICTION_SELECTED_UPDATE,
      data: { predictionId: action.data.selectedId },
    });
    yield put({ type: types.LOADING, data: { loading: false } });
  } catch (e) {
    console.log(e);
  }
}

function* queryModelState() {
  try {
    let result = yield call(queryModelRunningState);

    if (result.code === 200) {
      let oldRunningStatus = yield select((state) => state.modelIsRunning);
      let newRunningStatus = result.data === 0;

      if (!oldRunningStatus && newRunningStatus) {
        yield put(actions.queryPredictions());
      }

      yield put({
        type: types.MODEL_STATE_UPDATE,
        data: { status: result.data === 0 },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* runModel(action) {
  try {
    const { runTimeString } = action.data;
    let result = yield call(startRunModel, { tm: runTimeString });

    if (result.code === 200) {
      yield put({ type: types.MODEL_STATE_UPDATE, data: { status: true } });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getModelWaterSaga() {
  try {
    let result = yield call(getModelWater, {});

    if (result.code === 200) {
      yield put({ type: types.SET_DEFAULT_WATER, data: result });
    }
  } catch (e) {
    console.log(e);
  }
}
function* getModelFloodSaga() {
  try {
    let result = yield call(getModelFlood, {});

    if (result.code === 200) {
      yield put({ type: types.SET_DEFAULT_FLOOD, data: result });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getModelResultSaga({ data }) {
  try {
    let result = yield call(getModelResult, data);

    if (result.code === 200) {
      yield put({ type: types.SET_MODEL_RESULT, data: result });
    }
  } catch (e) {
    console.log(e);
  }
}
function* getModelResultFloodSaga({ data }) {
  try {
    let result = yield call(getModelResult, data);

    if (result.code === 200) {
      yield put({ type: types.SET_MODEL_FLOOD_RESULT, data: result });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getRainPrediction({ data }) {
  try {
    let result = yield call(getRainPred, data);

    if (result.code === 200) {
      yield put({ type: types.SET_RAIN_PREDICTION, data: result });
    }
  } catch (e) {
    console.log(e);
  }
}
export default function* ModelFunction() {
  yield all([
    takeEvery(types.QUERY_MODEL_NODES, queryModelNodesReq),
    takeEvery(types.QUERY_PREDICTIONS, queryPredictions),
    takeEvery(types.QUERY_PREDICTION_RESULT, queryPredictionResult),
    takeEvery(types.SELECT_PREDICTION, selectPrediction),
    takeEvery(types.QUERY_MODEL_STATE, queryModelState),
    takeEvery(types.RUN_MODEL, runModel),
    takeEvery(types.GET_MODEL_WATER, getModelWaterSaga),
    takeEvery(types.GET_MODEL_FLOOD, getModelFloodSaga),
    takeEvery(types.GET_MODEL_RESULT, getModelResultSaga),
    takeEvery(types.GET_MODEL_FLOOD_RESULT, getModelResultFloodSaga),
    takeEvery(types.GET_RAIN_PREDICTION, getRainPrediction),
  ]);
}
