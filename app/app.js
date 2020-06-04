import React from "react";
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
// import Monitor from '@app/containers/monitor/Monitor';
// import Home from '@app/containers/home/Index';
import AsyncComp from "@app/components/asyncComponent";
const AsyncHome = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/Index").then((res) => { removeLoading();return res;}));
const AsyncMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/monitor/Monitor").then((res) => { removeLoading();return res;}));

export class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={AsyncMonitor}/>
          <Route path={`/home`} component={AsyncHome}/>
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