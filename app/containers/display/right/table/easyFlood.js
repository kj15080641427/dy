/**
 * easyFlood 2020-07-08
 */
import React from "react";
import "./style.scss";
import emitter from "@app/utils/emitter.js";
import moment from "moment";
import { Pagination } from "antd";
import { ScrollBoard, Loading } from "@jiaminghi/data-view-react";
class easyFlood extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const { dict, rowNum } = this.props;
    let data = this.props.dataSource;
    let elements = [];
    for (let i = 0; i < data.length; i++) {
      // elements.push(
      //     <tr key={i}>
      //         <td style={{ width: 200 }}>{data[i].name + "(" + data[i].dataSourceDesc + ")"}</td>
      //         <td>{(data[i].z * 1).toFixed(2)}</td>
      //         <td>{data[i].ztm === null ? "--" : moment(data[i].ztm).format("MM-DD HH:mm")}</td>
      //     </tr>
      // )
      elements.push([
        `<span style='font-size:19px; '>
          ${data[i].name} 
          (
          ${
            data[i].siteWaterPoints && data[i].siteWaterPoints[0]
              ? dict[data[i].siteWaterPoints[0].siteDictionariesID]
              : ""
          } 
          )</span>`,
        "<span style='font-size:19px; '>" +
          (data[i]?.riverwaterdataList && data[i]?.riverwaterdataList[0]
            ? (data[i]?.riverwaterdataList[0]?.z * 10).toFixed(2)
            : "--") +
          "</span>",
        "<span style='font-size:19px; '>" +
          (data[i].riverwaterdataList && data[i].riverwaterdataList[0]
            ? moment(data[i].riverwaterdataList[0].tm).format("MM-DD HH:mm")
            : "--") +
          "</span>",
      ]);
    }
    const config = {
      header: [
        '<span style="width: 210px;font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">站名(来源)</span>',
        '<span style="font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">水深</span>',
        '<span style="font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">更新时间</span>',
      ],
      data: elements,
      headerBGC: "#123ead42",
      oddRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      evenRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      rowNum: rowNum || 6,
      columnWidth: [300, 120, 140],
      headerHeight: 50,
      align: ["left", "center", "center"],
    };
    return (
      <div>
        <div className="table-wrapper">
          {this.props.lod ? (
            <Loading
              style={{
                position: "relative",
                top: "110px",
              }}
            >
              <span style={{ color: "#fff" }}>Loading...</span>
            </Loading>
          ) : (
            <ScrollBoard
              config={config}
              className="table-wrapper-flood-height"
            />
          )}

          {/* <table className="fl-table">
                        <thead>
                            <tr>
                                <th style={{ width: 200 }}>站名(来源)</th>
                                <th>水深</th>
                                <th>更新时间</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: 300 }}>
                            {elements}
                        </tbody>
                    </table> */}
        </div>
      </div>
    );
  }

  componentDidMount() {}
}
export default easyFlood;
