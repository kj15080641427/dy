/**
 * Holder 2020-07-1
 * zdl
 * 云台控制
 */
import React, {Component} from 'react';
import "./style.scss";
import { getRadioAll, getRotateRadio } from "@app/data/request";
import emitter from "@app/utils/emitter.js";
import left from "@app/resource/video/left.png"
import up from "@app/resource/video/up.png"
import down from "@app/resource/video/down.png"
import right from "@app/resource/video/right.png"
import zoomin from "@app/resource/video/zoomin.png"
import zoomout from "@app/resource/video/zoomout.png"

class Holder extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    setVideo = (value) => {
        console.log(value)
        getRotateRadio({
            "token": this.props.token,
            "action": value
        }).then((rest) => {
            this.setStopVideo()
            console.log(rest)
        })
    }
    setTimeVideo = (value) => {
        getRotateRadio({
            "token": this.props.token,
            "action": value
        }).then((rest) => {
            console.log(rest)
        })
    }
    setStopVideo = () => {
        getRotateRadio({
            "token": this.props.token,
            "action": "stop"
        }).then((rest) => {
            console.log(rest)
        })
    }

    componentDidMount(){
        // addEventListener(this.upButton, 'click', function(){console.log('click ')});
    }

    render() {
        return (
            <div className="set-rotate-radio" style={this.props.divStyle}>
                <img src={up} className="img-size-up" onClick={() => this.setVideo("up")} 
                // refs={(ref)=> this.upButton = ref}
                    onMouseDown={() => this.setTimeVideo("up")} onMouseUp={() => this.setStopVideo()}
                ></img>
                <img src={left} className="img-size-left" onClick={() => this.setVideo("left")}
                    onMouseDown={() => this.setTimeVideo("left")} onMouseUp={() => this.setStopVideo()}></img>
                <img src={right} className="img-size-right" onClick={() => this.setVideo("right")}
                    onMouseDown={() => this.setTimeVideo("right")} onMouseUp={() => this.setStopVideo()}></img>
                <img src={down} className="img-size-down" onClick={() => this.setVideo("down")}
                    onMouseDown={() => this.setTimeVideo("down")} onMouseUp={() => this.setStopVideo()}></img>
                <div className="img-radio-zoo">
                    <img src={zoomin} className="img-size-zoomin" onClick={() => this.setVideo("zoomin")}
                        onMouseDown={() => this.setTimeVideo("zoomin")} onMouseUp={() => this.setStopVideo()}></img>
                    <img src={zoomout} className="img-size-zoomout" onClick={() => this.setVideo("zoomout")}
                        onMouseDown={() => this.setTimeVideo("zoomout")} onMouseUp={() => this.setStopVideo()}></img>
                </div>
            </div>
        );
    }

}
export default Holder;