/**
 * Monitor 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
import Map from "./map/map";
import "./style.scss";
import Head from "./head/Head";
import WeatherPic from "./right/WeatherPic";
import CheckBoxs from "../monitor/bottom/CheckBox";
import setImg from "@app/resource/setsys.png";
import {
  Drawer,
  Row,
  Divider,
  Checkbox,
  Tabs,
  Input,
  Space,
  Button,
  Popover,
} from "antd";
import Highlighter from "react-highlight-words";
import SetTitle from "@app/components/setting/SetTitle";
import { SearchOutlined } from "@ant-design/icons";
import RouterList from "../../components/routerLiis";
import { RenderBox } from "../../components/chart/decorate";
import { pieChart } from "../../components/chart/chart";
import { TableShow } from "../../components/chart/table";
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
    const { floodRanks } = this.props;
    if (floodRanks !== pre.floodRanks) {
      let list = [];
      floodRanks.forEach((item) => {
        list.push({
          name: item.name.split("防汛")[0],
          value: item.userList?.length,
          textStyle: { fontSize: "24px" },
        });
      });
      pieChart("floodWaringPie", list);
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
    const { expert, wareHouse, material, floodRanks, expertCount } = this.props;
    return (
      <div className="flood-warning-display">
        <Map layerVisible={layerVisible}></Map>
        <Head></Head>
        <div style={{ display: displayLeft }}>
          <div className="flood-warning-left">
            <RenderBox hasTitle title="东营市防汛人员">
              <div className="floodWaringPie" id="floodWaringPie"></div>
              <div className="flood-text">{`共${expertCount}人`}</div>
              <div className="card-container">
                <Tabs
                  type="card"
                  defaultActiveKey="1"
                  onChange={(e) => this.setState({ tabsKey: e })}
                >
                  {floodRanks?.map((item, index) => (
                    <TabPane key={index} tab={item.name.split("防汛")[0]}>
                      <TableShow
                        columns={[
                          {
                            name: "名称",
                            dataIndex: "name",
                            filter: "name",
                            width: "25%",
                            // filter: "name",
                            // ...this.getColumnSearchProps("name"),
                          },
                          {
                            name: "单位",
                            dataIndex: "unit",
                            width: "25%",
                            render: (name) => (
                              <Popover content={name}>
                                {name?.length > 6
                                  ? name.toString().substring(0, 6) + "..."
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
                                  ? name.toString().substring(0, 6) + "..."
                                  : name}
                              </Popover>
                            ),
                          },
                        ]}
                        dataSource={floodRanks && floodRanks[tabsKey].userList}
                      ></TableShow>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </RenderBox>
            <br />
            <div className="flood-warning-chart">
              <WeatherPic></WeatherPic>
            </div>
            {/* <WeatherTable></WeatherTable> */}
          </div>
        </div>
        <div style={{ display: displayRight }}>
          <div className="flood-warning-right">
            <RenderBox hasTitle title="专家库">
              <div className="pie-title-flex">
                <div>
                  <label className="number-color">{expert?.city?.length}</label>
                  <label>市级专家</label>
                </div>
                <div>
                  <label className="number-color">
                    {expert?.county?.length}
                  </label>
                  <label>县级专家</label>
                </div>
                <div>
                  <label className="number-color">{expert?.town?.length}</label>
                  <label>乡镇专家</label>
                </div>
              </div>
              <div className="card-container">
                <Tabs
                  defaultActiveKey="1"
                  onChange={(e) => console.log(e)}
                  type="card"
                >
                  <TabPane key="1" tab="市级专家">
                    <TableShow
                      columns={[
                        {
                          name: "名称",
                          dataIndex: "name",
                          width: "33%",
                          filter: "name",
                        },
                        { name: "工作单位", dataIndex: "unit", width: "34%" },
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
                      columns={[
                        {
                          name: "名称",
                          dataIndex: "name",
                          width: "70",
                          filter: "name",
                        },
                        { name: "工作单位", dataIndex: "unit", width: "300px" },
                        {
                          name: "专家电话",
                          dataIndex: "phone",
                          width: "100px",
                        },
                      ]}
                      dataSource={expert?.county}
                    />
                  </TabPane>
                  <TabPane key="3" tab="乡镇专家">
                    <TableShow
                      columns={[
                        {
                          name: "名称",
                          dataIndex: "name",
                          width: "70",
                          filter: "name",
                        },
                        { name: "工作单位", dataIndex: "unit", width: "300px" },
                        {
                          name: "专家电话",
                          dataIndex: "phone",
                          width: "100px",
                        },
                      ]}
                      dataSource={expert?.town}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </RenderBox>
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
                            width: "25%",
                          },
                          { name: "单位", dataIndex: "company", width: "25%" },
                          { name: "规格", dataIndex: "spec", width: "25%" },
                        ]}
                        dataSource={material}
                      />
                    </TabPane>
                  ))}
                  {/* <TabPane key="1" tab="市水务局"></TabPane>
                  <TabPane key="2" tab="东营区"></TabPane>
                  <TabPane key="3" tab="垦利区"></TabPane>
                  <TabPane key="4" tab="河口区"></TabPane>
                  <TabPane key="5" tab="利津县"></TabPane>
                  <TabPane key="6" tab="广饶县"></TabPane> */}
                </Tabs>
              </div>
            </RenderBox>
            {/* <PannelBtn></PannelBtn> */}
            {/* <WeatherDy></WeatherDy>
            <AlarmTable></AlarmTable>
            <WeatherPic></WeatherPic> */}
          </div>
        </div>
        <RouterList></RouterList>
        {/* <div style={{ display: this.state.displayBottom }}>
          <div className="m-bottom" >
            <CheckBox layerVisible={layerVisible} onChecked={this.onChecked}></CheckBox>
          </div>
        </div> */}
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
  console.log(state, "STATE");
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
