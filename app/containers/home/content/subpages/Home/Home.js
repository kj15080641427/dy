/**
 * Home 2020-06-22
 * 业务首页
 */
import React from "react";
import "./style.scss";
import FutureWeather from "./FutureWeather";
// import WaterCourse from "./WaterCourse"
class Home extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weatherData: {
        weather: [
          2.6,
          5.9,
          9.0,
          26.4,
          28.7,
          70.7,
          175.6,
          182.2,
          48.7,
          18.8,
          6.0,
          2.3,
        ],
        time: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        temperature: [
          2.0,
          2.2,
          3.3,
          4.5,
          6.3,
          10.2,
          20.3,
          23.4,
          23.0,
          16.5,
          12.0,
          6.2,
        ],
      },
    };
  }

  render() {
    return (
      <>
        {/* <FutureWeather weatherData={this.state.weatherData}></FutureWeather> */}
        {/* <WaterCourse></WaterCourse> */}
      </>
    );
  }
  componentDidMount() {}
}
export default Home;
