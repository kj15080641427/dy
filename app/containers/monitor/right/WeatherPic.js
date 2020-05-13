/**
 * WeatherPic 2020-05-12
 */
import React from 'react';
import "./style.scss";
class WeatherPic extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="m-wth-pic">WeatherPic</div>
    );
  }
  componentDidMount() {}
}
export default WeatherPic;