/**
 * Index 2020-05-26
 */
import React from 'react';
import "./style.scss";
import Menus from "./menu/Menu";
import Head from "./head/Head";
import ContentRouter from "./content/ContentRouter";
class Home extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: true
    };
    this.onCollapsClick = this.onCollapsClick.bind(this);
    console.log("this.props.match",this.props.match,this.props.location);
  }
  render() {
    let { collapsed } = this.state;
    let { match } = this.props;
    return ( 
      <div className="home">
        <div className={"h-menu " + (collapsed ? "active" : "")} >
          <Menus collapsed={collapsed}></Menus>
        </div>
        <div className="h-wrap">
          <div className="h-header">
            <Head collapsClick={this.onCollapsClick}></Head>
          </div>
          <div className="h-content">
            <ContentRouter path={match.path}></ContentRouter>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
  onCollapsClick() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
}
export default Home;