/**
 * Index 2020-05-26
 */
import React from 'react';
import "./style.scss";
import Menus from "./menu/Menu";
import Head from "./head/Head";
import ContentRouter from "./content/ContentRouter";
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;
class Home extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false
    };
    this.onCollapsClick = this.onCollapsClick.bind(this);
    console.log("this.props.match", this.props.match, this.props.location);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    let { collapsed } = this.state;
    let { match } = this.props;
    return (
      <Layout className="home">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menus collapsed={collapsed}></Menus>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header> */}
          <Head collapsClick={this.onCollapsClick} collapsed={this.state.collapsed}></Head>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <ContentRouter path={match.path}></ContentRouter>
          </Content>
        </Layout>
      </Layout>
    );
  }
  componentDidMount() { }
  onCollapsClick() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
}
export default Home;