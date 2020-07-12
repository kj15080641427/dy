/**
 * CheckBoxs 2020-07-07
 */
import React from 'react';
import ylz1 from '@app/resource/display/icon/2-雨量站-1.png';
import swz1 from '@app/resource/display/icon/3-水位站-1.png';
import jsd1 from '@app/resource/display/icon/4-积水站-1.png';
import spzd1 from '@app/resource/display/icon/5-视频站点-1.png';
import sz1 from '@app/resource/display/icon/6-水闸-1.png';
import bz1 from '@app/resource/display/icon/7-泵站-1.png';
// import ylz2 from '@app/resource/display/icon/1-雨量站-2.png';
import swz2 from '@app/resource/display/icon/3-水位站-2.png';
import jsd2 from '@app/resource/display/icon/4-积水站-2.png';
import spzd2 from '@app/resource/display/icon/5-视频站点-2.png';
import sz2 from '@app/resource/display/icon/6-水闸-2.png';
import bz2 from '@app/resource/display/icon/7-泵站-2.png';
import "./style.scss";
import { Row, Col, Checkbox } from 'antd';
class CheckBoxs extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        let { onChecked } = this.props;
        onChecked && e.target.layer && onChecked(e.target.layer, e.target.checked);
    }
    render() {
        let { layerVisible } = this.props;
        return (
            <div className="dis-checkboks">
                <div className="dis-checkboks-icon">
                    <Row>
                        <img className="dis-checkboks-img" src={layerVisible.rain ? ylz2 : ylz1}></img>
                    </Row>
                    <div className="dis-checkboks-div">
                        <span className="dis-checkboks-text" >雨量站</span>
                    </div>
                </div>
                <div className="dis-checkboks-icon">
                    <Row>
                        <img className="dis-checkboks-img" src={layerVisible.water ? swz2 : swz1}></img>
                    </Row>
                    <div className="dis-checkboks-div">
                        <span className="dis-checkboks-text" >水位站</span>
                    </div>
                </div>
                <div className="dis-checkboks-icon">
                    <Row>
                        <img className="dis-checkboks-img" src={layerVisible.ponding ? jsd2 : jsd1}></img>
                    </Row>
                    <div className="dis-checkboks-div">
                        <span className="dis-checkboks-text" >积水站</span>
                    </div>
                </div>
                <div className="dis-checkboks-icon">
                    <Row>
                        <img className="dis-checkboks-img" src={layerVisible.video ? spzd2 : spzd1}></img>
                    </Row>
                    <div className="dis-checkboks-div">
                        <span className="dis-checkboks-text" >视频站点</span>
                    </div>
                </div>
                <div className="dis-checkboks-icon">
                    <Row>
                        <img className="dis-checkboks-img" src={layerVisible.gate ? sz2 : sz1} onClick={this.props.clicks(layerVisible.gate)}></img>
                    </Row>
                    <div className="dis-checkboks-div">
                        <span className="dis-checkboks-text" >水闸</span>
                    </div>
                </div>
                <div className="dis-checkboks-icon">
                    <Row>
                        <img className="dis-checkboks-img" src={layerVisible.pump ? bz2 : bz1} onChange={this.onChange}></img>
                    </Row>
                    <div className="dis-checkboks-div">
                        <span className="dis-checkboks-text" >泵站</span>
                    </div>
                </div>
                <div className="dis-checkboks-row">
                    <Row>
                        <Col span={8}><Checkbox layer={"river"} checked={layerVisible.river != null ? layerVisible.river : true} onChange={this.onChange}></Checkbox></Col>
                        <Col span={16} className="dis-checkboks-row-text">水系图</Col>
                    </Row>
                </div>
                <div className="dis-checkboks-row">
                    <Row>
                        <Col span={8}><Checkbox layer={"river40"} checked={layerVisible.river40 != null ? layerVisible.river40 : true} onChange={this.onChange}></Checkbox></Col>
                        <Col span={16} className="dis-checkboks-row-text">河流</Col>
                    </Row>
                </div>
                <div className="dis-checkboks-row">
                    <Row>
                        <Col span={8}><Checkbox layer={"traffic"} checked={layerVisible.traffic != null ? layerVisible.traffic : true} onChange={this.onChange}></Checkbox></Col>
                        <Col span={16} className="dis-checkboks-row-text">交通实况</Col>
                    </Row>
                </div>
            </div >
        );
    }
    componentDidMount() { }
}
export default CheckBoxs;