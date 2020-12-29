import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import Home from "./subpages/Home/Home";
import ChartGroup from "./subpages/taskEvent/chartGroup";
import DataMonitoring from "./subpages/dataMonitoring";
import FloodManagement from "./subpages/floodManagement";
import System from "./subpages/System";
import BasicData from "./subpages/BasicData";
import SiteInfo from "./subpages/site";
import History from "./subpages/History/History";
const NoMatch = () => <div>没有找到该路由</div>;

class ContentRouter extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    let { path } = this.props;
    return (
      <Switch>
        {console.log(path)}
        <Route exact path={path} component={History} />
        <Route path={"/#/"} component={Login} />
        <Route path={path + "/History"} component={History} />
        <Route path={path + "/DataMonitoring"} component={DataMonitoring} />
        <Route path={path + "/FloodManagement"} component={FloodManagement} />
        <Route path={path + "/System"} component={System} />
        <Route path={path + "/BasicData"} component={BasicData} />
        <Route path={path + "/SiteInfo"} component={SiteInfo} />
        <Route path={path + "/chartGroup"} component={ChartGroup} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
export default ContentRouter;
