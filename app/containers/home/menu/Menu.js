/**
 * Menu 2020-05-26
 */
import React from 'react';
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
const { SubMenu } = Menu;
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import "./style.scss";
class Menus extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  render() {
    let { collapsed } = this.props;
    return ( 
      <div className={"hm-menu"}>
        <div className="hm-logo">
          logo
        </div >
        <div className="hm-content">
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onClick={this.onMenuClick}
          >
            <Menu.Item key="/test" icon={<PieChartOutlined />}>
              test
            </Menu.Item>
            <Menu.Item key="/test2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="/test3" icon={<ContainerOutlined />}>
              Option 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="/test4">Option 5</Menu.Item>
              <Menu.Item key="/test5">Option 6</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<MailOutlined />} title="Navigation two">
              <Menu.Item key="/test6">test6</Menu.Item>
              <Menu.Item key="/test7">test7</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
  componentDidMount() {}
  onMenuClick({ item, key, keyPath, domEvent }) {
    let { history } = this.props;
    history.push('/home' + key);
  }
}
export default withRouter(Menus);