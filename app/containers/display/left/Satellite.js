/**
 * Satellite 2020-07-06
 */
import React from "react";
import { Carousel, Tabs, Drawer, Icon, Button, Modal } from "antd";
import imgURL from "../../../resource/title_bg.png";
import moment from "moment";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { BorderBox8 } from "@jiaminghi/data-view-react";
import { getSatellite } from "@app/data/request";
class Satellite extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      totalData: [], //卫星云图信息
      rainvisible: false, //实时雨情
      cloudvisible: false, //云图
      radarvisible: false, //雷达
      typhoonvisible: false, //台风
    };
  }
  slickPlayRoPause(lunboSetting) {
    if (lunboSetting.autoplay) {
      lunboSetting.autoplay = false;
      this.slider.slick.slickPause();
    } else {
      lunboSetting.autoplay = true;
      this.slider.slick.slickPlay();
    }
  }
  showRain = () => {
    this.setState({
      rainvisible: true,
    });
  };
  showcloud = () => {
    this.setState({
      cloudvisible: true,
    });
  };
  showradar = () => {
    this.setState({
      radarvisible: true,
    });
  };
  showtyphoon = () => {
    this.setState({
      typhoonvisible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      rainvisible: false, //实时雨情
      cloudvisible: false, //云图
      radarvisible: false, //雷达
      typhoonvisible: false, //台风
    });
  };
  render() {
    let elements = [];
    const lunboSetting = {
      dots: true,
      autoplay: false,
    };
    let { totalData } = this.state;
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
    return (
      <div className="dis-satellite">
        <div className="div-precipitation1" onClick={this.showRain}></div>
        <Modal
          title="全国降雨量预报图"
          onCancel={this.handleCancel}
          visible={this.state.rainvisible}
          width={"50%"}
          footer={null}
          centered={true}
          // className="county-rain-chart"
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
              src="http://m.nmc.cn/publish/precipitation/1-day.html"
              width="753px"
              height="1010px"
              frameborder="0"
              scrolling="no"
              style={{
                position: "relative",
                left: 80,
                top: "-170px",
                transform: "scale(1.2)",
              }}
            ></iframe>
          </div>
        </Modal>
        <div className="div-precipitation2" onClick={this.showcloud}></div>
        <Modal
          title="FY2G气象云图"
          onCancel={this.handleCancel}
          visible={this.state.cloudvisible}
          width={"50%"}
          height={"100%"}
          footer={null}
          centered={true}
          className="county-rain-chart"
        >
          <div style={{ height: "946px", margin: "0 auto" }}>
            <PlayCircleOutlined
              className="m-pic-icon-big"
              onClick={() => this.slickPlayRoPause(lunboSetting)}
            />
            <Carousel
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
        </Modal>
        <div className="div-precipitation3" onClick={this.showradar}></div>
        <Modal
          // title="华东地区气象雷达图"
          onCancel={this.handleCancel}
          visible={this.state.radarvisible}
          width={"100%"}
          height="100%"
          footer={null}
          centered={true}
          className="county-radar-chart"
        >
          <div
            style={{
              "overflow-y": "hidden",
              position: "relative",
              overflow: "hidden",
              height: "955px",
              width: "100%",
            }}
          >
            <iframe
              src="http://58.59.29.51:14003/Radar"
              frameBorder="0"
              scrolling="no"
              style={{
                position: "relative",
                top: "-300px",
                width: "100%",
                height: "1275px",
              }}
            ></iframe>
          </div>
        </Modal>
        <div className="div-precipitation4" onClick={this.showtyphoon}></div>
        <Modal
          title="台风路径图"
          onCancel={this.handleCancel}
          visible={this.state.typhoonvisible}
          width={"100%"}
          height="100%"
          footer={null}
          centered={true}
        >
          <div
            style={{
              "overflow-y": "hidden",
              position: "relative",
              overflow: "hidden",
              height: "920px",
              width: "100%",
            }}
          >
            <iframe
              src="https://tf.istrongcloud.com/release/index-id.html?id=1260387956"
              frameBorder="0"
              scrolling="no"
              style={{ position: "relative", width: "100%", height: "945px" }}
            ></iframe>
          </div>
        </Modal>
        <BorderBox8
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
              src="http://m.nmc.cn/publish/precipitation/1-day.html"
              style={{
                position: "absolute",
                top: "-189px",
                height: 440,
                width: 360,
              }}
            ></iframe>
          </div>
        </BorderBox8>
        <BorderBox8
          style={{
            height: 255,
            width: 364,
          }}
          reverse="{true}"
        >
          <div className="dis-satellite-div">
            {/* <PlayCircleOutlined className="m-pic-icon" onClick={() => this.slickPlayRoPause(lunboSetting)} /> */}
            <Carousel
              rtl={true}
              autoplaySpeed={400}
              speed={1}
              {...lunboSetting}
              ref={(el) => (this.slider = el)}
            >
              {elements}
            </Carousel>
          </div>
        </BorderBox8>
        <BorderBox8
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
        </BorderBox8>
        <BorderBox8
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
              src="https://tf.istrongcloud.com/release/index-id.html?id=1260387956"
              style={{
                position: "absolute",
                top: "-12px",
                height: 370,
                width: 360,
              }}
            ></iframe>
          </div>
        </BorderBox8>
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
      // console.log("weixin", result)
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
export default Satellite;
