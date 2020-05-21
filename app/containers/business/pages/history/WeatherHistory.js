/**
 * Monitor 2020-05-12
 */
import React from 'react';
import './history.scss';
import { Row, Col, DatePicker, Select, Button, Space, Table, Card } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';
const columns = [
    {
        title: '监测点名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '数据采集日期',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '监测项名称',
        dataIndex: 'xmname',
        key: 'xmname',
    },
    {
        title: '值',
        key: 'num',
        dataIndex: 'num',
    },
    {
        title: '单位',
        key: 'unit',
        dataIndex: 'unit',
    },
];

const data = [
    {
        key: '1',
        name: '胜利大街南站',
        date: '2020-04-01 17:25:00',
        xmname: '雨量站_5min降水量',
        num: 0,
        unit: 'mm'
    },
    {
        key: '2',
        name: '胜利大街南站',
        date: '2020-04-01 17:25:00',
        xmname: '雨量站_5min降水量',
        num: 0,
        unit: 'mm'
    },
    {
        key: '3',
        name: '胜利大街南站',
        date: '2020-04-01 17:25:00',
        xmname: '雨量站_5min降水量',
        num: 0,
        unit: 'mm'
    },
];
const { Option } = Select;
const provinceData = ['雨量站', '闸位'];
const cityData = {
    '雨量站': ['雨量站1', '雨量站2', '雨量站3'],
    '闸位': ['闸位1', '闸位2', '闸位3'],
    '单位': ['单位1', '单位2', '单位3'],
};
function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
    console.log('onOk: ', value);
}

const { RangePicker } = DatePicker;
class index extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            secondunit: cityData[provinceData[0]][0][0],
        };
    }
    handleProvinceChange = value => {
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
            secondunit: cityData[value][0][0]
        });
    };

    onSecondCityChange = value => {
        this.setState({
            secondCity: value,
        });
    };

    onSsecondunitChange = value => {
        this.setState({
            secondunit: value,
        });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { cities } = this.state;
        return (
            <div>
                <div className="head-div">
                    <Row className="head-div">
                        <Col span={10}>
                            <Space>监测点:

            <Select
                                    defaultValue={provinceData[0]}
                                    style={{ width: 120 }}
                                    onChange={this.handleProvinceChange}
                                    size="large"
                                >
                                    {provinceData.map(province => (
                                        <Option key={province}>{province}</Option>
                                    ))}
                                </Select>
                                <Select
                                    style={{ width: 120 }}
                                    value={this.state.secondCity}
                                    onChange={this.onSecondCityChange}
                                    size="large"
                                >
                                    {cities.map(city => (
                                        <Option key={city}>{city}</Option>
                                    ))}
                                </Select>
                                <Select
                                    style={{ width: 120 }}
                                    value={this.state.secondunit}
                                    onChange={this.onSsecondunitChange}
                                    size="large"
                                >
                                    {cities.map(city => (
                                        <Option key={city}>{city}</Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Space>日期:
                        <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={onChange}
                                    onOk={onOk}
                                    size="large"
                                />
                            </Space>
                        </Col>
                        <Col span={6}>
                            <Space>
                                <Button type="primary" size="large" icon={<SearchOutlined />}>查询</Button>
                                <Button type="primary" size="large" icon={<UploadOutlined />}>导出Excel</Button>
                            </Space>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span={12}>
                        <Card title="Card title" bordered={false}>
                            <div id="main" className="chart-div"></div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Card title" bordered={false}>
                            <Table columns={columns} dataSource={data} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '胜利大街南站-雨量站5min降雨量 曲线图',
                subtext: '2020-05-01至2020-06-01',
                left: 'center',
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                name: '时间',
            },
            yAxis: {
                type: 'value',
                name: '降雨量（mm）'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }],
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
        });
    }
}

export default index;