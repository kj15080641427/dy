/**
 * Person 2020-05-14
 */
import React from 'react';
import "./style.scss";
class Person extends React.PureComponent {
  static type = "person";
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.onClose = this.onClose.bind(this);
  }
  render() {
    let { model } = this.props;
    return ( 
      <div className="m-ovl-box m-ovl-person" ref={(node) => { this.container = node;}}>
        {<div className="m-ovl-line"><span>姓名: {model.id}</span><span>职位: 工程师</span></div>}
        <div className="m-ovl-line"><span>电话: 12345678901</span><span className="iconfont iconshipin m-ovl-video"></span></div>
        <span className="iconfont iconcuo m-ovl-close" onClick={this.onClose}></span>
      </div>
    );
  }
  componentDidCatch() {

  }
  componentDidMount() {
    let { map, model } = this.props;
    map.addOverlay(model.id, { Coordinate: model.lonlat, offset: [13, -25] }, this.container);
    
  }
  componentWillUnmount() {
    let { map, model } = this.props;
    map.removeOverlay(model.id);
    document.getElementsByClassName("monitor")[0].appendChild(this.container);
    
  }
  onClose() {
    let { onClose, model } = this.props;
    if (onClose) {
      onClose(model.id, Person.type);
    }
  }
}
export default Person;