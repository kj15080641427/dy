/**
 * Situation 2020-07-31
 * 汛情快讯头
 */
import React from "react";
import { Row } from "antd";
class Situation extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { dataSource, showRain } = this.props;
    return (
      <>
        {dataSource === undefined ? null : (
          <>
            {console.log(dataSource, "dataSource")}
            {/* <Row className="situation-title"> 汛情快报</Row> */}
            <Row
              className="situation-text"
              style={{ color: " #0099ff", fontWeight: "bold" }}
            >
              {dataSource.a} ，全市汛情概况如下：
            </Row>
            <Row className="situation-text">
              <a className="text-title">降雨：</a>全市平均降水量
              {Number(dataSource?.b).toFixed(1)}
              毫米{Number(dataSource?.b) <= 0 ? "查询时段无降水" : ""}
              {dataSource.b !== "0.00" && showRain
                ? `,最大${dataSource.c}站${dataSource.d}毫米。全市${dataSource.e}
              个站点暴雨，${dataSource.f}个大雨，${dataSource.g}个中雨，
              ${dataSource.h}个小雨。`
                : "。"}
            </Row>
            <Row className="situation-text">
              <a className="text-title">河道水位：</a>超警戒水位的站点
              {dataSource.i}个。
            </Row>
            <Row className="situation-text">
              <a className="text-title">城市积水：</a>全市{dataSource.j}
              个积水点有积水
              {dataSource.j != "0"
                ? `，其中积水深超过20cm的有${dataSource.k}
              个，积水深超过10cm的有${dataSource.l}个。积水点所在区划中，东营区
              ${dataSource.m}个，开发区${dataSource.n}个。`
                : "。"}
            </Row>
          </>
        )}
      </>
    );
  }
  componentDidMount() {}
}
export default Situation;
