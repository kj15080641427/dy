/**
 * WeatherTable 2020-05-12
 */
import React from 'react';
import "./style.scss";
class WeatherTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="m-wth-table">WeatherTable</div>
    );
  }
  componentDidMount() {}
}
export default WeatherTable;