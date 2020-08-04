/**
 * WaterAnnunciate 2020-07-28
 * 积水情通告报表
 */
import React from 'react';
import { Table, DatePicker, Button, Row, Col } from 'antd';
import { tableColumnWater } from './columns/columsData';
import { downlRiver, downlPointdata } from '@app/data/request';
import moment from 'moment';
class WaterAnnunciate extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            loding: false,
            time: '',
        };
        this.init = this.init.bind(this)
    }
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);

    }
    onOk = (value) => {
        this.setState({
            time: moment(value).format('YYYY-MM-DD HH:mm:ss')
        })
    }
    downl = () => {
        var url = "/api/download/point";
        if (this.state.time !== '') {
            url += "?tm=" + this.state.time;
        }
        window.location.href = url;
    }
    render() {

        return (
            <>
                <Row>
                    <Col span={5}>
                    时间选择： <DatePicker size='large' showTime onChange={this.onChange} onOk={this.onOk} />
                    </Col>
                    <Col span={2}>
                        <Button type='primary' size='large' onClick={this.init}>查询</Button>
                    </Col>
                    <Col span={2}>
                        <Button type='primary' size='large' onClick={this.downl}>导出</Button>
                    </Col>
                    <Col span={12}></Col>
                </Row>



                <br />
                <Table
                    columns={tableColumnWater}
                    dataSource={this.state.data}
                    loading={this.state.loding}
                >
                </Table>
            </>
        )
    }
    init() {
        this.setState({
            loding: true
        })
        downlPointdata({ 'tm': this.state.time }).then((result) => {
            this.setState({
                data: result.data,
                loding: false
            })
            console.log(result)
        })
    }
    componentDidMount() {
        this.init()
    }
}
export default WaterAnnunciate;