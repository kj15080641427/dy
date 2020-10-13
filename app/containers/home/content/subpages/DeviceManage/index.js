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
  return (
    <>
      <Tabs>
        <TabPane tab="水位站" key="water-level">
          <Flood />
        </TabPane>
        <TabPane tab="易涝点" key="flood"></TabPane>
        <TabPane tab="雨量站" key="rain"></TabPane>
        <TabPane tab="水质站" key="water-quality"></TabPane>
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
