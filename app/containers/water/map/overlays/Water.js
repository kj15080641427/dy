import React from "react";
import "./style.scss";
import Base from "./Base";
import moment from "moment";
import VideoComponent from "@app/components/video/VideoComponent";
import Holder from "@app/components/video/Holder";
import { hasClassName } from "@app/utils/common.js";
import { transform } from "ol/proj";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import { withRouter } from "react-router-dom";
import { Button, Radio } from "antd";

class Water extends Base {
  static type = "water";
  constructor(props, context) {
    super(props, context);
    const { model } = props;
    const { videos } = model;
    let token = videos && videos.length !== 0 ? videos[0].strtoken : "";
    this.state = {
      token: token,
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    let iswater = model.indtype === 9 || model.indtype === 11 ? true : false;
    //let water = (model.z !== null && model.z !== undefined) ? (model.z + 'm') : '--';
    let water =
      model.z !== null && model.z !== undefined ? parseFloat(model.z * 1) : NaN;
    let typewater = iswater
      ? "水深：" + (water * 100).toFixed(1) + "cm"
      : "水位：" + water.toFixed(2) + "m";
    let flow = model.q !== null ? (model.q * 1).toFixed(1) + "m³/s" : "--";
    let tm = model.ztm ? model.ztm : model.tm;
    let udpTm = tm ? moment(tm).format("MM-DD HH:mm") : "--";
    let warningLevel =
      model.warning && model.warning !== 99 ? model.warning + "m" : "--";
    let rivername = model.rivername !== null ? model.rivername : "--";
    let regionName = model.regionName !== null ? model.regionName : "--";
    let videoControl = model.videoControl;
    let videos = model.videos;
    //let token = videos && videos.length != 0 ? videos[0].strtoken : '';
    let type = videos && videos.length !== 0 ? videos[0].datasource : "";
    const onChange = (e) => {
      console.log(`radio checked:${e.target.value}`);
      if (e.target.value === "a") {
        this.setState({
          waterWar: true,
        });
      } else {
        this.setState({
          waterWar: false,
        });
      }
    };
    return (
      <div
        className="m-ovl-box m-ovl-water"
        style={{ display: "none", width: 300, height: 480 }}
        ref={(node) => {
          this.container = node;
        }}
      >
        {/* <div
          style={{
            float: "left",
            width: 650,
            height: 400,
            position: "relative",
            top: 275,
          }}
        >
          <VideoComponent
            videoControl={videoControl}
            token={this.state.token}
            type={type}
            style={{
              width: 600,
              height: 346,
              transform: "scale(1.1)",
              position: "relative",
              left: 30,
              top: 25,
            }}
          />
        </div> */}

        <div style={{ overflow: "hidden" }}>
          <div>
            <div className="m-ovl-line">名称：{model.stnm || model.name}</div>
            <div className="m-ovl-line">水位：{model?.z || "--"}</div>
            <div className="m-ovl-line">流量：{model?.q || "--"}</div>
            <div className="m-ovl-line">警戒：{model?.warning || "--"}</div>
            {/* <div className="m-ovl-line">来源：{model.dataSourceDesc}</div> */}
            <div className="m-ovl-line">河流：{model?.rvnm || "--"}</div>
            <div className="m-ovl-line">县区：{model.stlc || "--"}</div>
            <div className="m-ovl-line">
              时间：
              {model?.tm ? moment(model.tm).format("YYYY-MM-DD HH:mm") : "--"}
            </div>
          </div>
        </div>
        <span className="iconfont iconcuo m-ovl-close"></span>
        {/* <Holder
          token={this.state.token}
          divStyle={{ top: 420, right: -30, transform: "scale(0.6)" }}
        ></Holder>
        <div
          style={{
            float: "left",
            width: 660,
            height: 315,
            position: "relative",
            left: -15,
            top: -405,
          }}
          id="echartsDiv"
        ></div> */}
      </div>
    );
  }

  // onRotateCamera({ token, action }) {
  //   let { model } = this.props;
  //   let { videoControl } = model;

  //   if (videoControl) {
  //     videoControl
  //       .Ptz({ token, action })
  //       .then((result) => {
  //         videoControl.Ptz({ token, action: "stop" });
  //         console.log(result);
  //       })
  //       .catch((e) => message.error(e));
  //   }
  // }

  componentDidCatch() {}
  componentDidMount() {
    super.componentDidMount();

    // let { map, model } = this.props;
    // console.log(model);
    // let iswater = true;
    // if (!map || !model) return;
    // let nowNode = this.container.cloneNode(true);
    // nowNode.style.display = "block";
    // this.installEvent(nowNode);
    // let id = this.getType() + "_" + model.id;
    // let map_center = map.getView().getCenter();
    // let center = transform(map_center, "EPSG:3857", "EPSG:4326");
    // map.addOverlay(id, { Coordinate: center, offset: [-325, -340] }, nowNode);
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  getType() {
    return Water.type;
  }
  onCustomClick(e) {
    // if (hasClassName(e.target, "img-size-up")) {
    //   this.onRotateCamera({ token: this.state.token, action: "up" });
    // } else if (hasClassName(e.target, "img-size-left")) {
    //   this.onRotateCamera({ token: this.state.token, action: "left" });
    // } else if (hasClassName(e.target, "img-size-right")) {
    //   this.onRotateCamera({ token: this.state.token, action: "right" });
    // } else if (hasClassName(e.target, "img-size-down")) {
    //   this.onRotateCamera({ token: this.state.token, action: "down" });
    // } else if (hasClassName(e.target, "img-size-zoomin")) {
    //   this.onRotateCamera({ token: this.state.token, action: "zoomin" });
    // } else if (hasClassName(e.target, "img-size-zoomout")) {
    //   this.onRotateCamera({ token: this.state.token, action: "zoomout" });
    // }
  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Water.type);
    }
  }
}
export default Water;
