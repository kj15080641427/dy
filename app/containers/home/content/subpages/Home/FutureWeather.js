/**
 * Home 2020-06-22
 * 未来温度与降水
 */
import React from 'react';
import "./style.scss";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts';

class FutureWeather extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    render() {
        return (
            <div id="futureWeather" style={{ width: '100%', height: '100%' }}>
            </div>
        )
    }
    showfutureWeather() {
        var myChart = echarts.init(document.getElementById("futureWeather"));
        myChart.setOption(
            {
                title: {
                    text: '未来六日气温与降水变化',
                    subtext: '6月22日23:00至6月28日05:00',
                    // left: 'center',
                },
                grid: {
                    top: 90,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['降水量', '温度']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.props.weatherData.time,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '降水量',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        },

                    },
                    {
                        type: 'value',
                        name: '温度',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [
                    {
                        name: '降水量',
                        data: this.props.weatherData.weather,
                        markLine: {
                            label: {
                                position: "end",
                            },
                            lineStyle: {
                                type: 'solid',
                                width: 2
                            },
                            // color: '#ffcc33',
                            data: [
                                {
                                    label: {
                                        position: 'center',
                                        formatter: 10,
                                        itemStyle: {
                                            left: '100px'
                                        }
                                    },
                                    yAxis: 10,
                                }
                            ]
                        },
                        type: 'bar',
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                {
                                    type: 'min', name: '最小值', itemStyle: {
                                        color: '#03d6d6'
                                    }
                                }
                            ],

                        },
                    },
                    {
                        name: '温度',
                        yAxisIndex: 1,
                        data: this.props.weatherData.temperature,
                        markLine: {
                            label: {
                                position: "end",
                            },
                            // color: '#ffcc33',
                            data: [
                                {
                                    silent: false,
                                    label: {
                                        position: 'center',
                                        formatter: 13,
                                        itemStyle: {
                                            left: '100px'
                                        }
                                    },
                                    yAxis: 13,
                                }
                            ]
                        },
                        type: 'line',
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                {
                                    type: 'min', name: '最小值', itemStyle: {
                                        color: '#03d6d6'
                                    }
                                }
                            ],

                        },
                    }
                ]
            }

        )
    }
    componentDidMount() {
        this.showfutureWeather()
    }
}
export default FutureWeather;