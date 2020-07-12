/**
 * easyFlood 2020-07-08
 */
import React from 'react';
import './style.scss';
import emitter from "@app/utils/emitter.js";
import moment from 'moment';
import { Pagination } from 'antd';
class easyFlood extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        let data = this.props.dataSource;
        let elements = []
        for (let i = 0; i < data.length; i++) {
            elements.push(
                <tr key={i}>
                    <td style={{ width: 200 }}>{data[i].name + "(" + data[i].dataSourceDesc + ")"}</td>
                    <td>{(data[i].z * 1).toFixed(1)}</td>
                    <td>{data[i].ztm === null ? "--" : moment(data[i].ztm).format("MM-DD HH:mm")}</td>
                </tr>
            )
        }
        return (
            <div >
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th style={{ width: 200 }}>站名(来源)</th>
                                <th>水位(m)</th>
                                <th>更新时间</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: 300 }}>
                            {elements}
                        </tbody>
                        {/* <Pagination></Pagination> */}
                    </table>
                </div>
            </ div>
        );
    }

    componentDidMount() { }
}
export default easyFlood;