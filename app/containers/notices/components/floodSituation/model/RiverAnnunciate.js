/**
 * RiverAnnunciate 2020-07-25
 * 河道通告报表
 */
import React from "react";
import { Table, Row, Col } from "antd";
import { tableColumnRiver } from "../columns/columsData";
import "./style.scss";
class RiverAnnunciate extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
    };
  }
  render() {
    const filterData = (data) => {
      let list = [];
      data.map((item) => {
        if (item.z > item.waning && item.z && Number(item.waning)) {
          list.unshift(item);
        } else {
          list.push(item);
        }
      });
      return list;
    };
    let { data } = this.state;
    let { loding } = this.props;
    return (
      <div className="water-table-style">
        <br />
        <Table
          title={this.title}
          columns={tableColumnRiver}
          dataSource={filterData(data)}
          loading={loding}
          rowKey={(row) => row.stnm}
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
          河道水位统计表(m)
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
export default RiverAnnunciate;
