import React from "react";
import { Table } from "antd";
import { bindActionCreators } from "redux";
import {} from '../../../redux/actions'
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "地址",
    dataIndex: "stlc",
  },
];
export default function SiteRain() {
  return (
    <>
      <div></div>
      <div>
        <Table
          // loading={loading}
          columns={columns}
          // dataSource={dataSource}
          // scroll={{ y: 700 }}
          // rowKey={(row) => row.materialWarehouseId}
          // pagination={pagination}
        ></Table>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    siteWater: currency.siteWater,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
