/**
 * Water 2020-07-08
 */
import React from "react";
import "./style.scss";
import emitter from "@app/utils/emitter.js";
import moment from "moment";
import { Pagination } from "antd";
import { ScrollBoard, Loading } from "@jiaminghi/data-view-react";
class Water extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    let data = this.props.dataSource;
    const { dict } = this.props;
    let elements = [];
    for (let i = 0; i < data.length; i++) {
      // elements.push(
      //     <tr key={i}>
      //         <td style={{ width: 200 }}>{data[i].name + "(" + data[i].dataSourceDesc + ")"}</td>
      //         <td>{(data[i].z * 1).toFixed(2)}</td>
      //         <td>{data[i].warning === 99 ? "--" : data[i].warning}</td>
      //         <td>{data[i].ztm === null ? "--" : moment(data[i].ztm).format("MM-DD HH:mm")}</td>
      //     </tr>
      // )
      //   data = {
      //     ...data[i],
      //     ...(data[i].riverwaterdataList && data[i].riverwaterdataList[0]),
      //   };
      let name = `${data[i]?.name}  ( ${
        data[i].siteWaterLevels && data[i]?.siteWaterLevels[0]
          ? dict[data[i]?.siteWaterLevels[0]?.siteDictionariesID]
          : ""
      } )`;
      let z = data[i]?.riverwaterdataList[0]?.z || "--";
      let warning =
        data[i].siteWaterLevels[0]?.warning === 99
          ? "--"
          : data[i]?.siteWaterLevels[0]?.warning;
      let time =
        data[i].ztm === null ? "--" : moment(data[i].ztm).format("MM-DD HH:mm");
      if (z - warning > 0 && warning !== "--") {
        elements.push([
          "<span style='font-size:19px; color:#fb7293;'>" + name + "</span>",
          "<span style='font-size:19px; color:#fb7293;'>" + z + "</span>",
          "<span style='font-size:19px; color:#fb7293;'>" + warning + "</span>",
          "<span style='font-size:19px; color:#fb7293;'>" + time + "</span>",
        ]);
      } else {
        elements.push([
          "<span style='font-size:19px; '>" + name + "</span>",
          "<span style='font-size:19px; '>" + z + "</span>",
          "<span style='font-size:19px; '>" + warning + "</span>",
          "<span style='font-size:19px; '>" + time + "</span>",
        ]);
      }
    }
    const config = {
      header: [
        '<span style="width: 210px;font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">站名(来源)</span>',
        '<span style="width: 140px;font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">水位</span>',
        '<span style="width: 210px;font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">警戒水位</span>',
        '<span style="width: 210px;font-size:21px;padding: 8px;letter-spacing: 1px;font-weight: bold;">更新时间</span>',
      ],
      data: elements,
      headerBGC: "#123ead42",
      oddRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      evenRowBGC: "0px 35px 50px rgba(0, 0, 0, 0)",
      rowNum: 6,
      columnWidth: [210, 120, 140, 140],
      headerHeight: 50,
      align: ["left", "center", "center", "center"],
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
              style={{ width: "100%", height: "350px", fontSize: 18 }}
            />
          )}

          {/* <table className="fl-table">
                        <thead>
                            <tr>
                                <th style={{ width: 200 }}>站名(来源)</th>
                                <th>水位(m)</th>
                                <th>警戒水位(m)</th>
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
export default Water;
