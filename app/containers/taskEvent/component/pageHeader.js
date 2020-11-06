import React from "react";
import backImg from "@app/resource/返回上一页.svg";
import { createHashHistory } from "history";
import "../task.scss";

const hashHistory = createHashHistory();

export default () => {
  return (
    <div className="task-page-head">
      <img
        src={backImg}
        width="50px"
        style={{ cursor: "pointer" }}
        height="50px"
        title="返回"
        onClick={() => hashHistory.goBack()}
      ></img>
    </div>
  );
};
