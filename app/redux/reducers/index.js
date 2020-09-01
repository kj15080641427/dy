import { combineReducers } from "redux";
// import userinfo from './userinfo';
import monitor from "./monitor";
import home from "./home";
import rain from "./rain";
import currency from "./currency";
import management from "../../containers/home/redux/reducers";
export default combineReducers({
  monitor,
  home,
  rain,
  currency,
  management,
});
