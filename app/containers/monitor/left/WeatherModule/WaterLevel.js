/**
 * Precipitation 2020-05-18
 */
import React from 'react';
import "../style.scss";
import localimgURL from '../../../../resource/local.png';
import { Table, Popover, Tag } from 'antd';
import moment from 'moment';

class Precipitation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            qydataSource: [],
            loading: false,
            total: 0,
            current: 1,
            pageSize: 10,
        };
    }
    getByteLen(val) {
        var len = 0;
        if (val !== null && val !== "") { 
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
    }
        return len / 2;
    }
render() {
    const qycolumns = [
        
        {
            title: '站点编号',
            dataIndex: 'stcd',
            width: 109,
            className: 'column-money'
        },
        {
            title: '站名',
            dataIndex: 'stnm',
            width: 75,
            className: 'column-money',
            render:
                stnm => {
                    if (this.getByteLen(stnm) > 4 && stnm !== null && stnm !== "") {
                        return (
                            <Popover content={stnm} title="站名全称">
                                <Tag>
                                    {stnm.substring(0, 2) + '...'}
                                </Tag>
                            </Popover>
                        )
                    } else {
                        return (
                            <Tag>
                                {stnm ? stnm : "暂无数据"}
                            </Tag>
                        )
                    }
                }
        },
        {
            title: '监测时间',
            dataIndex: 'tm',
            width: 140,
            className: 'column-money',
            render: value => moment(value).format("YYYY-MM-DD HH:mm")
        },
        {
            title: '监测值(m)',
            dataIndex: 'z',
            width: 109,
            className: 'column-money',
            render: dayAvg => Math.round(dayAvg * 1000) / 1000
        },
        {
            title: '定位',
            dataIndex: 'loca',
            render: value => <img src={localimgURL} alt="" />,
            className: 'column-money'
        },
    ];

    const { loading } = this.state;
    let pagination = {
        total: this.state.total,
        size: "small",
        current: this.state.current,
        onChange: (current) => this.changePage(current),
        pageSize: this.state.pageSize,
        onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
            console.log(pageSize);
            this.onShowSizeChange(current, pageSize)
        }
    }
    return (
        <Table className="m-div-table"
            size="small"
            loading={loading}
            columns={qycolumns}
            dataSource={this.state.qydataSource}
            scroll={{ y: 285 }}
            pagination={pagination} />
    );
}
onShowSizeChange(current, pageSize) {
    this.setState({ loading: true });
    fetch("/api/riverwaterdata/history", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "current": current,
            "size": pageSize
        })
    })
        .then((response) => response.json())
        .then((result) => {
            this.setState({ qydataSource: result.data.records })
            this.setState({ loading: false });
            this.setState({ current: result.data.current })
            this.setState({
                pageSize: pageSize
            })
        })
}

// 回调函数，切换下一页
changePage(current) {
    console.log(current)
    this.setState({ loading: true });
    fetch("/api/riverwaterdata/history", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "current": current,
            "size": this.state.pageSize
        })
    })
        .then((response) => response.json())
        .then((result) => {
            this.setState({ qydataSource: result.data.records })
            this.setState({ loading: false });
            this.setState({ total: result.data.total })
            this.setState({ current: result.data.current })
        })
}
componentDidMount() {
    this.setState({ loading: true });
    fetch("/api/riverwaterdata/history", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "current": this.state.current,
            "size": this.state.size
        })
    })
        .then((response) => response.json())
        .then((result) => {
            this.setState({ qydataSource: result.data.records })
            this.setState({ loading: false });
            this.setState({ total: result.data.total })
            console.log(result.data.records)
        })
}
}
export default Precipitation;