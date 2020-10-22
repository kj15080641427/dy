/**
 * WaterAnnunciate 2020-07-28
 * 积水情通告报表
 */
import React from "react";
import { Table, Row, Col } from "antd";
import { tableColumnWater } from "../columns/columsData";
import "./style.scss";
class WaterAnnunciate extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
    };
  }
  render() {
    let { data } = this.state;
    let { loding } = this.props;
    return (
      <div className='water-table-style'>
        <br />
        <Table
          title={this.title}
          columns={tableColumnWater}
          dataSource={data}
          loading={loding}
          rowKey={(row) => row.number}
          size="small"
        ></Table>
      </div>
    );
  }
  title() {
    return (
      <Row>
        {/* <Col span={8}></Col>{" "} */}
        <Col
          span={8}
          style={{
            fontSize: 30,
            fontWeight: 1000,
            color: "rgb(0, 153, 255)",
          }}
        >
          积水点水深统计表(cm)
        </Col>
        <Col span={8}></Col>
      </Row>
    );
  }
  componentDidUpdate() {
    this.setState({
      data: this.props.dataSource,
    });
  }
}
export default WaterAnnunciate;
