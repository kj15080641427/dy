import React, { useState } from "react";
import { Radio } from "antd";
import User from "./User";
import Jurisdiction from "./Jurisdiction";
import LoginLog from "./LoginLog";
import Role from "./Role";
import { connect } from "react-redux";

const System = () => {
  const [value, setValue] = useState("1");
  return (
    <div>
      <Radio.Group
        optionType="button"
        onChange={(e) => {
          console.log(e);
          setValue(e.target.value);
        }}
        value={value}
      >
        <Radio.Button value="1">用户管理</Radio.Button>
        <Radio.Button value="2">权限管理</Radio.Button>
        <Radio.Button value="3">登录日志</Radio.Button>
        <Radio.Button value="4">角色管理</Radio.Button>
      </Radio.Group>
      {value == 1 ? (
        <User />
      ) : value == 2 ? (
        <Jurisdiction />
      ) : value == 3 ? (
        <LoginLog />
      ) : (
        <Role />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.management.loading,
    visible: state.currency.visible,
    permission: state.currency.permission,
  };
};

export default connect(mapStateToProps)(System);
