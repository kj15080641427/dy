import React from "react";
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import Monitor from '@app/containers/monitor/Monitor';
export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Monitor}/>
        </Switch>
      </BrowserRouter>
    );
  }
}