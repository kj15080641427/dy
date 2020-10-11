import React, { Component } from 'react';

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    const { videoControl } = props;

    this.state = {
      session: videoControl?.getLoginStatus() === true ? videoControl.getSession() : null,
      token: props.token,
      type: props.type
    }
  }

  componentDidMount() {
    const { videoControl } = this.props;

    if (videoControl && this.state.session === null) {
      videoControl.login(null, null)
        .then((sessionId) => this.setState({ session: sessionId }));
    }
  }

  render() {
    return (
      <div>
        {this.state.session !== null ?
          <iframe
            src={`http://218.56.180.250:9110/video/index.html?sessionId=${this.state.session}&token=${this.state.token}&type=${this.state.type}`}
            style={this.props.style}
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            controls="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
          /> : null}
      </div>
    );
  }
}

export default VideoComponent;
