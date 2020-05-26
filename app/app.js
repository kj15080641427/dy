import React from "react";
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import Monitor from '@app/containers/monitor/Monitor';
// import Home from '@app/containers/home/Index';
import business from '@app/containers/business/pages/index';
import AsyncComp from "@app/components/asyncComponent";
const AsyncHome = AsyncComp(() => import("@app/containers/home/Index"));
export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Monitor}/>
          <Route path={`/home`} component={AsyncHome}/>
        </Switch>
      </BrowserRouter>
    );
  }
}