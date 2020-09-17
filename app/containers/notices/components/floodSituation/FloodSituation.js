/**
 * floodSituation 2020-07-31
 * 汛情快讯
 */
import React from "react";
import RainrAnnunciate from "./model/RainrAnnunciate";
import RiverAnnunciate from "./model/RiverAnnunciate";
import WaterAnnunciate from "./model/WaterAnnunciate";
import { Divider, DatePicker, Button, Row, Col } from "antd";
import { SearchOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Situation from "./model/Situation";

class FloodSituation extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const {
      raindata,
      riverdata,
      riverloding,
      pointdata,
      pointloding,
      onOkstart,
      onOkend,
      init,
      downl,
    } = this.props;
    const element = (
      <Row>
        <Col span={5}>
          开始时间
          <DatePicker
            format={"YYYY-MM-DD HH"}
            size="large"
            showTime
            onOk={onOkstart}
            onChange={onOkstart}
          />
        </Col>
        <Col span={5}>
          结束时间
          <DatePicker
            format={"YYYY-MM-DD HH"}
            size="large"
            showTime
            onOk={onOkend}
            onChange={onOkend}
          />
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={init}
          >
            查询
          </Button>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            size="large"
            icon={<CloudDownloadOutlined />}
            onClick={downl}
          >
            导出
          </Button>
        </Col>
        <Col span={7}></Col>
      </Row>
    );
    return (
      <>
        {element}
        <Situation dataSource={raindata.count}></Situation>
        <br></br>
        <RainrAnnunciate
          // element={element}
          dy={raindata.dy}
          z={raindata.z}
          tm={raindata.tm}
          kl={raindata.kl}
          gr={raindata.gr}
          hk={raindata.hk}
          lj={raindata.lj}
        ></RainrAnnunciate>
        <br></br>
        {/* <Col span={24}> */}
        <RiverAnnunciate
          dataSource={riverdata}
          loding={riverloding}
        ></RiverAnnunciate>
        {/* </Col> */}
        {/* <Col span={24}> */}
        <WaterAnnunciate
          dataSource={pointdata}
          loding={pointloding}
        ></WaterAnnunciate>
        {/* </Col> */}
      </>
    );
  }
}
export default FloodSituation;
