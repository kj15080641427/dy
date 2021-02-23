import React, { useEffect } from "react";
import { Carousel } from "antd";
import "./index.scss";
import img1 from "@app/resource/navi/img1.jpg";
import img2 from "../../resource/navi/img2.jpg";
import img3 from "../../resource/navi/img3.jpg";
import img4 from "../../resource/navi/img4.jpg";
import img5 from "../../resource/navi/img5.jpg";
import img6 from "../../resource/navi/img6.jpg";
import img7 from "../../resource/navi/img7.jpg";
import title from "../../resource/navi/title.png";
import svg1 from "../../resource/navi/1-防汛排涝智慧调度.svg";
import svg2 from "../../resource/navi/2-供排水智慧监控管理.svg";
import svg3 from "../../resource/navi/3-水利工程管理.svg";
import svg4 from "../../resource/navi/4-河湖水治智慧管理.svg";
import svg5 from "../../resource/navi/5-水行政执法.svg";
import svg6 from "../../resource/navi/6-两河水环境监测与告警.svg";

export default () => {
  const imgList = [img1, img2, img3, img4, img5, img6, img7];
  let imgElement = imgList.map((item, index) => (
    <div key={index}>
      <img src={item}></img>
    </div>
  ));
  return (
    <div className="navi-body-layout">
      <Carousel autoplay className="navi-img-layout" effect="fade" dots={false}>
        {imgElement}
      </Carousel>
      <div className="navi-body-box">
        <div className="navi-body-title">
          <img src={title}></img>
        </div>
        {/* 边框 */}
        <div className="navi-line-box">
          <div className="navi-line1"></div>
        </div>
        <div className="navi-line-box">
          <div className="navi-line2"></div>
        </div>
        <div className="navi-line-box">
          <div className="navi-line3"></div>
        </div>
        {/*  */}
        <div className="navi-body-card-flex">
          {/* <div> */}
          <div className="navi-body-card">
            {/* 防汛排涝智慧调度 */}
            <div
              className="navi-body-card-item"
              id="card-item"
              onClick={() =>
                window.location.replace(
                  `http://218.56.180.250:9110/new/v2.0/dist/#/`
                )
              }
            >
              <div>
                <div className="navi-body-card-item-img">
                  <img src={svg1}></img>
                </div>
                <div>防汛排涝智慧调度</div>
              </div>
            </div>
            {/* 供排水智慧监控管理 */}
            <div className="navi-body-card-item2" id="card-item">
              <div>
                <div className="navi-body-card-item-img">
                  <img src={svg2}></img>
                </div>
                <div>供排水智慧监控管理</div>
              </div>
            </div>
            {/* 水利工程管理 */}
            <div className="navi-body-card-item3" id="card-item2">
              <div>
                <div className="navi-body-card-item-img">
                  <img src={svg3}></img>
                </div>
                <div>水利工程管理</div>
              </div>
            </div>
            {/*河湖水治智慧管理  */}
            <div className="navi-body-card-item4" id="card-item">
              <div>
                <div className="navi-body-card-item-img">
                  <img src={svg4}></img>
                </div>
                <div>河湖水治智慧管理</div>
              </div>
            </div>
            {/*水行政执法  */}
            <div className="navi-body-card-item5" id="card-item2">
              <div>
                <div className="navi-body-card-item-img">
                  <img src={svg5}></img>
                </div>
                <div>水行政执法</div>
              </div>
            </div>
            {/*两河水环境监测与告警  */}
            <div className="navi-body-card-item6" id="card-item">
              <div>
                <div className="navi-body-card-item-img">
                  <img src={svg6}></img>
                </div>
                <div>两河水环境监测与告警</div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="navi-line4"></div>
          <div className="navi-line5"></div>
          <div className="navi-line6"></div>
        </div>
      </div>
      <div className="navi-footer">版权所有 © 东营水务局</div>
    </div>
  );
};
