/**
 * TowBtn 2020-07-5
 * zdl
 * 按钮第二列
 */
import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "@app/containers/monitor/right/style.scss";
import { Row, Col, Drawer, Table, Modal, Button } from "antd";
import ddfa from "@app/resource/ddfa.png";
import sjgl from "@app/resource/sjgl.png";
import xqkb from "@app/resource/xqkb.png";
import ybmx from "@app/resource/ybmx.png";
import hyyb from "@app/resource/hyyb.png";
import hhsq from "@app/resource/hhsq.png";
import zhjk from "@app/resource/zhjk.png";
import sjzx from "@app/resource/sjzx.png";
import fxyj from "@app/resource/fxyj.png";
import yqjk from "@app/resource/yqjk.png";
import yld from "@app/resource/yld.png";
import { PhotoProvider, PhotoConsumer } from "react-photo-view";
import "react-photo-view/dist/index.css";
import moment from "moment";
import { getWeatherdata, getWaterRealTime } from "@app/data/request";
class TowBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {}, //天气信息
      visible: false, //黄河水情
      hyvisible: false, //海洋预警
      visibleyb: false, //预报模型
      visibleScheme: false, //方案
      visibleDuty: false, //责任
      water: [], //实时水位
      videovisible: false, //中心城
      pumpvisible: false, //泵站
      sluicevisible: false, //水闸
    };
  }
  //打开预报模型
  ybshowModal = () => {
    this.setState({
      visibleyb: true,
    });
  };
  //关闭预报模型
  ybhandleCancel = (e) => {
    this.setState({
      visibleyb: false,
    });
  };
  //打开调度
  showSchemeModal = () => {
    this.setState({
      visibleScheme: true,
    });
  };
  //关闭调度
  handleSchemeCancel = (e) => {
    this.setState({
      visibleScheme: false,
    });
  };
  //打开责任安排
  showDutyModal = () => {
    this.setState({
      visibleDuty: true,
    });
  };
  //关闭责任安排
  handleDutyCancel = (e) => {
    this.setState({
      visibleDuty: false,
    });
  };
  // 黄河
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  //海洋
  hyshowModal = () => {
    this.setState({
      hyvisible: true,
    });
  };
  hyhandleCancel = (e) => {
    console.log(e);
    this.setState({
      hyvisible: false,
    });
  };
  //中心城
  showCityModal = () => {
    this.setState({
      videovisible: true,
    });
  };
  videohandleCancel = () => {
    this.setState({
      videovisible: false,
    });
  };
  //泵站
  showpumpModal = () => {
    this.setState({
      pumpvisible: true,
    });
  };
  pumphandleCancel = () => {
    this.setState({
      pumpvisible: false,
    });
  };
  //水闸表
  showsluiceModal = () => {
    this.setState({
      sluicevisible: true,
    });
  };
  sluicehandleCancel = () => {
    this.setState({
      sluicevisible: false,
    });
  };
  render() {
    const { weatherData } = this.state;
    const dutyColumns = [
      {
        title: "河流/湖",
        dataIndex: "water",
        fixed: "center",
      },
      {
        title: "责任单位",
        dataIndex: "unit",
        fixed: "center",
      },
      {
        title: "责任领导",
        dataIndex: "lead",
        fixed: "center",
      },
      {
        title: "负责单位",
        dataIndex: "takeunit",
        fixed: "center",
      },
      {
        title: "负责人",
        dataIndex: "principal",
        fixed: "center",
      },
      {
        title: "直接负责人",
        dataIndex: "dri",
        fixed: "center",
      },
      {
        title: "工作要求",
        dataIndex: "workask",
        width: 600,
        fixed: "center",
      },
    ];
    const columns = [
      {
        title: "河流/湖",
        dataIndex: "river",
        fixed: "center",
      },
      {
        title: "河道断面",
        dataIndex: "riveray",
        fixed: "center",
      },
      // {
      //   title: '东经',
      //   dataIndex: 'lon',
      //   fixed: 'center',
      // },
      // {
      //   title: '北纬',
      //   dataIndex: 'lat',
      //   fixed: 'center',
      // },
      {
        title: "监测水位",
        dataIndex: "water",
        fixed: "center",
        // render:
        //   (stcd,row) => {
        //     for (let i = 0; i < this.state.water.length; i++) {
        //       // console.log(stcd)
        //       if (stcd === this.state.water[i].stcd) {
        //         console.log(this.state.water[i])
        //         return (
        //           <span>{a}</span>
        //         )
        //       }
        //     }
        //   },
      },
      {
        title: "调度控制水位",
        fixed: "center",
        children: [
          {
            title:
              moment(new Date().getTime()).format("M") == 6 ? "六月" : "七月",
            dataIndex:
              moment(new Date().getTime()).format("M") == 6
                ? "number1"
                : "number2",
          },
          // {
          //   title: "七月",
          //   dataIndex: "number2"
          // },
          // {
          //   title: "八月",
          //   dataIndex: "number3"
          // },
          // {
          //   title: "九月",
          //   dataIndex: "number4"
          // },
        ],
      },
      {
        title: "警戒水位",
        dataIndex: "warningwater",
        fixed: "center",
      },
      {
        title: "保证水位",
        dataIndex: "cashwater",
        fixed: "center",
      },
      {
        title: "预警",
        dataIndex: "warningwater",
        fixed: "center",
        render: (warningwater, key) => {
          if (warningwater > key.water) {
            return <span style={{ color: "green" }}>正常</span>;
          } else if (key.water === "--") {
            return <a>暂无数据</a>;
          } else if (warningwater < key.water) {
            return <span style={{ color: "red" }}>警告</span>;
          }
        },
      },
    ];
    const dutyData = [
      {
        water: "广利河",
        unit: "市水务局",
        lead: "张兆印",
        takeunit: "市河道管理处",
        principal: "荣立忠,吴贵杰",
        dri: "时丽霞, 武光辉, 李宝智",
        workask:
          "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "广利河",
        unit: "东营区政府",
        lead: "刘辰勇",
        takeunit: "东营区水利局",
        principal: "孙海军",
        dri: "李强",
        workask:
          "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "东营河",
        unit: "市住房建设管理局",
        lead: "聂绍果",
        takeunit: "北二路工作专班",
        principal: "陈步花",
        dri: "闫增春,朱青松,张跃峰,许义峰",
        workask:
          "做好东营河水位控制，保持汛期河道畅通，7月份前完成北二路跨广利河桥水面以下施工",
      },
      {
        water: "新广蒲河",
        unit: "市水务局",
        lead: "张兆印",
        takeunit: "市河道管理处",
        principal: "荣立忠,吴贵杰",
        dri: "时丽霞, 武光辉, 李宝智",
        workask:
          "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "新广蒲河",
        unit: "东营区政府",
        lead: "刘辰勇",
        takeunit: "东营区水利局",
        principal: "孙海军",
        dri: "李强",
        workask:
          "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "天鹅湖",
        unit: "市水务局",
        lead: "周天奎",
        takeunit: "天鹅湖工作专班",
        principal: "刘晋娟",
        dri: "曹兵",
        workask: "做好蓄滞洪区进水闸门管理，按照汛情或指令启闭闸蓄滞雨洪水",
      },
    ];
    return (
      <>
        <div className="m-pannel-btns">
          {/* 预报模型 */}
          <Drawer
            title="预报模型"
            placement="top"
            onClose={this.ybhandleCancel}
            visible={this.state.visibleyb}
            width={"100%"}
            height="100%"
          >
            <div style={{ height: "930px", position: "relative" }}>
              <iframe
                frameborder="0"
                scrolling="no"
                src="http://47.104.228.80:8081/HYMM_DY/Index.html"
                style={{
                  width: "100%",
                  height: 950,
                  position: "absolute",
                  margin: "auto",
                  top: -0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              ></iframe>
            </div>
          </Drawer>
          {/* 调度方案 */}
          <Drawer
            title={"调 度 方 案"}
            placement="top"
            onClose={this.handleSchemeCancel}
            visible={this.state.visibleScheme}
            width="100%"
            height="100%"
          >
            <Row>
              <Col span={24}></Col>
              <Col span={24} style={{ alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 40, fontFamily: "黑体" }}>
                    调度方案
                  </div>
                  {/*<span className="title-scheme"><h2>东营市智慧水务系统-调度方案</h2></span>*/}
                </div>
              </Col>
              <Col span={24}>
                <div style={{ textAlign: "right", paddingBottom: 15 }}>
                  <Button onClick={this.showDutyModal}>责任安排</Button>
                  <Button onClick={this.showpumpModal}>泵站列表</Button>
                  <Button onClick={this.showsluiceModal}>水闸列表</Button>
                </div>
                {/*<Col span={2}><Button onClick={this.showDutyModal}>责任安排</Button></Col>*/}
                {/*<Col span={2}><Button onClick={this.showpumpModal}>泵站列表</Button></Col>*/}
                {/*<Col span={2}><Button onClick={this.showsluiceModal}>水闸列表</Button></Col>*/}
                {/*<span className="title-scheme">东营市智慧水务系统-调度方案</span>*/}
                {/*<span className="title-scheme">东营市智慧水务系统-调度方案</span>*/}
              </Col>
            </Row>
            <PhotoProvider>
              <PhotoConsumer
                key={1}
                src={"http://172.19.112.74/list/dycityfolld.png"}
              >
                <img
                  className="zxc-img1"
                  src={"http://172.19.112.74/list/dycityfolldsml.jpg"}
                  alt=""
                />
              </PhotoConsumer>
              <PhotoConsumer
                key={2}
                src={"http://172.19.112.74/list/dywaterfolld.png"}
              >
                <img
                  className="zxc-img1"
                  src={"http://172.19.112.74/list/dywaterfolldsml.jpg"}
                  alt=""
                />
              </PhotoConsumer>
            </PhotoProvider>
            {/* <Table
                            // columns={columns}
                            // dataSource={data}
                            title={() =>
                                <Row><Col span={10}></Col><Col span={6}><span className="title-scheme">东营市中心城主干河道关键断面调度方案</span></Col>
                                    <Col span={2}><Button onClick={this.showDutyModal}>责任安排</Button></Col>
                                    <Col span={2}><Button onClick={this.showCityModal}>工程布置图</Button></Col>
                                    <Col span={2}><Button onClick={this.showpumpModal}>泵站列表</Button></Col>
                                    <Col span={2}><Button onClick={this.showsluiceModal}>水闸列表</Button></Col></Row>
                            }
                            bordered
                            size="middle"
                            scroll={{ x: 'calc(700px + 50%)', y: 1040 }}
                            pagination={false}
                        /> */}
            <Modal
              forceRender={true}
              onCancel={this.handleDutyCancel}
              visible={this.state.visibleDuty}
              title="责任安排明细"
              footer={null}
              width={1700}
            >
              <Table
                columns={dutyColumns}
                dataSource={dutyData}
                // bordered
                size="middle"
                scroll={{ x: 1000, y: 1040 }}
                pagination={false}
              />
            </Modal>
            <Modal
              forceRender={true}
              onCancel={this.videohandleCancel}
              visible={this.state.videovisible}
              title="中心城防洪排涝工程布置图"
              footer={null}
              width={1700}
            >
              {/* <Zmage className="zxc-img" src="http://172.19.112.74/list/%E4%B8%AD%E5%BF%83%E5%9F%8E.jpg" /> */}
            </Modal>
            <Modal
              forceRender={true}
              onCancel={this.pumphandleCancel}
              visible={this.state.pumpvisible}
              title="中心城防洪排涝工程泵站列表"
              footer={null}
              width={940}
            >
              <iframe
                frameborder="0"
                scrolling="no"
                style={{ width: 900, height: 800 }}
                src={
                  "http://172.19.112.74/list/%E4%B8%AD%E5%BF%83%E5%9F%8E%E9%98%B2%E6%B4%AA%E6%8E%92%E6%B6%9D%E5%B7%A5%E7%A8%8B/%E4%B8%AD%E5%BF%83%E5%9F%8E%E9%98%B2%E6%B4%AA%E6%8E%92%E6%B6%9D%E5%B7%A5%E7%A8%8B%E6%B3%B5%E7%AB%99%E5%88%97%E8%A1%A8.htm"
                }
              ></iframe>
            </Modal>
            <Modal
              forceRender={true}
              onCancel={this.sluicehandleCancel}
              visible={this.state.sluicevisible}
              title="中心城防洪排涝工程水闸列表"
              footer={null}
              width={1550}
            >
              <iframe
                frameborder="0"
                scrolling="no"
                style={{ width: 1500, height: 800 }}
                src="http://172.19.112.74/list/%E4%B8%AD%E5%BF%83%E5%9F%8E%E9%98%B2%E6%B4%AA%E6%8E%92%E6%B6%9D%E5%B7%A5%E7%A8%8B/%E4%B8%AD%E5%BF%83%E5%9F%8E%E9%98%B2%E6%B4%AA%E6%8E%92%E6%B6%9D%E5%B7%A5%E7%A8%8B%E6%B0%B4%E9%97%B8%E5%88%97%E8%A1%A8.htm"
              ></iframe>
            </Modal>
          </Drawer>
          {/* 黄河水情 */}
          <Drawer
            title="黄河水情"
            placement="top"
            onClose={this.handleCancel}
            visible={this.state.visible}
            width={"100%"}
            height="100%"
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                margin: "auto",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
            >
              <iframe
                src="http://61.163.88.227:8006/hwsq.aspx"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
              ></iframe>
            </div>
          </Drawer>
          {/* 海洋预警 */}
          <Drawer
            title="海洋预警"
            placement="top"
            onClose={this.hyhandleCancel}
            visible={this.state.hyvisible}
            width={"100%"}
            height="100%"
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                left: 500,
              }}
            >
              <iframe
                src="http://hsdy.dongying.gov.cn/col/col36593/index.html"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                style={{ position: "relative", top: -340, left: -670 }}
              ></iframe>
            </div>
          </Drawer>
          <div>
            <Row className="m-alm-row-index">
              <Col span={4}></Col>
              {/* <Col span={4}>
                                <Link to={'/display'}>
                                    <img
                                        className="m-btn-flood-index"
                                        src={sjzx}
                                    ></img></Link>
                            </Col> */}
              <Col span={4}>
                <img
                  className="m-btn-flood-index"
                  src={hhsq}
                  onClick={this.showModal}
                ></img>
              </Col>
              <Col span={4}>
                <img
                  className="m-btn-flood-index"
                  src={hyyb}
                  onClick={this.hyshowModal}
                ></img>
              </Col>
              {/* <Col span={4}><img
                                className="m-btn-flood-index"
                                src={ybmx}
                                onClick={this.ybshowModal}
                            ></img>
                            </Col> */}
              <Col span={4}>
                {" "}
                <img
                  className="m-btn-flood-index"
                  src={ddfa}
                  onClick={this.showSchemeModal}
                ></img>
              </Col>
              <Col span={4}>
                <Link to={"/floodWarning"}>
                  <img className="m-btn-flood-index" src={fxyj}></img>
                </Link>
              </Col>
              <Col span={4}>
                {/* {localStorage.getItem("username") === "admin1" ? null : */}
                <Link to={"/notices"}>
                  <img className="m-btn-flood-index" src={xqkb}></img>
                </Link>
                {/* } */}
              </Col>
              {/* <Col span={4}>
                                {localStorage.getItem("username") === "admin1" ? null :
                                    <Link to={'/notices'}>
                                        <img
                                            className="m-btn-flood-index"
                                            src={sjgl}
                                        ></img></Link>
                                }
                            </Col> */}
            </Row>
          </div>
        </div>
      </>
    );
  }
  componentDidMount() {
    getWaterRealTime({
      //TODO
      stcd: "41850517,41850519,41800261,41800264,41800253",
      isOrder: "1",
      current: 1,
      size: 10,
    }).then((result) => {
      // console.log(result)
      let arr = [];
      for (let i = 0; i < result.data.records.length; i++) {
        arr.push(result.data.records[i].z);
      }
      this.setState({
        water: arr,
      });
    });
  }
  selectInit() {
    //获取天气信息
    getWeatherdata().then((result) => {
      this.setState({ weatherData: result.data });
    });
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default TowBtn;
