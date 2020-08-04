/**
 * SetTitle 2020-08-01
 * 大屏设置面板标题
 */
import React from 'react';
import { Row, Col, Tooltip, message, Popconfirm } from 'antd';
import { AppstoreOutlined, ExportOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
class SetTitle extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    render() {

        return (
            <>
                <Row>
                    <a style={{ fontSize: 18, color: '#000000fd', fontWeight: 'bold ' }}>设置</a>
                    {localStorage.getItem("username") === "admin1" ? null :
                        <Tooltip title="去数据管理">
                            <Link to={'/home/rwvdata'} style={{
                                'position': 'relative',
                                right: '-160px',
                            }} target="_blank">
                                <AppstoreOutlined style={{
                                    fontSize: 25
                                }} />
                            </Link>
                        </Tooltip>
                    }
                    <Popconfirm
                        title="确定退出登录吗?"
                        onConfirm={this.loginOut}
                        okText="是"
                        cancelText="否"
                        placement="left"
                    >
                        <ExportOutlined style={{
                            fontSize: 25,
                            'position': 'relative',
                            right: '-170px',
                        }} />
                    </Popconfirm>
                </Row>
            </>
        )
    }
    loginOut() {
        localStorage.removeItem('token')
        window.location.reload()
        message.success('退出成功！');
    }
    componentDidUpdate() {
    }
}
export default SetTitle;