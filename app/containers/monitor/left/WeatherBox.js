/**
 * WeatherBox 2020-05-12
 */
import React from 'react';
import "./style.scss";
class WeatherBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="m-wth-box">
          box
      </div>
    );
  }
  componentDidMount() {}
}
export default WeatherBox;