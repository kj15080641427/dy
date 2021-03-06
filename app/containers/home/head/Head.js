/**
 * Head 2020-05-26
 */
import React from "react";
import "./style.scss";
import { withRouter } from "react-router-dom";
import { Layout, Icon, Dropdown, Avatar } from "antd";
import UserMenu from "./UserMenu";

import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import FullScreen from "../components/FullScreen";
// import BasicDrawer from '../components/BasicDrawer';
const innerWidth = document.body.clientWidth;

class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
      visible: false,
    };
    this.btnClick = this.btnClick.bind(this);
  }
  handleLogout() {
    localStorage.removeItem("token");
    this.context.router.history.push("/login");
  }
  render() {
    // const { tags } = this.props;
    // const goback = () => {
    //   props.history.push("/login");
    // };
    // console.log("11", actions);
    // console.log("11", this.props.history.push);
    const DropdownList = (
      <UserMenu></UserMenu>
      //       <Menu className="drop-list">
      //         <Menu.Item key="user">
      //           <Icon type="user" />
      //           {/* {localStorage.getItem("userInfo").username} */}
      //           admin
      //         </Menu.Item>
      //         <Menu.Item key="logout" onClick={() => { localStorage.removeItem("token"); window.location.reload() }}>
      //           <Icon type="logout" />
      // 退出登录
      // </Menu.Item>
      //       </Menu>
    );
    // console.log(localStorage.getItem("userInfo"));
    return (
      <div className="top-header">
        <div className="top-header-inner">
          <Layout.Header
            className="site-layout-background"
            style={{ padding: 0 }}
          >
            {React.createElement(
              this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.btnClick,
              }
            )}
          </Layout.Header>
          <div className="header-title">东营市智慧水务系统</div>
          <div className="header-right">
            <div className="full-screen">
              <FullScreen />
            </div>
            <div className="setting">
              <HomeOutlined
                onClick={() => {
                  if (innerWidth > 3000) {
                    this.props.history.push("/display");
                  } else {
                    this.props.history.push("/displaySmall");
                  }
                }}
                style={{ fontSize: "20px" }}
              />
              {/* <SettingFilled style={{ fontSize: '21px', cursor: 'pointer' }} onClick={this.setting} /> */}
            </div>
            <div className="news-wrap">
              {/* <Badge count={3}>
              <Icon style={{ fontSize: '21px', cursor: 'pointer' }} type="bell" />
            </Badge> */}
            </div>
            <div
              className="dropdown-wrap"
              id="dropdown-wrap"
              style={{ cursor: "pointer" }}
            >
              <Dropdown
                getPopupContainer={() =>
                  document.getElementById("dropdown-wrap")
                }
                overlay={DropdownList}
              >
                <div>
                  <Avatar size="large" icon={<UserOutlined />} />
                  <Icon
                    style={{ color: "rgba(0,0,0,.3)", cursor: "pointer" }}
                    type="caret-down"
                  />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* {tags.show ? <Tags /> : null} */}
        {/* <BasicDrawer title="系统设置" closable onClose={this.onClose} visible={this.state.visible} onChangeTags={this.onChangeTags} onChangeBreadCrumb={this.onChangeBreadCrumb} onChangeTheme={this.onChangeTheme} {...this.props} /> */}
      </div>
    );
  }
  setting = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  onChangeTags = (checked) => {
    this.props.setTags({ show: checked });
    // localStorage.setItem('tags', JSON.stringify({ show: checked }));
    this.onClose();
  };
  onChangeBreadCrumb = (checked) => {
    this.props.setBreadCrumb({ show: checked });
    // localStorage.setItem('breadCrumb', JSON.stringify({ show: checked }));
    this.onClose();
  };
  onChangeTheme = (checked) => {
    this.props.setTheme({ type: checked ? "dark" : "light" });
    // localStorage.setItem('theme', JSON.stringify({ type: checked ? 'dark' : 'light' }));
    this.onClose();
  };
  btnClick() {
    if (this.props.collapsClick) {
      this.props.collapsClick();
    }
  }
}
export default withRouter(Head);
