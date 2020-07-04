/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import "./style.scss";
import { Row, Col, Drawer, Table, Button, Modal } from 'antd';
import fxyj from '../../../resource/fxyj.png';
import sjgl from '../../../resource/sjgl.png';
import spjk from '../../../resource/spjk.png';
import ysgq from '../../../resource/ysgq.png';
import ybmx from '../../../resource/ybmx.png';
import zhjk from '../../../resource/zhjk.png';
import ddfa from '../../../resource/ddfa.png';
import moment from "moment";
import { getWeatherdata, getWaterRealTime } from "@app/data/request";

class PannelBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {},//天气信息
      visible: false,
      visibleScheme: false,
      visibleDuty: false,
      water: []
    };
  }
  //打开预报模型
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  //关闭预报模型
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  //打开调度
  showSchemeModal = () => {
    this.setState({
      visibleScheme: true,
    });

  };
  //关闭调度
  handleSchemeCancel = e => {
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
  handleDutyCancel = e => {
    this.setState({
      visibleDuty: false,
    });
  };

  render() {

    const { weatherData } = this.state;
    console.log(moment(new Date().getTime()).format("M"))
    const dutyColumns = [
      {
        title: '河流/湖',
        dataIndex: 'water',
        fixed: 'center',
      },
      {
        title: '责任单位',
        dataIndex: 'unit',
        fixed: 'center',
      },
      {
        title: '责任领导',
        dataIndex: 'lead',
        fixed: 'center',
      },
      {
        title: '负责单位',
        dataIndex: 'takeunit',
        fixed: 'center',
      },
      {
        title: '负责人',
        dataIndex: 'principal',
        fixed: 'center',
      },
      {
        title: '直接负责人',
        dataIndex: 'dri',
        fixed: 'center',
      },
      {
        title: '工作要求',
        dataIndex: 'workask',
        width: 600,
        fixed: 'center',
      },
    ]
    const columns = [
      {
        title: '河流/湖',
        dataIndex: 'river',
        fixed: 'center',
      },
      {
        title: '河道断面',
        dataIndex: 'riveray',
        fixed: 'center',
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
        title: '监测水位',
        dataIndex: 'water',
        fixed: 'center',
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
        title: '调度控制水位',
        fixed: 'center',
        children: [
          {
            title: moment(new Date().getTime()).format("M") == 6 ? "六月" : "七月",
            dataIndex: moment(new Date().getTime()).format("M") == 6 ? "number1" : "number2",
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

        ]
      },
      {
        title: '警戒水位',
        dataIndex: 'warningwater',
        fixed: 'center',
      },
      {
        title: '保证水位',
        dataIndex: 'cashwater',
        fixed: 'center',
      },
      {
        title: '预警',
        dataIndex: 'warningwater',
        fixed: 'center',
        render:
          (warningwater, key) => {
            if (warningwater > key.water) {

              return (
                <span style={{ color: "green" }}>正常</span>
              )
            } else if (key.water === "--") {
              return (
                <a>暂无数据</a>
              )
            }
            else if (warningwater < key.water) {
              return (
                <span style={{ color: "red" }}>警告</span>
              )
            }
          },
      },
    ];

    const data = [
      {
        stcd: 41850517,
        river: "广利河",
        riveray: "王营闸",
        lon: 118.391866,
        lat: 37.553347,
        // water: this.state.water[3],
        water: 5.92,
        number1: 1.8,
        number2: 2.00,
        number3: 2.00,
        number4: 1.8,
        warningwater: 6.47,
        cashwater: 7.61,
      },
      {
        stcd: 41850519,
        river: "广利河",
        riveray: "秦家橡胶坝",
        lon: 118.432111,
        lat: 37.511667,
        // water: this.state.water[4],
        water: 4.59,
        number1: 2.00,
        number2: 2.00,
        number3: 2.00,
        number4: 2.00,
        warningwater: 5.42,
        cashwater: 6.71,
      },
      {
        stcd: 41800261,
        river: "广利河",
        riveray: "明泓闸",
        lon: 118.482139,
        lat: 37.483861,
        // water: this.state.water[1],
        water: this.state.water[1],
        number1: "1.8~2.5",
        number2: 2.00,
        number3: 2.00,
        number4: "1.8~2.5",
        warningwater: 4.72,
        cashwater: 6.42,
      },
      {
        stcd: 0,
        river: "广利河",
        riveray: "明汇闸",
        lon: 118.550528,
        lat: 37.444806,
        water: "--",
        number1: "1.8~2.5",
        number2: "1.4~1.8",
        number3: "1.4~1.8",
        number4: "1.8~2.5",
        warningwater: 3.77,
        cashwater: 5.02,
      },
      {
        stcd: 41800264,
        river: "广利河",
        riveray: "明海闸",
        lon: 118.766341,
        lat: 37.416417,
        // water: this.state.water[2],
        water: 1.18,
        number1: "1.5~1.9",
        number2: "1.4~1.8",
        number3: "1.4~1.8",
        number4: "1.5~1.9",
        warningwater: 2.1,
        cashwater: 3.86,
      },
      {
        stcd: 0,
        river: "东营河",
        riveray: "西二路桥",
        lon: 118.523112,
        lat: 37.518874,
        water: "--",
        number1: "2.7",
        number2: "2.5",
        number3: "2.5",
        number4: "2.7",
        warningwater: 4.13,
        cashwater: 4.97,
      },
      {
        stcd: 0,
        river: "东营河",
        riveray: "华山路桥",
        lon: 118.616075,
        lat: 37.519236,
        water: "--",
        number1: "2.2",
        number2: "1.8",
        number3: "1.8",
        number4: "2.2",
        warningwater: 3.79,
        cashwater: 4.52,
      },
      {
        stcd: 0,
        river: "东营河",
        riveray: "辛安水库桥",
        lon: 118.719464,
        lat: 37.49034,
        water: "--",
        number1: "1.8",
        number2: "1.4",
        number3: "1.4",
        number4: "1.8",
        warningwater: 3.29,
        cashwater: 3.85,
      },
      {
        stcd: 41800253,
        river: "新广蒲河",
        riveray: "西四路桥",
        lon: 118.491292,
        lat: 37.43751,
        water: this.state.water[0],
        number1: "--",
        number2: "--",
        number3: "--",
        number4: "--",
        warningwater: 3.69,
        cashwater: 5.77,
      },
      {
        stcd: 0,
        river: "新广蒲河",
        riveray: "东青高速桥",
        lon: 118.606402,
        lat: 37.370207,
        water: "--",
        number1: "--",
        number2: "--",
        number3: "--",
        number4: "--",
        warningwater: 2.57,
        cashwater: 4.71,
      },
      {
        stcd: 0,
        river: "新广蒲河",
        riveray: "东二路桥",
        lon: 118.652605,
        lat: 37.368269,
        water: "--",
        number1: "--",
        number2: "--",
        number3: "--",
        number4: "--",
        warningwater: 2.19,
        cashwater: 4.31,
      },
      {
        stcd: 0,
        river: "天鹅湖",
        riveray: "北部",
        lon: "--",
        lat: "--",
        water: "--",
        number1: "1.00",
        number2: "1.00",
        number3: "1.00",
        number4: "1.00",
        warningwater: "--",
        cashwater: "--",
      },
      {
        stcd: 0,
        river: "天鹅湖",
        riveray: "南部",
        lon: "--",
        lat: "--",
        water: "--",
        number1: "1.00",
        number2: "1.00",
        number3: "1.00",
        number4: "1.00",
        warningwater: "--",
        cashwater: "--",
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
        workask: "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "广利河",
        unit: "东营区政府",
        lead: "刘辰勇",
        takeunit: "东营区水利局",
        principal: "孙海军",
        dri: "李强",
        workask: "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "东营河",
        unit: "市住房建设管理局",
        lead: "聂绍果",
        takeunit: "北二路工作专班",
        principal: "陈步花",
        dri: "闫增春,朱青松,张跃峰,许义峰",
        workask: "做好东营河水位控制，保持汛期河道畅通，7月份前完成北二路跨广利河桥水面以下施工",
      },
      {
        water: "新广蒲河",
        unit: "市水务局",
        lead: "张兆印",
        takeunit: "市河道管理处",
        principal: "荣立忠,吴贵杰",
        dri: "时丽霞, 武光辉, 李宝智",
        workask: "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
      },
      {
        water: "新广蒲河",
        unit: "东营区政府",
        lead: "刘辰勇",
        takeunit: "东营区水利局",
        principal: "孙海军",
        dri: "李强",
        workask: "做好河道巡查，及时清除阻水障碍物，降雨期间做好河道水位观测，发现险情及时上报，对明泓闸、明汇闸、胜安闸、明海闸、明港闸等检修维护，根据汛情或指令及时降低河道水位",
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
    ]
    return (
      <div className="m-pannel-btns">
        <div>
          <Row className="m-alm-row">
            <Col span={4}>
              <Link to={'/index'}>
                <img
                  className="m-btn-flood"
                  src={zhjk}
                // onClick={this.handleindex}
                ></img></Link>
            </Col>
            <Col span={4}>
              <img
                className="m-btn-flood"
                src={ybmx}
                onClick={this.showModal}
              ></img>
            </Col>
            <Col span={4}>
              <img
                className="m-btn-flood"
                src={ddfa}
                onClick={this.showSchemeModal}
              ></img>
            </Col>
            <Col span={4}>
              <Link to={'/rain'}>
                <img
                  className="m-btn-flood"
                  src={ysgq}
                // onClick={this.handleysgq}
                ></img>
              </Link>
            </Col>
            <Col span={4}>
              <Link to={'/video'}><img
                className="m-btn-flood"
                src={spjk}
              // onClick={this.handlespjk}
              ></img></Link></Col>
            <Col span={4}>
              {localStorage.getItem("username") === "admin1" ? null :
                <img
                  className="m-btn-flood"
                  src={sjgl}
                  onClick={this.handlesjgl}
                ></img>
              }
            </Col>
          </Row>
        </div>
        <Drawer
          title="预报模型"
          placement="top"
          onClose={this.handleCancel}
          visible={this.state.visible}
          width={"100%"}
          height="100%"
        >
          <div style={{ height: '930px', position: 'relative', }}>
            <iframe frameborder="0" scrolling="no" src="http://47.104.228.80:8081/HYMM_DY/Index.html"
              style={{
                width: "100%",
                height: 950,
                position: 'absolute', margin: 'auto',
                top: -0, left: 0, bottom: 0, right: 0,
              }}></iframe>
          </div>
        </Drawer>
        <Drawer
          title="调度方案"
          placement="top"
          onClose={this.handleSchemeCancel}
          visible={this.state.visibleScheme}
          width="100%"
          height="100%"
        >
          <Table
            columns={columns}
            dataSource={data}
            title={() => <Row><Col span={10}></Col><Col span={10}><span className="title-scheme">东营市中心城主干河道关键断面调度方案</span></Col><Col span={2}></Col><Col span={2}><Button onClick={this.showDutyModal}>责任安排</Button></Col></Row>}
            bordered
            size="middle"
            scroll={{ x: 'calc(700px + 50%)', y: 1040 }}
            pagination={false}
          />
          <Modal
            forceRender={true}
            onCancel={this.handleDutyCancel}
            visible={this.state.visibleDuty}
            title='责任安排明细'
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
        </Drawer>
      </div>
    );
  }
  handlesjgl() {
    const w = window.open('about:blank');
    // w.location.href = "http://172.19.112.74/new/dist/index.html#/home/rwvdata"
    w.location.href = "http://172.19.112.74/dist/index.html#/home/rwvdata"
    //  w.location.href = "http://localhost/dist/index.html#/home"
    // w.location.href = "/#/home"
  }
  handleysgq() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/rain"
    //  w.location.href = "http://localhost/dist/index.html#/rain"
    // w.location.href = "/#/rain"
  }
  // handlefxyj() {
  //   const w = window.open('about:blank');
  //   // w.location.href = "http://172.19.112.74/dist/index.html#/floodwarning"
  //   //  w.location.href = "http://localhost/dist/index.html#/floodwarning"
  //   w.location.href = "/#/floodwarning"
  // }
  handleindex() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/index"
    //  w.location.href = "http://localhost/dist/index.html#/index"
    // w.location.href = "/#/index"
  }
  handlespjk() {
    const w = window.open('about:blank');
    w.location.href = "http://172.19.112.74/new/dist/index.html#/video"
    //  w.location.href = "http://localhost/dist/index.html#/video"
    // w.location.href = "/#/video"
  }
  componentDidMount() {
    // this._timer = window.setInterval(() => {
    //   if (this.time) {
    //     this.time.innerHTML = moment().format("MM月DD日");
    //   }
    // }, 1000);
    // this.selectInit()
    // window.setInterval(() => {
    //   this.selectInit()
    // }, 1000 * 12);
    getWaterRealTime({
      stcd: "41850517,41850519,41800261,41800264,41800253",
      isOrder: "1"
    }).then((result) => {
      console.log(result)
      let arr = []
      for (let i = 0; i < result.data.records.length; i++) {
        arr.push(result.data.records[i].z)
      }
      this.setState({
        water: arr
      })
    })

  }
  selectInit() {
    //获取天气信息
    // getWeatherdata()
    //   .then(result => {
    //     this.setState({ weatherData: result.data })
    //   })
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
export default PannelBtn;