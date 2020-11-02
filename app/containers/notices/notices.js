/**
 * notices 2020-07-31
 */
import React from "react";
import { downlWordData, downloadExcel } from "@app/data/request";
import "./style.scss";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/noties.png";
import FloodSituation from "./components/floodSituation/FloodSituation";
import PannelBtn from "./right/PannelBtn";
import moment from "moment";
import { message } from "antd";
import RouterList from "../../components/routerLiis";
class notices extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pointdata: [],
      riverdata: [],
      raindata: {},
      pointloding: false,
      riverloding: false,
      starttime: moment(new Date())
        .subtract("hour", 1)
        .format("YYYY-MM-DD HH:00"),
      endtime: moment(new Date()).format("YYYY-MM-DD HH:00"),
      // moment().format('YYYY-MM-DD')
    };
    this.init = this.init.bind(this);
  }

  render() {
    const {
      pointdata,
      riverdata,
      raindata,
      pointloding,
      riverloding,
    } = this.state;
    return (
      <div className="flood-notices">
        <div className="flood-noyices-top"></div>
        <Head titleImg={titleImg}></Head>
        <div className="m-left-notices">
          <FloodSituation
            pointdata={pointdata}
            riverdata={riverdata}
            raindata={raindata}
            onOkstart={this.onOkstart}
            onOkend={this.onOkend}
            init={this.init}
            downl={this.downl}
            pointloding={pointloding}
            riverloding={riverloding}
          ></FloodSituation>
        </div>
        <RouterList />
        {/* <div className="flood-noyices-top"></div> */}
      </div>
    );
  }
  downl = () => {
    var url = "/api/v2/base/SiteBase/word?";
    if (this.state.time !== "") {
      url +=
        "startTime=" + this.state.starttime + "&endTime=" + this.state.endtime;
    }
    window.location.href = url;
  };

  onOkstart = (value) => {
    this.setState({
      starttime: moment(value).format("YYYY-MM-DD HH:00"),
    });
    console.log(value);
  };
  onOkend = (value) => {
    this.setState({
      endtime: moment(value).format("YYYY-MM-DD HH:00"),
    });
    console.log(value);
  };
  sortId(a, b) {
    return b.z - a.z;
  }
  init() {
    this.setState({
      pointloding: true,
      riverloding: true,
    });
    downlWordData({
      startTime: this.state.starttime,
      endTime: this.state.endtime,
    })
      .then((result) => {
        let _arrayList = result.data.pointList;
        // for (var i = 0; i < _arrayList.length; i++) {
        //   for (var u = i + 1; u < _arrayList.length; u++) {
        //     if (
        //       parseFloat(_arrayList[i]["z"]) < parseFloat(_arrayList[u]["z"])
        //     ) {
        //       var num = [];
        //       num = _arrayList[i];
        //       _arrayList[i] = _arrayList[u];
        //       _arrayList[u] = num;
        //     }
        //   }
        // }
        let abnormalList = []; //z值为 '-' 的数据
        let normalList = []; //z值正常的数据
        _arrayList.map((item) => {
          item.z == "-" ? abnormalList.push(item) : normalList.push(item);
        });
        normalList.sort((a, b) => {
          return b.z - a.z;
        });
        this.setState({
          raindata: result.data,
          pointdata: normalList.concat(abnormalList),
          riverdata: result.data.riverList,
          riverloding: false,
          pointloding: false,
        });
        message.success("数据查询成功");
      })
      .catch((e) => {
        message.error(e);
      });
  }
  componentDidMount() {
    this.init();
  }
}
export default notices;
