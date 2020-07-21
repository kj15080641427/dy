/**
 * Authority 2020-07-19
 * zdl
 * 导出选择
 */
import React from 'react';
import { Table, Row, Modal, Input, Button, Select, Form, Radio, DatePicker, Switch, Popconfirm, message, Col } from 'antd';
import { radioExportExcel } from '@app/data/request';

class DataExcel extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            datavalue: '',
            codevalue: '',
            indtype: '',
        };
    }
    onCancel = () => {
        this.props.onCancel()//调用父组件给的方法
    };
    onOK = () => {
        var url = "/api/station/exportExcel";
        if (this.state.datavalue !== '' || this.state.codevalue !== '') {
            url += "?dateSource=" + this.state.datavalue + "&region=" + this.state.codevalue + "&indtype=" + this.state.indtype;
        }
        window.location.href = url;
        this.props.onCancel()
        // radioExportExcel({
        //     'dateSource': this.state.datavalue,

        // }).then((result) => {
        //     console.log(result)
        //     this.props.onCancel()//调用父组件给的方法
        // })
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            datavalue: value
        })
    }
    handleChangeadd = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            codevalue: value
        })
    }
    handleChangeintype = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            indtype: value
        })
    }
    render() {

        return (
            <>
                <Modal
                    onCancel={this.onCancel}
                    visible={this.props.Excelvisible}
                    onOk={this.onOK}
                    width={'50%'}
                >
                    <Row>
                        <Col span={8}>
                            来源： <Select defaultValue={''} style={{ width: 200 }} onChange={this.handleChange}>
                                <Option value={''}>全部</Option>
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
                        </Col>
                        <Col span={8}>
                            区域：<Select defaultValue={''} style={{ width: 200 }} onChange={this.handleChangeadd}>
                                <Option value={''}>全部</Option>
                                <Option value={370502}>东营区(开发区)</Option>
                                <Option value={370503}>河口区(东营港)</Option>
                                <Option value={370521}>垦利区</Option>
                                <Option value={370522}>广饶县(省农高区)</Option>
                                <Option value={370523}>河道</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            监测类型：<Select defaultValue={''} style={{ width: 200 }} onChange={this.handleChangeintype}>
                                <Option value={''}>全部</Option>
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
                        </Col>
                    </Row>

                </Modal>
            </>
        );
    }

    componentDidMount() {

    }
}
export default DataExcel;