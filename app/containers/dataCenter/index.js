import React, { useEffect, useState } from "react";
import RouterList from "../../components/routerlist";
import { Tabs, Input, Button, Modal, Card } from "antd";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/dataCenter.png";
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
import ModalInfo from "./modelInfo";
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
const river = [
  { label: "流域名称", value: "name" },
  { label: "经度", value: "lonsrs" },
  { label: "纬度", value: "latsrs" },
  { label: "河口经度", value: "londest" },
  { label: "入河纬度", value: "latdest" },

  { label: "河源详细地址", value: "addresssrs" },
  { label: "河口详细地址", value: "addressdest" },
  { label: "上一级河流", value: "riverlevelabove" },
  { label: "流经范围", value: "flowrange" },
  { label: "河流总长", value: "riverlen", unit: "(m)" },

  { label: "流域总面积", value: "riverarea", unit: "(㎡)" },
  { label: "流经东营市河流长度", value: "riverlendy", unit: "(m)" },
  { label: "流域面积东营市", value: "riveraready", unit: "(㎡)" },
  { label: "防洪标准", value: "floodspec" },
  { label: "排涝标准", value: "drainspec" },

  { label: "防洪流量最小", value: "antifloodflowmin", unit: "(m³)" },
  { label: "防洪流量最大", value: "antifloodflowmax", unit: "(m³)" },
  { label: "最新维护时间", value: "gmtmodify" },
];
const pump = [
  { label: "泵站名称", value: "name" },
  { label: "泵站编码", value: "stcd" },
  { label: "所在水资源三级区名称", value: "waterresource3" },
  { label: "所在灌区", value: "irrigateregion" },
  { label: "河流名称", value: "rivername" },
  { label: "建成时间", value: "buildtime" },
  { label: "工程任务", value: "projecttask" },
  { label: "工程等级", value: "projectlevel" },
  { label: "主要建筑物级别", value: "buildinglevel" },
  { label: "管理单位", value: "management" },
  { label: "归口管理部门", value: "ownermanagement" },
  { label: "设计扬程", value: "delivery" },
  { label: "水泵数量", value: "devicecount", unit: "(个)" },
  { label: "经度", value: "lon" },
  { label: "纬度", value: "lat" },
  {
    label: "是否为闸站工程",
    value: "isgateproject",

    isDict: "whether",
  },
  {
    label: "是否为引泉工程",
    value: "isspringsproject",

    isDict: "whether",
  },
  { label: "是否完成划界", value: "isbordered", isDict: "whether" },
  { label: "是否完成确权", value: "isauthorized", isDict: "whether" },
  { label: "装机流量(m³/s)", value: "flow" },
  { label: "装机功率(kW)", value: "power" },
  { label: "维护时间", value: "gmtmodify" },
];
const gate = [
  { label: "水闸名称", value: "name" },
  { label: "闸站编号", value: "stcd" },
  { label: "类别", value: "type", isDict: "type" },
  { label: "地区编码", value: "region" },
  { label: "经度", value: "lon" },
  { label: "纬度", value: "lat" },
  { label: "所在灌区", value: "irrigateregion" },
  { label: "所在水资源三级区名称", value: "waterresource3" },
  { label: "所在河流", value: "rivername" },

  { label: "建成时间", value: "buildtime" },
  { label: "水闸管理单位名称", value: "management" },
  { label: "工程等级", value: "projectlevel" },
  { label: "主要建筑物级别", value: "buidinglevel" },
  { label: "水闸归口管理部门", value: "ownermanagement" },
  { label: "是否为闸站工程", value: "isgateproject", isDict: "whether" },
  { label: "是否为套闸工程", value: "isdualproject", isDict: "whether" },
  { label: "是否完成划界", value: "isbordered", isDict: "whether" },
  { label: "是否完成确权", value: "isauthorized", isDict: "whether" },
  { label: "记录创建时间", value: "gmtcreate" },
  { label: "记录修改日期", value: "gmtmodify" },
];
const reservoir = [
  { label: "水库名称", value: "name" },
  { label: "经度", value: "lon" },
  { label: "纬度", value: "lat" },
  { label: "所在水资源三级区名称", value: "waterresource3" },
  { label: "河流名称", value: "rivername" },
  { label: "水库类型", value: "rvtype", isDict: "rvType" },
  { label: "类型", value: "rvtype1", isDict: "rvType1" },
  { label: "挡水主坝类型按材料分", value: "rvbartypem", isDict: "rvbartypem" },
  { label: "挡水主坝类型按结构分", value: "rvbartypes", isDict: "rvbartypes" },
  { label: "主要泄洪建筑物型式", value: "flooddischargetype" },
  { label: "生产安置人口（万人）", value: "polution" },

  { label: "工程建设情况", value: "projectstatus" },
  { label: "建成时间", value: "buildtime" },
  { label: "水库调节性能", value: "rvadjust" },
  { label: "工程等别", value: "projectlevel" },
  { label: "主坝级别", value: "barlevel" },

  { label: "主坝尺寸坝高（m）", value: "barheight" },
  { label: "主坝尺寸坝长（m）", value: "barlen" },
  { label: "最大泄洪流量（m3/S）", value: "floodmax" },
  { label: "高程系统", value: "elevationsystem" },
  { label: "坝顶高程(m)", value: "bartopheight" },

  { label: "正常蓄水位(m)", value: "waterlevelnormal" },
  { label: "死水位(m)", value: "waterleveldeath" },
  { label: "总库容（万m3）", value: "capacitymax" },
  { label: "死库容(万m3)", value: "capacitydeath" },
  { label: "正常蓄水位相应水面面积（km2）", value: "areanormal" },
  { label: "供水", value: "waterprovid", isDict: "whether" },
  { label: "灌溉", value: "irrigate", isDict: "whether" },
  { label: "养殖", value: "farmer", isDict: "whether" },
  { label: "设计年供水量(万m3)", value: "waterproviddesign" },
  { label: "2011年供水量(万m3)", value: "waterprovidactual" },
  { label: "2011年供水量数据来源", value: "areairrigate" },

  { label: "取水口数量(个)", value: "intakecount" },
  { label: "供水对象", value: "watersupplytarget" },
  { label: "设计灌溉面积(万亩)", value: "waterprovidactualsrs" },

  { label: "灌溉对象", value: "irrigatetarget" },
  { label: "管理单位", value: "management" },
  { label: "水口管理单位", value: "ownermanagement" },

  { label: "是否完成划界", value: "isbordered", isDict: "whether" },
  { label: "是否完成确权", value: "isauthorized", isDict: "whether" },
  { label: "记录创建时间", value: "gmtcreate" },
  { label: "记录修改时间", value: "gmtmodify" },
];
const dike = [
  { label: "堤防名称", value: "name" },
  { label: "起点地理坐标经度", value: "startlat" },
  { label: "起点地理坐标纬度", value: "startlon" },
  { label: "终点地理坐标经度", value: "endlon" },
  { label: "终点地理坐标纬度", value: "endlat" },
  { label: "起点位置", value: "addrstart" },
  { label: "终点位置", value: "addrend" },
  { label: "所在河流(湖泊、海岸)名称", value: "rivername" },
  { label: "河流岸别", value: "riverside" },
  { label: "堤防跨界情况", value: "dikeinfo" },
  { label: "堤防类型", value: "diketype" },
  { label: "堤防型式", value: "dikestyle" },

  { label: "建成时间", value: "buildtime" },
  { label: "管理部门", value: "management" },
  { label: "工程任务", value: "projectobjective" },

  { label: "堤防级别", value: "dikelevel" },
  { label: "是否完成划界", value: "isbordered", isDict: "whether" },
  { label: "规划防洪(潮)标准［重现期］（年）", value: "yeardesign" },
  { label: "堤防长度(m)", value: "dikelen" },
  { label: "是否完成确权", value: "isauthorized", isDict: "whether" },
  { label: "达到规划防洪（潮）标准的长度(m)", value: "dikelendesign" },
  { label: "高程系统", value: "elevationsystem" },
  { label: "起点堤顶高程", value: "eletops" },
  { label: "终点堤顶高程(m)", value: "eletope" },
  { label: "设计水（高潮）位(m)", value: "waterleveldesgin" },
  { label: "最大堤防高度(m)", value: "maxheight" },
  { label: "最小堤防高度(m)", value: "minheight" },
  { label: "最大堤顶宽度(m)", value: "maxwidth" },
  { label: "最小堤顶宽度(m)", value: "minwidth" },

  { label: "水闸数量(个)", value: "gatecount" },
  { label: "管涵数量(个)", value: "holecount" },
  { label: "泵站数量(处)", value: "pumpcount" },
  { label: "倒虹吸数量(个)，", value: "siphowcount" },

  { label: "记录创建时间", value: "gmtcreate" },
  { label: "记录修改时间", value: "gmtmodify" },
];
const infoObj = {
  1: river,
  2: pump,
  3: gate,
  4: reservoir,
  5: dike,
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
        value={inputValue}
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
          setInputValue("");
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
      <ModalInfo
        list={infoObj[tabKey]}
        visible={visible}
        setVisible={setVisible}
        info={info}
      ></ModalInfo>

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
              pageSize="20"
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
                  name: "河流总长(m)",
                  dataIndex: "riverlen",
                  width: "10%",
                  align: "center",
                },

                {
                  name: "流域总面积(㎡)",
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
                // {
                //   name: "维护时间",
                //   dataIndex: "gmtmodify",
                //   width: "10%",
                //   align: "center",
                // },
                {
                  name: "操作",
                  dataIndex: "",
                  width: "10%",
                  align: "center",
                  render: (record) => (
                    <a
                      onClick={() => {
                        setInfo(record);
                        setVisible(true);
                      }}
                    >
                      详情
                    </a>
                  ),
                },
              ]}
              dataSource={dataCenterRiver}
            ></TableShow>
          </TabPane>
          <TabPane key="2" tab={`泵站(${dataCenterPump?.length})`}>
            <TableShow
              pageSize="20"
              columns={[
                {
                  name: "名称",
                  dataIndex: "name",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "水泵数量(个)",
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
                {
                  name: "操作",
                  dataIndex: "",
                  width: "10%",
                  align: "center",
                  render: (record) => (
                    <a
                      onClick={() => {
                        setInfo(record);
                        setVisible(true);
                      }}
                    >
                      详情
                    </a>
                  ),
                },
              ]}
              dataSource={dataCenterPump}
            ></TableShow>
          </TabPane>
          <TabPane key="3" tab={`水闸(${dataCenterGate?.length})`}>
            <TableShow
              pageSize="20"
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
                {
                  name: "操作",
                  dataIndex: "",
                  width: "10%",
                  align: "center",
                  render: (record) => (
                    <a
                      onClick={() => {
                        setInfo({
                          ...record,
                          isauthorized: !record.isauthorized ? 1 : 0,
                          isbordered: !record.isbordered ? 1 : 0,
                          isdualproject: !record.isdualproject ? 1 : 0,
                          isgateproject: !record.isgateproject ? 1 : 0,
                        });
                        setVisible(true);
                      }}
                    >
                      详情
                    </a>
                  ),
                },
              ]}
              dataSource={dataCenterGate}
            ></TableShow>
          </TabPane>
          <TabPane key="4" tab={`水库(${dataCenterReservoir?.length})`}>
            <TableShow
              pageSize="20"
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
                  name: "设计年供水量(万m3)",
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
                  name: "死水位(m)",
                  dataIndex: "waterleveldeath",
                  width: "10%",
                  align: "center",
                },
                {
                  name: "操作",
                  dataIndex: "",
                  width: "10%",
                  align: "center",
                  render: (record) => (
                    <a
                      onClick={() => {
                        setInfo(record);
                        setVisible(true);
                      }}
                    >
                      详情
                    </a>
                  ),
                },
              ]}
              dataSource={dataCenterReservoir}
            ></TableShow>
          </TabPane>
          <TabPane key="5" tab={`堤防工程(${dataCenterDike?.length})`}>
            <TableShow
              pageSize="20"
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
                {
                  name: "操作",
                  dataIndex: "",
                  width: "10%",
                  align: "center",
                  render: (record) => (
                    <a
                      onClick={() => {
                        setInfo(record);
                        setVisible(true);
                      }}
                    >
                      详情
                    </a>
                  ),
                },
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
