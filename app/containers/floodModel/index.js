import React, { Component } from "react";
import { connect } from "react-redux";
import RouterList from "../../components/routerlist";
import * as actions from "../../redux/actions/floodModel";
import "./style.scss";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/hnyb.png";
import Map from "./map/map";
import { RenderBox } from "../../components/chart/decorate";
import { modelChart, modelBarChart } from "../../components/chart/chart";
import emitter from "@app/utils/emitter.js";
import {
  Table,
  DatePicker,
  Button,
  Divider,
  Modal,
  Spin,
  message,
  Tabs,
  Progress,
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
          if (record?.modelPredictionId === model.selectedPredictionId) {
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
      {
        title: " ",
        className: "tableRow",
        render: (text, record) => {
          return (
            <Button
              type={"link"}
              size={"small"}
              onClick={() => {
                this.onViewPrediction(record?.modelPredictionId);
                this.props.dispatch(actions.setDefaultPred(record));
                // this.setState({ titleTime: record.beginTime });
              }}
              // onClick={this.onViewPrediction.bind(
              //   this,
              //   record.modelPredictionId
              // )}
            >
              <div style={{ color: "#18cb36" }}>选择</div>
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
      progress: 0,
    };
  }

  render() {
    let curDate = new moment();
    let dataSource = [...this.props.model.predictions];
    const { water, initFlood, dispatch, defaultPred } = this.props;
    const { predictionId, waterName, floodName } = this.state;
    return (
      <div className="flood-model-display">
        <div className="right-background"></div>
        <Map
          layerVisible={{ water: true }}
          onFeatureClick={this.onFeatureClick.bind(this)}
        />
        <div className="flood-noyices-top" />
        <Head titleImg={titleImg} groundColor="#003366" />
        <RouterList />
        <div className="m-left">
          <Spin spinning={this.props.model.loading}>
            <RenderBox
              hasTitle
              title="东营市全市平均降水24h预报"
              style={{ height: "230px" }}
            >
              <div className="flood-head-rain-text">
                {moment(new Date()).format("YYYY-MM-DD HH:00")}至
                {moment(new Date()).add(1, "days").format("YYYY-MM-DD HH:00")}
              </div>
              <div className="flood-head-rain" id="floodHeadRain"></div>
            </RenderBox>
            <RenderBox hasTitle title="洪涝预报" style={{ height: 420 }}>
              <div className={"m-left-div"}>
                <Spin
                  spinning={this.props.model.modelIsRunning}
                  tip={
                    <div
                      style={{
                        color: "black",
                        fontSize: "24px",
                        background: "rgba(177, 183, 178,1)",
                      }}
                    >
                      预报模型计算中...
                      <Progress
                        percent={this.state.progress}
                        // size="small"
                        status="active"
                      ></Progress>
                    </div>
                  }
                  size={"small"}
                >
                  <div style={{ paddingBottom: 20 }}>
                    {/* <Divider style={{ color: "gray" }}>实时预报</Divider> */}
                    <span>开始预报时间:</span>
                    <DatePicker
                      style={{ width: "200px", margin: "0 20px" }}
                      showTime={{ format: "HH" }}
                      format={"YYYY-MM-DD HH时"}
                      defaultValue={this.state.runModelTime}
                      onChange={(time) => {
                        this.setState({ runModelTime: time });
                      }}
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
                  <Tabs.TabPane key="1" tab="积水点">
                    <TableShow
                      number={5}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            emitter.emit(
                              "map-move-focus",
                              [record.lgtd, record.lttd],
                              3000
                            );
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
                          width: "40%",
                          render: (name) => {
                            return name.length >= 18 ? (
                              <Popover content={name} title="站名全称">
                                {name.toString().substring(0, 18) + "..."}
                              </Popover>
                            ) : (
                              name
                            );
                          },
                        },
                        // {
                        //   name: "所属区域",
                        //   dataIndex: "regionName",
                        //   width: "20%",
                        // },
                        {
                          name: "地址",
                          dataIndex: "stlc",
                          width: "60%",
                          render: (name) => {
                            return name.length >= 19 ? (
                              <Popover content={name} title="地址全称">
                                {name.toString().substring(0, 19) + "..."}
                              </Popover>
                            ) : (
                              name
                            );
                          },
                        },
                      ]}
                      dataSource={initFlood}
                    />
                  </Tabs.TabPane>

                  <Tabs.TabPane key="2" tab="水位站">
                    <TableShow
                      number={5}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            emitter.emit(
                              "map-move-focus",
                              [record.lgtd, record.lttd],
                              3000
                            );
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
                    />
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
            </div>
            <div className="flood-model-water-border">
              <div>{waterName}站24小时水位预测曲线图</div>

              <div className="flood-model-water" id="floodModelWater"></div>
            </div>
            <div className="flood-model-water-border">
              <div>{floodName}站24小时积水预测曲线图</div>

              <div className="flood-model-water" id="floodModelFlood"></div>
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
    this.rainModel = setInterval(() => {
      dispatch(
        actions.getRainPred({
          endtm: moment(new Date())
            .add(1, "days")
            .format("YYYY-MM-DD HH:00:00"),
          starttm: moment(new Date()).format("YYYY-MM-DD HH:00:00"),
        })
      );
    }, 30000);
    this.timer = setInterval(() => {
      dispatch(actions.queryModelState());
    }, 30000);

    dispatch(actions.queryModelState());
    // dispatch(actions.getModelWaterType());
    // dispatch(actions.getModelFloodType());
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
    if (this.props.model.predictions != pre.model.predictions) {
      this.onViewPrediction(this.props.model.predictions[0]?.modelPredictionId);
    }
    if (
      this.props.model.modelIsRunning != pre.model.modelIsRunning &&
      !this.props.model.modelIsRunning
    ) {
      clearInterval("addprogess");
      this.setState({
        progress: 100,
      });
    }
    if (rainPred !== pre.rainPred) {
      modelBarChart(
        rainPred,
        "floodHeadRain",
        "降雨(mm)",
        "predictionTime",
        "predictionValue"
      );
    }
    if (!this.props.model.modelIsRunning) {
      var addprogess = setInterval(() => {
        if (this.state.progress <= 98) {
          this.setState({
            progress: this.state.progress + 1,
          });
        }
      }, 5000);
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
    if (defaultWater != pre.defaultWater) {
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

    if (defaultFlood != pre.defaultFlood) {
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
    if (defaultWater != pre.defaultWater) {
      this.setState({
        waterName: defaultWater?.name,
      });
    }
    if (defaultFlood != pre.defaultFlood) {
      this.setState({
        floodName: defaultFlood?.name,
      });
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.rainModel) {
      clearInterval(this.rainModel);
    }
  }

  onViewPrediction(predictionId) {
    const { dispatch } = this.props;
    dispatch(actions.selectPrediction(predictionId));
    this.setState({ loading: true, predictionId: predictionId });
  }

  onRunModel() {
    const { dispatch } = this.props;
    // var addprogess = setInterval(() => {
    this.setState({
      progress: 0,
    });
    // }, 5000);
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
