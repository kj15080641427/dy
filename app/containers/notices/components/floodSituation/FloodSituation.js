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
      showRain,
      downl,
    } = this.props;
    const element = (
      <div className="noties-head">
        {/* <Row> */}
        <div>
          开始时间&nbsp;&nbsp;&nbsp;
          <DatePicker
            format={"YYYY-MM-DD HH"}
            size="large"
            showTime
            onOk={onOkstart}
            onChange={onOkstart}
          />
        </div>
        <div>
          结束时间&nbsp;&nbsp;&nbsp;
          <DatePicker
            format={"YYYY-MM-DD HH"}
            size="large"
            showTime
            onOk={onOkend}
            onChange={onOkend}
          />
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={init}
          >
            查询
          </Button>
        </div>
        <div>
          <Button
            // type="primary"
            // style={{ background: "#0ca9c7" }}
            size="large"
            icon={<CloudDownloadOutlined />}
            onClick={downl}
          >
            导出
          </Button>
        </div>
        {/* <Col span={7}></Col> */}
        {/* </Row> */}
      </div>
    );
    return (
      <div>
        {element}
        <br />
        <Situation dataSource={raindata.count} showRain={showRain}></Situation>
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
        <RiverAnnunciate
          dataSource={riverdata}
          loding={riverloding}
        ></RiverAnnunciate>
        <WaterAnnunciate
          dataSource={pointdata}
          loding={pointloding}
        ></WaterAnnunciate>
      </div>
    );
  }
}
export default FloodSituation;
