import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
// import Monitor from '@app/containers/monitor/Monitor';
// import Home from '@app/containers/home/Index';
import AsyncComp from "@app/components/asyncComponent";
import './style.scss';
const AsyncHome = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/Index").then((res) => { removeLoading(); return res; }));
const AsyncLogin = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/Login").then((res) => { removeLoading(); return res; }));
const AsyncMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/monitor/Monitor").then((res) => { removeLoading(); return res; }));

export class App extends React.Component {
  render() {
    console.log("apppp", this.props.history)
    return (
      <HashRouter>
        <Switch>
          <Route exact path={`/`} component={AsyncLogin} />
          {localStorage.getItem("token") === null ? null :
            <>
              <Route path="/index" component={AsyncMonitor} />
              <Route path={`/home`} component={AsyncHome} />
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