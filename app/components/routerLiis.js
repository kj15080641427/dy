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
import ddfa from "@app/resource/ddfa.png";
import hyyb from "@app/resource/hyyb.png";
import hhsq from "@app/resource/hhsq.png";
import fxyj from "../resource/fxyj.png";
import sjzx from "../resource/sjzx.png";
import spjk from "../resource/spjk.png";
import yqjk from "../resource/yqjk.png";
import sqjk from "../resource/sqjk.png";
import yld from "../resource/yld.png";
import xqkb from "@app/resource/xqkb.png";
import sjgl from "@app/resource/sjgl.png";
class RouterList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRain: false,
      showSea: false,
      weatherData: {}, //天气信息
    };
  }

  render() {
    return (
      <>
        <div className="router-item">
          <Col>
            <Link to={"/display"}>
              <img src={sjzx}></img>
            </Link>
          </Col>
          <Col>
            {/* 河流水情 */}
            <Link to={"/water"}>
              <img src={sqjk}></img>
            </Link>
          </Col>
          <Col>
            <Link to={"/rain"}>
              <img src={yqjk}></img>
            </Link>
          </Col>
          <Col>
            <Link to={"/easyFlood"}>
              <img src={yld}></img>
            </Link>
          </Col>
          <Col>
            <Link to={"/video"}>
              <img src={spjk}></img>
            </Link>
          </Col>
          <Col>
            <Link to={"/floodWarning"}>
              <img src={fxyj}></img>
            </Link>
          </Col>
          <Col>
            {/* 汛情快报 */}
            <Link to={"/notices"}>
              <img src={xqkb}></img>
            </Link>
          </Col>
          {/* 海洋预报 */}
          <Col>
            <Link to={'/ocean'}>
              <img
                // onClick={() => this.setState({ showSea: true })}
                src={hyyb}
              ></img>
            </Link>
          </Col>
          {/* 黄河水情 */}
          <Link to={'/yellowRiver'}>
            <img
              // onClick={() => this.setState({ showRain: true })}
              src={hhsq}
              // style={{ marginBottom: 10 }}
            ></img>
          </Link>
          {/*  数据管理*/}
          <Link to={"/home/rwvdata"} target="_blank">
            <img src={sjgl}></img>
          </Link>
          {/* <TowBtn></TowBtn> */}
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
