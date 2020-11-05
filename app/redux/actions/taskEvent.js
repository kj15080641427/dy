import * as types from "../constants/taskEvent";
//防汛专家
export const getFloodExpert = (data) => {
  return {
    type: types.GET_FLOOD_EXPERT,
    data,
  };
};
//获取防汛队伍人员
export const getFloodRankUser = (data) => {
  return {
    type: types.GET_FLOOD_RANK_USER,
    data,
  };
};
//发送消息
export const sendMessage = (data) => {
  return {
    type: types.SEND_MESSAGE,
    data,
  };
};
//查询消息
export const getMessage = (data) => {
  return {
    type: types.GET_MESSAGE,
    data,
  };
};
//查询事件
export const getTaskList = (data) => {
  return {
    type: types.GET_TASKEVENT_LIST,
    data,
  };
};
//事件详情
export const setTaskInfo = (data) => {
  return {
    type: types.SET_TASK_INFO,
    data,
  };
};
//新增事件
export const addTaskEvent = (data) => {
  return {
    type: types.ADD_TASK_EVENT,
    data,
  };
};
//新增事件
export const setModalVislble = (data) => {
  return {
    type: types.SET_MODAL_VISIBLE,
    data,
  };
};
//改变input值
export const changeTaskInput = (data) => {
  return {
    type: types.CHANGE_TASK_INPUT,
    data,
  };
};
//专家调度弹窗
export const setExpertModal = (data) => {
  return {
    type: types.SET_EXPERT_MODAL,
    data,
  };
};
//定位
export const getFloodAddress = (data) => {
  return {
    type: types.GET_FLOOD_ADDRESS,
    data,
  };
};
//所有防汛人员
export const getAllFloodUser = (data) => {
  return {
    type: types.GET_FLOOD_USER,
    data,
  };
};
//根据事件查询已调度专家
export const getTaskDispatchExpert = (data) => {
  return {
    type: types.GET_TASK_DISPATCH_EXPERT,
    data,
  };
};
//新增专家调度
export const addExpertDispatch = (data) => {
  return {
    type: types.ADD_EXPERT_DISPATCH,
    data,
  };
};
//根据事件查询已调度人员
export const getUserDispatch = (data) => {
  return {
    type: types.GET_USER_DISPATCH,
    data,
  };
};
//新增人员调度
export const addUserDispatch = (data) => {
  return {
    type: types.ADD_USER_DISPATCH,
    data,
  };
};
//根据事件查询已调度物资
export const getMaterialDispatch = (data) => {
  return {
    type: types.GET_MATERIAL_DISPATCH,
    data,
  };
};
//新增物资调度
export const addMaterialDispatch = (data) => {
  return {
    type: types.ADD_MATERIAL_DISPATCH,
    data,
  };
};

//调度list组件
export const changeTaskRenderList = (data) => {
  return {
    type: types.CHANGE_TASK_RENDER_LIST,
    data,
  };
};

//单选框组件
export const changeTaskRadioType = (data) => {
  return {
    type: types.CHANGE_TASK_RADIO,
    data,
  };
};

//获取防汛仓库
export const getWarehouse = (data) => {
  return {
    type: types.GET_WAREHOUSE,
    data,
  };
};
//选择人员
export const setFormUser = (data) => {
  return {
    type: types.SET_FORM_USER,
    data,
  };
};

//选择table输入框
export const setMaterialTableInput = (data) => {
  return {
    type: types.SET_MATERIAL_TABLE_INPUT,
    data,
  };
};
//事件调整modal
export const setTaskUpdateModal = (data) => {
  return {
    type: types.SET_TASKUPDATE_MODAL,
    data,
  };
};
//修改事件
export const updateTaskInfo = (data) => {
  return {
    type: types.UPDATE_TASK_INFO,
    data,
  };
};
//删除事件
export const deleteTaskInfo = (data) => {
  return {
    type: types.DELETE_TASK_INFO,
    data,
  };
};
//取消事件
export const endTask = (data) => {
  return {
    type: types.END_TASK,
    data,
  };
};
//完成事件
export const completeTask = (data) => {
  return {
    type: types.COMPLETE_TASK,
    data,
  };
};
//查询事件流程
export const getTaskTimeLine = (data) => {
  return {
    type: types.GET_TASK_TIMELINE,
    data,
  };
};
//反馈事件modal
export const setFeedTaskModal = (data) => {
  return {
    type: types.FEED_TASK_MODAL,
    data,
  };
};
//人员定位
export const setMapUserPosition = (data) => {
  return {
    type: types.SET_MAP_USER_POSITION,
    data,
  };
};

//事件来源统计
export const getTaskCountSource = (data) => {
  return {
    type: types.GET_TASK_COUNT_SOURCE,
    data,
  };
};
//事件等级统计
export const getTaskCountGrade = (data) => {
  return {
    type: types.GET_TASK_COUNT_GRADE,
    data,
  };
};
//事件状态统计
export const getTaskCountState = (data) => {
  return {
    type: types.GET_TASK_COUNT_STATE,
    data,
  };
};
