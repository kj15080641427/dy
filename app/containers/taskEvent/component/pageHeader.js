import React from "react";
import { PageHeader } from "antd";
import { createHashHistory } from "history";
import "../task.scss";

const hashHistory = createHashHistory();

export default () => {
  return (
    <div className="task-page-head">
      <PageHeader title="返回" onBack={() => hashHistory.goBack()}></PageHeader>
    </div>
  );
};
