/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/map";
// import display from "../resource/icon/display.svg";
// import waterRouter from "../resource/icon/waterRouter.svg";
// import rain from "../resource/icon/rain.svg";
// import easyflood from "../resource/icon/easyflood.svg";
// import video from "../resource/icon/videoTitle.svg";
// import floodmaterial from "../resource/icon/floodmaterial.svg";
// import notices from "../resource/icon/notices.svg";
// import ocean from "../resource/icon/ocean.svg";
// import yellowRiver from "../resource/icon/yellowRiver.svg";
// import home from "../resource/icon/home.svg";

// import forecast from "../resource/icon/forecast.svg";
// import task from "../resource/task.svg";
// import device from "../resource/icon/device.svg";
// import dataCenter from "../resource/工程信息数据.svg";
// import { getUserMenuList } from "../data/home";
class RouterList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRain: false,
      showSea: false,
      weatherData: {}, //天气信息
    };
  }
  componentDidMount() {
    const { userMenuList } = this.props;
    const { getUserMenuList } = this.props.actions;
    if (!userMenuList[0]) {
      getUserMenuList({ token: localStorage.getItem("token") });
    }

    // getUserMenu({ token: localStorage.getItem("token") }).then((res) => {
    //   console.log(res, "RESSS");
    //   this.setState({
    //     routerList: res.data,
    //   });
    // });
  }

  render() {
    const { userMenuList } = this.props;
    return (
      <>
        <div className="router-item">
          {userMenuList.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              target={item.url == "/home" ? "_blank" : ""}
            >
              <div
                className="router-item-style"
                style={
                  window.location.href.split("#")[1] == item.url
                    ? { background: "rgb(227,152,62)", color: "white" }
                    : {
                        background: "#0099ff",
                        // color: "rgb(132,135,192)",
                        color: "white",
                      }
                }
              >
                <div>
                  <div className="router-item-style-img-div">
                    <img src={item.img}></img>
                  </div>
                  <div className={"router-item-text"}>{item.name}</div>
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
function mapStateToProps(state) {
  return {
    userMenuList: state.mapAboutReducers.userMenuList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RouterList);
