/**
 * RiverAnnunciate 2020-07-25
 * 河道通告报表
 */
import React from 'react';
import { Table, Row, Col } from 'antd';
import { tableColumnRiver } from '../columns/columsData';
class RiverAnnunciate extends React.PureComponent {
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
                    columns={tableColumnRiver}
                    dataSource={data}
                    loading={loding}
                    rowKey={row => row.stnm}
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
        }>河道信息</Col><Col span={10}></Col></Row >
    }
    componentDidUpdate() {
        this.setState({
            data: this.props.dataSource,
        })

    }

}
export default RiverAnnunciate;