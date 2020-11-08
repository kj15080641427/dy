import React, { useEffect, useState } from "react";
import RouterList from "../../components/routerlist";
import { Tabs, Input, Button, Modal, Card } from "antd";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/ocean.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../home/redux/actions";
import { TableShow } from "../../components/chart/table";
import {
  getWfsRiver,
  getPump,
  getGate,
  getReservoir,
  getDike,
} from "@app/data/home";
import "./style.scss";
const { TabPane } = Tabs;
const tabRequest = {
  1: getWfsRiver,
  2: getPump,
  3: getGate,
  4: getReservoir,
  5: getDike,
};
const storyKeys = {
  1: "dataCenterRiver",
  2: "dataCenterPump",
  3: "dataCenterGate",
  4: "dataCenterReservoir",
  5: "dataCenterDike",
};
const river = [{ label: "名称", value: "name" }];
const pump = [{ label: "泵站名称", value: "name" }];

const infoObj = {
  1: river,
  2: pump,
};
const DataCenter = (props) => {
  const { getBase } = props.actions;
  const [tabKey, setTabKey] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({});
  const {
    dataCenterRiver,
    dataCenterPump,
    dataCenterGate,
    dataCenterReservoir,
    dataCenterDike,
  } = props;
  useEffect(() => {
    getBase({
      request: getWfsRiver,
      key: "dataCenterRiver",
    });
    getBase({
      request: getPump,
      key: "dataCenterPump",
    });
    getBase({
      request: getGate,
      key: "dataCenterGate",
    });
    getBase({
      request: getReservoir,
      key: "dataCenterReservoir",
    });
    getBase({
      request: getDike,
      key: "dataCenterDike",
    });
  }, []);
  const search = (
    <div className="data-center-search">
      <Input
        className="input"
        onChange={(e) => setInputValue(e.target.value)}
      ></Input>
      <Button
        className="query"
        type="primary"
        onClick={() =>
          getBase({
            request: tabRequest[tabKey],
            key: storyKeys[tabKey],
            param: { name: inputValue },
          })
        }
      >
        查询
      </Button>
      <Button
        className="reset"
        onClick={() => {
          getBase({
            request: tabRequest[tabKey],
            key: storyKeys[tabKey],
            param: { name: "" },
          });
        }}
      >
        重置
      </Button>
      {/* <Button className="out">导出</Button> */}
    </div>
  );
  return (
    <div className="data-center-body">
      <div className="data-center-modal">
        {/* <Modal
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          style={{ padding: "0px" }}
          className="data-center-modal"
        >
          <div className="data-center-card">
            <Card title={"名称"}>
              {river.map((item) => {
                return (
                  <div key={item.label}>
                    {item.label}:{infoObj[tabKey][info[item.value]]}
                  </div>
                );
              })}
            </Card>
          </div>
        </Modal> */}
      </div>
      <div style={{ height: "90px", background: "#003366" }}></div>
      <div className="right-background"></div>
      <Head titleImg={titleImg} style={{ zIndex: 9999 }}></Head>
      <RouterList></RouterList>
      <div className="task-card-container">
        <Tabs
          defaultActiveKey="1"
          type="card"
          tabBarExtraContent={search}
          onChange={(e) => setTabKey(e)}
        >
          <TabPane key="1" tab={`河流(${dataCenterRiver?.length})`}>
            <TableShow
              pageSize="10"
              columns={[
                {
                  name: "河流名称",
                  dataIndex: "name",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "流域名称",
                  dataIndex: "basin",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "河源详细地址",
                  dataIndex: "addresssrs",
                  width: "15%",
                  align: "center",
                },
                {
                  name: "河流总长",
                  dataIndex: "riverlen",
                  width: "10%",
                  align: "center",
                },

                {
                  name: "流域总面积",
                  dataIndex: "riverarea",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "防洪标准",
                  dataIndex: "floodspec",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "排涝标准",
                  dataIndex: "drainspec",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "维护时间",
                  dataIndex: "gmtmodify",
                  width: "10%",
                  align: "center",
                },
                // {
                //   name: "操作",
                //   dataIndex: "",
                //   width: "10%",
                //   align: "center",
                //   render: (record) => (
                //     <a
                //       onClick={() => {
                //         setInfo(record);
                //         setVisible(true);
                //       }}
                //     >
                //       详情
                //     </a>
                //   ),
                // },
              ]}
              dataSource={dataCenterRiver}
            ></TableShow>
          </TabPane>
          <TabPane key="2" tab={`泵站(${dataCenterPump?.length})`}>
            <TableShow
              pageSize="10"
              columns={[
                {
                  name: "名称",
                  dataIndex: "name",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "水泵数量",
                  dataIndex: "devicecount",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "所属灌区",
                  dataIndex: "irrigateregion",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "管理部门",
                  dataIndex: "ownermanagement",
                  width: "10%",
                  align: "center",
                },

                {
                  name: "管理单位",
                  dataIndex: "management",
                  width: "18%",
                  align: "center",
                },
                {
                  name: "河流名称",
                  dataIndex: "rivername",
                  width: "10%",
                  align: "center",
                },
                // {
                //   name: "操作",
                //   dataIndex: "gmtmodify",
                //   width: "10%",
                //   align: "center",
                //   render: () => <a>详情</a>,
                // },
              ]}
              dataSource={dataCenterPump}
            ></TableShow>
          </TabPane>
          <TabPane key="3" tab={`水闸(${dataCenterGate?.length})`}>
            <TableShow
              pageSize="10"
              columns={[
                {
                  name: "名称",
                  dataIndex: "name",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "主建筑物级别",
                  dataIndex: "buidinglevel",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "所属灌区",
                  dataIndex: "irrigateregion",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "管理部门",
                  dataIndex: "ownermanagement",
                  width: "10%",
                  align: "center",
                },

                {
                  name: "管理单位",
                  dataIndex: "management",
                  width: "18%",
                  align: "center",
                },
                {
                  name: "河流名称",
                  dataIndex: "rivername",
                  width: "10%",
                  align: "center",
                },
                // {
                //   name: "操作",
                //   dataIndex: "gmtmodify",
                //   width: "10%",
                //   align: "center",
                //   render: () => <a>详情</a>,
                // },
              ]}
              dataSource={dataCenterGate}
            ></TableShow>
          </TabPane>
          <TabPane key="4" tab={`水库(${dataCenterReservoir?.length})`}>
            <TableShow
              pageSize="10"
              columns={[
                {
                  name: "名称",
                  dataIndex: "name",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "河流名称",
                  dataIndex: "rivername",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "设计年供水量(m)",
                  dataIndex: "waterproviddesign",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "管理部门",
                  dataIndex: "ownermanagement",
                  width: "18%",
                  align: "center",
                },

                {
                  name: "正常蓄水位(m)",
                  dataIndex: "waterlevelnormal",
                  width: "18%",
                  align: "center",
                },
                {
                  name: "正常蓄水位(m)",
                  dataIndex: "waterlevelnormal",
                  width: "10%",
                  align: "center",
                },
                // {
                //   name: "操作",
                //   dataIndex: "gmtmodify",
                //   width: "10%",
                //   align: "center",
                //   render: () => <a>详情</a>,
                // },
              ]}
              dataSource={dataCenterReservoir}
            ></TableShow>
          </TabPane>
          <TabPane key="5" tab={`堤防工程(${dataCenterDike?.length})`}>
            <TableShow
              pageSize="10"
              columns={[
                {
                  name: "名称",
                  dataIndex: "name",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "河流名称",
                  dataIndex: "rivername",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "水闸数量(个)",
                  dataIndex: "gatecount",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "泵站数量(处)",
                  dataIndex: "pumpcount",
                  width: "10%",
                  align: "center",
                },

                {
                  name: "堤防类型",
                  dataIndex: "diketype",
                  width: "18%",
                  align: "center",
                },
                {
                  name: "河流名称",
                  dataIndex: "rivername",
                  width: "10%",
                  align: "center",
                },
                // {
                //   name: "操作",
                //   dataIndex: "gmtmodify",
                //   width: "10%",
                //   align: "center",
                //   render: () => <a>详情</a>,
                // },
              ]}
              dataSource={dataCenterDike}
            ></TableShow>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    dataCenterRiver: state.currency.dataCenterRiver,
    dataCenterPump: state.currency.dataCenterPump,
    dataCenterGate: state.currency.dataCenterGate,
    dataCenterReservoir: state.currency.dataCenterReservoir,
    dataCenterDike: state.currency.dataCenterDike,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DataCenter);
