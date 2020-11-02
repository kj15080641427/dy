// import React from "react";
// import "./style.scss";
// import Base from "./Base";
// import moment from "moment";
// import { Col } from "antd";

// class Water extends Base {
//   static type = "water";
//   constructor(props, context) {
//     super(props, context);
//     const { model } = props;
//     const { videos } = model;
//     let token = videos && videos.length !== 0 ? videos[0].strtoken : "";
//     this.state = {
//       token: token,
//     };
//     this.onClose = this.onClose.bind(this);
//   }
//   render() {
//     let { model } = this.props;

//     return (
//       <div
//         className="m-ovl-box-water m-ovl-water"
//         // style={{
//         //   display: "none",
//         //   width: 300,
//         //   height: 480,
//         //   fontSize: "14px",
//         //   padding: "0px",
//         // }}
//         ref={(node) => {
//           this.container = node;
//         }}
//       >
//         {/* <div
//           style={{
//             float: "left",
//             width: 650,
//             height: 400,
//             position: "relative",
//             top: 275,
//           }}
//         >
//           <VideoComponent
//             videoControl={videoControl}
//             token={this.state.token}
//             type={type}
//             style={{
//               width: 600,
//               height: 346,
//               transform: "scale(1.1)",
//               position: "relative",
//               left: 30,
//               top: 25,
//             }}
//           />
//         </div> */}

//         <div style={{ overflow: "hidden" }}>
//           <div>
//             <div className="m-ovl-line m-vol-title">
//               名称：{model.stnm || model.name}
//             </div>
//             <div className="m-ovl-line">
//               水位：
//               {model?.z || "--"}
//             </div>
//             <div className="m-ovl-line">流量：{model?.q || "--"}</div>
//             <div className="m-ovl-line">警戒：{model?.warning || "--"}</div>
//             {/* <div className="m-ovl-line">来源：{model.dataSourceDesc}</div> */}
//             <div className="m-ovl-line">河流：{model?.rvnm || "--"}</div>
//             <div className="m-ovl-line">县区：{model.stlc || "--"}</div>
//             <div className="m-ovl-line">
//               时间：
//               {model?.tm ? moment(model.tm).format("YYYY-MM-DD HH:mm") : "--"}
//             </div>
//           </div>
//         </div>

import React from "react";
import "./style.scss";
import Base from "./Base";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
class Water extends Base {
  static type = "water";
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    const { dict } = model;
    //let drpLevel = (model.drp !== null && model.drp !== undefined) ? model.drp + 'mm' : '--';
    let tmDesc = model.tm ? model.tm : "--";
    return (
      <div
        className="m-ovl-box m-ovl-rain luo-ovl-rain"
        style={{ display: "none" }}
        ref={(node) => {
          this.container = node;
        }}
      >
        <div className="m-ovl-line luo-ovl-title">水位站点：{model.name}</div>
        <div className="m-ovl-line">
          <label>水位：</label>
          {model?.z || "--"}m
        </div>
        <div className="m-ovl-line">
          <label>警戒水位：</label>
          {model.warning}m
        </div>
        <div className="m-ovl-line">
          <label>数据来源：</label>
          水位
        </div>
        <div className="m-ovl-line">
          <label>区县：</label>
          {model.stlc || "--"}
        </div>
        <div className="m-ovl-line">
          <label>河流：</label>
          {model.rvnm}
        </div>
        {/* <div className="m-ovl-line">
          <label>水位</label>
          {model.z}cm
        </div> */}
        <div className="m-ovl-line">
          <label>更新时间：</label>
          {tmDesc}
        </div>
        <span className="iconfont iconcuo m-ovl-close"></span>
      </div>
    );
  }
  componentDidCatch() {}
  componentDidMount() {
    super.componentDidMount();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  getType() {
    return Water.type;
  }
  onCustomClick(e) {}
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Water.type);
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Rain);
export default Water;
