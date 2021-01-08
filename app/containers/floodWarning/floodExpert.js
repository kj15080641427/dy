import React from "react";
import { Tabs, Popover } from "antd";
import { TableShow } from "../../components/chart/table";
import "./style.scss";
const { TabPane } = Tabs;

const FloodExpert = (props) => {
  const { expert } = props;
  return (
    <div className="floodwarning-flex">
      <div className="pie-title-flex">
        <div>
          <label className="number-color" style={{ marginLeft: "20px" }}>
            {expert?.city?.length}
          </label>
          <label style={{ marginLeft: "20px" }}>市级专家</label>
        </div>
        <div>
          <label className="number-color">{expert?.county?.length}</label>
          <label>县级专家</label>
        </div>
        <div>
          <label className="number-color" style={{ marginRight: "20px" }}>
            {expert?.town?.length}
          </label>
          <label style={{ marginRight: "20px" }}>乡镇专家</label>
        </div>
      </div>
      <div className="card-container">
        <Tabs defaultActiveKey="1" onChange={(e) => console.log(e)} type="card">
          <TabPane key="1" tab="市级专家">
            <TableShow
              rowKey='floodId'
              pageSize={8}
              columns={[
                {
                  name: "姓名",
                  dataIndex: "name",
                  width: "33%",
                  filter: "name",
                },
                {
                  name: "工作单位",
                  dataIndex: "unit",
                  width: "34%",
                  render: (name) => (
                    <Popover content={name}>
                      {name?.length > 8
                        ? name.toString().substring(0, 8) + "..."
                        : name}
                    </Popover>
                  ),
                },
                {
                  name: "专家电话",
                  dataIndex: "phone",
                  width: "33%",
                },
              ]}
              dataSource={expert?.city}
            />
          </TabPane>
          <TabPane key="2" tab="县级专家">
            <TableShow
              pageSize={7}
              columns={[
                {
                  name: "姓名",
                  dataIndex: "name",
                  width: "33%",
                  filter: "name",
                },
                {
                  name: "工作单位",
                  dataIndex: "unit",
                  width: "34%",
                  render: (name) => (
                    <Popover content={name}>
                      {name?.length > 8
                        ? name.toString().substring(0, 8) + "..."
                        : name}
                    </Popover>
                  ),
                },
                {
                  name: "专家电话",
                  dataIndex: "phone",
                  width: "33%",
                },
              ]}
              dataSource={expert?.county}
            />
          </TabPane>
          <TabPane key="3" tab="乡镇专家">
            <TableShow
              pageSize={7}
              columns={[
                {
                  name: "姓名",
                  dataIndex: "name",
                  width: "33%",
                  filter: "name",
                },
                {
                  name: "工作单位",
                  dataIndex: "unit",
                  width: "34%",
                  render: (name) => (
                    <Popover content={name}>
                      {name?.length > 8
                        ? name.toString().substring(0, 8) + "..."
                        : name}
                    </Popover>
                  ),
                },
                {
                  name: "专家电话",
                  dataIndex: "phone",
                  width: "33%",
                },
              ]}
              dataSource={expert?.town}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default FloodExpert;
