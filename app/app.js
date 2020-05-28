import React from "react";
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
// import Monitor from '@app/containers/monitor/Monitor';
// import Home from '@app/containers/home/Index';
import business from '@app/containers/business/pages/index';
import AsyncComp from "@app/components/asyncComponent";
const AsyncHome = AsyncComp(() => import(/*webpackChunkName:'home'*/"@app/containers/home/Index"));
const AsyncMonitor = AsyncComp(() => import(/*webpackChunkName:'monitor'*/"@app/containers/monitor/Monitor"));

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={AsyncMonitor}/>
          <Route path={`/home`} component={AsyncHome}/>
        </Switch>
      </BrowserRouter>
    );
  }
}