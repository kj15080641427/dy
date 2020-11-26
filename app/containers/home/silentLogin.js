import React, { useEffect } from "react";
import { login } from "@app/data/request";

const SilentLogin = (props) => {
  useEffect(() => {
    console.log("登陆中");
    login({
      channel: "common",
      username: "admins",
      password: "123456",
    }).then((res) => {
      console.log(res.data.userToken);
      if (res.data.userToken) {
        localStorage.setItem("token", res.data.userToken);
        props.history.push("/displaySmall");
      }
    });
  }, []);
  return <div>loading....</div>;
};

export default SilentLogin;
