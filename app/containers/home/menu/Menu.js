/**
 * Menu 2020-05-26
 */
import React from "react";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  FundViewOutlined,
  CloudOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  HistoryOutlined
} from "@ant-design/icons";
import "./style.scss";
const NewMenus = () => {
  const routerList = [
    {
      url: "/home/",
      name: "首页",
      img: <ContainerOutlined />,
    },
    {
      url: '/home/History',
      name: '历史数据',
      img : <HistoryOutlined />
    },
    {
      url: "/home/DataMonitoring",
      name: "监测数据",
      img: <FundViewOutlined />,
    },
    {
      url: "/home/System",
      name: "系统设置",
      img: <SettingOutlined />,
    },
    {
      url: "/home/floodManagement",
      name: "防汛管理",
      img: <CloudOutlined />,
    },

    {
      url: "/home/BasicData",
      name: "基础信息",
      img: <MailOutlined />,
    },
    {
      url: "/home/SiteInfo",
      name: "站点信息",
      img: <DesktopOutlined />,
    },

    {
      url: "/home/chartGroup",
      name: "群聊管理",
      img: <PieChartOutlined />,
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
