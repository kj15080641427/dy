/**
 * water 2020-06-13
 * zdl
 * 防汛模型
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/home";
import Trimap from "../../../../../components/3dmap/Trimap";
import {getPump, getGate, getAllVideo} from "@app/data/home";

const pumpImageUrl = require("@app/resource/icon/定位.svg")["default"];
const gateImageUrl = require('@app/resource/icon/ponding.svg')['default'];
const videoImageUrl = require('@app/resource/icon/camera.svg')['default'];

class LoginLog extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pumps: [],
      gates: []
    };
  }

  componentDidMount() {
    getPump({})
        .then(result => {
          const {data} = result;

          if(data && data.length > 0) {
            let pumps = data.map(item => {
              return this.getDataObject('pump', item);
            });

            let newPumps = this.state.pumps.concat(pumps);
            this.setState({pumps: newPumps});
          }
        })
        .catch(err =>{
          console.log(err);
        });

    getGate({})
        .then(result => {
          if(result.data && result.data.length > 0) {
            let gates = result.data.map(item => {
              return this.getDataObject('gate', item)
            });

            let newGates = this.state.pumps.concat(gates);
            this.setState({pumps: newGates});
          }
        })
        .catch(error => {
          console.log(error);
        });

    getAllVideo({})
        .then(result => {
          if(result.data && result.data.length > 0) {
            let videos = [];

            result.data.forEach(item => {
              if(item.stiteWaterRadios && item.stiteWaterRadios.length > 0){
                item.stiteWaterRadios.forEach(v => {
                  videos.push(this.getDataObject('video', v));
                })
              }
            });

            let stations = this.state.pumps.concat(videos);
            this.setState({pumps: stations});
          }
        })
        .catch(error => {
          console.log('获取视频失败' + error);
        });
  }

  render() {
    return (
      <>
        <div style={{ height: "914px", position: "relative" }}>
          <Trimap points={this.state.pumps} />
        </div>
      </>
    );
  }

  getDataObject(type, item) {
    let result = {
      name: item.name,
      distanceDisplayCondition: [0, 40000],
      //description: this.getPumpDescription(item),
      position: {
        lon: item.lon ? item.lon : 0,
        lat: item.lat ? item.lat : 0,
      },
      label: {
        text: item.name,
        color: '#ffffff',
        distanceDisplayCondition: [0, 15000],
        pixelOffset: [0, -32],
      },
      billboard: {
        image: pumpImageUrl,
        width: 32,
        height: 32,
      },
      type: type,
    };

    if(type === 'pump') {
      result.description = this.getPumpDescription(item);
      return result;
    } else if(type === 'gate') {
      result.billboard.image = gateImageUrl;
      result.description = this.getGateDescription(item);
      return result;
    } else if(type === 'video') {
      result.billboard.image = videoImageUrl;
      return result;
    }

    return undefined;
  }

  getPumpDescription(pump) {
    return(
        `<div>
            <div>泵站名称：${pump.name}</div><br>
            <div>装机流量：${pump.flow} 立方米</div><br>
            <div>装机功率：${pump.power} 千瓦时</div><br>
            <div>设计扬程：${pump.delivery} 米</div><br>
            <div>水泵数量：${pump.devicecount} 台</div><br>
            <div>所属河流：${pump.rivername}</div><br>
            <div>建成时间：${pump.buildtime}</div><br>
            <div>管理单位：${pump.management || "未知"}</div><br>
        </div>`
    );
  }

  getGateDescription(gate) {
    return(
        `<div>
            <div>名称：${gate.name}</div><br>
            <div>所属河流：${gate.rivername}</div><br>
            <div>建成时间：${gate.buildtime}</div><br>
            <div>管理单位：${gate.management || "未知"}</div><br>
        </div>`
    );
  }
}

function mapStateToProps(state) {
  return {
 //   count: state.mapAboutReducers.count,
    video: state.monitor.video,
    videoInfo: state.handState.videoInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginLog);
