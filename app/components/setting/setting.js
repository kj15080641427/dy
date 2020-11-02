/**
 * CheckBox 2020-05-13
 */
import React from "react";
import "./style.scss";
import { Checkbox, Row, Divider } from "antd";
import precipitation from "@app/resource/1-雨量站.svg";
import waterlevel from "@app/resource/icon/water.svg";
import monitoring from "@app/resource/3-监控.svg";
import pump from "@app/resource/pump.svg";
import pondingPic from "@app/resource/icon/ponding.svg";
import { CloseSquareOutlined } from "@ant-design/icons";

class CheckBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    let { onChecked } = this.props;
    onChecked && e.target.layer && onChecked(e.target.layer, e.target.checked);
  }
  render() {
    let { layerVisible } = this.props;
    return (
      <>
        <div className="m-checkbox-row">
          <div className="m-checkbox-row-div">
            <Row></Row>
          </div>
        </div>
        <div className="m-checkbox-col">
          <div className="m-checkbox-col-div">
            <a
              style={{ fontSize: 18, color: "#000000fd", fontWeight: "bold " }}
            >
              站点
            </a>
            <Divider />
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"rain"}
                checked={layerVisible.rain !== null ? layerVisible.rain : true}
                onChange={this.onChange}
              >
                <img src={precipitation} className="m-row-checkbox-img"></img>
                <span className="m-row-checkbox-span">雨量站</span>
              </Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"water"}
                checked={
                  layerVisible.water !== null ? layerVisible.water : true
                }
                onChange={this.onChange}
              >
                <img src={waterlevel} className="m-row-checkbox-img"></img>
                <span className="m-row-checkbox-span">水位站</span>
              </Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"ponding"}
                checked={
                  layerVisible.ponding !== null ? layerVisible.ponding : true
                }
                onChange={this.onChange}
              >
                <img src={pondingPic} className="m-row-checkbox-img"></img>
                <span className="m-row-checkbox-span">积水站</span>
              </Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"video"}
                checked={
                  layerVisible.video !== null ? layerVisible.video : true
                }
                onChange={this.onChange}
              >
                <img src={monitoring} className="m-row-checkbox-img"></img>
                <span className="m-row-checkbox-span">视频站点</span>
              </Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"gate"}
                checked={layerVisible.gate !== null ? layerVisible.gate : true}
                onChange={this.onChange}
              >
                <span className="m-row-checkbox-img">
                  <CloseSquareOutlined />
                </span>
                <span className="m-row-checkbox-span">水闸</span>
              </Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"pump"}
                checked={layerVisible.pump !== null ? layerVisible.pump : true}
                onChange={this.onChange}
              >
                <img src={pump} className="m-row-checkbox-img"></img>
                <span className="m-row-checkbox-span">泵站</span>
              </Checkbox>
            </Row>
            <br></br>
            <a
              style={{ fontSize: 18, color: "#000000fd", fontWeight: "bold " }}
            >
              地图
            </a>
            <Divider />
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"river"}
                checked={
                  layerVisible.river !== null ? layerVisible.river : true
                }
                onChange={this.onChange}
              >
                <span className="m-col-checkbox-span">水系图</span>
              </Checkbox>
            </Row>
            <Row className="m-checkbox-col-row">
              <Checkbox
                layer={"wfsRiver"}
                checked={
                  layerVisible.wfsRiver !== null ? layerVisible.wfsRiver : true
                }
                onChange={this.onChange}
              >
                <span className="m-col-checkbox-span">河流</span>
              </Checkbox>
            </Row>
          </div>
        </div>
      </>
    );
  }
  stopPropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
  }
}
export default CheckBox;
