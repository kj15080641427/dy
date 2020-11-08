import React, { Component } from "react";
import { connect } from "react-redux";
import RouterList from "../../components/routerlist";
import * as actions from "../../redux/actions/floodModel";
import "./style.scss";
import Head from "./head/Head";
import Map from "./map/map";
import { RenderBox } from "../../components/chart/decorate";
import { modelChart } from "../../components/chart/chart";
import {
  Table,
  DatePicker,
  Button,
  Divider,
  Modal,
  Spin,
  message,
  Tabs,
  Popover,
} from "antd";
import ReactEcharts from "echarts-for-react";
import { TableShow } from "../../components/chart/table";

import moment from "moment";

class FloodModel extends Component {
  constructor(props) {
    super(props);

    this.TableColumns = [
      {
        title: "",
        className: "tableRow",
        render: (text, record) => {
          const { model } = this.props;
          if (record.modelPredictionId === model.selectedPredictionId) {
            return <span style={{ color: "green" }}>{"✔"}</span>;
          }

          return <></>;
        },
        width: 40,
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 140,
        className: "tableRow",
      },
      {
        title: "开始时间",
        dataIndex: "beginTime",
        key: "beginTime",
        className: "tableRow",
        render: (text, record) => {
          return (
            <span>{moment(record.beginTime).format("YYYY-MM-DD HH点")}</span>
          );
        },
      },
      // {
      //     title: '结束时间',
      //     dataIndex: 'endTime',
      //     key: 'endTime',
      //     render: (text, record) => {
      //         return (
      //             <span>{moment(record.endTime).format('YYYY-MM-DD HH点')}</span>
      //         );
      //     }
      // },
      {
        title: " ",
        className: "tableRow",
        render: (text, record) => {
          return (
            <Button
              type={"link"}
              size={"small"}
              onClick={() => {
                this.onViewPrediction(record.modelPredictionId);
                this.props.dispatch(actions.setDefaultPred(record));
                // this.setState({ titleTime: record.beginTime });
              }}
              // onClick={this.onViewPrediction.bind(
              //   this,
              //   record.modelPredictionId
              // )}
            >
              {"选择"}
            </Button>
          );
        },
      },
    ];

    this.state = {
      modalVisible: false,
      selectedSite: {},
      loading: false,
      runModelTime: moment(),
      predictionId: "",
      waterName: "",
      floodName: "",
    };
  }

  render() {
    let curDate = new moment();
    let dataSource = [...this.props.model.predictions];
    const {
      water,
      initFlood,
      dispatch,
      defaultPred,
      defaultWater,
      defaultFlood,
    } = this.props;
    const { predictionId } = this.state;
    return (
      <div className="flood-model-display">
        <Map
          layerVisible={{ water: true }}
          onFeatureClick={this.onFeatureClick.bind(this)}
        />
        <div className="flood-noyices-top" />
        <Head />
        <RouterList />
        <div className="m-left">
          <Spin spinning={this.props.model.loading}>
            <RenderBox
              hasTitle
              title="降水预报走势图"
              style={{ height: "200px" }}
            >
              <div className="flood-head-rain" id="floodHeadRain"></div>
            </RenderBox>
            <RenderBox hasTitle title="洪涝预报" style={{ height: 420 }}>
              <div className={"m-left-div"}>
                <Spin
                  spinning={this.props.model.modelIsRunning}
                  tip={"预报模型计算中..."}
                  size={"small"}
                >
                  <div style={{ paddingBottom: 20 }}>
                    <Divider style={{ color: "gray" }}>实时预报</Divider>
                    <span>开始预报时间:</span>
                    <DatePicker
                      style={{ width: "200px", margin: "0 20px" }}
                      showTime={{ format: "HH" }}
                      format={"YYYY-MM-DD HH时"}
                      defaultValue={this.state.runModelTime}
                      onChange={(time) => this.setState({ runModelTime: time })}
                      disabledDate={(selectDate) => selectDate <= curDate}
                    />
                    <Button
                      type="primary"
                      onClick={this.onRunModel.bind(this)}
                      style={{
                        background: "rgb(0,128,128)",
                        borderRadius: "5px",
                      }}
                    >
                      演算
                    </Button>
                  </div>
                </Spin>
              </div>
              <div className={"m-left-div"}>
                <Divider style={{ color: "gray" }}>预报列表</Divider>
                <div>
                  <Table
                    style={{ color: "white" }}
                    columns={this.TableColumns}
                    dataSource={dataSource}
                    size={"small"}
                    pagination={{ pageSize: 3 }}
                  />
                </div>
              </div>
            </RenderBox>

            <RenderBox className="flood-model-left-box">
              <div className="task-card-container">
                <Tabs type="card">
                  <Tabs.TabPane key="1" tab="水位站">
                    <TableShow
                      number={5}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            if (predictionId) {
                              this.setState({
                                waterName: record.aliasName,
                              });
                              dispatch(
                                actions.getModelResult({
                                  startTime: defaultPred?.beginTime,
                                  endTime: moment(defaultPred?.beginTime)
                                    .add(1, "days")
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                  predictid: predictionId,
                                  siteNodeId: record.siteNodeId,
                                })
                              );
                            } else {
                              message.warning("请选择预报");
                            }
                          },
                        };
                      }}
                      columns={[
                        {
                          name: "站点名称",
                          dataIndex: "aliasName",
                          width: "30%",
                        },
                        {
                          name: "所属河流",
                          dataIndex: "rvnm",
                          width: "20%",
                        },
                        {
                          name: "来源",
                          dataIndex: "datasourceName",
                          width: "30%",
                          // render: (e) => source[e],
                        },
                      ]}
                      dataSource={water}
                    ></TableShow>
                  </Tabs.TabPane>
                  <Tabs.TabPane key="2" tab="积水点">
                    <TableShow
                      number={5}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            if (predictionId) {
                              this.setState({
                                floodName: record.aliasName,
                              });
                              dispatch(
                                actions.getModelFloodResult({
                                  startTime: defaultPred?.beginTime,
                                  endTime: moment(defaultPred?.beginTime)
                                    .add(1, "days")
                                    .format("YYYY-MM-DD HH:mm:ss"),
                                  predictid: predictionId,
                                  siteNodeId: record.siteNodeId,
                                })
                              );
                            } else {
                              message.warning("请选择预报");
                            }
                          },
                        };
                      }}
                      columns={[
                        {
                          name: "站点名称",
                          dataIndex: "aliasName",
                          width: "30%",
                          render: (name) => {
                            return name.length >= 10 ? (
                              <Popover content={name} title="站名全称">
                                {name.toString().substring(0, 10) + "..."}
                              </Popover>
                            ) : (
                              name
                            );
                          },
                        },
                        {
                          name: "所属区域",
                          dataIndex: "regionName",
                          width: "20%",
                        },
                        {
                          name: "地址",
                          dataIndex: "stlc",
                          width: "30%",
                          render: (name) => {
                            return name.length >= 10 ? (
                              <Popover content={name} title="地址全称">
                                {name.toString().substring(0, 10) + "..."}
                              </Popover>
                            ) : (
                              name
                            );
                          },
                        },
                      ]}
                      dataSource={initFlood}
                    ></TableShow>
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </RenderBox>
          </Spin>
        </div>
        <div className="flood-model-right">
          <RenderBox hasTitle title="洪涝预报">
            <div>
              {defaultPred?.beginTime?.slice(0, -3)}至
              {moment(defaultPred?.beginTime)
                .add(1, "days")
                .format("YYYY-MM-DD HH:mm")}
              {/* {titleTime?.slice(0, -3)}至
              {moment(titleTime).add(1, "days").format("YYYY-MM-DD HH:mm")} */}
            </div>
            <div className="flood-model-water-border">
              <div>{defaultWater.name}站24小时水位预测曲线图</div>
              {/* <div className="flood-model-water-border"> */}
              <div className="flood-model-water" id="floodModelWater"></div>
              {/* </div> */}
            </div>
            <div className="flood-model-water-border">
              <div>{defaultFlood.name}站24小时积水预测曲线图</div>
              {/* <div className="flood-model-water-border"> */}
              <div className="flood-model-water" id="floodModelFlood"></div>
              {/* </div> */}
            </div>
          </RenderBox>
        </div>
        <Modal
          visible={this.state.modalVisible}
          title={"详情"}
          onCancel={() => this.setState({ modalVisible: false })}
          style={{ width: 1000 }}
          footer={null}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: 16 }}>
                {this.getSiteDescription("name")}
              </span>
            </div>
            <div style={{ width: 500, height: 300 }} id={"charts"}>
              <ReactEcharts
                style={{ width: "100%", height: "100%" }}
                option={this.getOptions()}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.queryModelNodesAction());
    dispatch(actions.queryPredictions());
    dispatch(
      actions.getRainPred({
        endtm: moment(new Date()).add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
        starttm: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    this.timer = setInterval(() => {
      dispatch(actions.queryModelState());
    }, 30000);

    dispatch(actions.queryModelState());
    dispatch(actions.getModelWaterType());
    dispatch(actions.getModelFloodType());
  }
  componentDidUpdate(pre) {
    const {
      dispatch,
      modelResult,
      modelFloodResult,
      defaultPred,
      defaultWater,
      defaultFlood,
      rainPred,
    } = this.props;
    if (rainPred !== pre.rainPred) {
      modelChart(
        rainPred,
        "floodHeadRain",
        "降雨",
        "predictionTime",
        "predictionValue"
      );
    }
    if (modelResult !== pre.modelResult) {
      modelChart(
        modelResult,
        "floodModelWater",
        "水位(m)",
        "endTime",
        "predValue"
      );
    }
    if (modelFloodResult !== pre.modelFloodResult) {
      modelChart(
        modelFloodResult,
        "floodModelFlood",
        "积水(cm)",
        "endTime",
        "predValue"
      );
    }
    if (defaultWater != pre.defaultWater && defaultPred.modelPredictionId) {
      dispatch(
        actions.getModelResult({
          startTime: defaultPred?.beginTime,
          endTime: moment(defaultPred?.beginTime)
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm:ss"),
          predictid: defaultPred?.modelPredictionId,
          siteNodeId: defaultWater?.siteNodeId,
        })
      );
    }

    if (defaultFlood != pre.defaultFlood && defaultPred.modelPredictionId) {
      dispatch(
        actions.getModelFloodResult({
          startTime: defaultPred?.beginTime,
          endTime: moment(defaultPred?.beginTime)
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm:ss"),
          predictid: defaultPred?.modelPredictionId,
          siteNodeId: defaultFlood?.siteNodeId,
        })
      );
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  onViewPrediction(predictionId) {
    const { dispatch } = this.props;
    dispatch(actions.selectPrediction(predictionId));
    this.setState({ loading: true, predictionId: predictionId });
  }

  onRunModel() {
    const { dispatch } = this.props;
    dispatch(actions.runModel(this.state.runModelTime));
  }

  onFeatureClick(param) {
    const { selectedPredictionId } = this.props.model;

    if (selectedPredictionId === -1) {
      message.info("请在列表中选择需要查看的预报");
      return;
    }

    this.setState({ modalVisible: true, selectedSite: param });
    // console.log(param);
  }

  getSiteDescription(name) {
    if (
      this.state.selectedSite &&
      this.state.selectedSite.hasOwnProperty(name)
    ) {
      return this.state.selectedSite[name];
    }

    return "";
  }

  getOptions() {
    const { result } = this.props.model;
    let selectedNodeId = this.state.selectedSite.siteNodeId;
    let xData = [];
    let values = [];

    if (selectedNodeId && result[selectedNodeId]) {
      let dataList = result[selectedNodeId];
      dataList.forEach((item) => {
        let time = moment(item.endTime);
        xData.push(time.format("MM-DD HH:00"));
        values.push(item.predValue ? item.predValue : 0);
      });
    }

    let option = {
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: values,
          type: "line",
        },
      ],
    };

    return option;
  }
}

function mapStateToProps(state) {
  return {
    model: state.floodModel,
    water: state.floodModel.modelWater,
    initFlood: state.floodModel.modelFlood,
    modelResult: state.floodModel.modelResult,
    modelFloodResult: state.floodModel.modelFloodResult,
    defaultPred: state.floodModel.defaultPred,
    defaultWater: state.floodModel.defaultWater,
    defaultFlood: state.floodModel.defaultFlood,
    rainPred: state.floodModel.rainPred,
  };
}

export default connect(mapStateToProps)(FloodModel);
