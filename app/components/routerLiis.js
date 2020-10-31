/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
import { Col } from "antd";
import display from "../resource/icon/display.svg";
import waterRouter from "../resource/icon/waterRouter.svg";
import rain from "../resource/icon/rain.svg";
import easyflood from "../resource/icon/easyflood.svg";
import video from "../resource/icon/videoTitle.svg";
import floodmaterial from "../resource/icon/floodmaterial.svg";
import notices from "../resource/icon/notices.svg";
import ocean from "../resource/icon/ocean.svg";
import yellowRiver from "../resource/icon/yellowRiver.svg";
import home from "../resource/icon/home.svg";
import forecast from "../resource/icon/forecast.svg";
import task from "../resource/task.svg";
import device from "../resource/icon/device.svg";
const innerWidth = document.body.clientWidth;
class RouterList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRain: false,
      showSea: false,
      weatherData: {}, //天气信息
    };
  }

  routerList = [
    // {
    //   text: "数据中心",
    //   imgurl: display,
    //   routerUrl: innerWidth > 3000 ? "/display" : "/displaySmall",
    // },
    {
      text: "河流水情",
      imgurl: waterRouter,
      routerUrl: "/water",
    },
    {
      text: "雨情监测",
      imgurl: rain,
      routerUrl: "/rain",
    },
    {
      text: "城市防汛",
      imgurl: easyflood,
      routerUrl: "/easyflood",
    },
    {
      text: "视频监控",
      imgurl: video,
      routerUrl: "/video",
    },
    {
      text: "任务调度",
      imgurl: task,
      routerUrl: "/taskInfo",
    },
    {
      text: "设备管理",
      imgurl: device,
      routerUrl: "/device",
    },
    {
      text: "防汛资源",
      imgurl: floodmaterial,
      routerUrl: "/floodwarning",
    },
    {
      text: "汛情快报",
      imgurl: notices,
      routerUrl: "/notices",
    },
    {
      text: "海洋预报",
      imgurl: ocean,
      routerUrl: "/ocean",
    },
    {
      text: "黄河水情",
      imgurl: yellowRiver,
      routerUrl: "/yellowRiver",
    },
    {
      text: "洪涝预报",
      imgurl: forecast,
      routerUrl: "/floodModel",
    },
    {
      text: "数据管理",
      imgurl: home,
      routerUrl: "/home",
    },
  ];
  render() {
    return (
      <>
        <div className="router-item">
          {this.routerList.map((item) => (
            <Link
              key={item.routerUrl}
              to={item.routerUrl}
              target={item.routerUrl == "/home" ? "_blank" : ""}
            >
              <div
                className="router-item-style"
                style={
                  window.location.href.split("#")[1] == item.routerUrl
                    ? { background: "rgb(227,152,62)", color: "white" }
                    : {
                        background: "rgb(46, 49, 146)",
                        // color: "rgb(132,135,192)",
                        color: "white",
                      }
                }
              >
                <div>
                  <div className="router-item-style-img-div">
                    <img src={item.imgurl}></img>
                  </div>
                  <div className={"router-item-text"}>{item.text}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* 黄河水情 */}
        <Drawer
          title="黄河水情"
          placement="top"
          onClose={() => this.setState({ showRain: false })}
          visible={this.state.showRain}
          width={"100%"}
          height="100%"
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              margin: "auto",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <iframe
              src="http://61.163.88.227:8006/hwsq.aspx"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </Drawer>
        {/* 海洋预警 */}
        <Drawer
          title="海洋预警"
          placement="top"
          onClose={() => this.setState({ showSea: false })}
          visible={this.state.showSea}
          width={"100%"}
          height="100%"
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              overflow: "hidden",
              position: "relative",
              left: 500,
            }}
          >
            <iframe
              src="http://hsdy.dongying.gov.cn/col/col36593/index.html"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              style={{ position: "relative", top: -340, left: -670 }}
            ></iframe>
          </div>
        </Drawer>
      </>
    );
  }
  handlesjgl() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/dist/index.html#/home/rwvdata";
  }
  handlefxyj() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/new/dist/index.html#/floodwarning";
  }
  handleindex() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/new/dist/index.html#/index";
  }
  handlespjk() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/new/dist/index.html#/video";
  }

  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default RouterList;
