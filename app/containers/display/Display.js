/**
 * Display 2020-07-06
 */
import React from "react";
import "./style.scss";
import Map from "./map/Map";
import Satellite from "./left/Satellite";
import OverView from "./left/OverView";
import Tables from "./right/Tables";
import * as actions from "../../redux/actions/map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CheckBoxs from "./right/CheckBoxs";
import Legend from "./right/Legend";
import Head from "./head/Head";
class Display extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      layerVisible: {
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: true, //40条河图片 用于解决河道标注很多的问题
        flood: false, // 洪水图层
        river: true, // 水系图
        heatmap: true, // 热力图
        traffic: false, // 交通图层
        person: true, // 防汛人员
        video: false, // 视频站点
        rain: false, // 雨量站
        water: true, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: false, // 积水
      },
    };
    this.onChecked = this.onChecked.bind(this);
    this.onShow = this.onShow.bind(this);
  }
  render() {
    let { layerVisible } = this.state;
    const { dict } = this.props;
    return (
      <div className="display">
        <Map></Map>
        <div className="dis-head">
          <Head></Head>
        </div>
        <div className="dis-left">
          <Satellite></Satellite>
          <OverView></OverView>
        </div>
        <div className="dis-right">
          <div style={{ float: "left" }}>
            {/* <CheckBoxs layerVisible={layerVisible} onChecked={this.onChecked} clicks={this.onShow}></CheckBoxs> */}
            {/* <Legend></Legend> */}
          </div>
          <Tables dict={dict}rowNum={6}></Tables>
        </div>
      </div>
    );
  }
  onShow(layerKey) {
  }
  onChecked(layerKey, checked) {
    let { layerVisible } = this.state;
    if (layerVisible[layerKey] === checked) return;
    layerVisible[layerKey] = checked;
    this.setState({
      layerVisible: { ...layerVisible },
    });
  }
  componentDidMount() {
    this.props.actions.getDict({
      current: 1,
      size: -1,
      type: 1,
    });
  }
}
function mapStateToProps(state) {
  return {
    dict: state.currency.dict,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Display);
