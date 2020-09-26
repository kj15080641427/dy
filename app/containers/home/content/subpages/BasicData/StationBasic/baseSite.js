import React from "react";
import BaseLayout from "../../connectComponents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../redux/actions";
import { Input, Select, Button, Modal } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { ReadonlyGate } from "../../site/siteGate";
import { ReadonlyVideo } from "../../site/siteVideo";
import { ReadonlyPump } from "../../site/sitePump";
import { ReadonlyRain } from "../../site/siteRain";
import { ReadonlyWater } from "../../site/siteWater";
import { ReadonlyWaterPoint } from "../../site/siteWaterPoint";
import { ReadonlyReservoir } from "../../site/siteReservoir";
// import SiteDike from "../../site/siteR";
// import SiteGate from "../../site/siteGate";
// import SiteVideo from "../../site/siteVideo";

// import SiteVideo from "../../site/siteVideo";
// import SiteGate from "../../site/siteGate";
// import SiteVideo from "../../site/siteVideo";
import {
  getSiteBase,
  delSiteBase,
  addSiteBase,
  updSiteBase,
  getSiteDict,
} from "@app/data/home";
const formItem = [
  {
    label: "站点名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "详细地址",
    name: "address",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "别名",
    name: "aliasName",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "经度",
    name: "lon",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "纬度",
    name: "lat",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
];
const { Option } = Select;

const rowSelect = [
  { label: "名称", name: "name", element: <Input></Input> },
  //  {
  //    label: "来源",
  //    name: "dataSource",
  //    element: (
  //      <Select style={{ width: 200 }}>
  //        <Option value={null}>全部</Option>
  //        <Option value={1}>水文局</Option>
  //        <Option value={2}>气象局</Option>
  //        <Option value={3}>水务局积水点</Option>
  //        <Option value={4}>农村基层防汛监测预警平台</Option>
  //        <Option value={5}>河道</Option>
  //        <Option value={6}>河口区水利局</Option>
  //        <Option value={7}>水务局河道</Option>
  //        <Option value={8}>广饶县</Option>
  //        <Option value={9}>开发区城管局</Option>
  //        <Option value={10}>天鹅湖蓄滞洪区</Option>
  //      </Select>
  //    ),
  //  },
  //  {
  //    label: "测站检测类型",
  //    name: "indtype",
  //    element: (
  //      <Select style={{ width: 200 }}>
  //        <Option value={null}>全部</Option>
  //        <Option value={1}>水文</Option>
  //        <Option value={2}>区域水文</Option>
  //        <Option value={3}>降水</Option>
  //        <Option value={4}>中小河流水文</Option>
  //        <Option value={5}>中小河流降水</Option>
  //        <Option value={6}>自建降水</Option>
  //        <Option value={7}>中小河流水位</Option>
  //        <Option value={8}>水位</Option>
  //        <Option value={9}>积水点水位站(易捞点)</Option>
  //        <Option value={10}>积水点雨量站</Option>
  //        <Option value={11}>天鹅湖蓄滞洪区</Option>
  //      </Select>
  //    ),
  //  },
];

class BaseStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "radioID",
      rowId: "",
    };
  }
  componentDidMount() {
    this.props.actions.getBase({
      request: getSiteDict,
      key: "dict",
      param: {
        current: 1,
        size: 10,
        type: 3,
      },
    });
    // getSiteDict({
    //   current: 1,
    //   siteDictionariesID: 0,
    //   size: 10,
    // });
  }
  render() {
    const {
      hideRPModal,
      showSiteRelationModal,
      addSiteRelation,
    } = this.props.actions;
    const { modalVisible, selected } = this.props;
    const { rowId, option } = this.state;
    const dict = {
      radioID: 21,
      siteRainID: 18,
      siteWaterLevelsID: 19,
      siteWaterPointID: 20,
    };
    const columns = [
      {
        title: "站名",
        dataIndex: "name",
        ellipsis: true,
      },
      {
        title: "别名",
        dataIndex: "aliasName",
        ellipsis: true,
      },
      {
        title: "详细地址",
        dataIndex: "address",
        ellipsis: true,
      },
      {
        title: "纬度",
        dataIndex: "lat",
      },
      {
        title: "经度",
        dataIndex: "lon",
      },
      {
        title: "创建时间",
        dataIndex: "gmtcreate",
      },
      {
        title: "修改时间",
        dataIndex: "gmtmodify",
        ellipsis: true,
      },
      {
        title: "关联",
        dataIndex: "",
        render: (row) => (
          <Button
            onClick={() => {
              this.setState({
                rowId: row.siteBaseID,
              });
              showSiteRelationModal(dict[option]);
            }}
            icon={<SwapOutlined />}
          >
            关联
          </Button>
        ),
      },
    ];

    return (
      <>
        <BaseLayout
          get={getSiteBase} // 分页查询接口
          add={addSiteBase} // 添加数据接口
          upd={updSiteBase} // 更新数据接口
          del={delSiteBase} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          rowSelect={rowSelect} // 查询配置项
          keyId={"siteBaseID"} //  数据的唯一ID
          storeKey={"baseStation"} // store中的key值. 要与 mapStatetoProps 中的key相同
        ></BaseLayout>
        <Modal
          width={"80%"}
          title={`关联`}
          visible={modalVisible}
          maskClosable={false}
          destroyOnClose
          okText="关联"
          onOk={() => {
            addSiteRelation({
              relationID: selected[option][0],
              siteBaseID: rowId,
              siteDictionariesID: dict[option],
              state: 1,
            });
          }}
          onCancel={() => {
            hideRPModal();
          }}
        >
          <Select
            style={{ width: 200 }}
            defaultValue="radioID"
            onChange={(e) =>
              this.setState({
                option: e,
              })
            }
          >
            <Option value="radioID">视频</Option>
            <Option value="siteRainID">雨量</Option>
            <Option value="siteWaterLevelsID">水位</Option>
            <Option value="siteWaterPointID">积水点</Option>
            {/* <Option value="dike">堤防工程1</Option> */}
            {/* <Option value="reservoirID">水库信息</Option>
            <Option value="river">河流信息</Option>
            <Option value="pumpID">泵站信息</Option>
            <Option value="gateID">闸信息</Option> */}
          </Select>

          {option == "radioID" ? (
            <ReadonlyVideo />
          ) : option === "siteRainID" ? (
            <ReadonlyRain />
          ) : option === "siteWaterLevelsID" ? (
            <ReadonlyWater />
          ) : option === "siteWaterPointID" ? (
            <ReadonlyWaterPoint />
          ) : option === "reservoirID" ? (
            <ReadonlyReservoir />
          ) : option === "pumpID" ? (
            <ReadonlyPump />
          ) : option === "gateID" ? (
            <ReadonlyGate />
          ) : (
            ""
          )}
        </Modal>
      </>
    );
  }
}
BaseStation.propTypes = {
  actions: PropTypes.any,
  modalVisible: PropTypes.bool,
  selected: PropTypes.object,
};

const parentMapStateToProps = (state) => {
  console.log(state, "STATE");
  return {
    dict: state.currency.dict,
    modalVisible: state.management.modalVisible,
    selected: state.management.selected,
  };
};
const parentMapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(
  parentMapStateToProps,
  parentMapDispatchToProps
)(BaseStation);