/**
 * Monitor 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import Map from "./map/map";
import "./style.scss";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/floodWarning.png";
import WeatherPic from "./right/WeatherPic";
import CheckBoxs from "../../components/setting/setting";
import setImg from "@app/resource/setsys.png";
// import Satellite from "../display/left/SatelliteFlood";
import { Drawer, Row, Divider, Checkbox, Tabs, Popover, Radio } from "antd";
import SetTitle from "@app/components/setting/SetTitle";
import RouterList from "../../components/routerlist";
import { RenderBox } from "../../components/chart/decorate";
import { pieChart } from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";
import FloodExpert from "./floodExpert";
import PublicSent from "./publicSentiment";
const { TabPane } = Tabs;
class Monitor extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tabsKey: 0, //防汛人员key
      showLeft: true,
      showRight: true,
      // showBottom: true,
      visible: false,
      dispalyLeft: "block",
      displayRight: "block",
      radio: "a",
      // dispalyBottom: 'block',
      layerVisible: {
        tiandi: true, // 天地图底图
        tiandi2: true, // 天地图标注
        wfsRiver: false, // wfs河道图
        river40: true, //40条河图片 用于解决河道标注很多的问题
        flood: false, // 洪水图层
        river: true, // 水系图
        heatmap: true, // 热力图
        traffic: false, // 交通图层
        person: true, // 防汛人员
        video: false, // 视频站点
        rain: false, // 雨量站
        water: true, // 水位站
        gate: false, // 水闸
        pump: false, // 水泵
        ponding: false, // 积水
      },
    };
    this.onChecked = this.onChecked.bind(this);
  }
  //设置抽屉页
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidUpdate(pre) {
    const { floodRanks, expertCount } = this.props;
    if (floodRanks !== pre.floodRanks) {
      let list = [];
      floodRanks.forEach((item) => {
        list.push({
          name: item.name.split("防汛")[0],
          value: item.userList?.length,
          textStyle: { fontSize: "24px" },
        });
      });
      pieChart("floodWaringPie", list, 450, [], {
        text: `共${expertCount}人`,
        left: "center",
        top: "center",
        textStyle: { color: "white", fontWeight: "200", fontSize: 14 },
      });
    }
  }
  componentDidMount() {
    this.props.actions.getFloodRankUser(); //获取防汛队伍下的防汛人员
    this.props.actions.getMaterialById(32); //根据仓库id获取物资
    // this.props.actions.getFloodUser();
    this.props.actions.getFloodExpert(); //获取防汛专家
    this.props.actions.getWarehouse(); //防汛仓库
  }
  render() {
    let { layerVisible, displayRight, displayLeft, tabsKey } = this.state;
    const { expert, wareHouse, material, floodRanks } = this.props;
    return (
      <div className="flood-warning-display">
        {/* <script src="http://119.187.146.174:10416/shzh/base/js/md5/md5.js"></script> */}
        {/* {console.log(faultylabs, "faultylabs")} */}
        <Map layerVisible={layerVisible}></Map>
        <Head titleImg={titleImg} groundColor="#003366"></Head>
        <div style={{ display: displayLeft }}>
          <div className="flood-warning-left">
            <div className="first-box">
              <RenderBox hasTitle title="东营市防汛人员">
                <Radio.Group
                  defaultValue={this.state.radio}
                  buttonStyle="solid"
                  className="rain-chart-radio"
                  onChange={(e) => {
                    this.setState({ radio: e.target.value });
                  }}
                >
                  <Radio.Button
                    value="a"
                    style={
                      this.state.radio == "b"
                        ? {
                            background: "#003366",
                            color: "#3397d4",
                            borderTop: "1px solid rgb(0, 51, 102)",
                            borderLeft: "1px solid rgb(0, 51, 102)",
                            borderBottom: "1px solid rgb(0, 51, 102)",
                            borderRight: "0px solid rgb(0, 51, 102)",
                          }
                        : {}
                    }
                  >
                    防汛人员
                  </Radio.Button>
                  <Radio.Button
                    value="b"
                    style={
                      this.state.radio == "a"
                        ? {
                            background: "#003366",
                            color: "#3397d4",
                            borderTop: "1px solid rgb(0, 51, 102)",
                            borderRight: "1px solid rgb(0, 51, 102)",
                            borderBottom: "1px solid rgb(0, 51, 102)",
                            borderLeft: "0px solid rgb(0, 51, 102)",
                          }
                        : {}
                    }
                  >
                    防汛专家
                  </Radio.Button>
                </Radio.Group>
                <div
                  style={{
                    display: this.state.radio == "a" ? "block" : "none",
                    marginTop: "10px",
                  }}
                >
                  <div className="floodwarning-flex">
                    <div className="floodWaringPie" id="floodWaringPie"></div>
                    <div className="card-container">
                      <Tabs
                        type="card"
                        defaultActiveKey="1"
                        onChange={(e) => this.setState({ tabsKey: e })}
                      >
                        {floodRanks?.map((item, index) => (
                          <TabPane key={index} tab={item.name.split("防汛")[0]}>
                            <TableShow
                              pageSize={5}
                              columns={[
                                {
                                  name: "姓名",
                                  dataIndex: "name",
                                  filter: "name",
                                  width: "25%",
                                },
                                {
                                  name: "单位",
                                  dataIndex: "unit",
                                  width: "25%",
                                  render: (name) => (
                                    <Popover content={name}>
                                      {name?.length > 6
                                        ? name.toString().substring(0, 6) +
                                          "..."
                                        : name}
                                    </Popover>
                                  ),
                                },
                                {
                                  name: "联系电话",
                                  dataIndex: "phone",
                                  width: "25%",
                                },
                                {
                                  name: "备注",
                                  dataIndex: "remark",
                                  width: "25%",
                                  render: (name) => (
                                    <Popover content={name}>
                                      {name?.length > 6
                                        ? name.toString().substring(0, 6) +
                                          "..."
                                        : name}
                                    </Popover>
                                  ),
                                },
                              ]}
                              dataSource={
                                floodRanks && floodRanks[tabsKey].userList
                              }
                            ></TableShow>
                          </TabPane>
                        ))}
                      </Tabs>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: this.state.radio == "b" ? "block" : "none",
                    marginTop: "30px",
                  }}
                >
                  <FloodExpert expert={expert} />
                </div>
              </RenderBox>
            </div>
            {/* <br /> */}
            <div className="second-box">
              <RenderBox hasTitle title="防汛物资仓库">
                <div className="card-container">
                  <Tabs
                    type="card"
                    defaultActiveKey="1"
                    onChange={(e) => this.props.actions.getMaterialById(e)}
                  >
                    {wareHouse?.map((item) => (
                      <TabPane
                        key={item.materialWarehouseId}
                        tab={item.name.split("防汛")[0]}
                      >
                        <TableShow
                          pageSize={5}
                          columns={[
                            {
                              name: "名称",
                              dataIndex: "name",
                              filter: "name",
                              width: "25%",
                            },
                            {
                              name: "数量",
                              dataIndex: "saveTotal",
                              width: "15%",
                            },
                            {
                              name: "单位",
                              dataIndex: "company",
                              width: "15%",
                            },
                            {
                              name: "规格",
                              dataIndex: "spec",
                              width: "45%",
                              render: (name) => (
                                <Popover content={name}>
                                  {name?.length > 15
                                    ? name.toString().substring(0, 15) + "..."
                                    : name}
                                </Popover>
                              ),
                            },
                          ]}
                          dataSource={material}
                        />
                      </TabPane>
                    ))}
                  </Tabs>
                </div>
              </RenderBox>
            </div>
            {/* <WeatherTable></WeatherTable> */}
          </div>
        </div>
        <div style={{ display: displayRight }}>
          <div className="flood-warning-right">
            <RenderBox hasTitle title="舆情预警">
              <PublicSent />
            </RenderBox>
            <div className="flood-warning-chart">
              <WeatherPic></WeatherPic>
            </div>
          </div>
        </div>
        <RouterList></RouterList>
        <img
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
          className="m-set-img"
          src={setImg}
        ></img>
        <Drawer
          title={<SetTitle></SetTitle>}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={320}
        >
          <a style={{ fontSize: 18, color: "#000000fd", fontWeight: "bold " }}>
            主界面
          </a>
          <Divider />
          <Row>
            <div>
              <Checkbox
                checked={this.state.showLeft}
                onClick={() => {
                  this.setState({
                    showLeft: !this.state.showLeft,
                    displayLeft: this.state.showLeft ? "none" : "block",
                  });
                }}
                defaultChecked
              />
              &nbsp;&nbsp;
              <a style={{ fontSize: 15, color: "#000000fd" }}>左侧栏</a>
            </div>
          </Row>
          <br />
          <Row>
            <div>
              <Checkbox
                checked={this.state.showRight}
                onClick={() => {
                  this.setState({
                    showRight: !this.state.showRight,
                    displayRight: this.state.showRight ? "none" : "block",
                  });
                }}
                defaultChecked
              />
              &nbsp;&nbsp;
              <a style={{ fontSize: 15, color: "#000000fd" }}>右侧栏</a>
            </div>
          </Row>
          <CheckBoxs
            layerVisible={layerVisible}
            onChecked={this.onChecked}
          ></CheckBoxs>
        </Drawer>
      </div>
    );
  }
  onChecked(layerKey, checked) {
    let { layerVisible } = this.state;
    if (layerVisible[layerKey] === checked) {
      return;
    }
    layerVisible[layerKey] = checked;
    this.setState({
      layerVisible: { ...layerVisible },
    });
  }
}
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  // console.log(state, "STATE");
  return {
    expertCount: state.mapAboutReducers.expertCount,
    floodRanks: state.mapAboutReducers.floodRanks,
    material: state.mapAboutReducers.material,
    wareHouse: state.mapAboutReducers.wareHouse,
    expert: state.mapAboutReducers.expert,
    // floodUser: state.mapAboutReducers.floodUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
