import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input, Select, Radio } from "antd";
import {
  addSiteVideoData,
  getSiteVideoData,
  updateSiteVideoData,
  delSiteVideoData,
} from "@app/data/home";
import "../../../style.scss";

const formItem = [
  {
    label: "名称",
    name: "name",
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
  {
    label: "地址",
    name: "address",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },

  {
    label: "来源",
    name: "siteDictionariesID",
    rules: [{ required: true }],
    ele: (
      <Select>
        <Select.Option value={1}>水文局</Select.Option>
        <Select.Option value={2}>气象局</Select.Option>
        <Select.Option value={3}>水务局</Select.Option>
        <Select.Option value={4}>农村基层防汛监测预警平台</Select.Option>
        <Select.Option value={5}>河道</Select.Option>
        <Select.Option value={6}>河口区水利局</Select.Option>
        <Select.Option value={7}>水务局河道</Select.Option>
        <Select.Option value={22}>黄河东营境内水位站点</Select.Option>
        <Select.Option value={23}>人工录入</Select.Option>
        <Select.Option value={25}>经开区</Select.Option>
      </Select>
    ),
  },
  {
    label: "地区编号",
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
    label: "站点编码",
    name: "stcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "视频类别",
    name: "ntype",
    ele: <Input></Input>,
  },
  {
    label: "视频名称",
    name: "strname",
    ele: <Input></Input>,
  },
  {
    label: "访问密码",
    name: "strpasswd",
    ele: <Input></Input>,
  },
  {
    label: "设备唯一身份值",
    name: "strtoken",
    ele: <Input></Input>,
  },
  {
    label: "访问用户名",
    name: "struser",
    ele: <Input></Input>,
  },
  {
    label: "地区名",
    name: "regionName",
    ele: <Input></Input>,
  },

  {
    label: "视频地址",
    name: "strurl",
    // rules: [{ required: true }],
    ele: <Input></Input>,
  },
];
// 表格配置
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "地址",
    dataIndex: "address",
  },
  {
    title: "地区名",
    dataIndex: "regionName",
  },
  {
    title: "唯一编码",
    dataIndex: "strtoken",
  },
  {
    title: "状态",
    dataIndex: "state",
    render: (e) => (e ? "隐藏" : "显示"),
  },
  // {
  //   title: "视频地址",
  //   dataIndex: "strurl",
  // },
];
const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];
class SiteVideo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <BaseLayout
          get={getSiteVideoData} // 分页查询接口
          add={addSiteVideoData} // 添加数据接口
          upd={updateSiteVideoData} // 更新数据接口
          del={delSiteVideoData} // 删除数据接口
          columns={columns} // 表格配置项
          formItem={formItem} // 表单配置项
          keyId={"radioID"} // 数据的唯一ID
          storeKey={"siteVideo"} // store中的key值
          rowSelect={rowSelect}
        ></BaseLayout>
      </>
    );
  }
}

export default SiteVideo;
export const ReadonlyVideo = () => {
  return (
    <ReadOnlyTable
      get={getSiteVideoData}
      columns={columns}
      rowSelect={rowSelect}
      rowKey={"radioID"}
    />
  );
};
