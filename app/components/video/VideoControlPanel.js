/**
 * 视频控制面板，提供视频控制操作，包括：拉近，推远、
 * 左、右控制、上下控制等
 * 2020-11-04
 * 本组件需hsstream服务器支持
 * 上海
 */
import React, {Component} from 'react';
import {
    PlusSquareFilled,
    MinusSquareFilled,
    UpSquareFilled,
    DownSquareFilled,
    LeftSquareFilled,
    RightSquareFilled
} from '@ant-design/icons';

import {Button} from 'antd';

const styles = {
    container: {
        position: 'absolute',
        top: 1,
        right: 1,
        display: 'flex',
        flexFlow: 'row',
        height: 32,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        backgroundColor: '#555555'
    },
    iconStyle: {
        fontSize: 22,
    }
};

class VideoControlPanel extends Component {
    render() {
        let visible = this.props.visible ? this.props.visible : true;
        let newStyle = {
            ...styles.container,
        };

        if (!visible) {
            newStyle.display = "none";
        }

        return (
            <div
                style={newStyle}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}>
                <div>
                    <Button
                        icon={<PlusSquareFilled style={styles.iconStyle} />}
                        size={'small'}
                        onClick={this.setVideo.bind(this, 'zoomin')}
                        onMouseDown={this.setTimeVideo.bind(this, 'zoomin')}
                        onMouseUp={this.setStopVideo.bind(this)}
                    />
                </div>
                <div>
                    <Button
                        icon={<MinusSquareFilled style={styles.iconStyle} />}
                        size={'small'}
                        onClick={this.setVideo.bind(this, 'zoomout')}
                        onMouseDown={this.setTimeVideo.bind(this, 'zoomout')}
                        onMouseUp={this.setStopVideo.bind(this)}
                    />
                </div>
                <div>
                    <Button
                        icon={<UpSquareFilled style={styles.iconStyle}/>}
                        size={'small'}
                        onClick={this.setVideo.bind(this, 'up')}
                        onMouseDown={this.setTimeVideo.bind(this, 'up')}
                        onMouseUp={this.setStopVideo.bind(this)}
                    />
                </div>
                <div>
                    <Button
                        icon={<DownSquareFilled style={styles.iconStyle}/>}
                        size={'small'}
                        onClick={this.setVideo.bind(this, 'down')}
                        onMouseDown={this.setTimeVideo.bind(this, 'down')}
                        onMouseUp={this.setStopVideo.bind(this)}
                    />
                </div>
                <div>
                    <Button
                        icon={<LeftSquareFilled style={styles.iconStyle}/>}
                        size={'small'}
                        onClick={this.setVideo.bind(this, 'left')}
                        onMouseDown={this.setTimeVideo.bind(this, 'left')}
                        onMouseUp={this.setStopVideo.bind(this)}
                    />
                </div>
                <div>
                    <Button
                        icon={<RightSquareFilled style={styles.iconStyle} />}
                        size={'small'}
                        onClick={this.setVideo.bind(this, 'right')}
                        onMouseDown={this.setTimeVideo.bind(this, 'right')}
                        onMouseUp={this.setStopVideo.bind(this)}
                    />
                </div>
            </div>
        );
    }

    onMouseEnter() {

    }

    onMouseLeave() {

    }

    setVideo (value) {
        const {videoControl} = this.props;

        if (videoControl) {
            videoControl.Ptz({
                token: this.props.token,
                action: value
            })["catch"](e => {
                console.log('云台控制错误' + e);
            });
        }
    }
    setTimeVideo (value) {
        // getRotateRadio({
        //     token: this.props.token,
        //     action: value,
        // }).then((rest) => {
        // });
        this.setVideo(value);
    }

    setStopVideo () {
        this.setVideo('stop');
        // getRotateRadio({
        //     token: this.props.token,
        //     action: "stop",
        // }).then((rest) => {
        // });
    }
}

export default VideoControlPanel;
