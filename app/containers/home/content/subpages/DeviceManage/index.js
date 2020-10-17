/**
 * deviceManage 设备管理 2020-10-12
 * auth. 罗剑涛 - 13760171731
 */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import Flood from "./Flood";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const deviceManage = (props) => {

  const deviceTypeMap = [{
    type: '2', name: '水位站', typeName: 'WaterLevels'
  }, {
    type: '3', name: '易涝点', typeName: 'WaterPoint'
  }, {
    type: '1', name: '雨量站', typeName: 'Rain'
  }, {
    type: '4', name: '视频站', typeName: 'WaterRadio'
  }]

  return (
    <>
      <Tabs>
        {deviceTypeMap.map(device => (
          <TabPane tab={device.name} key={device.typeName}>
            <Flood device={device}  />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

deviceManage.propTypes = {};
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(deviceManage);
