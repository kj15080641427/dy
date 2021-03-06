/**
 * Water 2020-07-08
 */
import React from "react";
import "./style.scss";
import emitter from "@app/utils/emitter.js";
import moment from "moment";
import { Pagination, Button, Drawer, message, Modal } from "antd";
import VideoComponent from "@app/components/video/VideoComponent";
import VideoControl from "@app/components/video/VideoControl";
import Holder from "@app/components/video/Holder";
import { CaretRightOutlined } from "@ant-design/icons";
import { Loading } from "@jiaminghi/data-view-react";

class Video extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      address: "",
      visible: false, //模态框
      token: "",
      videoobj: null,
    };
    this.videoControl = new VideoControl();
  }
  playV = (value) => {
    console.log(value);
    value = { ...value, ...value.stiteWaterRadios[0] };
    if (value.isOnline == "0") {
      this.videoControl.login().then(() => {
        this.setState({ videoobj: this.videoControl });
      });
      this.setState({
        visible: true,
        token: value.strtoken,
        type: value.dataSource,
        address: "摄像头详细地址：" + value.address,
      });
    }
    if (value.isOnline == "1") {
      message.error("视频站点不在线");
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      token: "",
      videoobj: null,
      address: "",
    });
  };
  render() {
    let data = this.props.dataSource;
    const { rowNum } = this.props;
    let elements = [];
    for (let i = 0; i < data.length; i++) {
      elements.push(
        <tr key={i}>
          <td style={{ width: 200 }}>{data[i].name}</td>
          {/* <td>{data[i].address}</td> */}
          <td>{<a>在线</a>}</td>
          <td>
            <Button
              type="primary"
              shape="circle"
              icon={<CaretRightOutlined style={{ fontSize: 20 }} />}
              onClick={() => this.playV(data[i])}
            />
          </td>
        </tr>
      );
      // elements.push(
      //     [
      //         data[i].sitename,
      //         data[i].isOnline == 0 ? "在线" : '<a>离线</a>',
      //         // '<Button type="primary" shape="circle" icon={< CaretRightOutlined style={{ fontSize: 20 }} />} onClick={() => this.playV(data[i])} />'
      //         '<Button onClick={() => this.playV(' + data[i] + ')} >打开</Button>'
      //     ]
      // )
    }
    const config = {
      header: ["站名", "状态", "操作"],
      data: elements,
      headerBGC: "#123ead42",
      oddRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      evenRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      rowNum: rowNum || 6,
      columnWidth: [210],
    };
    return (
      <div className="video-scarll-body">
        <div className="table-wrapper">
          {this.props.lod ? (
            <Loading
              className="loadingTop-loading-div"
              // style={{
              //   position: "relative",
              //   top: "110px",
              // }}
            >
              <span style={{ color: "#fff" }}>Loading...</span>
            </Loading>
          ) : (
            <table className="fl-table">
              <thead>
                <tr>
                  <th style={{ width: 200 }}>站名</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody className="fl-table-height">{elements}</tbody>
            </table>
          )}
          {/* <ScrollBoard config={config} style={{ width: '100%', height: '350px' }} /> */}
        </div>
        <Modal
          title={this.state.address}
          // placement="top"
          onCancel={this.handleCancel}
          visible={this.state.visible}
          width={"50%"}
          footer={null}
          centered={true}
          // className="county-video-chart"
        >
          {/* <FullScreen ></FullScreen> */}
          {/* <div
            style={{
              "overflow-y": "hidden",
              padding: "8px 0",
              //   background: "#000000",
              position: "relative",
              overflow: "hidden",
              height: 925,
              width: "100%",
              left: -24,
              top: -25,
            }}
            scrolling="no"
            borderWidth="0"
            position="absolute"
          > */}
          <div className="modal-video-body" style={{ position: "relative" }}>
            {this.videoControl !== null ? (
              <VideoComponent
                videoControl={this.videoControl}
                token={this.state.token}
                style={{
                  transform: "scale(1.4)",
                  width: "100%",
                  height: "100%",
                  // frameborder: 0,
                  // scrolling: "no",
                  // borderWidth: 0,
                  position: "absolute",
                  left: 200,
                  top: 190,
                }}
                type={this.state.type}
              />
            ) : null}
          </div>
          {/* </div> */}
          {/* <Holder token={this.state.token}></Holder> */}
        </Modal>
      </div>
    );
  }

  componentDidMount() {}
}
export default Video;
