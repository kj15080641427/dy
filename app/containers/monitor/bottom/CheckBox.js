/**
 * CheckBox 2020-05-13
 */
import React from 'react';
import "./style.scss";
class CheckBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="m-checkbox-row">CheckBox-row</div>
        <div className="m-checkbox-col">CheckBox-col</div>
      </>
    );
  }
  componentDidMount() {}
}
export default CheckBox;