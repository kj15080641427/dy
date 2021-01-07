import {
  getSiteWaterType,
  setPagination,
  addSiteWaterType,
  DELETE_SITE_WATER,
  UPDATA_SITE_WATER,
} from "./types";
import * as types from "./types";
import {} from "./types";
import { SHOW_MODAL, HIDE_MODAL } from "../../../redux/constants/home";
export const getSiteWaterAction = (data) => {
  // 获取站点数据

  return {
    type: getSiteWaterType,
    data,
  };
};
export const setPaginationType = (data) => {
  // 分页

  return {
    type: setPagination,
    data,
  };
};
export const addSiteWater = (data) => {
  return {
    type: addSiteWaterType,
    data,
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
  };
};
export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};
// 删除站点水位

export const deleteSiteWater = (data) => {
  return {
    type: DELETE_SITE_WATER,
    data,
  };
};
// 修改站点水位

export const updateSiteWater = (data) => {
  return {
    type: UPDATA_SITE_WATER,
    data,
  };
};
// 删除权限

export const deletePermissionData = (data) => {
  return {
    type: types.DELETE_PERMISSION_DATA,
    data,
  };
};
// 添加权限

export const addPermissionData = (data) => {
  return {
    type: types.ADD_PERMISSION_DATA,
    data,
  };
};
// 修改权限

export const updatePermissionData = (data) => {
  return {
    type: types.UPDATE_PERMISSON_DATA,
    data,
  };
};
// 根据角色id查询权限

export const getPermissionDataById = (data) => {
  return {
    type: types.GET_PERMISSION_DATA_BY_ID,
    data,
  };
};
// 关闭modal

export const hideRPModal = (data) => {
  return {
    type: types.HIDE_R_P_MODAL,
    data,
  };
};
// 授权

export const setRolePermission = (data) => {
  return {
    type: types.SET_ROLE_PERMISSION,
    data,
  };
};
// 设置选中项
export const setSelectList = (data) => {
  return {
    type: types.SET_SELECT_LIST,
    data,
  };
};

// 查询

export const getBase = (data) => {
  return {
    type: types.GET_BASE,
    data,
  };
};
// 添加 /修改

export const addOrUpdateBase = (data) => {
  return {
    type: types.ADD_OR_UPD_BASE,
    data,
  };
};
// 删除

export const delBase = (data) => {
  return {
    type: types.DEL_BASE,
    data,
  };
};
//显示关联站点modal
export const showSiteRelationModal = (data) => {
  return {
    type: types.SITE_RELATION_MODAL,
    data,
  };
};
//添加站点关系
export const addSiteRelation = (data) => {
  return {
    type: types.ADD_SITE_RELATION,
    data,
  };
};
//只读table getall
export const readOnlyTableGetAll = (data) => {
  return {
    type: types.READ_ONLY_TABLE_GETALL,
    data,
  };
};

//选中
export const selectTable = (data) => {
  return {
    type: types.SELECT_TABLE,
    data,
  };
};
// 获取字典
export const getDict = (data) => {
  return {
    type: types.GET_DICT,
    data,
  };
};

//
export const getCountStation = (data) => {
  return {
    type: types.GET_COUNT_STATION,
    data,
  };
};
export const setCountStation = (data) => {
  return {
    type: types.SET_COUNT_STATION,
    data,
  };
};
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
export const recallTask = (data) => {
  return {
    type: types.RECALL_TASK,
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

//获取区县
export const getArea = (data) => {
  return {
    type: types.GET_AREA,
    data,
  };
};

//获取舆情
export const getRainStorm = (data) => {
  return {
    type: types.GET_RAIN_STORM,
    data,
  };
};
//获取舆情主题数量
export const getRainStormType = (data) => {
  return {
    type: types.GET_RAIN_STORM_NUM,
    data,
  };
};
