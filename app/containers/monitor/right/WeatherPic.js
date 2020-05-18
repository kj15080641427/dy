/**
 * WeatherPic 2020-05-12
 */
import React from 'react';
import "./style.scss";
import { Carousel } from 'antd';
import imgURL from '../../../resource/title_bg.png';

class WeatherPic extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div className="m-wth-pic">
        <img className="m-pic-img" src={imgURL} alt="" />
        <div className="m-pic-div">
          <div className="m-pic-div-img">
          <Carousel autoplay>
            <div>
            <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
            <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() { }
}
export default WeatherPic;