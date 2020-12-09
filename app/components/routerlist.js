import React from "react";
import { Modal, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
import { TableShow } from "../components/chart/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions/map";

class RouterList extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRain: false,
      showSea: false,
      weatherData: {}, //天气信息
      visible: false,
      videoUrl: "",
      showVideo: "",
      color: "#0099ff",
    };
  }
  componentDidMount() {
    const { userMenuList } = this.props;
    const { getUserMenuList } = this.props.actions;
    if (!userMenuList[0]) {
      getUserMenuList({ token: localStorage.getItem("token") });
    }
  }

  render() {
    const { userMenuList } = this.props;
    return (
      <>
        <div className="router-item">
          {userMenuList.map((item) => {
            return item.name == "河湖长制" ? (
              <a
                key={"hhzz"}
                onClick={() =>
                  window.open("http://218.58.213.201:8081/dyhzsys")
                }
              >
                <div
                  className="router-item-style"
                  style={{
                    background: "#0099ff",
                    // color: "rgb(132,135,192)",
                    color: "white",
                  }}
                >
                  <div>
                    <div className="router-item-style-img-div">
                      <img src={item.img}></img>
                    </div>
                    <div className={"router-item-text"}>{item.name}</div>
                  </div>
                </div>
              </a>
            ) : item.name == "水质监测" ? (
              <a
                key={"szjc"}
                onClick={() =>
                  window.open(
                    `http://218.56.180.250:9110/wemaws/frame?token=${localStorage.getItem(
                      "token"
                    )}`
                  )
                }
              >
                <div
                  className="router-item-style"
                  style={{
                    background: "#0099ff",
                    color: "white",
                  }}
                >
                  <div>
                    <div className="router-item-style-img-div">
                      <img src={item.img}></img>
                    </div>
                    <div className={"router-item-text"}>{item.name}</div>
                  </div>
                </div>
              </a>
            ) : item.name == "空中巡河" ? (
              <a
                key={"znxh"}
                onClick={() => {
                  this.setState({
                    visible: true,
                    color: "rgb(227,152,62)",
                  });
                }}
              >
                <div
                  className="router-item-style"
                  style={{
                    background: this.state.color,
                    color: "white",
                  }}
                >
                  <div>
                    <div className="router-item-style-img-div">
                      <img src={item.img}></img>
                    </div>
                    <div className={"router-item-text"}>{item.name}</div>
                  </div>
                </div>
              </a>
            ) : (
              <Link
                key={item.url}
                to={item.url}
                target={item.url == "/home" ? "_blank" : ""}
              >
                <div
                  className="router-item-style"
                  style={
                    window.location.href.split("#")[1] == item.url
                      ? { background: "rgb(227,152,62)", color: "white" }
                      : {
                          background: "#0099ff",
                          // color: "rgb(132,135,192)",
                          color: "white",
                        }
                  }
                >
                  <div>
                    <div className="router-item-style-img-div">
                      <img src={item.img}></img>
                    </div>
                    <div className={"router-item-text"}>{item.name}</div>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* 水质监测 */}

          {/* 智能巡河 */}
        </div>
        <Modal
          maskClosable={false}
          title="空中巡河"
          width="1200px"
          className="rouer-list-modal"
          footer={null}
          visible={this.state.visible}
          onCancel={() =>
            this.setState({
              visible: false,
              color: "#0099ff",
            })
          }
        >
          {this.childTable()}
          <video
            style={{ position: "absolute" }}
            ref={(obj) => (this.container = obj)}
            autoPlay={true}
            height="1px"
            width="1px"
            src={this.state.videoUrl}
          ></video>
        </Modal>
      </>
    );
  }
  handlesjgl() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/dist/index.html#/home/rwvdata";
  }
  handlefxyj() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/new/dist/index.html#/floodwarning";
  }
  handleindex() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/new/dist/index.html#/index";
  }
  handlespjk() {
    const w = window.open("about:blank");
    w.location.href = "http://172.19.112.74/new/dist/index.html#/video";
  }
  childTable() {
    const baseColumns = [
      {
        name: "序号",
        dataIndex: "b",
        render: (text, record, index) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        name: "起始位置",
        dataIndex: "c",
      },
      {
        name: "结束位置",
        dataIndex: "d",
      },
      {
        name: "时长(分钟)",
        dataIndex: "e",
        // render: (e) => Number(e).toFixed(2),
      },
      {
        name: "播放",
        dataIndex: "f",
        render: (record) => {
          return (
            <a
              onClick={() => {
                this.setState({ videoUrl: record });
                this.setState({ showVideo: true });
                this.container && this.container.requestFullscreen();
              }}
            >
              播放
            </a>
          );
        },
      },
    ];
    const expandedRowRender = () => {
      const columns = baseColumns;

      const dataSource = [
        {
          c: "路南干渠",
          d: "王营排水闸",
          e: "3:50",
          f: "http://218.56.180.250:9110/my/广利河视频/1.mp4",
        },
        {
          c: "王营排水闸",
          d: "胜干支渠",
          e: "4:50",
          f: "http://218.56.180.250:9110/my/广利河视频/2.mp4",
        },

        {
          c: "胜干支渠",
          d: "尚庄孙家桥",
          e: "4:00 ",
          f: "http://218.56.180.250:9110/my/广利河视频/3.mp4",
        },
        {
          c: "尚庄孙家桥",
          d: "六干排",
          e: "2:10",
          f: "http://218.56.180.250:9110/my/广利河视频/4.mp4",
        },
        {
          c: "六干排",
          d: "西五路",
          e: "5:25",
          f: "http://218.56.180.250:9110/my/广利河视频/5.mp4",
        },
        {
          c: "西五路",
          d: "立新村拦河闸",
          e: "4:35",
          f: "http://218.56.180.250:9110/my/广利河视频/6.mp4",
        },
        {
          c: "立新村拦河闸",
          d: "北二路汇口",
          e: "4:28",
          f: "http://218.56.180.250:9110/my/广利河视频/7.mp4",
        },
        {
          c: "北二路汇口",
          d: "千佛山路",
          e: "3:35",
          f: "http://218.56.180.250:9110/my/广利河视频/8.mp4",
        },
        {
          c: "千佛山路",
          d: "黄河公园",
          e: "3:15",
          f: "http://218.56.180.250:9110/my/广利河视频/9.mp4",
        },
        {
          c: "黄河公园",
          d: "南一路",
          e: "4:00",
          f: "http://218.56.180.250:9110/my/广利河视频/10.mp4",
        },
        {
          c: "南一路",
          d: "东二路",
          e: "4:07",
          f: "http://218.56.180.250:9110/my/广利河视频/11.mp4",
        },
        {
          c: "东二路",
          d: "胜利大街",
          e: "3:50",
          f: "http://218.56.180.250:9110/my/广利河视频/12.mp4",
        },

        {
          c: "胜利大街",
          d: "东四路",
          e: "3:40",
          f: "http://218.56.180.250:9110/my/广利河视频/13.mp4",
        },
        {
          c: "东四路",
          d: "东七路",
          e: "3:35",
          f: "http://218.56.180.250:9110/my/广利河视频/14.mp4",
        },
        {
          c: "东七路",
          d: "东八路",
          e: "2:37",
          f: "http://218.56.180.250:9110/my/广利河视频/15.mp4",
        },
      ];
      return (
        <TableShow
          hideOnSinglePage
          pageSize={15}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      );
    };
    return (
      <Tabs type="card">
        <Tabs.TabPane key="1" tab="广利河">
          {expandedRowRender()}
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="溢洪河">
          <TableShow
            pageSize={15}
            columns={baseColumns}
            dataSource={[
              {
                c: "王营村",
                d: "崔家村",
                e: "3:30",
                f: "http://218.56.180.250:9110/my/溢洪河视频/1.mp4",
              },
              {
                c: "崔家村",
                d: "溢洪河节制闸",
                e: "4:13",
                f: "http://218.56.180.250:9110/my/溢洪河视频/2.mp4",
              },
              {
                c: "溢洪河节制闸",
                d: "西五路桥",
                e: "1:17",
                f: "http://218.56.180.250:9110/my/溢洪河视频/3.mp4",
              },
              {
                c: "西五路桥",
                d: "溢洪河西冯泄水闸",
                e: "6:00",
                f: "http://218.56.180.250:9110/my/溢洪河视频/4.mp4",
              },
              {
                c: "溢洪河西冯泄水闸",
                d: "黄河路桥",
                e: "3:35",
                f: "http://218.56.180.250:9110/my/溢洪河视频/5.mp4",
              },
              {
                c: "黄河路桥",
                d: "胜利路桥",
                e: "3:03",
                f: "http://218.56.180.250:9110/my/溢洪河视频/6.mp4",
              },
              {
                c: "胜利路桥",
                d: "荣乌高速",
                e: "1:52",
                f: "http://218.56.180.250:9110/my/溢洪河视频/7.mp4",
              },
              {
                c: "荣乌高速",
                d: "隆丰大道",
                e: "3:45",
                f: "http://218.56.180.250:9110/my/溢洪河视频/8.mp4",
              },
              {
                c: "隆丰大道",
                d: "东三路桥",
                e: "2:13",
                f: "http://218.56.180.250:9110/my/溢洪河视频/9.mp4",
              },
              {
                c: "东三路桥",
                d: "德州路桥",
                e: "3:14",
                f: "http://218.56.180.250:9110/my/溢洪河视频/10.mp4",
              },
            ]}
          ></TableShow>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="黄河">
          <TableShow
            pageSize={15}
            columns={baseColumns}
            dataSource={[
              {
                c: "宫家引黄闸",
                d: "德大铁路桥",
                e: "3:20",
                f: "http://218.56.180.250:9110/my/黄河视频/1.mp4",
              },
              {
                c: "德大铁路桥",
                d: "利津黄河大桥",
                e: "2:15",
                f: "http://218.56.180.250:9110/my/黄河视频/2.mp4",
              },
              {
                c: "利津黄河大桥",
                d: "胜利引黄闸",
                e: "3:17",
                f: "http://218.56.180.250:9110/my/黄河视频/3.mp4",
              },
              {
                c: "胜利引黄闸",
                d: "王庄引黄闸",
                e: "4:58",
                f: "http://218.56.180.250:9110/my/黄河视频/4.mp4",
              },
              {
                c: "王庄引黄闸",
                d: "胜利黄河大桥",
                e: "3:55",
                f: "http://218.56.180.250:9110/my/黄河视频/5.mp4",
              },
              {
                c: "胜利黄河大桥",
                d: "荣乌高速黄河大桥",
                e: "2:37",
                f: "http://218.56.180.250:9110/my/黄河视频/6.mp4",
              },
            ]}
          ></TableShow>
        </Tabs.TabPane>
        <Tabs.TabPane key="4" tab="神仙沟">
          <TableShow
            pageSize={15}
            columns={baseColumns}
            dataSource={[
              {
                c: "神仙沟起始位置",
                d: "神仙沟结束位置",
                e: "3:20",
                f: "http://218.56.180.250:9110/my/神仙沟开头2公里.mp4",
              },
            ]}
          ></TableShow>
        </Tabs.TabPane>
      </Tabs>

      // <Table
      //   className="components-table-demo-nested"
      //   columns={columns}
      //   expandable={{ expandedRowRender }}
      //   dataSource={data}
      // />
    );
  }
  componentWillUnmount() {
    clearTimeout(this.time);
  }
}
function mapStateToProps(state) {
  return {
    userMenuList: state.mapAboutReducers.userMenuList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RouterList);
