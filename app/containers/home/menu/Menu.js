/**
 * Menu 2020-05-26
 */
import React from "react";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  FundViewOutlined,
  CloudOutlined,
  BankOutlined,
  ExceptionOutlined,
  HistoryOutlined,
  AliwangwangOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import "./style.scss";
const NewMenus = () => {
  const routerList = [
    {
      url: "/home/History",
      name: "历史数据",
      img: <HistoryOutlined />,
    },
    {
      url: "/home/DataMonitoring",
      name: "监测数据",
      img: <FundViewOutlined />,
    },
    {
      url: "/home/floodManagement",
      name: "防汛管理",
      img: <CloudOutlined />,
    },
    {
      url: "/home/publicSentiment",
      name: "舆情监测",
      img: <FundViewOutlined />,
    },
    {
      url: "/home/BasicData",
      name: "基础配置",
      img: <ExceptionOutlined />,
    },
    {
      url: "/home/SiteInfo",
      name: "站点信息",
      img: <BankOutlined />,
    },

    {
      url: "/home/chartGroup",
      name: "群聊管理",
      img: <AliwangwangOutlined />,
    },

    {
      url: "/home/dispatch",
      name: "应急调度",
      img: <ThunderboltOutlined />,
    },
    {
      url: "/home/System",
      name: "系统设置",
      img: <SettingOutlined />,
    },
  ];
  return (
    <div className="menu-layout">
      {routerList.map((item) => {
        return (
          <Link key={item.url} to={item.url}>
            <div className="router-item-style">
              <div
                className={
                  window.location.href.split("#")[1] == `${item.url}`
                    ? "router-selected"
                    : "router-unselected"
                }
              >
                <div className="router-item-style-img-div">{item.img}</div>
                <div className="router-item-text">{item.name}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default NewMenus;
