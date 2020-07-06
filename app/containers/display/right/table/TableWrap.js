/**
 * TableWrap 2020-07-06
 */
import React from 'react';

class TableWrap extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    let { title, extra } = this.props;
    return ( 
      <div className="dis-table-wrap">
        <div className="dis-table-head">
          <span className="dis-table-head-title">{title}</span>
          {extra ? <span className="dis-table-head-extra">{extra}</span> : ""}
        </div>
        {this.props.children}
      </div>
    );
  }
  componentDidMount() {}
}
export default TableWrap;