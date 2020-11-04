import React, {Component } from "react";

import {H5sPlayerWS} from './h5splayer';
import Holder from "./Holder";
import * as ReactDOM from "react-dom";

const styles = {
  videoStyle: {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    backgroundColor: '#000000'
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
           this.setState({ session: sessionId });
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
    let newStyle = this.state.fullScreen ? {...styles.fullScreen} : null;

    if (newStyle !== null) {
      newStyle.width = window.innerWidth;
      newStyle.height = window.innerHeight;
    }

    let ele = <>
      <div style={newStyle}>
        <video
            style={styles.videoStyle}
            id="h5sVideo1"
            muted
            autoPlay
            webkit-playsinline
            playsinline
            onDoubleClick={this.onMouseDblClick.bind(this)} />
      </div>
      {/*{this.state.session !== null ? (*/}
      {/*  <iframe*/}
      {/*    src={`http://218.56.180.250:9110/video/index.html?sessionId=${this.state.session}&token=${this.props.token}&type=${this.state.type}`}*/}
      {/*    style={this.props.style}*/}
      {/*    scrolling="no"*/}
      {/*    frameBorder="0"*/}
      {/*    allowFullScreen={true}*/}
      {/*    controls={true}*/}
      {/*    webkitallowfullscreen={true.toString()}*/}
      {/*    mozallowfullscreen={true.toString()}*/}
      {/*  />*/}
      {/*  //   <iframe*/}
      {/*  //       src={`http://218.56.180.250:9108/ws.html?session=${this.state.session}&token=${this.props.token}&type=${this.state.type}`}*/}
      {/*  //       style={this.props.style}*/}
      {/*  //       scrolling="no"*/}
      {/*  //       frameBorder="0"*/}
      {/*  //       allowFullScreen={true}*/}
      {/*  //       controls={true}*/}
      {/*  //       webkitallowfullscreen={true.toString()}*/}
      {/*  //       mozallowfullscreen={true.toString()}*/}
      {/*  //   />*/}
      {/*) : null}*/}
      <Holder token={this.props.token}/>
    </>;


    if (this.state.fullScreen) {
      this.fullScreenComponment = ele;
      return ReactDOM.createPortal(ele, document.body);
    } else {
      return ele;
    }
  }

  onMouseDblClick() {
    this.setState({fullScreen: !this.state.fullScreen}, () => {
      this.updateVideo(this.props.token, this.state.session);
    });
  }
}

export default VideoComponent;
