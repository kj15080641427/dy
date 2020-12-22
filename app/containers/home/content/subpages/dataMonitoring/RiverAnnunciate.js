/**
 * RiverAnnunciate 2020-07-25
 * 河道通告报表
 */
import React from "react";
import { Table, Button, Input } from "antd";
import { tableColumnRiver } from "./columns/columsData";
import { downlRiverdata } from "@app/data/request";
// import "./style.scss";
class RiverAnnunciate extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      loding: false,
      time: "",
      name: "",
    };
    this.init = this.init.bind(this);
  }
  onChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  downl = () => {
    var url = "/api/download/river";
    if (this.state.time !== "") {
      url += "?tm=" + this.state.time;
    }
    window.location.href = url;
  };
  render() {
    return (
      <>
        <div className="view-query">
          <div className="view-query">
            <Input
              placeholder="输入河流名称"
              onChange={(e) => this.onChange(e)}
            ></Input>
          </div>
          <Button type="primary" size="large" onClick={this.init}>
            查询
          </Button>
          {/* <Button type="primary" size="large" onClick={this.downl}>
            导出
          </Button> */}
        </div>

        <br />
        <Table
          columns={tableColumnRiver}
          dataSource={this.state.data}
          loading={this.state.loding}
        ></Table>
      </>
    );
  }
  init() {
    this.setState({
      loding: true,
    });
    downlRiverdata({
      current: 0,
      name: this.state.name,
      size: 10,
    }).then((result) => {
      this.setState({
        data: result.data.records,
        loding: false,
      });
    });
  }
  componentDidMount() {
    this.init();
  }
}
export default RiverAnnunciate;
