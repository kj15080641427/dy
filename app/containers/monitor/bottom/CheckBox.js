/**
 * CheckBox 2020-05-13
 */
import React from 'react';
import "./style.scss";
import { Checkbox, Row, Col, Tag } from 'antd';
import precipitation from '../../../resource/1-雨量站.svg';
import waterlevel from '../../../resource/2-水位.svg';
import monitoring from '../../../resource/3-监控.svg';
import perpos from '../../../resource/4-人员定位.svg';

class CheckBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    let { onChecked } = this.props;
    onChecked && e.target.layer && onChecked(e.target.layer, e.target.checked);
  }
  render() {
    let { layerVisible } = this.props;
    return (
      <>
       <div className="m-checkbox-row">
          <div className="m-checkbox-row-div">
            <Row>
            <Col span={4}><Checkbox><span className="m-row-checkbox-span">降水分布</span></Checkbox></Col>
              <Col span={5}><Checkbox layer={"rain"} checked={layerVisible.rain != null ? layerVisible.rain : true} onChange={this.onChange}><img src={precipitation} className="m-row-checkbox-img"></img><span className="m-row-checkbox-span">雨量站</span></Checkbox></Col>
              <Col span={5}><Checkbox layer={"water"} checked={layerVisible.water != null ? layerVisible.water : true} onChange={this.onChange}><img src={waterlevel} className="m-row-checkbox-img"></img><span className="m-row-checkbox-span">水位站</span></Checkbox></Col>
              <Col span={5}><Checkbox layer={"video"} checked={layerVisible.video != null ? layerVisible.video : true} onChange={this.onChange}><img src={monitoring} className="m-row-checkbox-img"></img><span className="m-row-checkbox-span">视频站点</span></Checkbox></Col>
              <Col span={5}><Checkbox layer={"person"} checked={layerVisible.person != null ? layerVisible.person : true} onChange={this.onChange}><img src={perpos} className="m-row-checkbox-img"></img><span className="m-row-checkbox-span">防汛人员</span></Checkbox></Col>
            </Row>
          </div>
        </div>
        <div className="m-checkbox-col">
          <div className="m-checkbox-col-div">
            <Row className="m-checkbox-col-row"> 
              <Checkbox onChange={this.onChange}><span className="m-col-checkbox-span">行政区划</span></Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox onChange={this.onChange}><span className="m-col-checkbox-span">街道</span></Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox layer={"wfsRiver"} checked={layerVisible.wfsRiver != null ? layerVisible.wfsRiver : true} onChange={this.onChange}><span className="m-col-checkbox-span">河流</span></Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox onChange={this.onChange}><Tag className="m-col-checkbox-normal" color='#40b96c'>正常</Tag></Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox onChange={this.onChange}><Tag className="m-col-checkbox-normal" color='#ec595f'>报警</Tag></Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox onChange={this.onChange}><Tag className="m-col-checkbox-normal" color='#eee54c'>异常</Tag></Checkbox>
            </Row>
          </div>
        </div>
      </>
    );
  }
  componentDidMount() { }
 
}
export default CheckBox;