import React from "react";
import RouterList from "../../components/routerLiis";
import "./style.scss";
import Head from "./head/Head";
import { Table, Space, Button, DatePicker } from "antd";
import {
  getSiteWaterLevelsPage,
  getRiverwaterdata,
  getRiverwaterdatalog,
} from "@app/data/home";
import echarts from "echarts/lib/echarts";
import "echarts";
import moment from "moment";
export default class yellowRiver extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      siteData: [],
      tableData: [],
      selectedSite: {},
      tm: moment(new Date()),
      newestTM: "-",
    };
  }
  async componentDidMount() {
    const {
      data: { records: siteData },
    } = await getSiteWaterLevelsPage({
      current: 0,
      siteDictionariesID: 22,
      size: -1,
    });
    siteData.map((td) => {
      td.key = td.siteWaterLevelsID;
    });
    this.setState({ siteData, selectedSite: siteData[3] }, () => {
      this.buildTableData();
    });
  }

  async buildTableData() {
    const { siteData, tm } = this.state;
    const {
      data: { records: riverwaterdata },
    } = await getRiverwaterdata({
      current: 0,
      stcd: siteData.map((td) => td.stcd).join(","),
      size: -1,
      starttm: moment(Number(tm) - 7 * 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD 00:00:00"
      ),
      endtm: moment(tm).format("YYYY-MM-DD 23:59:59"),
    });
    siteData.map((td) => {
      const item = riverwaterdata.find((rwd) => rwd.stcd == td.stcd) || {};
      td.sw = item.z || "-";
      td.ll = item.q || "-";
    });
    this.setState(
      {
        tableData: siteData,
        newestTM: riverwaterdata[0]
          ? moment(riverwaterdata[0].tm).format("YYYY-MM-DD HH:mm")
          : "----------",
      },
      () => {
        this.buildChartData();
      }
    );
  }

  async buildChartData() {
    const { selectedSite, tm } = this.state;
    const tmRange = {
      starttm: moment(Number(tm) - 7 * 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD 00:00:00"
      ),
      endtm: moment(tm).format("YYYY-MM-DD 23:59:59"),
    };
    const {
      data: { records: riverwaterdatalog },
    } = await getRiverwaterdatalog({
      current: 0,
      stcd: selectedSite.stcd,
      size: -1,
      starttm: moment(Number(tm) - 7 * 24 * 60 * 60 * 1000).format(
        "YYYY-MM-DD 00:00:00"
      ),
      endtm: moment(tm).format("YYYY-MM-DD 23:59:59"),
    });
    const sortData = riverwaterdatalog.sort(
      (a, b) => Date.parse(a.tm) - Date.parse(b.tm)
    );
    const xData = sortData.map((rwdl) => moment(rwdl.tm).format("YYYY-MM-DD"));
    const titleDesc = `${moment(Number(tm) - 7 * 24 * 60 * 60 * 1000).format(
      "YYYY-MM-DD"
    )} ~ ${moment(tm).format("YYYY-MM-DD")}`;
    this.initLineChart(
      "siteWater",
      xData,
      sortData.map((rwdl) => rwdl.z),
      "七日水位走势图",
      titleDesc
    );
    this.initLineChart(
      "siteFlow",
      xData,
      sortData.map((rwdl) => rwdl.q),
      "七日流量走势图",
      titleDesc
    );
  }

  initLineChart(domId, xdata, ydata, title, titleDesc) {
    let myChartcount = echarts.init(document.getElementById(domId));
    let option = {
      title: {
        text: title,
        subtext: titleDesc,
        left: "center",
      },
      grid: {
        right: "0%",
      },
      xAxis: {
        type: "category",
        show: true,
        data: xdata,
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          color: "green",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      series: [
        {
          data: ydata || [],
          type: "line",
          color: "rgb(30,182,107)",
        },
      ],
    };
    myChartcount.setOption(option);
  }

  render() {
    return (
      <div className="flood-river">
        <div className="flood-noyices-top"></div>
        <Head></Head>
        <RouterList></RouterList>
        <div className="m-left-notices">
          <div className="m-left-notices-table">
            <div className="m-left-notices-table-params">
              <Space size="middle">
                <labe>{this.state.newestTM}</labe>
                <labe>水情日报</labe>
                <labe>
                  查询时间：
                  <DatePicker
                    allowClear={false}
                    defaultValue={this.state.tm}
                    format={"YYYY-MM-DD"}
                    style={{ width: 200 }}
                    onChange={(tm) => this.setState({ tm })}
                  />
                </labe>
                <Button type="primary" onClick={() => this.buildTableData()}>
                  查询
                </Button>
              </Space>
            </div>
            <div>
              <Table
                bordered
                dataSource={this.state.tableData}
                pagination={false}
                columns={[
                  // {
                  //   align: "center",
                  //   title: "河名",
                  //   dataIndex: "rvnm",
                  // },
                  {
                    align: "center",
                    title: "站名",
                    dataIndex: "name",
                    render: (text, row) => (
                      <a
                        onClick={() =>
                          this.setState({ selectedSite: row }, () =>
                            this.buildChartData()
                          )
                        }
                      >
                        {text}
                      </a>
                    ),
                  },
                  {
                    align: "center",
                    title: "水位(m)",
                    dataIndex: "sw",
                  },
                  {
                    align: "center",
                    title: "流量(m³/s)",
                    dataIndex: "ll",
                  },
                ]}
                rowClassName={(record) => {
                  return this.state.selectedSite.name === record.name
                    ? "primary-row"
                    : "";
                }}
              />
            </div>
          </div>
          <div className="m-left-notices-chart">
            <div className="rain-online" id="siteWater"></div>
            <div className="rain-online" id="siteFlow"></div>
          </div>
        </div>
      </div>
    );
  }
}
