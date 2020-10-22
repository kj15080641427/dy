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
    console.log(lunboSetting);
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
    const { type } = this.props;
    console.log(type, "TTT");
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
              src="http://m.nmc.cn/publish/precipitation/1-day.html"
              width="753px"
              height="1010px"
              frameborder="0"
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
        <BorderBox8
          style={{
            height: 300,
            width: 464,
          }}
          reverse="{true}"
        >
          <div className="dis-satellite-div-flood">
            <iframe
              frameborder="0"
              scrolling="no"
              src="http://m.nmc.cn/publish/precipitation/1-day.html"
              style={{
                position: "absolute",
                top: "-189px",
                height: 500,
                width: 460,
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
