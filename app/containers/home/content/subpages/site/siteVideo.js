import React from "react";
import BaseLayout from "../connectComponents";
import ReadOnlyTable from "../readOnlyTable";
import { Input } from "antd";
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
    label: "视频类别",
    name: "ntype",
    ele: <Input></Input>,
  },
  {
    label: "来源",
    name: "siteDictionariesID",
    ele: <Input></Input>,
  },
  {
    label: "站点编码",
    name: "stcd",
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
    label: "行政区划码",
    name: "strtoken",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "状态",
    name: "state",
    rules: [{ required: true }],
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