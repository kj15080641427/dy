/**
 * Satellite 2020-07-06
 */
import React from 'react';
import { Carousel, Tabs, Drawer, Icon, Button } from 'antd';
import imgURL from '../../../resource/title_bg.png';
import moment from 'moment';
import {
  PlayCircleOutlined, PauseCircleOutlined
} from '@ant-design/icons';
import { getSatellite } from "@app/data/request";
class Satellite extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      totalData: [],//卫星云图信息
      cityvisible: false,//东营市模态框
    };
  }
  slickPlayRoPause(lunboSetting) {
    console.log(lunboSetting)
    if (lunboSetting.autoplay) {
      lunboSetting.autoplay = false
      this.slider.slick.slickPause();

    } else {
      lunboSetting.autoplay = true
      this.slider.slick.slickPlay();
    }
  }
  render() {
    let elements = []
    const lunboSetting = {
      dots: true,
      autoplay: false,
    };
    let { totalData } = this.state
    if (totalData.length === 0) {
      elements.push(
        <img key={0} className="m-pic-Carousel-img" src={"https://qlfy.sdmsc.net/web/products/sates/SateCut.php?key=a&sateTypes=G&sateKinds=P&StationID=54736&num=2&sateTimeRange=  "}></img>
      )
    } else {
      for (var i = totalData.length - 1; i >= 0; i--) {
        elements.push(
          <img key={i} className="m-pic-Carousel-img" src={this.state.totalData[i].img_url}></img>
        )
      }
    }
    return (
      <div className="dis-satellite"><br></br>
        <div className="div-precipitation"></div>
        <div className="dis-satellite-div">
          <iframe frameborder="0" scrolling="no" src="http://m.nmc.cn/publish/precipitation/1-day.html" style={{
            position: 'absolute', top: '-189px',
            height: 440,
            width: 360,
          }}></iframe>
        </div>
        <div className="dis-satellite-div">
          <PlayCircleOutlined className="m-pic-icon" onClick={() => this.slickPlayRoPause(lunboSetting)} />
          <Carousel rtl={true} autoplaySpeed={400} speed={1} {...lunboSetting} ref={el => (this.slider = el)}>
            {elements}
          </Carousel>
        </div>
        <div className="dis-satellite-div">
          <iframe frameborder="0" scrolling="no" src="http://58.59.29.51:14003/Radar" style={{
            position: 'absolute', top: -125,
            // left: 15,
            height: 440,
            width: 360
          }}></iframe>
        </div>
        <div className="dis-satellite-div">
          <iframe frameborder="0" scrolling="no" src="http://typhoon.zjwater.gov.cn/wap.htm" style={{
            position: 'absolute', top: '-35px',
            height: 370,
            width: 360
          }}></iframe>
        </div>

      </div >
    );
  }
  selectInit() {
    let startTime = moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
    let entTime = moment(new Date().getTime() + 24 * 60 * 60 * 1000).format("YYYY-MM-DD")
    //获取卫星云图
    getSatellite({
      "startTime": startTime,
      "entTime": entTime
    })
      .then((result) => {
        // console.log("weixin", result)
        this.setState({
          totalData: result.data,
          imglourl: result.data[0].img_url
        })

      })
  }
  componentDidMount() {
    this.selectInit()
    window.setInterval(() => {
      this.selectInit()
    }, 1000 * 5 * 60)
  }
}
export default Satellite;