import React, { Component } from 'react';

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    const { videoControl } = props;

    this.state = {
      session: videoControl.getLoginStatus() === true ? videoControl.getSession() : null,
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
    var iframe = document.getElementById("iframe1"); //获取iframe标签
    var iwindow = iframe.contentWindow; //获取iframe的window对象
    var idoc = iwindow.document; //获取iframe的document对象
    console.log(idoc.getElementById("h5sVideo1")); //获取iframe的html
    console.log("body", idoc.video);
  }

  render() {
    return (
      <div>
        {this.state.session !== null ?
          <iframe
            id="iframe1"
            src={`http://172.19.112.74/video/index.html?sessionId=${this.state.session}&token=${this.state.token}&type=${this.state.type}`}
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
