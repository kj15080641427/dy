import React from "react";
import backImg from "@app/resource/返回上一页.svg";
import { Link } from "react-router-dom";
import { createHashHistory } from "history";
import "../task.scss";

const hashHistory = createHashHistory();

export default (props) => {
  const { taskInfo } = props;
  return (
    <Link
      className="task-page-head"
      to={{ pathname: "/taskInfo", query: { info: taskInfo } }}
    >
      <img
        src={backImg}
        width="50px"
        style={{ cursor: "pointer" }}
        height="50px"
        title="返回"
        // onClick={() => hashHistory.push("/taskInfo")}
      ></img>
    </Link>
  );
};
