import React, { Component } from "react";

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    const { videoControl } = props;

    this.state = {
      session:
        videoControl?.getLoginStatus() === true
          ? videoControl.getSession()
          : null,
      token: props.token,
      type: props.type,
    };
  }

  componentDidMount() {
    const { videoControl } = this.props;

    if (videoControl && this.state.session === null) {
      videoControl
        .login(null, null)
        .then((sessionId) => this.setState({ session: sessionId }));
    }
  }

  render() {
    return (
      <>
        {this.state.session !== null ? (
          <iframe
            src={`http://218.56.180.250:9110/video/index.html?sessionId=${this.state.session}&token=${this.props.token}&type=${this.state.type}`}
            style={this.props.style}
            scrolling="no"
            frameBorder="0"
            allowFullscreen="true"
            controls="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
          />
        ) : null}
      </>
    );
  }
}

export default VideoComponent;
