import { put, call, takeEvery, all, select } from "redux-saga/effects";
import * as types from '../constants/floodModel';
import * as actions from '../actions/floodModel';
import {
    queryModelNodes,
    queryPrediction,
    queryPredictionResult as queryResult,
    queryModelRunningState,
    startRunModel
} from '../../data/request';


function *queryModelNodesReq(data) {
    try {
        yield put({type: types.LOADING, data: {loading: true}});
        let result = yield call(queryModelNodes);

        if (result.code === 200) {
            yield put({type: types.MODEL_NODES_UPDATE, data: result.data });
        }

        yield put({type: types.LOADING, data: {loading: false}});
    } catch (e) {
        console.log(e);
    }
}

function *queryPredictions() {
    try {
        yield put({type: types.LOADING, data: {loading: true}});
        let result = yield call(queryPrediction);

        if (result.code === 200) {
            yield put({type: types.PREDICTIONS_UPDATE, data: result.data});
        }

        yield put({type: types.LOADING, data: {loading: false}});
    } catch (e) {
        console.log(e);
    }
}

function *queryPredictionResult(action) {
    try {
        yield put({type: types.LOADING, data: {loading: true}});
        let result = yield call(queryResult, {predictid: action.data.predictionId});

        if (result.code === 200) {
            yield put({type: types.PREDICTION_RESULT_UPDATE, data: result.data});
        }

        yield put({type: types.LOADING, data: {loading: false}});
    } catch (e) {
        console.log(e);
    }
}

function *selectPrediction(action) {
    try {
        yield put({type: types.LOADING, data: {loading: true}});
        yield put({type: types.QUERY_PREDICTION_RESULT, data: {predictionId: action.data.selectedId}});
        yield put({type: types.PREDICTION_SELECTED_UPDATE, data: {predictionId: action.data.selectedId}});
        yield put({type: types.LOADING, data: {loading: false}});
    } catch (e) {
        console.log(e);
    }
}

function *queryModelState() {
    try {
        let result = yield call(queryModelRunningState);

        if (result.code === 200) {
            let oldRunningStatus = yield select((state) => state.modelIsRunning);
            let newRunningStatus = result.data === 0;

            if (!oldRunningStatus && newRunningStatus) {
                yield put(actions.queryPredictions());
            }

            yield put({type: types.MODEL_STATE_UPDATE, data: {status: result.data === 0}});
        }
    } catch (e) {
        console.log(e);
    }
}

function *runModel(action) {
    try {
        const {runTimeString} = action.data;
        let result = yield call(startRunModel, {tm: runTimeString});

        if (result.code === 200) {
            yield put({type: types.MODEL_STATE_UPDATE, data: {status: true}});
        }
    } catch (e) {
        console.log(e);
    }
}


export default function *ModelFunction() {
    yield all([
        takeEvery(types.QUERY_MODEL_NODES, queryModelNodesReq),
        takeEvery(types.QUERY_PREDICTIONS, queryPredictions),
        takeEvery(types.QUERY_PREDICTION_RESULT, queryPredictionResult),
        takeEvery(types.SELECT_PREDICTION, selectPrediction),
        takeEvery(types.QUERY_MODEL_STATE, queryModelState),
        takeEvery(types.RUN_MODEL, runModel)
    ]);
}
