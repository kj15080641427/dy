import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
// import Monitor from '@app/containers/monitor/Monitor';
// import Home from '@app/containers/home/Index';
import AsyncComp from "@app/components/asyncComponent";
import './style.scss';
const AsyncHome = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/Index").then((res) => { removeLoading(); return res; }));
const AsyncLogin = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/Login").then((res) => { removeLoading(); return res; }));
const AsyncMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/monitor/Monitor").then((res) => { removeLoading(); return res; }));
const rainMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/rain/rain").then((res) => { removeLoading(); return res; }));
const waterMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/water/water").then((res) => { removeLoading(); return res; }));
const easyFloodMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/easyFlood/easyFlood").then((res) => { removeLoading(); return res; }));
const videoMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/video/video").then((res) => { removeLoading(); return res; }));
const floodWarningMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/floodWarning/floodWarning").then((res) => { removeLoading(); return res; }));
const AsyncNoLogin = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/NoLogin").then((res) => { removeLoading(); return res; }));


export class App extends React.Component {
  render() {
    console.log("apppp", this.props.history)
    return (
      <HashRouter>
        <Switch>
          <Route exact path={`/login`} component={AsyncNoLogin} />
          <Route exact path={`/`} component={AsyncLogin} />
          {localStorage.getItem("token") === null ? null :
            <>
              {localStorage.getItem("username") === "admin1" ? null :
                <Route path={`/home`} component={AsyncHome} />
              }
              <Route path="/index" component={AsyncMonitor} />
              <Route path={`/rain`} component={rainMonitor} />
              <Route path={`/easyFlood`} component={easyFloodMonitor} />
              <Route path={`/water`} component={waterMonitor} />
              <Route path={`/video`} component={videoMonitor} />
              <Route path={`/floodwarning`} component={floodWarningMonitor} />
            </>}
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