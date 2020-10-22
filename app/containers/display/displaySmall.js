import React from "react";
import OverView from "./left/OverView";
import Tables from './right/Tables'
const DisplaySmall = (props) => {
  return (
    <div>
      <OverView></OverView>
      <Tables></Tables>
    </div>
  );
};

export default DisplaySmall;
