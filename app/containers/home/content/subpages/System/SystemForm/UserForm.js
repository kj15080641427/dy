/**
 * water 2020-06-14
 * zdl
 * 用户增加修改表单
 */
import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Radio,
    message,
    Modal
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { updateUser, saveUser, queryRole } from '@app/data/request';
// import ResizableTextArea from 'antd/lib/input/ResizableTextArea';


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
            roleArr: [],//角色集合
        };
        this.formRef = this.props.form
    }
    onFinish = values => {
        console.log(values.userId);
        if (values.userId === undefined) {
            saveUser(values).then((result) => {
                console.log(result)
                if (result.code === 200) {
                    message.success('新增成功！');
                    this.props.selectPage();
                    this.onCancel();
                } else {
                    console.log(result.msg)
                    message.error(result.msg);
                }
            })
        } else {
            updateUser(values).then((result) => {
                console.log(result)
                if (result.code === 200) {
                    message.success('修改成功！');
                    this.props.selectPage()
                    this.onCancel();
                } else {
                    console.log(result.msg)
                    message.error(result.msg);
                }
            })
        }
    };
    onCancel = () => {
        this.props.onCancel()//调用父组件给的方法
    };
    render() {
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        console.log("Test this.props.match", this.props.match, this.props.location);
        console.log("11111111111111111111111111111111111111111111", this.props.rowObj)
        console.log(this.formRef.current)
        const { roleArr } = this.state
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
                            name="username"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {this.props.rowObj === null ?
                            <>
                                <Form.Item
                                    name="password"
                                    label="密码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="确认密码"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入确认密码!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('两次输入密码不一致!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                            name="roleId"
                            label="角色"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择角色!',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: "100%",
                                }}
                            >
                                {
                                    roleArr.map((item, i) => {
                                        return (
                                            <Option key={`${i}`} value={item.roleId+""}>{item.roleDesc}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                                <Form.Item
                                    name="idcard"
                                    label={
                                        <span>
                                            身份证号&nbsp;
                                        </span>
                                    }
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="手机号码"
                                >
                                    <Input
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
                            </> : null}
                        <Form.Item
                            name="realname"
                            label="真实姓名"
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>

                        
                        <Form.Item label="是否冻结账号" name="state">

                            <Radio.Group>
                                <Radio value={'1'}>是</Radio>
                                <Radio value={'0'}>否</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="userId"
                        >
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
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
        queryRole({
            current: 1,
            size: 1000
        }).then((result) => {
            console.log(result.data.records)
            this.setState({
                roleArr: result.data.records
            })
        })
    }
    // componentDidUpdate() {
    // }
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