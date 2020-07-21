/**
 * PannelBtn 2020-05-12
 * zdl
 * 天气，日常，防汛
 */
import React from 'react';
import "./style.scss";
import { Spin, Switch, Card, Divider, Empty, Row, Col } from 'antd';
import moment from "moment";
import { GetEarlyWarnning } from "@app/data/request";
import imgURL from '@app/resource/title_bg.png';
const { Meta } = Card;
class WeatherDy extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            contentObj: [],
            loading: true,
        };
    }
    render() {
        const { loading, contentObj } = this.state;
        const elements = [];
        if (contentObj.length != 0) {
            for (let i = 0; i < contentObj.length; i++) {
                let coltype = (contentObj[i].yjHissignal).substring(3);
                elements.push(
                    <>
                        <Row>
                            <Col span={4}><img style={{ height: 80, width: 80 }} src={"http://58.59.29.51:14003/yjicon/" + contentObj[i].yjHissignal + ".jpg"}></img></Col>
                            <Col span={20}>
                                <Row className="dywtitle"
                                    style={coltype === '0' ? { color: '#007ed7' } : coltype === '1' ? { color: '#eee54c' } : coltype === '3' ? { color: '#ec595f' } : coltype === '2' ? { color: '#f07b1c' } : { color: '#fe991' }}
                                >{contentObj[i].cityName + "发布" + contentObj[i].yjTitle + "预警"}</Row>
                                <Row>{moment(contentObj[i].yjIssuedate).format("YYYY/MM/DD HH:mm:ss")}</Row>
                                <Row>{contentObj[i].yjContent}</Row>
                            </Col>
                        </Row >
                        <hr></hr>
                    </>
                )
            }
        } else {
            elements.push(<a className="notwdy" >当前暂无气象预警</a>)
        }
        return (
            <div className="m-pannel-WDy-rain">
                <img className="m-alm-img" src={imgURL} alt="" />
                <div className="m-WDy-div-rain">
                    <Spin style={{
                        'position': 'relative',
                        top: 40
                    }} spinning={loading} >
                        <div className="m-inner-div-rain">
                            {elements}
                        </div>
                    </Spin>
                </div>
            </div>
        );
    }
    selectInit() {
        this.setState({ loading: true, })
        GetEarlyWarnning().then((res) => {
            console.log(res.data.content)
            this.setState({ loading: false, contentObj: res.data.content })
        })

    }
    componentDidMount() {
        this.selectInit()
        this.init = window.setInterval(() => {
            this.selectInit()
        }, 1000 * 5 * 60)
    }
    componentWillUnmount() {
        clearTimeout(this.init);
    }
}
export default WeatherDy;