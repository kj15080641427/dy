/**
 * water 2020-06-13
 * zdl
 * 权限增加修改表单
 */
import React from 'react';
import { Form, Input, Button, Select, Modal, message } from 'antd';
import { updatePermission, savePermission } from '@app/data/request';


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
        this.state = {};
        this.formRef = this.props.form;
    }

    onFinish = values => {
        console.log(values);
        if (values.permissionId === undefined) {
            savePermission(values).then((result) => {
                console.log(result)
                if (result.data) {
                    message.success('新增成功！');
                    this.props.selectPage();
                    this.props.onCancel();
                } else {
                    console.log(result.msg)
                }
            })
        } else {
            updatePermission(values).then((result) => {
                console.log(result)
                if (result.data) {
                    message.success('修改成功！');
                    this.props.selectPage()
                    this.props.onCancel();
                } else {
                    console.log(result.msg)
                }
            })
        }
    };
    onCancel = () => {
        this.props.onCancel()//调用父组件给的方法
    };
    render() {
        console.log("Test this.props.match", this.props.match, this.props.location);
        return (
            <>
                <Modal
                    forceRender={true}
                    onCancel={this.onCancel}
                    visible={this.props.visible}
                    title='新增自动升级'
                    footer={null}
                >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="permName"
                            label="权限名"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="url"
                            label="请求URL"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="permTag"
                            label="权限标识符"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="permissionId"
                        >
                        </Form.Item>
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
    componentDidMount() { }
    componentDidUpdate() {
    }
    // componentDidMount() {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
    // componentWillReceiveProps() {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
    // componentWillUpdate() {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
    // componentWillUnmount() {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
    // shouldComponentUpdate () {
    //     this.formRef.current.setFieldsValue(this.props.rowObj)
    // }
}
export default JurisdicForm;