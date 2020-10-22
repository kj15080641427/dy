import React from "react";
import RouterList from "../../components/routerLiis";
import { Drawer } from "antd";
import "./style.scss";
import Head from "./head/Head";
export default () => {
  return (
    <div className="flood-ocean">
      <Drawer
        className="ocean-drawer"
        visible
        placement="top"
        height="980"
        title={
          <>
            <Head style={{ zIndex: 9999 }}></Head>
          </>
        }
      >
        <div className='ocean-drawer-body'>
          <RouterList></RouterList>
          <div style={{ width: '50%', height: '100%', overflow: 'hidden', margin: '0 auto' }}>
            <iframe
              src="http://hsdy.dongying.gov.cn/col/col36593/index.html"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              style={{ position: "relative", top: -327, left: -300 }}
            ></iframe>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
