import initialize from "./saga";
import management from "../containers/home/redux/saga"; // 后台管理
import mapAbout from "./saga/map";
import handState from './saga/handState';
import ModelFunction from './saga/floodModel';

export const sagaList = [initialize, management, mapAbout, handState, ModelFunction];
