/**
 * PannelBtn 2020-05-12
 */
import React from 'react';
import "./style.scss";
class PannelBtn extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="m-pannel-btns">PannelBtn</div>
    );
  }
  componentDidMount() {}
}
export default PannelBtn;