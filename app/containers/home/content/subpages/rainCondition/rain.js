/**
 * rain 2020-06-7
 * zdl
 * 雨情信息
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
class Test2 extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    console.log("Test this.props.match",this.props.match,this.props.location);
    return (
      <>
        <div style={{height: '30px'}}>rain</div>

      </>
    );
  }
  componentDidMount() {}
}
function mapStateToProps(state) {
  return {
    test: state.home.test,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test2);