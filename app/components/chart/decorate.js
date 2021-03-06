import React from "react";
import "../style.scss";
export const BoxTitle = (props) => {
  return (
    <div>
      <div className="box-head"></div>
      <div className="box-head-title">{props.title}</div>
    </div>
  );
};
export const BoxHead = () => {
  return (
    <div className="table-head">
      <div className="table-title-div"></div>
      <div className="table-head-div"></div>
    </div>
  );
};
export const RenderBox = (props) => {
  const { hasHead, hasTitle, title, style, containerStyle } = props;
  return (
    <div style={containerStyle}>
      {hasHead && <BoxHead />}
      <div className="radar-box" style={style}>
        {hasTitle && <BoxTitle title={title} />}
        {props.children}
      </div>
    </div>
  );
};
