import React, { useEffect, useState } from "react";
import RouterList from "../../components/routerLiis";
import { Drawer } from "antd";
import "./style.scss";
import Head from "../../components/head/head";
import titleImg from "../../resource/title/ocean.png";
import { getOcean } from "../../data/home";
export default () => {
  const [url, setUrl] = useState("");
  const getOceanUrl = () => {
    getOcean().then((res) => {
      if (res.data) {
        setUrl(res.data);
        return;
      } else {
        getOceanUrl();
      }
    });
  };
  useEffect(() => {
    getOceanUrl();
  }, []);
  return (
    <div className="flood-ocean">
      <Drawer
        mask={false}
        className="ocean-drawer"
        visible
        placement="top"
        height="980"
        title={
          <>
            <Head titleImg={titleImg} style={{ zIndex: 9999 }}></Head>
          </>
        }
      >
        <div className="ocean-drawer-body">
          <RouterList></RouterList>
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <iframe
              // src="http://hsdy.dongying.gov.cn/col/col36593/index.html"
              src={url}
              width="100%"
              height="1270px"
              frameBorder="0"
              scrolling="no"
              style={{
                position: "relative",
                top: -380,
                right: "100px",
                left: "40px",
                width: "1680px",
              }}
            ></iframe>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
