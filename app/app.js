import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import Monitor from '@app/containers/monitor/Monitor';
import Home from "@app/containers/home/Index";
// import AsyncComp from "@app/components/asyncComponent";
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
import DisplaySmall from "@app/containers/display/DisplaySmall";
import FloodModel from "@app/containers/floodModel";
import TaskList from "@app/containers/taskEvent/taskList";
import TaskInfo from "@app/containers/taskEvent/taskInfo";
import TaskInfoMessage from "@app/containers/taskEvent/taskInfoMessage";
import ExpertDispatch from "@app/containers/taskEvent/expertDispatch";
import UserDispatch from "@app/containers/taskEvent/userDispatch";
import MaterialDispatch from "@app/containers/taskEvent/materialDispatch";
import TaskTimeLine from "@app/containers/taskEvent/taskTimeLine";
import DeviceManager from "@app/containers/rain/device";
import DataCenter from "@app/containers/dataCenter/";
import SilentLogin from "./containers//home/silentLogin";
import Navi from "./containers/navi/index";
import "./style.scss";

export class App extends React.Component {
  render() {
    {
      let $loading = document.getElementById("loading");
      if ($loading) {
        $loading.parentNode.removeChild($loading);
      }
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact path={`/login`} component={AsyncNoLogin} />
          <Route exact path={`/`} component={AsyncLogin} />
          <Route exact path={`/signIn`} component={SingIn} />
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
          <Route path={`/displaySmall`} component={DisplaySmall} />
          <Route path={`/floodModel`} component={FloodModel} />

          <Route path={`/taskList`} component={TaskList} />
          <Route path={`/taskInfo`} component={TaskInfo} />
          <Route path={`/taskInfoMessage`} component={TaskInfoMessage} />
          <Route path={`/expertDispatch`} component={ExpertDispatch} />
          <Route path={`/userDispatch`} component={UserDispatch} />
          <Route path={`/materialDispatch`} component={MaterialDispatch} />
          <Route path={`/taskTimeLine`} component={TaskTimeLine} />
          <Route path={`/device`} component={DeviceManager} />
          <Route path={`/dataCenter`} component={DataCenter} />
          <Route path={`/home`} component={Home} />
          <Route path={`/silentLogin`} component={SilentLogin} />
          <Route path={`/Navi`} component={Navi} />
        </Switch>
      </HashRouter>
    );
  }
}
