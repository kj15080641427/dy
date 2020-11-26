/**
 * water 2020-06-13
 * zdl
 * 防汛模型
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/home";
import Trimap from "../../../../../components/3dmap/Trimap";
class LoginLog extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};

    let imgUrl = require("../../../../../resource/yld.png");
    this.points = [
      {
        name: "test",
        code: "2039484",
        position: {
          lon: 118.58,
          lat: 37.53,
        },
        point: {
          pixelSize: 20,
          outlineWidth: 2,
        },
        billboard: {
          image: "'" + imgUrl + "'",
          width: 16,
          height: 16,
        },
      },
    ];
  }
  render() {
    console.log("Test this.props.match", this.props.match, this.props.location);
    return (
      <>
        <div style={{ height: "914px", position: "relative" }}>
          <Trimap points={this.points} />
          {/*<iframe frameborder="0" scrolling="no" src="http://47.104.228.80:8081/HYMM_DY/Index.html"*/}
          {/*    style={{*/}
          {/*        width: "100%",*/}
          {/*        height: 950,*/}
          {/*        position: 'absolute', margin: 'auto',*/}
          {/*        top: -0, left: 0, bottom: 0, right: 0,*/}
          {/*    }}></iframe>*/}
        </div>
      </>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginLog);
