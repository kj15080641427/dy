import { combineReducers } from 'redux';
// import userinfo from './userinfo';
import monitor from './monitor';
import home from "./home";

export default combineReducers({
  monitor,
  home
});