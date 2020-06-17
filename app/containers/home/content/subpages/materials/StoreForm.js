/**
 * StoreManage 2020-06-04
 * zdl
 * 仓库管理
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { QueryMaterialWarehouse, saveMaterialWarehouse, deleteMaterialWarehouse, updateMaterialWarehouse } from '@app/data/request';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined, RedoOutlined, PlusCircleOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';
class StoreManage extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalvisible: false,
        };
        // this.setState({
        //     modalvisible: 
        // })
    }
    render() {
        const [form] = Form.useForm();
        console.log("StoreManage this.props.match", this.props.match, this.props.location);


        //表单验证
        const validateMessages = {
            required: '${label} 不能为空！',
        };
        //模态框提交
        const onFinishmodal = values => {
            console.log("提交", values)
            this.setState({
                confirmLoading: true,
            });
            if (values.materialWarehouseId === undefined) {
                saveMaterialWarehouse(values).then((result) => {
                    console.log(result)
                    if (result.data) {
                        this.setState({
                            modalvisible: false,
                            confirmLoading: false,
                        });
                        this.selectPage()
                        this.form.resetFields();
                        message.success('新增成功！');
                    } else {
                        console.log(result.msg)
                    }
                })
            } else {
                updateMaterialWarehouse(values).then((result) => {
                    console.log(result)
                    if (result.data) {
                        this.setState({
                            modalvisible: false,
                            confirmLoading: false,
                        });
                        this.selectPage()
                        this.form.resetFields();
                        message.success('更新成功！');
                    } else {
                        console.log(result.msg)

                    }
                })
            }
        };
        return (
            <>
                {/* 模态框面板 */}
                <Form name="save" onFinish={onFinishmodal} validateMessages={validateMessages} form={form}
                    initialValues={{
                        remember: true,
                    }}>
                    <Form.Item name={'materialWarehouseId'}>
                    </Form.Item>
                    <Form.Item name={'name'} label="仓库名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'lon'} label="经度" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'lat'} label="纬度" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            确定
    </Button>
                        <Button onClick={this.props.handleCancel}>
                            取消
    </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    //关闭添加模态框
    handleCancel = () => {
        this.setState({
            modalvisible: false,
        });

        // this.addform.current.resetFields();
    };
    componentDidMount() {
    }
}
function mapStateToProps(state) {
    return {
        test: state.home.test,
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
)(StoreManage);