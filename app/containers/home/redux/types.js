export const GET_BASE = "GET_BASE"; //查询
export const ADD_OR_UPD_BASE = "ADD_OR_UPD_BASE"; //添加修改
export const DEL_BASE = "DEL_BASE"; //删除

export const SET_ROLE_PERMISSION = "SET_ROLE_PERMISSION"; //授权

export const getSiteWaterType = "GET_SITE_RAIN_DATA"; //获取站点水位
export const setPagination = "SET_PAGINATION"; //table分页...
export const startLoading = "START_LOADING"; //表格loading
export const endLoading = "END_LOADING"; //表格loading

export const addSiteWaterType = "ADD_SITE_WATER"; //添加站点水位
export const SHOW_MODAL = "SHOW_MODAL"; //
export const HIDE_MODAL = "HIDE_MODAL"; //
export const DELETE_SITE_WATER = "DELETE_SITE_WATER"; //删除站点水位
export const UPDATA_SITE_WATER = "UPDATE_SITE_WATER"; //修改站点水位

export const DELETE_PERMISSION_DATA = "DELETE_PERMISSION_DATA"; //删除权限数据
export const ADD_PERMISSION_DATA = "ADD_PERMISSION_DATA"; //增加权限
export const UPDATE_PERMISSON_DATA = "UPDATE_PERMISSION_DATA"; //修改权限

export const SITE_RELATION_MODAL = "SITE_RELATION_MODAL"; //显示站点关系modal
export const ADD_SITE_RELATION = "ADD_SITE_RELATION"; //添加站点关系

export const GET_PERMISSION_DATA_BY_ID = "GET_PERMISSION_DATA_BY_ID"; //根据角色查询权限
export const SET_R_P_SELECT_LIST = "SET_R_P_SELECT_LIST"; //授权页面自动选中已拥有权限
export const SHOW_R_P_MODAL = "SHOW_R_P_MODAL"; //
export const HIDE_R_P_MODAL = "HIDE_R_P_MODAL"; //
export const SET_SELECT_LIST = "SET_SELECT_LIST"; //设置选中项

export const READ_ONLY_TABLE_GETALL = "READ_ONLY_TABLE_GETALL"; //只读table  GetAll

export const HAND_ONLY_TABLE = "HAND_ONLY_TABLE"; //处理getall数据

export const READ_ONLY_TABLE_LOADING = "READ_ONLY_TABLE_LOADING"; //只读table loading

export const SELECT_TABLE = "SELECT_TABLE";

export const GET_DICT = "GET_DICT"; //获取字典
export const SET_DICT = "SET_DICT"; //设置字典

export const GET_COUNT_STATION = "GET_COUNT_STATION"; //获取站点来源  getCountStation
export const SET_COUNT_STATION = "SET_COUNT_STATION"; //设置数据

export const GET_FLOOD_EXPERT = "GET_FLOOD_EXPERT"; //防汛专家
export const GET_FLOOD_RANK_USER = "GET_FLOOD_RANK_USER"; //防汛队伍
export const SET_TASK_INFO = "SET_TASK_INFO"; //事件详情
export const SEND_MESSAGE = "SEND_MESSAGE"; //发送消息
export const GET_MESSAGE = "GET_MESSAGE"; //查询消息
export const SET_MESSAGE = "SET_MESSAGE"; //设置消息
export const GET_TASKEVENT_LIST = "GET_TASKEVENT_LIST"; //分页查询事件
export const SET_TASKEVENT_LIST = "SET_TASKEVENT_LIST"; //设置事件
export const ADD_TASK_EVENT = "ADD_TASK_EVENT"; //新增事件
export const SET_MODAL_VISIBLE = "SET_MODAL_VISIBLE"; //弹窗
export const CHANGE_TASK_INPUT = "CHANGE_TASK_INPUT"; //查询事件

export const SET_EXPERT_MODAL = "SET_EXPERT_MODAL"; //专家调度弹窗
export const GET_FLOOD_ADDRESS = "GET_FLOOD_ADDRESS"; //定位
export const SET_FLOOD_ADDRESS = "SET_FLOOD_ADDRESS"; //定位
export const GET_FLOOD_USER = "GET_FLOOD_USER"; //所有防汛人员

export const GET_TASK_DISPATCH_EXPERT = "GET_TASK_DISPATCH_EXPERT"; //根据事件查询已调度专家
export const SET_TASK_DISPATCH_EXPERT = "SET_TASK_DISPATCH_EXPERT";
export const ADD_EXPERT_DISPATCH = "ADD_EXPERT_DISPATCH"; //新增专家调度

export const GET_USER_DISPATCH = "GET_USER_DISPATCH"; //根据事件查询已调度人员
export const SET_USER_DISPATCH = "SET_USER_DISPATCH";
export const ADD_USER_DISPATCH = "ADD_USER_DISPATCH"; //新增人员调度

export const GET_MATERIAL_DISPATCH = "GET_MATERIAL_DISPATCH"; //根据事件查询已调度物资
export const SET_MATERIAL_DISPATCH = "SET_MATERIAL_DISPATCH";
export const ADD_MATERIAL_DISPATCH = "ADD_MATERIAL_DISPATCH"; //新增物资调度
export const CHANGE_TASK_RENDER_LIST = "CHANGE_TASK_RENDER_LIST"; //调度list组件
export const CHANGE_TASK_RADIO = "CHANGE_TASK_RADIO"; //单选框

//防汛仓库
export const GET_WAREHOUSE = "GET_WAREHOUSE";
export const SET_WAREHOUSE = "WARE_WAREHOUSE";

//选择人员
export const SET_FORM_USER = "SET_FORM_USER";

//选择物资
export const SET_MATERIAL_TABLE_INPUT = "SET_MATERIAL_TABLE_INPUT";
//事件调整modal
export const SET_TASKUPDATE_MODAL = "SET_TASKUPDATE_MODAL";
//修改事件
export const UPDATE_TASK_INFO = "UPDATE_TASK_INFO";
//删除事件
export const DELETE_TASK_INFO = "DELETDE_TASK_INFO";
//
// export const ROUTER_BACK
//取消事件
export const RECALL_TASK = "RECALL_TASK";
//完成事件
export const COMPLETE_TASK = "COMPLETE_TASK";
//查询事件流程
export const GET_TASK_TIMELINE = "GET_TASK_TIMELINE";
export const SET_TASK_TIMELINE = "SET_TASK_TIMELINE";
//反馈事件
export const FEED_TASK = "FEED_TASK";
//事件反馈modal
export const FEED_TASK_MODAL = "FEED_TASK_MODAL";

//获取行政区域
export const GET_AREA = "GET_AREA";
export const SET_AREA = "SET_AREA";
