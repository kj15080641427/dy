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
            logo
          </div >
          <div className="hm-content">
            <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                onClick={this.onMenuClick}
            >
              <Menu.Item title={"雨情信息"} key="/rain" icon={<CloudOutlined />} >
                雨情信息
              </Menu.Item>
              <Menu.Item title={"水情信息"} key="/water" icon={<PieChartOutlined />} >
                水情信息
              </Menu.Item>
              <Menu.Item key="/video" icon={<DesktopOutlined />}>
                视频站点
              </Menu.Item>
              {/* <Menu.Item key="/test3" icon={<ContainerOutlined />}>
              Option 3
            </Menu.Item> */}
              <SubMenu key="sub1" icon={<MailOutlined />} title="防汛管理">
                <Menu.Item key="/storemanage">仓库管理</Menu.Item>
                <Menu.Item key="/materialsmange">防汛物资</Menu.Item>
                <Menu.Item key="/floodprevention">防汛人员</Menu.Item>
                <Menu.Item key="/expert">专家库</Menu.Item>
              </SubMenu>
              {/* <SubMenu key="sub2" icon={<MailOutlined />} title="人员管理">
               
              </SubMenu> */}
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