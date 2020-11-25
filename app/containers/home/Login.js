/**
 * Login 2020-06-12
 * zdl
 * 登录
 */
import React, { Component } from "react";
// import Particles from 'react-particles-js';
import { Form, Input, Button, Checkbox, message, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/home";
import "./style.scss";
import { login } from "@app/data/request";
import dyszhswxt from "@app/resource/login/dyszhswxt.png";
import swlogo from "@app/resource/login/swlogo.png";
const innerWidth = document.body.clientWidth;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSystem: "东营市智慧水务系统",
    };
  }

  render() {
    const onFinish = (values) => {
      if (this.state.selectSystem == "东营市智慧水务系统") {
        login({
          channel: "common",
          username: values.username,
          password: values.password,
        }).then((result) => {
          if (result.code == 200) {
            this.props.actions.setToken(result.data.userToken);
            localStorage.setItem("token", result.data.userToken);
            localStorage.setItem("username", values.username);
            const hrefNavi = window.location.href.split("?url=");
            const url = unescape(hrefNavi[1]);
            if (hrefNavi[1]) {
              if (url.split("?")[1]) {
                window.location.replace(
                  `${url}&token=${result.data.userToken}`
                );
              } else {
                window.location.replace(
                  `${url}?token=${result.data.userToken}`
                );
              }
            } else {
              if (innerWidth > 3000) {
                message.success("登录成功！");
                this.props.history.push("/display");
              } else {
                message.success("登录成功！");
                this.props.history.push("/displaySmall");
              }
            }
          } else {
            message.error("账号或密码错误");
          }
        });
      } else {
        login({
          channel: "common",
          username: values.username,
          password: values.password,
        }).then((res) => {
          window.open(
            `http://218.56.180.250:9110/wemaws/frame?token=${res.data.userToken}`
          );
        });
      }
    };
    return (
      <div className="container">
        <img className="swlogo" src={swlogo}></img>
        <img className="dyszhswxt" src={dyszhswxt}></img>
        <div className="content">
          <div className="title">登录</div>
          <br />
          <br />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            >
              <Input
                className="inputs"
                placeholder="请输入用户名"
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <br />
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input
                className="inputs"
                placeholder="请输入密码"
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <div style={{ display: "flex" }}>
                <Select
                  defaultValue="东营市智慧水务系统"
                  onChange={(e) => {
                    this.setState({
                      selectSystem: e,
                    });
                  }}
                  style={{ flex: 1, marginRight: 16 }}
                >
                  <Select.Option value="东营市智慧水务系统">
                    东营市智慧水务系统
                  </Select.Option>
                  <Select.Option value="水质监测系统">
                    水质监测系统
                  </Select.Option>
                </Select>
                <Checkbox>
                  <span className="remenberpass">记住密码</span>
                </Checkbox>
              </div>
            </Form.Item>
            <br />
            <br />
            <br />
            <br />
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="sbmbotton"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userinfo: state.home.userinfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
