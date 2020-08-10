import { combineReducers } from 'redux';
// import userinfo from './userinfo';
import monitor from './monitor';
import home from "./home";
import rain from './rain';

export default combineReducers({
  monitor,
  home,
  rain
});
