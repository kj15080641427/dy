/**
 * rain 2020-06-7
 * zdl
 * 雨情信息
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/home";
import PropTypes from "prop-types";
import initecharts from "./echarts";
import { Input } from "antd";
import ReadonlyTable from "../readOnlyTable";
import moment from "moment";
import { getBasicsAll } from "@app/data/request";

const columns = [
  {
    title: "站名",
    dataIndex: "name",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "数据来源",
    dataIndex: "dataSourceDesc",
    render: (value) => value || "-",
  },
  {
    title: "地址",
    ellipsis: true,
    dataIndex: "address",
    render: (value) => value || "-",
  },
  {
    title: "流域",
    ellipsis: true,
    dataIndex: "flowarea",
    render: (value) => value || "-",
  },
  {
    title: "河流名称",
    ellipsis: true,
    dataIndex: "rivername",
    render: (value) => value || "-",
  },
  {
    title: "纬度",
    dataIndex: "lat",
    render: (value) => value || "-",
  },
  {
    title: "经度",
    dataIndex: "lon",
    render: (value) => value || "-",
  },
  {
    title: "水位(m)",
    dataIndex: "riverwaterdataList",
    className: "column-money",
    render: (value) => {
      return value && value[0] ? value[0].z.toFixed(2) : "-";
    },
    // sorter: (a, b) => a.z - b.z,
  },
  {
    title: "警戒水位(m)",
    dataIndex: "siteWaterLevels",
    className: "column-money",
    render: (value) => {
      return value && value[0] ? (value[0].warning * 1).toFixed(2) : "-";
    },
    // sorter: (a, b) => a.warning - b.warning,
  },
  {
    title: "更新时间",
    dataIndex: "riverwaterdataList",
    className: "column-money",
    render: (value) =>
      value && value[0] ? moment(value[0]?.tm).format("YYYY-MM-DD HH:mm") : "-",
  },
  {
    title: "更新状态",
    dataIndex: "riverwaterdataList",
    className: "column-money",
    render: (value) => {
      if (value && value[0]) {
        let startdata = new Date().getTime();
        let date = new Date(value[0].tm).getTime();
        if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
          return <a style={{ color: "orange" }}>三天前</a>;
        } else {
          return <a>最近更新</a>;
        }
      } else {
        return <a>离线</a>;
      }
    },
  },
];
const rowSelect = [
  { label: "站点名称", name: "name", element: <Input></Input> },
];
const Water = (props) => {
  const { watercount, readOnlyData } = props;
  //来源图
  const waterSoure = () => {
    let nameArr = [];
    let data = [];
    watercount?.list?.map((item) => {
      nameArr.push(item.dataSourceDesc || "暂无数据");
      data.push({
        name: item.dataSourceDesc || "暂无数据",
        value: item.number,
      });
    });
    initecharts("watercount", "水位站点来源统计图", nameArr, data);
  };
  //在线图
  const waterOnline = () => {
    let okcount = 0;
    let nocount = 0;
    let thday = 0;
    let startdata = new Date().getTime();
    readOnlyData?.map((item) => {
      if (item.riverwaterdataList && item.riverwaterdataList[0]) {
        if (
          startdata - new Date(item?.riverwaterdataList[0].tm).getTime() >=
          1000 * 60 * 60 * 24 * 3
        ) {
          thday++;
        } else {
          okcount++;
        }
      } else {
        nocount++;
      }
    });
    initecharts(
      "waterisOnline",
      "水位站点在线统计图",
      ["最近更新", "三天前", "离线"],
      [
        {
          value: okcount,
          name: "最近更新",
        },
        {
          value: thday,
          name: "三天前",
        },
        {
          value: nocount,
          name: "离线",
        },
      ]
    );
  };

  let element = [];
  watercount?.list?.map((item) => {
    element.push(
      <>
        <a>
          {item.dataSourceDesc || "数据为空"}共计：{item.number}个
        </a>
        &nbsp;
      </>
    );
  });
  useEffect(() => {
    waterSoure();
  }, [watercount]);
  useEffect(() => {
    waterOnline();
  }, [readOnlyData]);
  return (
    <>
      <div className="div-left-echarts">
        <div className="echarts-isOnline" id="waterisOnline"></div>
        <div className="echarts-count" id="watercount"></div>
      </div>
      <ReadonlyTable
        getAll
        get={getBasicsAll}
        type={{ type: 2 }}
        columns={columns}
        rowSelect={rowSelect}
        rowKey={"siteBaseID"}
        footer={() => (
          <>
            <a>雨量站共计：{watercount?.number}个</a>&nbsp;其中：&nbsp;
            {element}
          </>
        )}
      />
    </>
  );
};

Water.propTypes = {
  readOnlyData: PropTypes.array,
  watercount: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    readOnlyData: state.management.readOnlyData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Water);
