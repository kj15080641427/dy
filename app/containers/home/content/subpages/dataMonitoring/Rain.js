/**
 * rain 2020-09-3 kj
 * zdl
 * 雨情信息
 */
import React, { useEffect } from "react";
import ReadonlyTable from "../readOnlyTable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/home";
import PropTypes from "prop-types";
import { Input, Row } from "antd";
import initecharts from "./echarts";
import moment from "moment";
import { getBasicsAll } from "@app/data/request";

const rowSelect = [
  { label: "站点名称", name: "name", element: <Input></Input> },
];
const columns = [
  {
    title: "站名",
    dataIndex: "name",
    ellipsis: true,
    className: "column-money",
    key: "riverwaterdataID",
    render: (value) => value || "-",
  },
  {
    title: "数据来源",
    width: 110,
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
    title: "流域名称",
    dataIndex: "siteRain",
    render: (value) => {
      return value ? value[0].bsnm : "-";
    },
  },
  {
    title: "河流名称",
    dataIndex: "siteRain",
    render: (value) => {
      return value ? value[0].rvnm : "-";
    },
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
    title: "雨量(mm)",
    dataIndex: "minuteAvg",
    width: 140,
    className: "column-money",
    render: (minuteAvg) =>
      minuteAvg == "-" ? "-" : (minuteAvg * 1).toFixed(1),
    sorter: (a, b) => a.minuteAvg - b.minuteAvg,
  },
  {
    title: "更新时间",
    dataIndex: "tm",
    width: 160,
    className: "column-money",
    sorter: (a, b) => new Date(b.tm).getTime() - new Date(a.tm).getTime(),
    render: (value) => (value ? "-" : moment(value).format("YYYY-MM-DD HH:mm")),
  },
  {
    title: "更新状态",
    dataIndex: "tm",
    width: 160,
    className: "column-money",
    render: (value) => {
      let startdata = new Date().getTime();
      let date = new Date(value).getTime();
      if (!value) {
        return <a style={{ color: "red" }}>离线</a>;
      } else if (startdata - date >= 1000 * 60 * 60 * 24 * 3) {
        return <a style={{ color: "orange" }}>三天前</a>;
      } else {
        return <a>最近更新</a>;
      }
    },
  },
];

const Rain = (props) => {
  const { raincount, readOnlyData } = props;

  //获取雨量站点来源
  const selectRainSource = () => {
    let nameArr = [];
    let data = [];
    raincount?.list?.map((item) => {
      nameArr.push(item.dataSourceDesc ? item.dataSourceDesc : "暂无数据");
      data.push({
        name: item.dataSourceDesc ? item.dataSourceDesc : "暂无数据",
        value: item.number,
      });
    });

    initecharts("raincount", "雨量站点来源统计图", nameArr, data);
  };
  const onlineSite = () => {
    let okcount = 0;
    let nocount = 0;
    let thday = 0;
    let startdata = new Date().getTime();
    readOnlyData.map((item) => {
      if (!item.tm) {
        nocount++;
      }
      if (startdata - new Date(item.tm).getTime() >= 1000 * 60 * 60 * 24 * 3) {
        thday++;
      } else {
        okcount++;
      }
    });
    initecharts(
      "rainisOnline",
      "雨量站点在线统计图",
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
  useEffect(() => {
    selectRainSource();
  }, [props.raincount]);

  useEffect(() => {
    onlineSite();
  }, [props.readOnlyData]);

  let element = [];
  raincount?.list?.map((item) => {
    element.push(
      <>
        <a>
          {item.dataSourceDesc}共计：{item.number}个
        </a>
        &nbsp;
      </>
    );
  });
  return (
    <div>
      <Row>
        <div className="div-left-echarts">
          <div className="echarts-isOnline" id="rainisOnline"></div>
          <div className="echarts-count" id="raincount"></div>
        </div>
        <div className="div-right-table">
          <ReadonlyTable
            getAll
            get={getBasicsAll}
            type={{ type: 1 }}
            columns={columns}
            rowSelect={rowSelect}
            rowKey={"siteBaseID"}
            footer={() => (
              <>
                <a>雨量站共计：{raincount?.number}个</a>&nbsp;其中：&nbsp;
                {element}
              </>
            )}
          />
        </div>
      </Row>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    readOnlyData: state.management.readOnlyData,
    userinfo: state.home.userinfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
Rain.propTypes = {
  readOnlyData: PropTypes.array,
  raincount: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(Rain);
