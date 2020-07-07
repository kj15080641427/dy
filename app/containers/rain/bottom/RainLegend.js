/**
 * CheckBox 2020-05-13
 */
import React from 'react';
import "./style.scss";
import { Checkbox, Row, Col, Tag, Menu, Divider } from 'antd';
import one from '@app/resource/icon/1.svg';
import two from '@app/resource/icon/2.svg';
import three from '@app/resource/icon/3.svg';
import four from '@app/resource/icon/4.svg';
import five from '@app/resource/icon/5.svg';
import six from '@app/resource/icon/6.svg';
import seven from '@app/resource/icon/7.svg';
import eight from '@app/resource/icon/8.svg';
import {
    CaretUpOutlined, CaretDownOutlined
} from '@ant-design/icons';
class CheckBox extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: true,
            height: 140,
            display: "block"
        };
        this.onChange = this.onChange.bind(this);
        this.btnClick = this.btnClick.bind(this);
    }
    onChange(e) {
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        let { onChecked } = this.props;
        onChecked && e.target.layer && onChecked(e.target.layer, e.target.checked);
    }
    btnClick = (e) => {
        if (this.state.collapsed) {
            this.setState({
                collapsed: !this.state.collapsed,
                height: 28,
                display: "none"
            })
        }else{
            this.setState({
                collapsed: !this.state.collapsed,
                height: 140,
                display: "block"
            }) 
        }
    }
    render() {
        let { layerVisible } = this.props;
        return (
            <>
                <div className="m-checkbox-row-legend-paren" style={{ height: this.state.height }}>
                    <Row> <span className="font-yq">雨情图例(5分钟)</span><span className="isShow">{React.createElement(this.state.collapsed ? CaretUpOutlined : CaretDownOutlined, {
                        className: 'trigger',
                        onClick: this.btnClick,
                    })}</span></Row>
                    <div className="m-checkbox-row-legend" style={{ display: this.state.display }}>
                        <div className="m-checkbox-row-div-legend">
                            <Row>
                                <Col span={12}><img src={one}></img><span>&nbsp;无雨(0)</span></Col>
                                <Col span={12}><img src={two}></img><span>&nbsp;小雨(0-10)</span></Col>
                            </Row>
                            <Row>
                                <Col span={12}><img src={three}></img><span>&nbsp;中雨(10-25)</span></Col>
                                <Col span={12}><img src={four}></img><span>&nbsp;大雨(25-50)</span></Col>
                            </Row>
                            <Row>
                                <Col span={12}><img src={five}></img><span>&nbsp;暴雨(50-100)</span></Col>
                                <Col span={12}><img src={six}></img><span>&nbsp;大暴雨(100-250)</span></Col>
                            </Row>
                            <Row>
                                <Col span={12}><img src={seven}></img><span>&nbsp;特大暴雨(&gt;250)</span></Col>
                                {/* <Col span={12}><img src={eight}></img><span>&nbsp;段历时强降雨</span></Col> */}
                            </Row>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    componentDidMount() { }

}
export default CheckBox;