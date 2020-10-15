import React, { useEffect } from "react";
import { getUserByUser } from "../../data/home";
import { createHashHistory } from "history";
const hashHistory = createHashHistory();
const SingIn = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hrefNavi = window.location.href.split("?url=");
    getUserByUser({ token: token }).then((res) => {
      const url = unescape(hrefNavi[1]);
      if (res.code == 200) {
        if (hrefNavi[1]) {
          if (url.split("?")[1]) {
            window.location.replace(`${url}&token=${token}`);
          } else {
            window.location.replace(`${url}?token=${token}`);
          }
        }
      } else {
        console.log("7777");
        hashHistory.push(`/?url=${url}`);
      }
    });
  }, []);
  return <div>...</div>;
};
export default SingIn;
