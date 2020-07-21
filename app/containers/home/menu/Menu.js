/**
 * Menu 2020-05-26
 */
import React from 'react';
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
const { SubMenu } = Menu;
import {
  AppstoreOutlined,
  SettingOutlined,
  FundViewOutlined,
  CloudOutlined,
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
          东营水务
          </div >
        <div className="hm-content">
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onClick={this.onMenuClick}
            defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
          >
            <Menu.Item key="/" icon={<ContainerOutlined />}>
              首页
            </Menu.Item>
            <SubMenu key="sub1" icon={<FundViewOutlined />} title="监测数据" inlineCollapsed={false}>
              <Menu.Item title={"站点数据"} key="/rwvdata">
                站点数据
              </Menu.Item>
              <Menu.Item key="/model">
                模型演示
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<MailOutlined />} title="防汛管理">
              <Menu.Item key="/storemanage">仓库管理</Menu.Item>
              <Menu.Item key="/materialsmange">防汛物资</Menu.Item>
              <Menu.Item key="/floodprevention">防汛人员</Menu.Item>
              <Menu.Item key="/expert">专家库</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="系统设置">
              <Menu.Item key="/loginlog">日志查询</Menu.Item>
              <Menu.Item key="/jurisdiction">权限设置</Menu.Item>
              <Menu.Item key="/role">角色管理</Menu.Item>
              <Menu.Item key="/user">用户管理</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<MailOutlined />} title="基础信息配置">
              <Menu.Item key="/stationBasic">基础站点信息配置</Menu.Item>
              <Menu.Item key="/videoBasic">视频站点信息配置</Menu.Item>
              <Menu.Item key="/videoStation">站点关联信息配置</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
  componentDidMount() { }
  onMenuClick({ item, key, keyPath, domEvent, title }) {
    let { history } = this.props;
    history.push('/home' + key);
    console.log(item)
    console.log(key)
    console.log(keyPath)
    console.log(title)
  }
}
export default withRouter(Menus);