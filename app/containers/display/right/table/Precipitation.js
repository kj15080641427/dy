/**
 * Precipitation 2020-07-08
 */
import React from "react";
import "./style.scss";
import emitter from "@app/utils/emitter.js";
import moment from "moment";
import { Pagination } from "antd";
import { ScrollBoard, Loading } from "@jiaminghi/data-view-react";

class Precipitation extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { dict, rowNum } = this.props;
    let data = this.props.dataSource;
    // console.log(data, "DATA");
    let elements = [];
    for (let i = 0; i < data.length; i++) {
      elements.push(
        // <tr key={i}>
        //     <td style={{ width: 210 }}>{data[i].name + "(" + data[i].dataSourceDesc + ")"}</td>
        /* <td style={{ width: 80 }}>{(data[i].minuteAvg * 1).toFixed(1)}</td> */
        /* <td>{(data[i].hourAvg * 1).toFixed(1)}</td>
                <td>{(data[i].dayAvg * 1).toFixed(1)}</td>
                <td>{data[i].tm === null ? "--" : moment(data[i].tm).format("MM-DD HH:mm")}</td>
            </tr> */
        [
          "<span style='font-size:19px; '>" +
            data[i].name +
            "(" +
            (data[i].siteRain && data[i]?.siteRain[0]
              ? dict[data[i]?.siteRain[0]?.siteDictionariesID]
              : "-") +
            ")</span>",
          "<span style='font-size:19px; '>" +
            (data[i]?.raindataList && data[i]?.raindataList[0]
              ? data[i]?.raindataList[0]?.hourDrp * 1
              : "--") +
            // (data[i]?.raindataList[0]?.hourAvg * 1).toFixed(1) +
            "</span>",
          "<span style='font-size:19px; '>" +
            (data[i]?.raindataList && data[i]?.raindataList[0]
              ? data[i]?.raindataList[0]?.dayDrp * 1
              : "--") +
            "</span>",
          "<span style='font-size:19px; '>" +
            (data[i].raindataList && data[i].raindataList[0]
              ? moment(data[i].raindataList[0].tm).format("MM-DD HH:mm")
              : "--") +
            "</span>",
        ]
      );
    }
    const config = {
      header: [
        '<span style="width: 210px;font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">站名(来源)</span>',
        '<span style="font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">1小时</span>',
        '<span style="font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">24小时</span>',
        '<span style="font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">更新时间</span>',
      ],
      data: elements,
      headerBGC: "#123ead42",
      oddRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      evenRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      rowNum: rowNum || 6,
      columnWidth: [210, 100, 120, 140],
      headerHeight: 50,
      align: ["left", "center", "center", "center"],
    };
    return (
      <div>
        <div className="table-wrapper">
          {this.props.lod ? (
            <Loading className="loadingTop-loading-div">
              <span style={{ color: "#fff" }}>Loading...</span>
            </Loading>
          ) : (
            <ScrollBoard
              config={config}
              className="table-wrapper-table-water"
            />
          )}

          {/* <table className="fl-table">
                        <thead>
                            <tr>
                                <th style={{ width: 210 }}>站名(来源)</th> */}
          {/* <th style={{ width: 80 }}>5分钟</th> */}
          {/* <th >1小时</th>
                                <th >24小时</th>
                                <th>更新时间</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: 300 }}>
                            {elements}
                        </tbody> */}
          {/* <Pagination></Pagination> */}
          {/* </table> */}
        </div>
      </div>
    );
  }

  componentDidMount() {}
}
export default Precipitation;
