import React from "react";
import BaseLayout from "../connectComponents";
import { Input, Select, Radio } from "antd";
import { getDict } from "../../../redux/actions";
import {
  delSiteRelation,
  getSiteRelation,
  addSiteRelation,
  updSiteRelation,
} from "@app/data/home";
import { connect } from "react-redux";

const formItem = [
  { label: "基础站点ID", name: "siteBaseID", ele: <Input /> },
  { label: "关联表ID", name: "relationID", ele: <Input /> },
  {
    label: "站点关系类型",
    name: "siteDictionariesID",
    ele: (
      <Select>
        <Select.Option value={21}>视频</Select.Option>
        <Select.Option value={20}>积水点</Select.Option>
        <Select.Option value={19}>水位</Select.Option>
        <Select.Option value={18}>雨量</Select.Option>
      </Select>
    ),
  },
  {
    label: "状态",
    name: "state",
    ele: (
      <Radio.Group>
        <Radio value={0}>显示</Radio>
        <Radio value={1}>隐藏</Radio>
      </Radio.Group>
    ),
  },
];
const rowSelect = [
  {
    label: "站点关系类型",
    name: "siteDictionariesID",
    element: (
      <Select defaultValue=" ">
        <Select.Option value=" ">全部</Select.Option>
        <Select.Option value="18">雨量</Select.Option>
        <Select.Option value="19">水位</Select.Option>
        <Select.Option value="20">积水点</Select.Option>
        <Select.Option value="21">视频</Select.Option>
      </Select>
    ),
  },
];
class VideoStation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getDict({
      current: 1,
      size: 10,
      type: 3,
    });
  }
  render() {
    const { dict } = this.props;
    const columns = [
      {
        title: "站点名称",
        dataIndex: "stateRelationID",
      },
      {
        title: "状态",
        dataIndex: "state",
        render: (e) => {
          return e ? "隐藏" : "显示";
        },
      },
      {
        title: "关联站点名称",
        dataIndex: "relationID",
        ellipsis: true,
      },
      {
        title: "站点关系类型",
        dataIndex: "siteDictionariesID",
        render: (e) => {
          return dict?.[e];
        },
      },
    ];
    return (
      <BaseLayout
        stringList={["relationID", "siteBaseID"]}
        get={getSiteRelation} // 分页查询接口
        add={addSiteRelation} // 添加数据接口
        upd={updSiteRelation} // 更新数据接口
        del={delSiteRelation} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        keyId={"stateRelationID"} // 数据的唯一ID
        storeKey={"stateRelation"} // store中的key值
        rowSelect={rowSelect}
      ></BaseLayout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dict: state.currency.dict,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDict: (data) => dispatch(getDict(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoStation);
