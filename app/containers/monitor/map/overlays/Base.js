/**
 * Base 2020-05-16
 */
import React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { hasClassName } from "@app/utils/common.js";
class Base extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return null;
  }
  componentDidCatch() {

  }
  componentDidMount() {
    let { map, model } = this.props;
    if (!map || !model) return;
    let nowNode = this.container.cloneNode(true);
    nowNode.style.display = "block";
    this.installEvent(nowNode);
    map.addOverlay(model.id, { Coordinate: model.lonlat || model.lonlats, offset: [13, -25] }, nowNode);
    
  }
  componentWillUnmount() {
    let { map, model } = this.props;
    if (!map || !model) return;
    map.removeOverlay(model.id);
    this._cloneDomEventToken && this._cloneDomEventToken.remove();
  }
  installEvent(node) {
    this._cloneDomEventToken = addEventListener(node, "click", (e) => {
      e.stopPropagation();
      if (hasClassName(e.target, "m-ovl-close")) {
        // 关闭事件
        this.onClose();
      } else {
        this.onCustomClick(e);
      }
    })
  }
  onClose() {
    console.warning("请实现onClose方法");
  }
  onCustomClick() {
    console.warning("请实现onCustomClick方法");
  }
}
export default Base;