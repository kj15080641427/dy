/**
 * Water 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
import moment from 'moment';
import VideoComponent from '@app/components/video/VideoComponent';
import Holder from "@app/components/video/Holder"
import { hasClassName } from "@app/utils/common.js";
import { transform } from "ol/proj";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import { Button, Radio } from "antd"
class Water extends Base {
  static type = "water";
  constructor(props, context) {
    super(props, context);
    this.state = {
      token: ""
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    let water = (model.z !== null && model.z !== undefined) ? (model.z + 'm') : '--';
    let udpTm = model.tm ? moment(model.tm).format('MM-DD HH:mm') : '--';
    let warningLevel = (model.warning && model.warning !== 99) ? (model.warning + 'm') : '--';
    let videoControl = model.videoControl;
    let videos = model.videos;
    let token = videos && videos.length != 0 ? videos[0].strtoken : '';
    this.setState({ token: token })
    let type = videos && videos.length != 0 ? videos[0].datasource : '';
    const onChange = (e) => {
      console.log(`radio checked:${e.target.value}`);
      if (e.target.value === "a") {
        this.setState({
          waterWar: true
        })
      } else {
        this.setState({
          waterWar: false
        })
      }
    }
    return (
      <div className="m-ovl-box m-ovl-water" style={{ display: "none", width: 900, height: 680 }} ref={(node) => { this.container = node; }}>
        {/* <div>水位站点：{model.stnm || model.name}</div> */}
        {/* <div className="m-ovl-line">水位站点：{model.stnm || model.name}</div> */}
        {/* <div className="m-ovl-line">站点编号：{model.stcd}</div> */}
        {/* <div className="m-ovl-line">数据来源：{model.dataSourceDesc}</div> */}
        {/* <div className="m-ovl-line">站点地址：{model.address}</div> */}
        {/* <div className="m-ovl-line">当前水位：{water}</div> */}
        {/* <div className="m-ovl-line">警戒水位：{warningLevel}</div> */}
        {/* <div className="m-ovl-line">更新时间：{udpTm}</div> */}
        {/* <div style={{width: 660, height: 420}} id='echartsDiv'> */}
        {/* </div> */}

        <div style={{
          float: 'left', width: 650, height: 400, position: 'relative',
          top: 275
        }}>
          <VideoComponent
            videoControl={videoControl}
            token={token}
            type={type}
            style={{
              width: 600,
              height: 346,
              transform: 'scale(1.1)',
              position: 'relative',
              left: 30,
              top: 25,
            }}
          />
        </div>

        <div style={{ float: 'right', overflow: 'hidden', width: 200 }}>
          <div>
            <div className="m-ovl-line" style={{ width: 180 }}>名称：{model.stnm || model.name}</div>
            <div className="m-ovl-line">水位：{water}</div>
            <div className="m-ovl-line">来源：{model.dataSourceDesc}</div>
            <div className="m-ovl-line">警戒：{warningLevel}</div>
            <div className="m-ovl-line">时间：{udpTm}</div>
          </div>
        </div>
        <span className="iconfont iconcuo m-ovl-close" ></span>
        <Holder token={token} divStyle={{ top: 330, right: -30, transform: 'scale(0.7)', }}></Holder>
        <div style={{
          float: 'left', width: 660, height: 315, position: 'relative',
          left: -15,
          top: -405
        }} id='echartsDiv'></div>
      </div>
    );
  }

  onRotateCamera({ token, action }) {
    let { model } = this.props;
    let { videoControl } = model;

    if (videoControl) {
      videoControl.Ptz({ token, action })
        .then((result) => {
          videoControl.Ptz({ token, action: 'stop' })
          console.log(result);
        })
        .catch(e => message.error(e));
    }
  }

  componentDidCatch() {

  }
  componentDidMount() {
    //super.componentDidMount();
    let { map, model } = this.props;
    if (!map || !model) return;
    let nowNode = this.container.cloneNode(true);
    nowNode.style.display = "block";
    this.installEvent(nowNode);
    let id = this.getType() + "_" + model.id;
    let map_center = map.getView().getCenter();
    let center = transform(map_center, 'EPSG:3857', 'EPSG:4326');
    map.addOverlay(id, { Coordinate: center, offset: [-325, -240] }, nowNode);
    // let { model } = this.props;
    // let category = [];
    // let values = [];
    // for (let i = 0; i < model.datas.length; i++){
    //   let m = model.datas[i];
    //   let time = moment(m.tm);
    //   category.push(time.format('MM-DD HH:mm'));
    //   values.push(m.z);
    // }
    // category = category.reverse();
    // values = values.reverse();

    console.log(model.waters)
    let xdata = [];
    let ydata = [];
    for (let i = 0; i < model.waters.length; i++) {
      xdata.push(moment(model.waters[i].tm).format('MM-DD HH:mm'))
      ydata.push(model.waters[i].z)
    }
    let chars = echarts.init(document.getElementById('echartsDiv'));
    const option = {
      title: {
        text: model.waters[0].stnm + '24小时水位变化',
        // left: 'center',
      },
      xAxis: {
        type: 'category',
        data: xdata
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: ydata,
        type: 'line'
      }]
    };
    chars.setOption(option);
  }
  componentWillUnmount() {
    super.componentWillUnmount();

  }
  getType() {
    return Water.type;
  }
  onCustomClick(e) {
    if (hasClassName(e.target, "img-size-up")) {
      this.onRotateCamera({ token: this.state.token, action: 'up' })
    }
    else if (hasClassName(e.target, "img-size-left")) {
      this.onRotateCamera({ token: this.state.token, action: 'left' })
    }
    else if (hasClassName(e.target, "img-size-right")) {
      this.onRotateCamera({ token: this.state.token, action: 'right' })
    }
    else if (hasClassName(e.target, "img-size-down")) {
      this.onRotateCamera({ token: this.state.token, action: 'down' })
    }
    else if (hasClassName(e.target, "img-size-zoomin")) {
      this.onRotateCamera({ token: this.state.token, action: 'zoomin' })
    } else if (hasClassName(e.target, "img-size-zoomout")) {
      this.onRotateCamera({ token: this.state.token, action: 'zoomout' })
    }
  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Water.type);
    }
  }
}
export default Water;
