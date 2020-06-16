/**
 * Head 2020-05-26
 */
import React from 'react';
import "./style.scss";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Button, Layout, Header, Tags ,Icon} from 'antd';
import {
  MenuFoldOutlined, HomeOutlined, MenuUnfoldOutlined,SettingFilled
} from '@ant-design/icons';
import FullScreen from '../components/FullScreen';
import BasicDrawer from '../components/BasicDrawer';

class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: false,
      visible: false
    };
    this.btnClick = this.btnClick.bind(this);
  }
  render() {
    const { tags } = this.props;
    return (
      <div className="top-header">
        <div className="top-header-inner">
          <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.btnClick,
            })}
          </Layout.Header>
          <div className="header-title">后台管理系统</div>
          <div className="header-right">
            <div className="full-screen">
              <FullScreen />
            </div>
            <div className="setting">
              <Link to={"/"}><HomeOutlined style={{ fontSize: '20px', color: '#08c' }} /></Link>
              <SettingFilled style={{ fontSize: '21px', cursor: 'pointer' }} onClick={this.setting} />
            </div>
            <div className="news-wrap">
              {/* <Badge count={3}>
              <Icon style={{ fontSize: '21px', cursor: 'pointer' }} type="bell" />
            </Badge> */}
            </div>
            <div className="dropdown-wrap" id="dropdown-wrap" style={{ cursor: 'pointer' }}>
              {/* <Dropdown getPopupContainer={() => document.getElementById('dropdown-wrap')} overlay={DropdownList}>
              <div>
                <Avatar size="large" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADwElEQVRYR7WXTWwTVxDH/7Pe9Qf+ahyaOAmBUKeBAyqXSlUrUM/0A6lHxAWE1PbSG+IIoceKG5e2EqKXimMlWtpzRdWqgkurHiDEJTgkcQJx8Bf+2I9Bb8kG2/H6PRL7XfbwZub9dmbezDzCa6z5fH7EqTQ/AuFDZhwBMAUgvmmiDGCBCP+B8bsWC/46nU6vqZonFcFsdvmYCesCHJwggq6iwwwLGn4zoH+TyYz/IdPpCXJvIX9Qs82rzPyxzFCvfSK65QSMrw5PpR/6yfmCzGWXTjFb3wHkuX43LAC4TKR/MZOZuNHNUFeQ+9nFiwTMMrNS6FQJiYgZmD2Umfy6U2fbQQICzJdVje9IjuhSJ0wbiAgH4PzYb09s+3siBrTTrWHaAhGJSVbjH5WcCGga3kjGEI1GEDReXqKmaaFareFZsQLbcRQcxWXWQ0e9BN4Cmcsu/qJyO2LRCEZHUhAw3ZaAWF0roFKtSWHEbZrJTH4iBF0QUScstm7LNAXE2OgwiHrnMDNjZXVdCUYn/bioM67Fe9ncTWJ82gtEeGDqwJivJzp1hWcWHq1Iw8SEnw9n9p8kUbatcnNJVjGHhxIYTiVlTmvbXy8Usb5R6qkjKrAeD07Q3HzuDAPXZSfs3zeKcCgoE2vbrzeayD1eleoQcJbmsrnrzDgjk54+OAHNJ0H9dB3HwfzDJZlpEOEHuj+fuwPgXZn0IEEA3BUgTwDslYEMMjQAngqQOoCQDGRQybp5bkMZZFDXtxVEKTRCYRAFbRPEDY1Ssnqh62eJb0mHu8rXtzWH+tP0Xll0r69qQZMl82723YKmWuJ3c1AvXbfEU3BCuel5xiLhEEIhA8GgAT0Q2OrEouNato1m00SjYaJWbyixbzU9lTFAtP3UUALJeBS6HlA6wLJsFMtVFDZKEJB+q20MEEJ+g5Fh6Ng39ibEdyfLNC08XnkC8e1c2wYjIdBtVBRNbmoyrewFP1DhnYXFPEQTfLV8RsWXXmkfnkf2DrmzaT+WmGXXnm64psSzwnd49g7znhOaRnjrwPhrt34/aOGN/x8tw3FYkPR+TrTCxPZEZsfTw319YC3n17nyvKb2wPJgStXquWg48q2m0c6ytMM1jsNWtV77MhGNXuvmtZ5/XCgU3onHE9/reuC93eSJZdl/l8ulz1Op1L9+dpRcXyo9/ywcNs4bhv6+9wRRAGPTtP6q180ricSen2TySiCekbVi8e2YYZwMGMZxAj4IaNoQkeZWOGbHth1ng4E/bdO8XTHNmyPJ5AMZgLf/At/j2PAbUsw0AAAAAElFTkSuQmCC" />
                <Icon style={{ color: 'rgba(0,0,0,.3)', cursor: 'pointer' }} type="caret-down" />
              </div>
            </Dropdown> */}
            </div>
          </div>
        </div>
        {/* {tags.show ? <Tags /> : null} */}
        <BasicDrawer title="系统设置" closable onClose={this.onClose} visible={this.state.visible} onChangeTags={this.onChangeTags} onChangeBreadCrumb={this.onChangeBreadCrumb} onChangeTheme={this.onChangeTheme} {...this.props} />
      </div>
    );
  }
  setting = () => {
		this.setState({ visible: true });
	};
  onClose = () => {
    this.setState({ visible: false });
  };
  onChangeTags = checked => {
    this.props.setTags({ show: checked });
    // localStorage.setItem('tags', JSON.stringify({ show: checked }));
    this.onClose();
  };
  onChangeBreadCrumb = checked => {
    this.props.setBreadCrumb({ show: checked });
    // localStorage.setItem('breadCrumb', JSON.stringify({ show: checked }));
    this.onClose();
  };
  onChangeTheme = checked => {
    this.props.setTheme({ type: checked ? 'dark' : 'light' });
    // localStorage.setItem('theme', JSON.stringify({ type: checked ? 'dark' : 'light' }));
    this.onClose();
  };
  componentDidMount() { }
  btnClick() {
    if (this.props.collapsClick) {
      this.props.collapsClick();
    }
  }
}
export default Head;