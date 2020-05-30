/**
 * Index 2020-05-26
 */
import React from 'react';
import "./style.scss";
import Menus from "./menu/Menu";
import Head from "./head/Head";
import ContentRouter from "./content/ContentRouter";
import { Layout } from "antd"
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
  render() {
    let { collapsed } = this.state;
    let { match } = this.props;
    return (
      <div className="home">
        <div className={"h-menu " + (collapsed ? "active" : "")} >
          <Menus collapsed={collapsed}></Menus>
        </div>
        <Layout className="site-layout">
          <Head collapsClick={this.onCollapsClick}></Head>
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
      </div>

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