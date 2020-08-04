/**
 * RiverAnnunciate 2020-07-25
 * 雨情通告报表
 */
import React from 'react';
import { Table, DatePicker, Button, Row, Col } from 'antd';
import { tableColumnRiver } from './columns/columsData';
import { downlRiver, downlRaindata } from '@app/data/request';
import moment from 'moment';
// import './style.scss';
class RainrAnnunciate extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {},
            loding: false,
            starttime: '',
            endtime: '',
            z: {},
            tm: "",
            dy: {},
            kl: {},
            gr: {},
            hk: {},
            lj: {},
        };
        this.init = this.init.bind(this)
    }
    onOkstart = (value) => {
        this.setState({
            starttime: moment(value).format('YYYY-MM-DD HH:mm:ss')
        })
    }
    onOkend = (value) => {
        this.setState({
            endtime: moment(value).format('YYYY-MM-DD HH:mm:ss')
        })
    }
    downl = () => {
        var url = "/api/download/rain";
        if (this.state.time !== '') {
            url += "?startTime=" + this.state.starttime + "&endTime=" + this.state.endtime;
        }
        window.location.href = url;
    }
    render() {
        const { dy, hk, kl, gr, lj, z, tm } = this.state;
        return (
            <>
                <Row>
                    <Col span={5}>
                        开始时间： <DatePicker size='large' showTime onOk={this.onOkstart} />
                    </Col>
                    <Col span={5}>
                        结束时间： <DatePicker size='large' showTime onOk={this.onOkend} />
                    </Col>
                    <Col span={2}>
                        <Button type='primary' size='large' onClick={this.init}>查询</Button>
                    </Col>
                    <Col span={2}>
                        <Button type='primary' size='large' onClick={this.downl}>导出</Button>
                    </Col>
                    <Col span={7}></Col>
                </Row>
                <br />
                <Row style={{ fontSize: 30, fontWeight: 1000, alignContent: 'center' }}>
                    <Col span={10}></Col>
                    <Col span={4}> 东营市降水量统计表</Col>
                    <Col span={10}></Col>
                </Row>
                <Row style={{ fontSize: 20 }}>
                    降水时段({tm})单位：毫米
                </Row>
                <Row>
                    <Col span={5}>
                        <table class="tg">
                            <thead>
                                <tr>
                                    <th class="tg-2xbj" colspan="3">东营</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="tg-9wq8">平均</td>
                                    <td class="tg-9wq8">{dy.p}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">--</td>
                                    <td class="tg-9wq8">--</td>
                                    {/* <td class="tg-9wq8">{dy.a}</td> */}
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">广利港</td>
                                    <td class="tg-9wq8">{dy.b}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">龙居</td>
                                    <td class="tg-9wq8">{dy.c}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">史口</td>
                                    <td class="tg-9wq8">{dy.d}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">牛庄</td>
                                    <td class="tg-9wq8">{dy.e}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">东营南站</td>
                                    <td class="tg-9wq8">{dy.f}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">辛店</td>
                                    <td class="tg-9wq8">{dy.g}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">开发区</td>
                                    <td class="tg-9wq8">{dy.h}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">--</td>
                                    <td class="tg-9wq8">--</td>
                                    {/* <td class="tg-9wq8">{dy.i}</td> */}
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">--</td>
                                    <td class="tg-9wq8">--</td>
                                    {/* <td class="tg-9wq8">{dy.j}</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={5}>
                        <table class="tg">
                            <thead>
                                <tr>
                                    <th class="tg-2xbj" colspan="3">河口</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="tg-9wq8">平均</td>
                                    <td class="tg-9wq8">{hk.p}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">城区</td>
                                    <td class="tg-9wq8">{hk.a}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">东营港</td>
                                    <td class="tg-9wq8">{hk.b}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">新户渔港</td>
                                    <td class="tg-9wq8">{hk.c}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">一千二林场</td>
                                    <td class="tg-9wq8">{hk.d}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">新户</td>
                                    <td class="tg-9wq8">{hk.e}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">仙河</td>
                                    <td class="tg-9wq8">{hk.f}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">孤岛</td>
                                    <td class="tg-9wq8">{hk.g}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">义和</td>
                                    <td class="tg-9wq8">{hk.h}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">六合</td>
                                    <td class="tg-9wq8">{hk.i}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">太平</td>
                                    <td class="tg-9wq8">{hk.j}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={4}>
                        <table class="tg">
                            <thead>
                                <tr>
                                    <th class="tg-2xbj" colspan="3">垦利</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="tg-9wq8">平均</td>
                                    <td class="tg-9wq8">{kl.p}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">城区</td>
                                    <td class="tg-9wq8">{kl.a}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">红光渔港</td>
                                    <td class="tg-9wq8">{kl.b}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">郝家</td>
                                    <td class="tg-9wq8">{kl.c}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">永安</td>
                                    <td class="tg-9wq8">{kl.d}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">西宋</td>
                                    <td class="tg-9wq8">{kl.e}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">黄河口镇</td>
                                    <td class="tg-9wq8">{kl.f}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">董集</td>
                                    <td class="tg-9wq8">{kl.g}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">省坨</td>
                                    <td class="tg-9wq8">{kl.h}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">大汶流</td>
                                    <td class="tg-9wq8">{kl.i}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>  
                    <Col span={5}>
                        <table class="tg">
                            <thead>
                                <tr>
                                    <th class="tg-2xbj" colspan="3">广饶</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="tg-9wq8">平均</td>
                                    <td class="tg-9wq8">{gr.p}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">城区</td>
                                    <td class="tg-9wq8">{gr.a}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">盐场</td>
                                    <td class="tg-9wq8">{gr.b}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">陈官</td>
                                    <td class="tg-9wq8">{gr.c}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">丁庄</td>
                                    <td class="tg-9wq8">{gr.d}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">码头</td>
                                    <td class="tg-9wq8">{gr.e}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">大王</td>
                                    <td class="tg-9wq8">{gr.f}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">李鹊</td>
                                    <td class="tg-9wq8">{gr.g}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">花官</td>
                                    <td class="tg-9wq8">{gr.h}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">石村</td>
                                    <td class="tg-9wq8">{gr.i}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">西刘桥</td>
                                    <td class="tg-9wq8">{gr.j}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">西营</td>
                                    <td class="tg-9wq8">{gr.k}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">稻庄</td>
                                    <td class="tg-9wq8">{gr.l}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={5}>
                        <table class="tg">
                            <thead>
                                <tr>
                                    <th class="tg-2xbj" colspan="3">利津</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="tg-9wq8">平均</td>
                                    <td class="tg-9wq8">{lj.p}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">城区</td>
                                    <td class="tg-9wq8">{lj.a}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">明集</td>
                                    <td class="tg-9wq8">{lj.b}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">北宋</td>
                                    <td class="tg-9wq8">{lj.c}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">王庄林场</td>
                                    <td class="tg-9wq8">{lj.d}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">虎滩</td>
                                    <td class="tg-9wq8">{lj.e}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">汀罗</td>
                                    <td class="tg-9wq8">{lj.f}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">盐窝</td>
                                    <td class="tg-9wq8">{lj.g}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">陈庄</td>
                                    <td class="tg-9wq8">{lj.h}</td>
                                </tr>
                                <tr>
                                    <td class="tg-9wq8">陈庄工业园</td>
                                    <td class="tg-9wq8">{lj.i}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </>
        )
    }
    init() {
        this.setState({
            loding: true
        })
        downlRaindata({ 'startTime': this.state.starttime, 'endTime': this.state.endtime }).then((result) => {
            this.setState({
                dy: result.data.dy,
                gr: result.data.gr,
                hk: result.data.hk,
                kl: result.data.kl,
                lj: result.data.lj,
                tm: result.data.tm,
                z: result.data.z,
            })
            console.log(result)
        })
    }
    componentDidMount() {
        this.init()
    }
}
export default RainrAnnunciate;