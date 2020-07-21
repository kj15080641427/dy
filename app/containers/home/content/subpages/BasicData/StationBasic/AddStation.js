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
    Modal,
    Switch
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { stationSave, stationUpdate } from '@app/data/request';


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
class AddStation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.formRef = this.props.form
    }
    onFinish = values => {
        console.log(values);
        if (values.stationID === undefined) {
            stationSave(values).then((result) => {
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
            stationUpdate(values).then((result) => {
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
                        <Form.Item name="stationID">

                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="站点名称"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入站点名称!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="stcd"
                                    label="测站编码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入测站编码!',
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
                                    name="indtype"
                                    label="测站监测类型"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择来源测站监测类型!',
                                        },
                                    ]}
                                >
                                    <Select defaultValue={1} style={{ width: "100%" }}>
                                        <Option value={1}>水文</Option>
                                        <Option value={2}>区域水文</Option>
                                        <Option value={3}>降水</Option>
                                        <Option value={4}>中小河流水文</Option>
                                        <Option value={5}>中小河流降水</Option>
                                        <Option value={6}>自建降水</Option>
                                        <Option value={7}>中小河流水位</Option>
                                        <Option value={8}>水位</Option>
                                        <Option value={9}>积水点水位站(易捞点)</Option>
                                        <Option value={10}>积水点雨量站</Option>
                                        <Option value={11}>天鹅湖蓄滞洪区</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="indname"
                                    label="测站监测类型名称"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入测站监测类型名称!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="region"
                                    label="地区编码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入地区编码!',
                                        },
                                    ]}
                                ><Input />
                                </Form.Item>
                            </Col>
                        </Row>
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
                                    name="isshow"
                                    label="是否显示"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择是否显示!',
                                        },
                                    ]}
                                >
                                    <Radio.Group >
                                        <Radio value={true}>隐藏</Radio>
                                        <Radio value={false}>显示</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item
                                    name="warning"
                                    label="警戒值"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入警戒值!',
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
                                    <Select defaultValue={1} style={{ width: "100%" }}>
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
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="sortRule"
                                    label="排序规则"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择排序规则!',
                                        },
                                    ]}
                                >
                                    <Select defaultValue={1} style={{ width: "100%" }}>
                                        <Option value={1}>气象局</Option>
                                        <Option value={2}>水文局</Option>
                                        <Option value={3}>农村基层防汛</Option>
                                        <Option value={4}>积水点</Option>
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dataSourceDesc"
                                    label="数据来源描述"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入数据来源描述!',
                                        },
                                    ]}
                                >
                                    <Input />
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
export default AddStation;