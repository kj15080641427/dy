/**
 * notices 2020-07-31
 */
import React from 'react';
import { downlWordData } from '@app/data/request';
import "./style.scss";
import Head from "./head/Head";
import FloodSituation from "./components/floodSituation/FloodSituation";
import PannelBtn from "./right/PannelBtn";
import moment from 'moment';
import { message } from 'antd';

class notices extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pointdata: [],
      riverdata: [],
      raindata: {},
      pointloding: false,
      riverloding: false,
      starttime: '',
      endtime: '',
    };
    this.init = this.init.bind(this);
  };

  render() {
    const { pointdata, riverdata, raindata, pointloding, riverloding } = this.state;
    return (
      <div className="monitor">
        <Head></Head>
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
        <div className="m-right">
          <PannelBtn></PannelBtn>
        </div>
      </div>
    );
  }
  downl = () => {
    var url = "/api/download/word";
    if (this.state.time !== '') {
      url += "?startTime=" + this.state.starttime + "&endTime=" + this.state.endtime;
    }
    window.location.href = url;
  }
  onOkstart = (value) => {
    this.setState({
      starttime: moment(value).format('YYYY-MM-DD HH:mm:00')
    })
    console.log(value)
  }
  onOkend = (value) => {
    this.setState({
      endtime: moment(value).format('YYYY-MM-DD HH:mm:00')
    })
    console.log(value)
  }
  init() {
    this.setState({
      pointloding: true,
      riverloding: true,
    })
    downlWordData({ 'startTime': this.state.starttime, 'endTime': this.state.endtime }).then((result) => {
      console.log(result)
      this.setState({
        raindata: result.data,
        pointdata: result.data.pointList,
        riverdata: result.data.riverList,
        riverloding: false,
        pointloding: false
      })
      message.success('数据查询成功')
    }).catch((e) => {
      message.error(e);
    });
  }
  componentDidMount() {
    this.init()
  }

}
export default notices;
