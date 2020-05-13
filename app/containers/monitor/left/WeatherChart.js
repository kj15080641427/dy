/**
 * WeatherChart 2020-05-12
 */
import React from 'react';
import "./style.scss";
class WeatherChart extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="m-wth-chart">WeatherChart</div>
    );
  }
  componentDidMount() {}
}
export default WeatherChart;