/**
 * Water 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
import moment from 'moment';
import VideoComponent from '@app/components/video/VideoComponent';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/line';
// import moment from 'moment';
class Water extends Base {
  static type = "water";
  constructor(props, context) {
    super(props, context);
    this.state = {
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
    let type = videos && videos.length != 0 ? videos[0].datasource : '';
    return ( 
      <div className="m-ovl-box m-ovl-water" style={{display: "none", width: 900, height: 500}} ref={(node) => { this.container = node;}}>
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

        <div style={{ float: 'left', width: 650, height: 480 }}>
          <VideoComponent
            videoControl={videoControl}
            token={token}
            type={type}
            style={{ width: 650, height: 480 }}
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
          <div>
            <input type='button' value='上' onClick={() => this.onRotateCamera({ token, action: 'up' })} />
            <input type='button' value='下' onClick={() => this.onRotateCamera({ token, action: 'down' })} />
            <input type='button' value='左' onClick={() => this.onRotateCamera({ token, action: 'left' })} />
            <input type='button' value='右' onClick={() => this.onRotateCamera({ token, action: 'right' })} />
            <input type='button' value='+' onClick={() => this.onRotateCamera({ token, action: 'zoomin' })} />
            <input type='button' value='-' onClick={() => this.onRotateCamera({ token, action: 'zoomout' })} />
          </div>
        </div>
     
        <span className="iconfont iconcuo m-ovl-close" ></span>
      </div>
    );
  }

  onRotateCamera({ token, action }) {
    let { model } = this.props;
    let { videoControl } = model;

    if (videoControl) {
      videoControl.Ptz({ token, action })
        .then((result) => {
          console.log(result);
         })
        .catch(e => message.error(e));
    }
  }

  componentDidCatch() {

  }
  componentDidMount() {
    super.componentDidMount();
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


    // let chars = echarts.init(document.getElementById('echartsDiv'));
    // const option = {
    //   xAxis: {
    //     type: 'category',
    //     data: category
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [{
    //     data: values,
    //     type: 'line'
    //   }]
    // };
    // chars.setOption(option);
  }
  componentWillUnmount() {
    super.componentWillUnmount();

  }
  getType() {
    return Water.type;
  }
  onCustomClick(e) {

  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Water.type);
    }
  }
}
export default Water;