/**
 * water 2020-06-14
 * zdl
 * 角色增加修改表单
 */
import React from 'react';
import { Form, Input, Button, Select, Modal, message, Table } from 'antd';
import { queryByRoleId, updateRole, saveRole, queryPermission } from '@app/data/request';


const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
class JurisdicForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            permissionData: [],//权限集合
            selectedRowKeys: [], //选中集合
            loading: false,
            jurisdicArr: [],//查询到的所有权限集合
            jurisdic: [],//查询到的角色权限集合
        };
        this.formRef = this.props.form
    }

    onFinish = values => {
        console.log(values);
        if (values.roleId === undefined) {
            saveRole(values).then((result) => {
                console.log(result)
                if (result.data) {
                    message.success('新增成功！');
                    this.props.selectPage();
                    this.onCancel();
                } else {
                    console.log(result.msg)
                }
            })
        } else {
            updateRole(values).then((result) => {
                console.log(result)
                if (result.data) {
                    message.success('修改成功！');
                    this.props.selectPage()
                    this.onCancel();
                } else {
                    console.log(result.msg)
                }
            })
        }
    };

    onCancel = () => {
        this.props.onCancel()//调用父组件给的方法
    };
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        console.log("Test this.props.match", this.props.match, this.props.location);
        console.log(this.props.rowObj.roleId)

        const { loading, selectedRowKeys, permissionData } = this.state;
        const columns = [
            {
                title: '权限名',
                dataIndex: 'permName',
                key: 'permissionId',
            },
            {
                title: '请求URL',
                dataIndex: 'url',
            },
            {
                title: '权限标识符',
                dataIndex: 'permTag',
            },
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <>
                <Modal
                    forceRender={true}
                    onCancel={this.onCancel}
                    visible={this.props.visible}
                    title='角色更新'
                    footer={null}
                >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="roleName"
                            label="角色名"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="roleDesc"
                            label="角色说明"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="roleId"
                        >
                        </Form.Item>
                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>

                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `已选中 ${selectedRowKeys.length} 个` : ''}
                        </span>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={permissionData}
                            size="small"
                            pagination={false}
                            scroll={{ y: 300 }}
                        />
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                保存
        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
    componentDidMount() {
        queryPermission({
            "current": 1,
            "size": 1000
        }).then((result) => {
            let arr = []
            for (let index = 0; index < result.data.records.length; index++) {
                arr.push({
                    key: result.data.records[index].permissionId,
                    permName: result.data.records[index].permName,
                    url: result.data.records[index].url,
                    permTag: result.data.records[index].permTag,
                })
            }
            this.setState({
                permissionData: arr
            })
        })
        if (this.props.rowObj.roleId !== undefined) {
            queryByRoleId({
                "roleId": this.props.rowObj.roleId
            }).then((result) => {
                console.log(result)
                this.setState({
                    jurisdicArr: result.data
                })
            })
        }
    }
    componentDidUpdate() {

    }
    // componentDidMount() {

    // }
    // componentWillReceiveProps() {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
    // componentWillUpdate() {
    //     console.log(this.props.form.current.getFieldValue("roleId"))
    // }
    // componentWillUnmount() {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
    // shouldComponentUpdate () {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
}
export default JurisdicForm;