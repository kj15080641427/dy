import * as types from '../constants/floodModel';

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
    modelIsRunning: false
};

export default function floodModel(state = initState, action) {
    const {type, data} = action;
    let newState = {...state};

    switch (type) {
        case types.MODEL_NODES_UPDATE:
            let nodesMap = {};
            data.forEach(item => {
                nodesMap[item.siteNodeId] = {...item};
            });
            newState.nodes = [...data];
            newState.nodesMap = nodesMap;
            break;
        case types.PREDICTIONS_UPDATE:
            newState.predictions = [...data];
            break;
        case types.PREDICTION_RESULT_UPDATE:
            newState.result = {};

            data.forEach(item => {
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
        default:
            break;
    }

    return newState;
}
