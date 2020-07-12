/**
 * Precipitation 2020-07-08
 */
import React from 'react';
import './style.scss';
import emitter from "@app/utils/emitter.js";
import moment from 'moment';
import { Pagination } from 'antd';
class Precipitation extends React.PureComponent {
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
                    <td style={{ width: 210 }}>{data[i].name + "(" + data[i].dataSourceDesc + ")"}</td>
                    {/* <td style={{ width: 80 }}>{(data[i].minuteAvg * 1).toFixed(1)}</td> */}
                    <td>{(data[i].hourAvg * 1).toFixed(1)}</td>
                    <td>{(data[i].dayAvg * 1).toFixed(1)}</td>
                    <td>{data[i].tm === null ? "--" : moment(data[i].tm).format("MM-DD HH:mm")}</td>
                </tr>
            )
        }
        return (
            <div >
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th style={{ width: 210 }}>站名(来源)</th>
                                {/* <th style={{ width: 80 }}>5分钟</th> */}
                                <th >1小时</th>
                                <th >24小时</th>
                                <th>时间</th>
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
export default Precipitation;