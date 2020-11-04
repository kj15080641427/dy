import React from "react";
import {
  MailOutlined,
  UserOutlined,
  TeamOutlined,
  BuildOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import taskTimelineSvg from "../../../resource/icon/taskTimeline.png";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import moment from "moment";
import "../task.scss";

const iconStyle = {
  fontSize: "50px",
  width: "50px",
  height: "50px",
};
const navi = [
  {
    icon: <MailOutlined style={iconStyle} />,
    text: "发消息",
    url: "/taskInfoMessage",
  },
  {
    icon: <UserOutlined style={iconStyle} />,
    text: "专家调度",
    url: "/expertDispatch",
  },
  {
    icon: <TeamOutlined style={iconStyle} />,
    text: "防汛人员调度",
    url: "/userDispatch",
  },
  {
    icon: <BuildOutlined style={iconStyle} />,
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
              <SnippetsOutlined style={iconStyle} />
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
