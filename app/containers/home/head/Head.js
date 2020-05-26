/**
 * Head 2020-05-26
 */
import React from 'react';
import "./style.scss";
import { Button } from 'antd';
import {
  PicLeftOutlined
} from '@ant-design/icons';
class Head extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.btnClick = this.btnClick.bind(this);
  }
  render() {
    return ( 
      <div className="hh-head">
        <Button type="link" className="hh-collapsed" onClick={this.btnClick} icon={<PicLeftOutlined style={{fontSize: 20}}/>}>
        </Button>
      </div>
    );
  }
  componentDidMount() {}
  btnClick() {
    if (this.props.collapsClick) {
      this.props.collapsClick();
    }
  }
}
export default Head;