import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from "./redux/store";
import { App } from "./app";
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./style.scss";
moment.locale('zh-cn');
const store = configureStore({});
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);