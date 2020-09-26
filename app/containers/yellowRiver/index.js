import React from "react";
import RouterList from "../../components/routerLiis";
import "./style.scss";
import Head from "./head/Head";
export default () => {
  return (
    <div className="flood-river">
      <div className="flood-noyices-top"></div>
      <Head></Head>
       <RouterList></RouterList>
      <div className="m-left-notices">
        <div style={{ width: "100%", height: "950px" }}>
          <iframe
            src="http://61.163.88.227:8006/hwsq.aspx"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
