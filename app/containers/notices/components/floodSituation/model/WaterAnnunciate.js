/**
 * WaterAnnunciate 2020-07-28
 * 积水情通告报表
 */
import React from 'react';
import { Table, Row, Col } from 'antd';
import { tableColumnWater } from '../columns/columsData';
class WaterAnnunciate extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
        };
    }
    render() {
        let { data } = this.state;
        let { loding } = this.props;
        return (
            <>
                <br />
                <Table
                    title={this.title}
                    columns={tableColumnWater}
                    dataSource={data}
                    loading={loding}
                    rowKey={row => row.number}
                >
                </Table>
            </>
        )
    }
    title() {
        return <Row ><Col span={10}></Col> <Col span={4} style={{
            fontSize: 30,
            fontWeight: 1000,
        }
        }>水情通报</Col><Col span={10}></Col></Row >
    }
    componentDidUpdate() {
        this.setState({
            data: this.props.dataSource,
        })
    }
}
export default WaterAnnunciate;