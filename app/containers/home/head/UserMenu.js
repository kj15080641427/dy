/**
 * Head 2020-05-26
 */
import React from 'react';
import "./style.scss";
import { withRouter, BrowserRouter, Route, Link } from 'react-router-dom'
import { Button, Layout, Header, Tags, Icon, Dropdown, Avatar, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import {
    MenuFoldOutlined, HomeOutlined, MenuUnfoldOutlined, SettingFilled, UserOutlined
} from '@ant-design/icons';

class UserMenu extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: false,
            visible: false
        };
    }
    render() {
        console.log("11", this.props)
        // console.log("11", this.props.history.push)
        console.log(localStorage.getItem("userInfo").toString())
        return (
            <Menu className="drop-list">
                <Menu.Item key="user">
                    <Icon type="user" />
                    {localStorage.getItem("userInfo").username}
                </Menu.Item>
                <Menu.Item key="logout" onClick={() => { localStorage.removeItem("token"); window.location.reload() }}>
                    <Icon type="logout" />
					退出登录
				</Menu.Item>
            </Menu>
        );
    }
    componentDidMount() { }
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserMenu);