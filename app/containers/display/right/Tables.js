/**
 * Tables 2020-07-06
 */
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import TableWrap from "./table/TableWrap";
import { Table, Row, Col, Button } from "antd";
import EasyFlood from "./table/easyFlood";
import Precipitation from "./table/Precipitation";
import Video from "./table/Video";
import Water from "./table/Water";
import { getBasicsAll, getRadioAll } from "@app/data/request";
class Tables extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      waterData: [],
      rainData: [],
      easyData: [],
      videoData: [],
      waterCount: 0,
      rainCount: 0,
      videoCount: 0,
      easyCount: 0,
      rainlod: false,
      easylod: false,
      waterlod: false,
      videolod: false,
    };
  }

  render() {
    const { dict } = this.props;
    let {
      waterData,
      rainData,
      easyData,
      videoData,
      waterCount,
      rainCount,
      videoCount,
      easyCount,
      rainlod,
      easylod,
      waterlod,
      videolod,
    } = this.state;
    return (
      <div className="dis-tables">
        <div className="dis-table-btns">
          <Row>
            <Col span={22}></Col>
            <Col span={2}>
              <Button className="button-color-yello" size="large">
                <Link to="/water">进入系统</Link>
              </Button>
            </Col>
            {/* <Col span={2}>
              <Button size="large" className="button-color-green"><Link to="/rain">雨情监测</Link></Button>
            </Col>
            <Col span={2}>
              <Button size="large" type="primary"><Link to="/water">河湖水情</Link></Button>
            </Col>
            <Col span={2}>
              <Button size="large" className="button-color-orange"><Link to="/easyFlood">城市防汛</Link></Button>
            </Col>
            <Col span={2}>
              <Button size="large" className="button-color-violet"><Link to="/video">视频监控</Link></Button>
            </Col>
            <Col span={2}>
              <Button size="large" className="button-color-yello"><Link to="/floodWarning">防汛预警</Link></Button>
            </Col>
            <Col span={2}>
              {localStorage.getItem("username") === "admin1" ? null : <Button size="large" className="button-color-green"><Link to="/home/rwvdata">系统管理</Link></Button>}
            </Col>
            <Col span={10}>
            </Col> */}
          </Row>
        </div>
        <div className="dis-table-con">
          <TableWrap title={"雨量站(" + rainCount + ")"} extra={"单位：mm"}>
            <Precipitation dataSource={rainData} lod={rainlod} dict={dict}></Precipitation>
          </TableWrap>
          <TableWrap title={"视频站点(" + videoCount + ")"}>
            <Video dataSource={videoData} lod={videolod}></Video>
          </TableWrap>
          <TableWrap title={"易涝点(" + easyCount + ")"} extra={"单位：m"}>
            <EasyFlood dataSource={easyData} lod={easylod} dict={dict}></EasyFlood>
          </TableWrap>
          {/* <TableWrap title={"水位站(" + waterCount + ")"} extra={"单位：m"}> */}
          <TableWrap title={`水位站(${waterCount})`} extra={"单位：m"}>
            <Water dataSource={waterData} lod={waterlod} dict={dict}></Water>
          </TableWrap>
        </div>
      </div>
    );
  }
  selectInit() {
    this.setState({
      rainlod: true,
      easylod: true,
      waterlod: true,
      videolod: true,
    });
    getBasicsAll({
      type: 1,
    }).then((result) => {
      this.setState({
        rainData: result.data,
        rainCount: result.data.length,
        rainlod: false,
      });
    });
    getBasicsAll({
      type: 2,
    }).then((result) => {
      this.setState({
        waterData: result.data,
        waterCount: result?.data?.length,
        waterlod: false,
      });
    });
    getBasicsAll({
      type: 3,
    }).then((result) => {
      console.log(result);
      let arr = [];
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].indtype !== 11) {
          arr.push(result.data[i]);
        }
      }
      this.setState({
        easyData: arr,
        easyCount: arr.length,
        easylod: false,
      });
    });
    getRadioAll({
      isShow: "0",
    }).then((result) => {
      // console.log(result.data, "Result");
      let arr = [];
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].isOnline * 1 === 0) {
          arr.push(result.data[i]);
        }
      }
      // console.log(arr);
      this.setState({
        videoData: arr,
        videoCount: arr.length,
        videolod: false,
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
export default Tables;
