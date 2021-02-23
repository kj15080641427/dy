import React from "react";
import { Tree, Card } from "antd";

export default () => {
  const treeData = [
    {
      title: "抗旱应急指挥调度方案",
      key: "0-0",
      children: [
        {
          title: "组织指挥",
          key: "0-0-0",
          children: [],
        },
        {
          title: "预报预警",
          key: "0-0-1",
          children: [],
        },
        {
          title: "响应分级",
          key: "0-0-2",
          children: [],
        },
        {
          title: "响应启动",
          key: "0-0-3",
          children: [],
        },
        {
          title: "响应行动",
          key: "0-0-4",
          children: [],
        },
        {
          title: "分工职责",
          key: "0-0-5",
          children: [
            {
              title: "市防指办公室",
              key: "0-0-5-0",
            },
            {
              title: "市防指水旱灾害防御办公室",
              key: "0-0-5-1",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div>
      <Card title="应急调度指挥方案">
        <div style={{ display: "flex" }}>
          <Tree treeData={treeData} style={{ width: "200px" }}></Tree>
          <div style={{ width: "100%", height: "800px", background: "#a0a0a0" }}></div>
        </div>
      </Card>
    </div>
  );
};
