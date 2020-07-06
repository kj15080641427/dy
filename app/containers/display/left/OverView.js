/**
 * OverView 2020-07-06
 */
import React from 'react';
import "./style.scss";
class OverView extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return ( 
      <div className="dis-overview">
        <div className="dis-ov-board">
          dis-ov-board
        </div>
        <div className="dis-ov-table">
          dis-ov-table
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
export default OverView;