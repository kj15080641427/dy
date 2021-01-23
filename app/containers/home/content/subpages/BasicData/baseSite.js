import React from "react";
import BaseLayout from "../connectComponents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import { Input, Select, Button, Modal, Radio } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { ReadonlyGate } from "../site/siteGate";
import { ReadonlyVideo } from "./siteVideo";
import { ReadonlyPump } from "../site/sitePump";
import { ReadonlyRain } from "./siteRain";
import { ReadonlyWater } from "./siteWater";
import { ReadonlyWaterPoint } from "./siteWaterPoint";
import { ReadonlyReservoir } from "../site/siteReservoir";

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
    label: "站点别名",
    name: "aliasName",
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
  {
    label: "地区编码",
    name: "region",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "状态",
    name: "state",
    rules: [{ required: true }],
    ele: (
      <Radio.Group>
        <Radio value={0}>显示</Radio>
        <Radio value={1}>隐藏</Radio>
      </Radio.Group>
    ),
  },
  {
    label: "站点描述",
    name: "stationdesc",
    ele: <Input></Input>,
  },
  {
    label: "隶属单位",
    name: "memerof",
    ele: <Input></Input>,
  },
  {
    label: "交换管理单位",
    name: "exchangeorg",
    ele: <Input></Input>,
  },
];
const { Option } = Select;

const rowSelect = [
  { label: "名称", name: "name", element: <Input></Input> },
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
              state: 0,
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
  // console.log(state, "STATE");
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
