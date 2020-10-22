import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from "react-router-dom";
// import Monitor from '@app/containers/monitor/Monitor';
// import Home from '@app/containers/home/Index';
import AsyncComp from "@app/components/asyncComponent";
import AsyncHome from "@app/containers/home/Index";
import rainMonitor from "@app/containers/rain/rain";
import waterMonitor from "@app/containers/water/water";
import easyFloodMonitor from "@app/containers/easyFlood/easyFlood";
import AsyncLogin from "@app/containers/home/Login";
import SingIn from "@app/containers/home/signIn";
import AsyncMonitor from "@app/containers/monitor/Monitor";
import floodWarningMonitor from "@app/containers/floodWarning/floodWarning";

import videoMonitor from "@app/containers/video/video";
import AsyncNoLogin from "@app/containers/home/NoLogin";
import AsyncDisplay from "@app/containers/display/Display";
import AsyncNotices from "@app/containers/notices/notices";

import Ocean from "@app/containers/ocean";
import YellowRiver from "@app/containers/yellowRiver";
import FloodModel from '@app/containers/floodModel';
import "./style.scss";
// const AsyncHome = AsyncComp(() => import(/*webpackChunkName:'Index'*/"@app/containers/home/Index").then((res) => { removeLoading(); return res; }));
// const AsyncLogin = AsyncComp(() => import(/*webpackChunkName:'Login'*/"@app/containers/home/Login").then((res) => { removeLoading(); return res; }));
// const AsyncMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/monitor/Monitor").then((res) => { removeLoading(); return res; }));
// const rainMonitor = AsyncComp(() => import(/*webpackChunkName:'rain'*/"@app/containers/rain/rain").then((res) => { removeLoading(); return res; }));
// const waterMonitor = AsyncComp(() => import(/*webpackChunkName:'water'*/"@app/containers/water/water").then((res) => { removeLoading(); return res; }));
// const easyFloodMonitor = AsyncComp(() => import(/*webpackChunkName:'easyFlood'*/"@app/containers/easyFlood/easyFlood").then((res) => { removeLoading(); return res; }));
// const videoMonitor = AsyncComp(() =>
//   import(/*webpackChunkName:'video'*/ "@app/containers/video/video").then(
//     (res) => {
//       removeLoading();
//       return res;
//     }
//   )
// );
// const floodWarningMonitor = AsyncComp(() => import(/*webpackChunkName:'floodWarning'*/"@app/containers/floodWarning/floodWarning").then((res) => { removeLoading(); return res; }));
// const AsyncNoLogin = AsyncComp(() =>
//   import(/*webpackChunkName:'NoLogin'*/ "@app/containers/home/NoLogin").then(
//     (res) => {
//       removeLoading();
//       return res;
//     }
//   )
// );
// const AsyncDisplay = AsyncComp(() =>
//   import(/*webpackChunkName:'display'*/ "@app/containers/display/Display").then(
//     (res) => {
//       removeLoading();
//       return res;
//     }
//   )
// );
// const AsyncNotices = AsyncComp(() =>
//   import(/*webpackChunkName:'display'*/ "@app/containers/notices/notices").then(
//     (res) => {
//       removeLoading();
//       return res;
//     }
//   )
// );

export class App extends React.Component {
  render() {
    {
      let $loading = document.getElementById("loading");
      $loading.parentNode.removeChild($loading);
    }
    console.log("apppp", this.props.history);
    return (
      <HashRouter>
        <Switch>
          <Route exact path={`/login`} component={AsyncNoLogin} />
          <Route exact path={`/`} component={AsyncLogin} />
          <Route exact path={`/signIn`} component={SingIn} />
          {localStorage.getItem("token") === null ? null : (
            <>
              {localStorage.getItem("username") === "admin1" ? null : (
                <Route path={`/home`} component={AsyncHome} />
              )}
              <Route path="/index" component={AsyncMonitor} />
              <Route path={`/rain`} component={rainMonitor} />
              <Route path={`/easyFlood`} component={easyFloodMonitor} />
              <Route path={`/water`} component={waterMonitor} />
              <Route path={`/video`} component={videoMonitor} />
              <Route path={`/floodwarning`} component={floodWarningMonitor} />
              <Route path={`/display`} component={AsyncDisplay} />
              <Route path={`/notices`} component={AsyncNotices} />
              <Route path={`/ocean`} component={Ocean} />
              <Route path={`/yellowRiver`} component={YellowRiver} />
              <Route path={`/floodModel`} component={FloodModel} />
            </>
          )}
          <Route component={AsyncLogin} />
        </Switch>
      </HashRouter>
    );
  }
}
function removeLoading() {
  let $loading = document.getElementById("loading");
  if ($loading) {
    $loading.parentNode.removeChild($loading);
  }
}
