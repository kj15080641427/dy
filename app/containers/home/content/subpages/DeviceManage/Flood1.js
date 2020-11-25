import React, { Component } from "react";
import "./style.scss";
import moment from "moment";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import DYForm from "@app/components/home/form";
import { URL as URLDefine } from "@app/utils/common.js";
import echarts from "echarts/lib/echarts";
import { exportSiteDevice } from "@app/data/home";
import { TableShow } from "@app/components/chart/table";
import {
  DatePicker,
  Tabs,
  Input,
  Tree,
  Table,
  Space,
  Button,
  Divider,
  Modal,
  Spin,
  message,
  Popover,
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/map";
const { Search, TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const AllApi = require("@app/data/home");
const pageSize = 6;

class DeviceManageFlood extends Component {
  constructor(props, context) {
    super(props, context);
    this.addFormRef = React.createRef();
    this.repairFormRef = React.createRef();
    this.changeFormRef = React.createRef();
    this.state = {
      showLoading: true,
      userinfo: null,
      deviceTableSearchName: "",
      deviceTablePage: 1,
      deviceTableTotal: 0,
      repairTablePage: 1,
      repairTableTotal: 0,
      treeDefaultStatus: {},
      treeData: null,
      currentSite: {},
      deviceList: [],
      repairList: [],
      addFormVisible: false,
      repairFormVisible: false,
      changeFormVisible: false,
      chartStartTM: moment(Date.now() - 6 * 24 * 60 * 60 * 1000),
      chartEndTM: moment(Date.now()),
    };
  }
  async componentDidMount() {
    this.props.actions.getDict();
    const { device } = this.props;
    const data = device.siteData;
    const treeDefaultStatus = {};
    const treeData = [
      { title: "东营区", key: "370502" },
      { title: "广饶县", key: "370523" },
      { title: "利津县", key: "370522" },
      { title: "垦利区", key: "370521" },
      { title: "河口区", key: "370503" },
    ];

    let first;
    treeData.map((td) => {
      td.selectable = false;
      td.children = [];
      data.records
        .filter((d) => (d.region || d.addvcd) === td.key)
        .map((d) => {
          const child = Object.assign({}, d, {
            key: d[`site${device.typeName}ID`],
            title: d.name,
          });
          if (!first) {
            first = child;
            treeDefaultStatus.expand = td.key;
            treeDefaultStatus.selected = child.key;
          }
          td.children.push(child);
        });
    });
    this.setState({ treeData, showLoading: false, treeDefaultStatus });
    this.handleTreeSelect({ node: first });
  }

  handleTreeSelect({ node }) {
    this.setState({ currentSite: node }, () => {
      this.getDeviceData();
      this.getDeviceRepairData();
      this.buildSiteCountChart();
    });
  }
  async getDeviceData() {
    this.setState({ showLoading: true });
    try {
      const { device } = this.props;
      const {
        currentSite,
        deviceTablePage,
        deviceTableSearchName,
      } = this.state;
      const siteDevices = await AllApi.getSiteDevicePage({
        relTypeCode: device.type,
        relTypeId: currentSite.key,
        size: pageSize,
        current: deviceTablePage,
        name: deviceTableSearchName,
      });
      this.setState({
        deviceList: siteDevices.data.records,
        deviceTableTotal: siteDevices.data.total,
      });
    } catch (e) {
      console.error(e);
    }
    this.setState({ showLoading: false });
  }

  async getDeviceRepairData() {
    this.setState({ showLoading: true });
    try {
      const { device } = this.props;
      const { currentSite, repairTablePage } = this.state;
      const siteDeviceRepairs = await AllApi.getSiteDeviceRepairPage({
        relTypeCode: device.type,
        relTypeId: currentSite.key,
        size: pageSize,
        current: repairTablePage,
      });
      this.setState({
        repairList: siteDeviceRepairs.data.records,
        repairTableTotal: siteDeviceRepairs.data.total,
      });
    } catch (e) {
      console.error(e);
    }
    this.setState({ showLoading: false });
  }

  async buildSiteCountChart(range = []) {
    // console.log(range);
    const [startTime, endTime] = range;
    if (this.props.device.type == 4) {
      const { data } = await AllApi.getVideoOnline({
        radioID: this.state.currentSite.radioID,
        startTime: moment(startTime || this.state.chartStartTM).format(
          "YYYY-MM-DD 00:00:00"
        ),
        endTime: moment(endTime || this.state.chartEndTM).format(
          "YYYY-MM-DD 23:00:00"
        ),
      });
      let xdata = [];
      let ydata = [];
      var myChart = echarts.init(document.getElementById(`deviceVideo`));
      data.forEach((item) => {
        xdata.push(item.tm.slice(5, 10));
        ydata.push(Number(item.list[1].number));
      });
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          show: true,
          borderColor: "white",
        },
        xAxis: {
          boundaryGap: false,
          type: "category",
          data: xdata,
          name: "时间",
          axisLine: {
            lineStyle: { color: "white" },
          },
          nameTextStyle: {
            color: "white",
            fontSize: "18",
          },
          axisLabel: {
            color: "white",
            fontSize: "15",
          },
        },
        yAxis: {
          // minInterval: 0,
          // min: 5,
          type: "value",
          name: "数量",
          axisLine: {
            lineStyle: { color: "white" },
          },
          nameTextStyle: {
            color: "white",
            fontSize: "18",
          },
          axisLabel: {
            color: "white",
            fontSize: "15",
          },
        },
        // grid: {
        //   right: "0%",
        // },
        series: [
          {
            data: ydata,
            type: "line",
            lineStyle: {
              color: "rgb(27,184,108)", //改变折线颜色
            },
          },
        ],
      });

      // barChart("deviceVideo", ["在线", "不在线"]);
      return;
    }
    const { data } = await AllApi.getCountByStcd({
      type: this.props.device.type,
      stcd: this.state.currentSite.stcd,
      startTime: moment(startTime || this.state.chartStartTM).format(
        "YYYY-MM-DD 00:00:00"
      ),
      endTime: moment(endTime || this.state.chartEndTM).format(
        "YYYY-MM-DD 23:00:00"
      ),
    });
    let xdata = [];
    let ydata = [];
    var myChart = echarts.init(
      document.getElementById(`site-count-chart-${this.props.device.type}`)
    );
    data.forEach((item) => {
      xdata.push(item.tm.slice(5, 10));
      ydata.push(Number(item.number));
    });
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "line", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        show: true,
        borderColor: "white",
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     // dataView: { show: true, readOnly: true },
      //     magicType: { show: true, type: ["line", "bar"] },
      //     restore: { show: true },
      //     saveAsImage: { show: true },
      //   },
      // },
      xAxis: {
        boundaryGap: false,
        type: "category",
        data: xdata,
        name: "时间",
        axisLine: {
          lineStyle: { color: "white" },
        },
        nameTextStyle: {
          color: "white",
          fontSize: "18",
        },
        axisLabel: {
          color: "white",
          fontSize: "15",
        },
      },
      yAxis: {
        minInterval: 1,
        min: 5,
        type: "value",
        name: "数量",
        axisLine: {
          lineStyle: { color: "white" },
        },
        nameTextStyle: {
          color: "white",
          fontSize: "18",
        },
        axisLabel: {
          color: "white",
          fontSize: "15",
        },
      },
      // grid: {
      //   right: "0%",
      // },
      series: [
        {
          data: ydata,
          type: "line",
          lineStyle: {
            color: "rgb(27,184,108)", //改变折线颜色
          },
        },
      ],
    });
  }

  async getUserInfo() {
    const { data: userdata } = await AllApi.getUserInfoByToken({
      token: localStorage.getItem("token"),
    });
    this.setState({ userinfo: userdata });
  }

  async handleImportDevice(tg) {
    if (tg.files.length === 0) return;
    this.setState({ showLoading: true });
    const formData = new FormData();
    formData.append("uploadFile", tg.files[0]);
    const rs = await fetch(
      `${URLDefine}/base/SiteDevice/import?relTypeCode=${
        this.props.device.type
      }&relTypeId=${
        this.state.currentSite.key
          ? this.state.currentSite.key
          : this.state.currentSite.radioID
      }&relTypeNmae=${this.props.device.name}`,
      {
        method: "post",
        credentials: "include",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: formData,
      }
    ).then((rs) => rs.json());
    if (rs.code === 200) {
      message.success(rs.data);
    } else {
      message.error(rs.msg);
    }
    tg.value = null;
    this.setState({ showLoading: false, deviceTablePage: 1 });
    this.getDeviceData();
  }

  handleExportDevice() {
    this.downloadFile(
      "/base/SiteDevice/export",
      {
        relTypeCode: this.props.device.type,
        relTypeId: this.state.currentSite.key,
        size: -1,
        current: 1,
        name: this.state.deviceTableSearchName,
      },
      `device.xlsx`
    );
  }
  handleExportDeviceRepair() {
    this.downloadFile(
      "/base/SiteDevice/export",
      {
        relTypeCode: this.props.device.type,
        relTypeId: this.state.currentSite.key,
        size: 10,
        current: 1,
      },
      `device-repair-${moment(new Date()).format("YYYY-MM-DD")}.xlsx`
    );
  }
  downloadFile(url, params, filename) {
    fetch(`${URLDefine}${url}`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        TOKEN: localStorage.getItem("token"),
      },
      body: JSON.stringify(params),
    })
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      });
  }

  async handleRepair(record) {
    if (!this.state.userinfo) {
      await this.getUserInfo();
    }
    this.repairFormRef.current.setFieldsValue({
      siteDeviceId: record.siteDeviceId,
      repairUserName: this.state.userinfo.realname,
      repairTime: moment(new Date()),
    });
    this.setState({ repairFormVisible: true });
  }

  async handleChange(record) {
    if (!this.state.userinfo) {
      await this.getUserInfo();
    }
    this.changeFormRef.current.setFieldsValue(
      Object.assign({}, record, {
        produceTime: moment(record.produceTime),
        repairUserName: this.state.userinfo.realname,
        repairTime: moment(new Date()),
      })
    );
    this.setState({ changeFormVisible: true });
  }

  handleRemove(record) {
    Modal.confirm({
      title: "拆除设备",
      content: <p>确认要拆除当前选择的设备？</p>,
      onOk: async () => {
        this.setState({ showLoading: true });
        try {
          await AllApi.deleteSiteDevice(record.siteDeviceId);
          this.getDeviceData();
        } catch (e) {
          console.error(e);
        }
        this.setState({ showLoading: false });
      },
    });
  }

  async handleAddFormSave(item) {
    const { device } = this.props;
    const { currentSite } = this.state;
    if (item.produceTime) {
      item.produceTime = moment(item.produceTime).format("YYYY-MM-DD HH:mm:ss");
    }
    if (item.createTime) {
      item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
    }
    await AllApi.saveSiteDevice(
      Object.assign({}, item, {
        relTypeCode: device.type,
        relTypeId: currentSite.key,
        relTypeNmae: device.name,
      })
    );
    this.addFormRef.current.resetFields();
    this.setState({ addFormVisible: false });
    this.getDeviceData();
  }

  async handleRepairFormSave(item) {
    if (item.repairTime) {
      item.repairTime = moment(item.repairTime).format("YYYY-MM-DD HH:mm:ss");
    }
    await AllApi.saveSiteDeviceRepair(item);
    this.repairFormRef.current.resetFields();
    this.setState({ repairFormVisible: false });
    this.getDeviceRepairData();
  }

  async handleChangeFormSave(item) {
    if (item.produceTime) {
      item.produceTime = moment(item.produceTime).format("YYYY-MM-DD HH:mm:ss");
    }
    if (item.repairTime) {
      item.repairTime = moment(item.repairTime).format("YYYY-MM-DD HH:mm:ss");
    }
    await AllApi.updateSiteDevice(item);
    this.changeFormRef.current.resetFields();
    this.setState({ changeFormVisible: false });
    this.getDeviceData();
    this.getDeviceRepairData();
  }
  componentDidUpdate(pre) {
    if (this.props.tabKey) {
      console.log(this.props.tabKey, "this.props.tabKey");
      // this.componentDidMount();
      // this.render();
    }
  }
  render() {
    const {
      showLoading,
      deviceTablePage,
      deviceTableTotal,
      repairTablePage,
      repairTableTotal,
      treeDefaultStatus,
      treeData,
      deviceList,
      repairList,
      addFormVisible,
      repairFormVisible,
      changeFormVisible,
    } = this.state;

    return (
      <Spin spinning={showLoading}>
        <div className="device-manage">
          <div className="device-manage-content">
            <div className="device-manage-content-left">
              {treeData ? (
                <Tabs className="device-tabs" type="card">
                  {treeData.map((node) => (
                    <TabPane tab={node.title} key={node.key}>
                      {console.log(node.children, "node.children")}
                      <TableShow
                        scroll={{ y: 330 }}
                        bordered
                        pageSize={999}
                        dataSource={node.children}
                        pagination={false}
                        onRow={(record) => {
                          return {
                            onClick: () => {
                              record = {
                                ...record,
                                key: record.key ? record.key : record.radioID,
                              };
                              this.handleTreeSelect({ node: record });
                              this.setState({
                                chartStartTM: moment(
                                  Date.now() - 6 * 24 * 60 * 60 * 1000
                                ),
                                chartEndTM: moment(Date.now()),
                              });
                            },
                          };
                        }}
                        columns={[
                          {
                            align: "center",
                            name: "站点名称",
                            dataIndex: "title",
                            filter: "name",
                            render: (text, row) => (
                              <Popover content={text.toString()} title="全称">
                                {text.toString().length > 9
                                  ? text.toString().substring(0, 9) + "..."
                                  : text.toString()}
                              </Popover>
                            ),
                          },

                          {
                            align: "center",
                            name: "位置",
                            dataIndex: "",
                            width: 200,
                            render: (text) => {
                              let stlc = text.stlc || text.address;
                              return stlc ? (
                                <Popover content={stlc.toString()} title="全称">
                                  {stlc.toString().length > 13
                                    ? stlc.toString().substring(0, 13) + "..."
                                    : stlc.toString()}
                                </Popover>
                              ) : (
                                "-"
                              );
                            },
                          },
                          {
                            align: "center",
                            name: "管理单位",
                            dataIndex: "siteDictionariesID",
                            width: 170,
                            render: (text, row) => (
                              <>{this.props.dict[text] || "-"}</>
                            ),
                          },
                          {
                            align: "center",
                            name: "维护时间",
                            dataIndex: "repairTime",
                            width: 100,
                            render: (text, row) => (
                              <>{(text && text.split(" ")[0]) || "-"}</>
                            ),
                          },
                        ]}
                        rowClassName={(record) => {
                          return this.state.currentSite.title === record.title
                            ? "primary-row"
                            : "";
                        }}
                      />
                    </TabPane>
                  ))}
                </Tabs>
              ) : (
                "加载中......"
              )}
            </div>

            <div className="device-manage-content-right">
              <div className="device-manage-content-right-title">
                设备列表
                <Space
                  size="middle"
                  className="device-manage-content-right-title-sub"
                >
                  <Button
                    onClick={() => this.setState({ addFormVisible: true })}
                  >
                    新增设备
                  </Button>
                  <Button>
                    导入数据
                    <input
                      type="file"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      className="upload"
                      onChange={(e) => {
                        this.handleImportDevice(e.target);
                      }}
                    />
                  </Button>
                  <Button onClick={() => this.handleExportDevice()}>
                    导出数据
                  </Button>
                </Space>
              </div>
              <Table
                bordered
                dataSource={deviceList}
                pagination={{
                  current: deviceTablePage,
                  total: deviceTableTotal,
                  showSizeChanger: false,
                  pageSize,
                  onChange: (page) => {
                    this.setState({ deviceTablePage: page }, () => {
                      this.getDeviceData();
                    });
                  },
                }}
                columns={[
                  {
                    align: "center",
                    title: "设备名称",
                    dataIndex: "name",
                  },
                  {
                    align: "center",
                    title: "设备编号",
                    dataIndex: "no",
                  },
                  {
                    align: "center",
                    title: "厂家",
                    dataIndex: "factory",
                  },
                  {
                    align: "center",
                    title: "型号",
                    dataIndex: "specs",
                  },
                  {
                    align: "center",
                    title: "生产日期",
                    dataIndex: "produceTime",
                  },
                  {
                    align: "center",
                    title: "安装时间",
                    dataIndex: "createTime",
                    render: (e) => {
                      return e.slice(0, -9);
                    },
                  },
                  {
                    align: "center",
                    title: "操作",
                    dataIndex: "g",
                    render: (text, record) => (
                      <Space className="device-edit-button">
                        <a onClick={() => this.handleRepair(record)}>维护</a>
                        <a onClick={() => this.handleChange(record)}>更换</a>
                        <a onClick={() => this.handleRemove(record)}>拆除</a>
                      </Space>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="device-manage-content">
            <div className="device-manage-content-left">
              <div className="device-manage-content-left-title">
                {this.props.device.type == 4
                  ? `${this.state.currentSite.title}站在线走势图`
                  : `${this.state.currentSite.title}站数据走势图`}
              </div>
              <div className="device-manage-content-left-title">
                <RangePicker
                  format="YYYY-MM-DD"
                  value={[this.state.chartStartTM, this.state.chartEndTM]}
                  onChange={(range) => {
                    this.setState({
                      chartStartTM: range[0],
                      chartEndTM: range[1],
                    });
                    this.buildSiteCountChart(range);
                  }}
                />
              </div>
              {this.props.device.type == 4 ? (
                <div className="site-count-chart" id="deviceVideo"></div>
              ) : (
                <div
                  className="site-count-chart"
                  id={`site-count-chart-${this.props.device.type}`}
                ></div>
              )}
            </div>
            <div
              className="device-manage-content-right"
              style={{ minHeight: "436px" }}
            >
              <div className="device-manage-content-right-title">
                维修记录
                <Button
                  className="device-manage-content-right-title-sub"
                  onClick={() => this.handleExportDeviceRepair()}
                >
                  导出数据
                </Button>
              </div>
              <Table
                bordered
                dataSource={repairList}
                pagination={{
                  current: repairTablePage,
                  total: repairTableTotal,
                  showSizeChanger: false,
                  pageSize,
                  onChange: (page) => {
                    this.setState({ repairTablePage: page }, () => {
                      this.getDeviceRepairData();
                    });
                  },
                }}
                columns={[
                  {
                    align: "center",
                    title: "设备名称",
                    dataIndex: "deviceName",
                  },
                  {
                    align: "center",
                    title: "设备编号",
                    dataIndex: "deviceNo",
                  },
                  {
                    align: "center",
                    title: "说明",
                    dataIndex: "remarks",
                  },
                  {
                    align: "center",
                    title: "维护人",
                    dataIndex: "repairUserName",
                  },
                  {
                    align: "center",
                    title: "维护时间",
                    dataIndex: "repairTime",
                    render: (e) => e.split(" ")[0],
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <Modal
          centered
          forceRender
          title="设备信息"
          visible={addFormVisible}
          footer={null}
          onCancel={() => this.setState({ addFormVisible: false })}
        >
          <DYForm
            showCancel
            formItem={[
              {
                label: "设备名称",
                name: "name",
                rules: [{ required: true }],
                ele: <Input></Input>,
              },
              {
                label: "设备编号",
                name: "no",
                ele: <Input></Input>,
              },
              {
                label: "规格型号",
                name: "specs",
                ele: <Input></Input>,
              },
              {
                label: "生产厂家",
                name: "factory",
                ele: <Input></Input>,
              },
              {
                label: "生产日期",
                name: "produceTime",
                ele: <DatePicker></DatePicker>,
              },
              {
                label: "安装时间",
                name: "createTime",
                ele: <DatePicker></DatePicker>,
              },
            ]}
            formRef={this.addFormRef}
            onFinish={(values) => this.handleAddFormSave(values)}
            cancelClick={() => this.setState({ addFormVisible: false })}
          ></DYForm>
        </Modal>
        <Modal
          centered
          forceRender
          title="维修设备"
          visible={repairFormVisible}
          footer={null}
          onCancel={() => this.setState({ repairFormVisible: false })}
        >
          <DYForm
            showCancel
            formItem={[
              {
                label: "维护人员",
                name: "repairUserName",
                ele: <Input></Input>,
              },
              {
                label: "维护日期",
                name: "repairTime",
                ele: <DatePicker></DatePicker>,
              },
              {
                label: "维修情况说明",
                name: "remarks",
                rules: [{ required: true }],
                ele: <TextArea rows={4} />,
              },
              {
                label: "设备id",
                name: "siteDeviceId",
                style: { display: "none" },
                ele: <Input disabled></Input>,
              },
            ]}
            formRef={this.repairFormRef}
            onFinish={(values) => this.handleRepairFormSave(values)}
            cancelClick={() => this.setState({ repairFormVisible: false })}
          ></DYForm>
        </Modal>
        <Modal
          centered
          forceRender
          title="更换设备"
          visible={changeFormVisible}
          footer={null}
          onCancel={() => this.setState({ changeFormVisible: false })}
        >
          <DYForm
            showCancel
            formItem={[
              {
                label: "设备名称",
                name: "name",
                rules: [{ required: true }],
                ele: <Input></Input>,
              },
              {
                label: "设备编号",
                name: "no",
                ele: <Input></Input>,
              },
              {
                label: "规格型号",
                name: "specs",
                ele: <Input></Input>,
              },
              {
                label: "生产厂家",
                name: "factory",
                ele: <Input></Input>,
              },
              {
                label: "生产日期",
                name: "produceTime",
                ele: <DatePicker></DatePicker>,
              },
              {
                label: "维护人员",
                name: "repairUserName",
                ele: <Input></Input>,
              },
              {
                label: "更换时间",
                name: "repairTime",
                ele: <DatePicker></DatePicker>,
              },
              {
                label: "情况说明",
                name: "remarks",
                ele: <TextArea rows={4} />,
              },
              {
                label: "设备id",
                name: "siteDeviceId",
                style: { display: "none" },
                ele: <Input disabled></Input>,
              },
            ]}
            formRef={this.changeFormRef}
            onFinish={(values) => this.handleChangeFormSave(values)}
            cancelClick={() => this.setState({ changeFormVisible: false })}
          ></DYForm>
        </Modal>
      </Spin>
    );
  }
}
function mapStateToProps(state) {
  return {
    dict: state.currency.dict,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceManageFlood);
