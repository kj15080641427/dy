/**
 * WeatherPic 2020-06-02
 * zdl
 * 东营五个区县天气预报
 */
import React from 'react';
import "../style.scss";
import { Row, Divider, Collapse } from 'antd';
import { GetProductsForecast } from "@app/data/request";
class Forecast extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {},//天气对象
            title: "",
            today: [],
            tomorrow: []
        };
    }
    render() {
        const todays = [];
        for (var i = 0; i < this.state.today.length; i++) {
            todays.push(
                <p style={{ fontSize: 13 }}>{this.state.today[i]}</p>
            )
        }
        const tomorrows = [];
        for (var i = 0; i < this.state.tomorrow.length; i++) {
            tomorrows.push(
                <>
                    <p style={{ fontSize: 13 }}>{this.state.tomorrow[i]}</p>
                    {/* <Divider>Text</Divider> */}
                </>
            )
        }
        return (
            <div className="m-forecast-dev" >
                {/* <Divider orientation="left">{this.state.title}</Divider> */}
                <Collapse accordion height={350}>
                    {todays}
                    {tomorrows}
                </Collapse>
            </div >
        );
    }
    componentDidMount() {
        GetProductsForecast().then((res) => {
            // console.log(res.data.productText)
            let result = res.data.productText.split("\r\n\r\n");
            let title = result[0];
            let forecaster = result[3];
            let today = result[1].split("\r\n");
            let todaytit = result[1].split("\r\n")[0];
            let tomorrowtit = result[2].split("\r\n")[0];
            let tomorrow = result[2].split("\r\n");
            this.setState({
                data: res.data,
                title: result[0],
                today: result[1].split("\r\n"),
                tomorrow: result[2].split("\r\n")
            })
        })
    }
}

export default Forecast;