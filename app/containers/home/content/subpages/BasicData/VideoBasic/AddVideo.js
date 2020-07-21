/**
 * water 2020-07-17
 * zdl
 * 视频站点增加
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
import { radioSave, radioUpdate } from '@app/data/request';


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
class AddVideo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            roleArr: [],//角色集合
        };
        this.formRef = this.props.form
    }
    onFinish = values => {
        console.log(values);
        if (values.radioID === undefined) {
            radioSave(values).then((result) => {
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
            radioUpdate(values).then((result) => {
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
        const { roleArr } = this.state
        return (
            <>
                <Modal
                    forceRender={true}
                    onCancel={this.onCancel}
                    visible={this.props.visible}
                    title='新增站点'
                    footer={null}
                    width={"50%"}
                >
                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}
                    >
                        <Form.Item name="radioID">

                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="sitename"
                                    label="视频名称"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入视频名称!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="region"
                                    label="区域编码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入区域编码!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="regionName"
                                    label="区域名称"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入区域名称!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="address"
                                    label="详细地址"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: '请输入详细地址!',
                                //     },
                                // ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="ntype"
                                    label="视频类别"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="strurl"
                                    label="视频地址"

                                >
                                    <Input defaultValue="172.19.112.74:8888" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="struser"
                                    label="访问用户名"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="sitetype"
                                    label="站点类别"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row> */}

                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="lon"
                                    label="经度"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入经度!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item
                                    name="lat"
                                    label="纬度"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入纬度!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="dataSource"
                                    label="来源"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择来源!',
                                        },
                                    ]}
                                >
                                    <Select defaultValue={0} style={{ width: "100%" }}>
                                        <Option value={0}>未知</Option>
                                        <Option value={1}>水文局</Option>
                                        <Option value={2}>气象局</Option>
                                        <Option value={3}>水务局积水点</Option>
                                        <Option value={4}>农村基层防汛监测预警平台</Option>
                                        <Option value={5}>河道</Option>
                                        <Option value={6}>河口区水利局</Option>
                                        <Option value={7}>水务局河道</Option>
                                        <Option value={8}>广饶县</Option>
                                        <Option value={9}>开发区城管局</Option>
                                        <Option value={10}>天鹅湖蓄滞洪区</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="code"
                                    label="唯一编码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入唯一编码!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                        </Row>

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
    }
}
export default AddVideo;