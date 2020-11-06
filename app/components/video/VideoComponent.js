import React, {Component } from "react";

import {H5sPlayerWS} from './h5splayer';
import VideoControlPanel from "./VideoControlPanel";

const styles = {
  videoStyle: {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    backgroundColor: '#000000',
    position: 'relative',
    objectFit: 'fill',
    objectPosition: 'center'

  },
  fullScreen: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 998
  }
};

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
      containerStyle: null,
      fullScreen: false,
    };
  }

  componentDidMount() {
    const { videoControl } = this.props;

    if (videoControl && this.state.session === null) {
      videoControl
        .login(null, null)
        .then((sessionId) => {
           this.setState({ session: sessionId }, () => {
             this.updateVideo(this.props.token, sessionId);
           });
        });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.session && this.props.token !== prevProps.token) {
      this.updateVideo(this.props.token, this.state.session);
    }
  }

  componentWillUnmount() {
    if (this.video) {
      this.video.disconnect();
    }

    this.container &&
        this.container.removeEventListener('resize', this.onVideoSizeChange);
  }

  onVideoSizeChange() {
    this.updateVideo(this.props.token, this.state.session);
  }

  updateVideo(token, session) {

    if (this.video) {
      try {
        this.video.disconnect();
        this.video.video.src = "";
        delete this.video;
      } catch (e) {
        console.log(e);
      }
    }

    let videoConfig = {
      videoid: 'h5sVideo1',
      protocol: 'http:', //'http:' or 'https:'
      host: '218.56.180.250:9108', //'172.19.112.74:8888'
      rootpath: '/', // '/' or window.location.pathname
      token: token,
      streamprofile: 'main',
      hlsver: 'v1', //v1 is for ts, v2 is for fmp4
      session: session//session got from login
    };

    this.video = new H5sPlayerWS(videoConfig);

    if (this.video) {
      this.video.connect();
    }
  }

  render() {
    return (
      <div id={'videoDiv'} ref={(obj) => this.container = obj} onresize={() => this.onVideoSizeChange()}>
        <video
          style={styles.videoStyle}
          id="h5sVideo1"
          muted
          autoPlay
          onDoubleClick={this.onMouseDblClick.bind(this)} />
        <VideoControlPanel videoControl={this.props.videoControl} token={this.props.token} />
      </div>);
  }

  onMouseDblClick() {
    this.setState({fullScreen: !this.state.fullScreen}, () => {
      this.updateVideo(this.props.token, this.state.session);

      if (this.state.fullScreen) {
        this.container && this.container.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
}

export default VideoComponent;
