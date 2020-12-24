import React from "react";
// import taskTimelineSvg from "@app/resource/icon/taskTimeline.png";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import moment from "moment";
import messageImg from "@app/resource/信息.svg";
import expertImg from "@app/resource/专家.svg";
import userImg from "@app/resource/人员调度.svg";
import metrialImg from "@app/resource/物资调度.svg";
import updateImg from "@app/resource/事件调整.svg";
import "../task.scss";

const iconStyle = {
  fontSize: "12px",
  width: "20px",
  height: "20px",
  background: "#003366",
};
const navi = [
  {
    icon: <img src={messageImg} style={iconStyle} />,
    text: "发消息",
    url: "/taskInfoMessage",
  },
  {
    icon: <img src={expertImg} style={iconStyle} />,
    text: "专家调度",
    url: "/expertDispatch",
  },
  {
    icon: <img src={userImg} style={iconStyle} />,
    text: "人员调度",
    url: "/userDispatch",
  },
  {
    icon: <img src={metrialImg} style={iconStyle} />,
    text: "物资调度",
    url: "/materialDispatch",
  },
  // {
  //   icon: <img src={taskTimelineSvg} style={iconStyle} />,
  //   text: "事件处置动态",
  //   url: "/taskTimeLine",
  // },
];
const TaskInfoNavi = (props) => {
  const { taskInfo, formRef } = props;
  // const formRef = useRef(null);
  const { setTaskUpdateModal } = props.actions;
  return (
    <div className="task-info-fotter-center">
      <div className="task-info-fotter">
        {navi.map((item) => (
          <Link key={item.text} to={`${item.url}`}>
            <div className="task-info-fotter-div">
              <div className="task-info-fotter-message">{item.icon}</div>
              <div className="task-info-fotter-text">{item.text}</div>
            </div>
          </Link>
        ))}
        <a>
          <div
            className="task-info-fotter-div"
            onClick={() => {
              setTaskUpdateModal(true);
              // console.log(taskInfo, "taskInfo");
              formRef.current.setFieldsValue({
                ...taskInfo,
                happenTime: moment(taskInfo.happenTime),
              });
            }}
          >
            <div className="task-info-fotter-message">
              <img src={updateImg} style={iconStyle} />
            </div>
            <div className="task-info-fotter-text">事件调整</div>
          </div>
        </a>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    taskInfo: state.taskReducers.taskInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoNavi);
