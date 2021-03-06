/**
 * WeatherPic 2020-05-12
 * zdl
 * 云图
 */
import React from "react";
import "./style.scss";
import { Carousel, Tabs, Drawer, Modal } from "antd";
import imgURL from "../../../resource/title_bg.png";
import moment from "moment";
import { PlayCircleOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
import { getSatellite } from "@app/data/request";
import Satellite from "../../display/left/SatelliteFlood";
let count = 0;
class WeatherPic extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      totalData: [], //卫星云图信息
      cloudvisible: false, //云图模态框
      radarvisible: false, //雷达模态框
      typhoonvisible: false, //台风模态框
      forecastvisible: false, //预报模态框
      timesvisible: false, //时报模态框
      cityvisible: false, //东营市模态框
      imglourl: "", //第一张卫星图src
      wxytVisible: false, // 卫星图弹窗
      elements: [],
    };
    this.callback = this.callback.bind(this);
  }
  //关闭抽屉页
  onClose = () => {
    this.setState({
      cloudvisible: false,
      radarvisible: false,
      typhoonvisible: false,
      forecastvisible: false,
      timesvisible: false,
      cityvisible: false,
    });
  };

  //标签页切换
  callback(key) {
    count += 1;
    setTimeout(() => {
      if (count === 1) {
        console.log("single click: ", count);
      } else if (count === 2) {
        if (key == 1) {
          this.setState({
            cloudvisible: true,
          });
        } else if (key == 2) {
          this.setState({
            radarvisible: true,
          });
        } else if (key == 3) {
          this.setState({
            typhoonvisible: true,
          });
        } else if (key == 4) {
          this.setState({
            forecastvisible: true,
          });
        } else if (key == 5) {
          this.setState({
            timesvisible: true,
          });
        } else {
          this.setState({
            cityvisible: true,
          });
        }
      }
      count = 0;
    }, 300);
  }
  slickPlayRoPause(lunboSetting) {
    console.log(lunboSetting);
    if (lunboSetting.autoplay) {
      lunboSetting.autoplay = false;
      this.setState({ wxytVisible: false }, () => {
        setTimeout(() => {
          this.slider.slick.slickPause();
        }, 1000);
      });
    } else {
      lunboSetting.autoplay = true;
      this.setState({ wxytVisible: true }, () => {
        setTimeout(() => {
          this.slider.slick.slickPlay();
        }, 1000);
      });
    }
  }
  render() {
    let { elements, totalData } = this.state;
    if (totalData.length === 0) {
      elements.push(
        <img
          key={0}
          className="m-pic-Carousel-img"
          src={
            "https://qlfy.sdmsc.net/web/products/sates/SateCut.php?key=a&sateTypes=G&sateKinds=P&StationID=54736&num=2&sateTimeRange=  "
          }
        ></img>
      );
    } else {
      for (var i = totalData.length - 1; i >= 0; i--) {
        elements.push(
          <img
            key={i}
            className="m-pic-Carousel-img"
            src={this.state.totalData[i].imgUrl}
          ></img>
        );
      }
    }
    const lunboSetting = {
      dots: true,
      autoplay: false,
    };
    return (
      <div>
        <img className="m-pic-img" src={imgURL} alt="" />
        <div className="m-pic-div-wraning">
          <div className="card-container">
            <Tabs
              type="card"
              defaultActiveKey="1"
              animated="true"
              tabBarGutter={27}
              tabPosition="top"
              size="small"
              onTabClick={this.callback}
            >
              <TabPane tab="卫星云图" key="1">
                <div
                  style={{
                    width: "500px",
                    height: "300px",
                    position: "absolute",
                    zIndex: 99,
                  }}
                  onClick={() => {
                    this.slickPlayRoPause(lunboSetting);
                    this.setState({ wxytVisible: true });
                  }}
                ></div>
                <div className="m-pic-div-img">
                  <PlayCircleOutlined
                    className="m-pic-icon"
                    onClick={() => this.slickPlayRoPause(lunboSetting)}
                  />
                  {elements[0]}
                  <Modal
                    title="卫星云图"
                    centered
                    width="1200px"
                    bodyStyle={{ height: 800 }}
                    visible={this.state.wxytVisible}
                    footer={null}
                    onCancel={() => this.setState({ wxytVisible: false })}
                  >
                    <Carousel
                      rtl={true}
                      autoplaySpeed={400}
                      speed={1}
                      {...lunboSetting}
                      ref={(el) => (this.slider = el)}
                    >
                      {elements}
                    </Carousel>
                  </Modal>
                </div>
                <Drawer
                  title="FY2G气象云图"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.cloudvisible}
                  width={1378}
                >
                  <div
                    style={{
                      height: "970px",
                      width: "970px",
                      position: "relative",
                      left: 170,
                    }}
                  >
                    <PlayCircleOutlined
                      className="m-pic-icon"
                      onClick={() => this.slickPlayRoPause(lunboSetting)}
                    />
                    <Carousel
                      height={900}
                      width={900}
                      effect="fade"
                      dots={false}
                      autoplaySpeed={400}
                      speed={1}
                      {...lunboSetting}
                      ref={(el) => (this.slider = el)}
                    >
                      {elements}
                    </Carousel>
                  </div>
                </Drawer>
              </TabPane>
              <TabPane tab="气象雷达" key="2">
                <div
                  style={{
                    width: "500px",
                    height: "300px",
                    position: "absolute",
                    zIndex: 99,
                  }}
                  onClick={() => {
                    this.setState({ radarvisible: true });
                  }}
                ></div>
                <div className="m-pic-div-img">
                  <iframe
                    src="http://58.59.29.51:14003/Radar"
                    width="380px"
                    height="510px"
                    frameBorder="0"
                    scrolling="no"
                    className="radar-chart"
                  ></iframe>
                  {/* <BorderBox8
                    style={{
                      height: 255,
                      width: 364,
                    }}
                    reverse="{true}"
                  >
                    <div className="dis-satellite-div">
                      <iframe
                        frameborder="0"
                        scrolling="no"
                        src="http://58.59.29.51:14003/Radar"
                        style={{
                          position: "absolute",
                          top: -125,
                          // left: 15,
                          height: 440,
                          width: 360,
                        }}
                      ></iframe>
                    </div>
                  </BorderBox8> */}
                </div>
                <Modal
                  title="气象雷达"
                  onCancel={() => this.setState({ radarvisible: false })}
                  visible={this.state.radarvisible}
                  width={"50%"}
                  footer={null}
                  centered={true}
                  className="county-rain-chart"
                >
                  <div
                    style={{
                      "overflow-y": "hidden",
                      padding: "8px 0",
                      position: "relative",
                      overflow: "hidden",
                      height: "940px",
                      // width: "1000px",
                      margin: "0 auto",
                    }}
                  >
                    <iframe
                      src="http://58.59.29.51:14003/Radar"
                      width="753px"
                      height="1010px"
                      frameBorder="0"
                      scrolling="no"
                      style={{
                        position: "relative",
                        left: 80,
                        top: "-170px",
                        transform: "scale(1.0)",
                      }}
                    ></iframe>
                  </div>
                </Modal>
              </TabPane>
              <TabPane tab="台风路径" key="3">
                <div
                  style={{
                    width: "500px",
                    height: "300px",
                    position: "absolute",
                    zIndex: 99,
                  }}
                  onClick={() => {
                    this.setState({ typhoonvisible: true });
                  }}
                ></div>
                <div className="m-pic-div-img">
                  <iframe
                    src="http://typhoon.zjwater.gov.cn/wap.htm"
                    width="400px"
                    height="300px"
                    frameBorder="0"
                    scrolling="no"
                    // style={{ position: "absolute" }}
                    className="radar-chart"
                  ></iframe>
                </div>
                <Modal
                  title="台风路径"
                  onCancel={() => this.setState({ typhoonvisible: false })}
                  visible={this.state.typhoonvisible}
                  width={"50%"}
                  footer={null}
                  centered={true}
                  className="county-rain-chart"
                >
                  <div
                    style={{
                      "overflow-y": "hidden",
                      padding: "8px 0",
                      position: "relative",
                      overflow: "hidden",
                      height: "940px",
                      // width: "1000px",
                      margin: "0 auto",
                    }}
                  >
                    <iframe
                      src="http://typhoon.zjwater.gov.cn/wap.htm"
                      width="753px"
                      height="1010px"
                      frameBorder="0"
                      scrolling="no"
                      style={{
                        position: "relative",
                        left: 80,
                        top: "-170px",
                        transform: "scale(1.0)",
                      }}
                    ></iframe>
                  </div>
                </Modal>
              </TabPane>
              <TabPane tab="全国预报" key="4">
                <div className="m-pic-div-img">
                  <Satellite />
                </div>
                {/* <Drawer
                  title="全国降雨量预报图"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.forecastvisible}
                  width={1378}
                >
                  <div
                    style={{
                      height: "950px",
                      width: "950px",
                      position: "relative",
                      left: 270,
                    }}
                  >
                    <iframe
                      src={`http://m.nmc.cn/publish/precipitation/1-day.html#&gid=1&pid=1`}
                      width="753px"
                      height="1050px"
                      frameBorder="0"
                      scrolling="no"
                      style={{
                        position: "relative",
                        top: "-222px",
                        transform: "scale(1.3)",
                      }}
                    ></iframe>
                  </div>
                </Drawer> */}
              </TabPane>
              {/* <TabPane tab="区县预报" key="6">
              <Forecast></Forecast> */}
              {/* <Drawer
                title="东营市降雨量实况图"
                placement="left"
                closable={false}
                onClose={this.onClose}
                visible={this.state.cityvisible}
                width={1378}
              ><div style={{ height: '950px', width: '950px', position: 'relative', left: 270 }}>
                  <iframe src="http://m.nmc.cn/publish/observations/hourly-precipitation.html" width="753px" height="950px"
                    frameborder="0" scrolling="no" style={{ position: 'relative', top: '-240px' }}></iframe>
                </div></Drawer> */}
              {/* </TabPane> */}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  selectInit() {
    let startTime = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    let entTime = moment(new Date().getTime() + 24 * 60 * 60 * 1000).format(
      "YYYY-MM-DD hh:mm:ss"
    );
    //获取卫星云图
    getSatellite({
      startTime: startTime,
      entTime: entTime,
    }).then((result) => {
      console.log("weixin", result);
      this.setState({
        totalData: result.data,
        imglourl: result.data[0].imgUrl,
      });
    });
  }
  componentDidMount() {
    this.selectInit();
    this.init = window.setInterval(() => {
      this.selectInit();
    }, 1000 * 5 * 60);
  }
  componentWillUnmount() {
    clearTimeout(this.init);
  }
}

export default WeatherPic;
