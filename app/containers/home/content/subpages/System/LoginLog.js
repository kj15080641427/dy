/**
 * water 2020-06-12
 * zdl
 * 登录日志
 */
import React from "react";
import BaseLayout from "../connectComponents";
import { Input, DatePicker } from "antd";
import { usersLoginLog } from "@app/data/home";
import * as actions from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "ip地址",
    dataIndex: "ip",
  },
  {
    title: "登录时间",
    dataIndex: "loginTime",
    sorter: true,
  },
  {
    title: "是否登录成功",
    dataIndex: "isSuccess",
    render: (isSuccess) => {
      if (isSuccess == "0") {
        return <a>成功</a>;
      } else {
        return <a style={{ color: "red" }}>失败</a>;
      }
    },
  },
];
const rowSelect = [
  { label: "名称", name: "realname", element: <Input></Input> },
  { label: "IP地址", name: "ip", element: <Input></Input> },
  {
    label: "开始时间",
    name: "rt",
    element: (
      <RangePicker
        showTime="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD HH:mm:ss"
      />
    ),
  },
];
class LoginLog extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { getBase } = this.props.actions;
    const formatTime = (time) => moment(time).format("YYYY-MM-DD HH:mm:ss");

    const handleQuery = (values) => {
      let newValues = {
        ...values,
        beginLoginTime: formatTime(values.rt[0]),
        endLoginTime: formatTime(values.rt[1]),
      };
      console.log(values.rt[0], "========", formatTime(values.rt[0]));
      getBase({
        request: usersLoginLog,
        key: "loginLog",
        param: newValues,
      });
      // console.log(values3, "HANDLE");
    };
    return (
      <>
        <BaseLayout
          get={usersLoginLog} // 分页查询接口
          columns={columns} // 表格配置项
          keyId={"usersLoginLogID"} // 数据的唯一ID
          storeKey={"loginLog"} // store中的key值
          rowSelect={rowSelect}
          showEdit={false}
          handleQuery={handleQuery}
        ></BaseLayout>
      </>
    );
  }
}
const mapStatetoProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(LoginLog);
