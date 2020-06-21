/**
 * Warehouse 2020-05-14
 */
import React from 'react';
import "./style.scss";
import Base from "./Base";
import { Table } from "antd";
class Warehouse extends Base {
  static type = "warehouse";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
    this.columns = [
      {title: '名称', dataIndex: 'name', width: "25%"},
      {title: '数量', dataIndex: 'saveTotal', width: "25%"},
      {title: '单位', dataIndex: 'company', width: "25%"},
      {title: '规格', dataIndex: 'spec', width: "25%"},
    ];
  }
  render() {
    let { model } = this.props;
    let data = model.materials || [];
    return ( 
      <div className="m-ovl-box m-ovl-warehouse" style={{display: "none"}} ref={(node) => { this.container = node;}}>
        <div className="m-ovl-wh-wrap">
          <Table columns={this.columns} scroll={{y: 250}} dataSource={data} size="small" pagination={false}/>
        </div>
        <span className="iconfont iconcuo m-ovl-close" ></span>
      </div>
    );
  }
  componentDidCatch() {

  }
  componentDidMount() {
    super.componentDidMount();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  getType() {
    return Warehouse.type;
  }
  onCustomClick(e) {
    
  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Warehouse.type);
    }
  }
}
export default Warehouse;