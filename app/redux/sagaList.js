import initialize from "./saga";
import management from "../containers/home/redux/saga"; // 后台管理
import mapAbout from "./saga/map";
export const sagaList = [initialize, management, mapAbout];
