/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from "react";
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
class RouterList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {}, //天气信息
    };
  }

  render() {
    return (
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
          <Link to={"/notices"}>
            <img src={xqkb}></img>
          </Link>
        </Col>
        <Col>
          <Link>
            <img src={ddfa}></img>
          </Link>
        </Col>
        <Col>
          <Link>
            <img src={hyyb}></img>
          </Link>
        </Col>
        <Link>
          <img src={hhsq}></img>
        </Link>
        {/* <TowBtn></TowBtn> */}
      </div>
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
