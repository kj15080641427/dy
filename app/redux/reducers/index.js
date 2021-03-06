import { combineReducers } from "redux";
// import userinfo from './userinfo';
import monitor from "./monitor";
import home from "./home";
import rain from "./rain";
import currency from "./currency";
import management from "../../containers/home/redux/reducers";
// import taskReducers from "../../containers/home/redux/taskReducers";
import rainReducers from "./rain";
import mapAboutReducers from "./map";
import handState from "./handState";
import floodModel from "./floodModel";
import taskReducers from "./taskEvent";
export default combineReducers({
  monitor,
  home,
  rain,
  currency,
  management,
  taskReducers,
  rainReducers,
  mapAboutReducers,
  handState,
  floodModel,
});
