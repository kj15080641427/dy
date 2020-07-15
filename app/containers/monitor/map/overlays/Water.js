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
    const { model } = props;
    const { videos } = model;
    let token = videos && videos.length !== 0 ? videos[0].strtoken : '';
    this.state = {
      token: token
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    //let water = (model.z !== null && model.z !== undefined) ? (model.z + 'm') : '--';
    let water = (model.z !== null && model.z !== undefined) ? parseFloat(model.z * 1) : NaN;
    let waterString = isNaN(water) ? '--' : (water.toFixed(2) + 'm');
    let flow = (model.q !== null) ? ((model.q * 1).toFixed(1) + "m³/s") : '--';
    let tm = model.ztm ? model.ztm : model.tm;
    let udpTm = tm ? moment(tm).format('MM-DD HH:mm') : '--';
    let warningLevel = (model.warning && model.warning !== 99) ? (model.warning + 'm') : '--';
    let rivername = (model.rivername !== null) ? model.rivername : '--';
    let regionName = (model.regionName !== null) ? model.regionName : '--';
    let videoControl = model.videoControl;
    let videos = model.videos;
    //let token = videos && videos.length != 0 ? videos[0].strtoken : '';
    let type = videos && videos.length !== 0 ? videos[0].datasource : '';
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
    };
    return (
      <div className="m-ovl-box m-ovl-water" style={{ display: "none", width: 900, height: 680 }} ref={(node) => { this.container = node; }}>
        <div style={{
          float: 'left', width: 650, height: 400, position: 'relative',
          top: 275
        }}>
          <VideoComponent
            videoControl={videoControl}
            token={this.state.token}
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
            <div className="m-ovl-line">水位：{waterString}</div>
            <div className="m-ovl-line">流量：{flow}</div>
            <div className="m-ovl-line">警戒：{warningLevel}</div>
            <div className="m-ovl-line">来源：{model.dataSourceDesc}</div>
            <div className="m-ovl-line">河流：{rivername}</div>
            <div className="m-ovl-line">县区：{regionName}</div>
            <div className="m-ovl-line">时间：{udpTm}</div>
          </div>
        </div>
        <span className="iconfont iconcuo m-ovl-close" ></span>
        <Holder token={this.state.token} divStyle={{ top: 420, right: -30, transform: 'scale(0.6)', }}></Holder>
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
    map.addOverlay(id, { Coordinate: center, offset: [-325, -340] }, nowNode);
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

    let chars = echarts.init(document.getElementById('echartsDiv'));
    let xdata = [];
    let ydata = [];
    let maxz = 0;
    if (model.waters.length === 0) {
      const option = {
        title: {
          text: "暂无水位数据",
          // left: 'center',
        },
        xAxis: {
          type: 'category',
          data: [],
          name: '时间',
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
          type: 'value',
          name: '水位(m)'
        },
        series: [{
          data: [],
          type: 'line'
        }]
      };
      chars.setOption(option);
    } else {
      for (let i = model.waters.length - 1; i >= 0; i--) {
        xdata.push(moment(model.waters[i].tm).format('MM-DD HH:mm'))
        ydata.push((model.waters[i].z).toFixed(2))
      }
      const warningnum = model.warning === null || model.warning === 99 ? 0 : model.warning
      const option = {
        title: {
          text: model.waters[0].stnm + '24小时水位曲线',
          // left: 'center',
        },
        xAxis: {
          type: 'category',
          data: xdata,
          name: '时间',
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
          type: 'value',
          name: '水位(m)',
          max: function (value) {
            return (warningnum === 0 ? (value.max * 1.2) : warningnum + value.max).toFixed(1)
          }
        },
        // visualMap: {
        //   show: false,
        //   type: 'piecewise',
        //   pieces: warningnum === 0 ? [] : [
        //     {
        //       gt: warningnum >= 0 ? -warningnum : warningnum,
        //       lte: warningnum,          //这儿设置基线上下颜色区分 基线下面为绿色
        //       color: '#03d6d6'
        //     }, {
        //       gt: warningnum,          //这儿设置基线上下颜色区分 基线上面为红色
        //       color: '#e91642',
        //       // lte: obj.warning,
        //     },
        //   ]
        // },
        series: [{
          data: ydata,
          type: 'line',
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              {
                type: 'min', name: '最小值', itemStyle: {
                  color: '#03d6d6'
                }
              }
            ],

          },
          markLine: {
            label: {
              position: "end",
            },
            lineStyle: {
              type: 'solid',
              width: 2,
              opacity: warningnum === 0 ? 0 : 1
            },
            color: '#03d6d6',
            data: [
              {

                silent: false,
                label: {
                  show: warningnum !== 0,
                  position: 'center',
                  formatter: "警戒水位" + warningnum + "m",
                  itemStyle: {
                    left: '100px',

                  }
                },
                yAxis: warningnum,
              }
            ]
          }
        }]
      };
      chars.setOption(option);
    }

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
