import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import configureStore from "./redux/store";
import zhCN from "antd/lib/locale/zh_CN";
import { App } from "./app";
import moment from "moment";
import "moment/locale/zh-cn";
import "./style.scss";
moment.locale("zh-cn");
const store = configureStore({});
const config = {
  locale: zhCN,
};
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider {...config}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
