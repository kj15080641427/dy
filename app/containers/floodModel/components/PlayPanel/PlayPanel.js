import React, {Component} from 'react';
import moment from "moment";
import {Slider} from "antd";

class PlayPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: 1,
        };
    }

    render() {
        const {beginTime, endTime} = this. props;
        let during = endTime.format('x') - beginTime.format('x');
        let timestamp = moment.duration(during);
        let max = timestamp.asHours();

        if (max <= 0) {
            max = this.state.max;
        }

        let markers = [];
        let startTime = beginTime;

        for (let i = 0; i < max; i++) {
            startTime.add(1, 'h');
            markers.push({
                i: {
                    label: startTime.format('HH'),
                    value: startTime
                }
            });
        }

        return (
            <div>
                <Slider min={this.state.min} max={max} dots={true} marks={markers}/>
            </div>
        );
    }
}

export default PlayPanel;
