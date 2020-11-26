import React from "react";
import { Route, Switch } from "react-router-dom";
// import MaterialsMange from "./subpages/materials/MaterialsMange";
// import StoreManage from "./subpages/floodManagement/StoreManage";
// import Expert from "./subpages/floodManagement/Expert";
// import FloodPrevention from "./subpages/personnel/FloodPrevention";
import rwvData from "./subpages/dataMonitoring/rwvData";
// import deviceManage from "./subpages/DeviceManage/index";
import LoginLog from "./subpages/System/LoginLog";
import User from "./subpages/System/User";
import Login from "../Login";
import Jurisdiction from "./subpages/System/Jurisdiction";
import Role from "./subpages/System/Role";
// import Model from "./subpages/dataMonitoring/Model";
import Home from "./subpages/Home/Home";
import BaseStation from "./subpages/BasicData/baseSite";
import VideoStation from "./subpages/BasicData/VideoStation";
// import RiverAnnunciate from "./subpages/dataMonitoring/riverAnnunciate";
import SiteWater from "./subpages/site/siteWater";
import SiteVideo from "./subpages/site/siteVideo";
import SiteRain from "./subpages/site/siteRain";
import SitePump from "./subpages/site/sitePump";
import BaseDict from "./subpages/site/baseDict";
import SiteWaterPonit from "./subpages/site/siteWaterPoint";
import SiteReservoir from "./subpages/site/siteReservoir";
import SiteDike from "./subpages/site/siteDike";
import SiteGate from "./subpages/site/siteGate";
import ChartGroup from "./subpages/taskEvent/chartGroup";

import DataMonitoring from "./subpages/dataMonitoring";
import FloodManagement from "./subpages/floodManagement";
import System from "./subpages/System";
const NoMatch = () => <div>没有找到该路由</div>;

class ContentRouter extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    // path现在就是 /home
    let { path } = this.props;
    return (
      <Switch>
        {console.log(path)}
        <Route exact path={path} component={Home} />
        <Route path={"/#/"} component={Login} />
        {/* {localStorage.getItem("token") === null ? null : ( */}
        {/* {localStorage.getItem("username") === "admin1" ? null : ( */}
        <Route path={path + "/DataMonitoring"} component={DataMonitoring} />
        <Route path={path + "/FloodManagement"} component={FloodManagement} />
        <Route path={path + "/System"} component={System} />
        {/* <Route path={path + "/materialsmange"} component={MaterialsMange} /> */}
        {/* <Route path={path + "/expert"} component={Expert} /> */}
        {/* <Route path={path + "/floodprevention"} component={FloodPrevention} /> */}
        <Route path={path + "/loginlog"} component={LoginLog} />
        <Route path={path + "/user"} component={User} />
        <Route path={path + "/role"} component={Role} />
        <Route path={path + "/jurisdiction"} component={Jurisdiction} />
        <Route path={path + "/rwvdata"} component={rwvData} />
        {/* <Route path={path + "/deviceManage"} component={deviceManage} /> */}
        {/* <Route path={path + "/model"} component={Model} /> */}
        <Route path={path + "/stationBasic"} component={BaseStation} />
        <Route path={path + "/videoStation"} component={VideoStation} />
        {/* <Route path={path + "/riverAnnunciate"} component={RiverAnnunciate} /> */}
        <Route path={path + "/siteWater"} component={SiteWater} />
        <Route path={path + "/siteVideo"} component={SiteVideo} />
        <Route path={path + "/siteRain"} component={SiteRain} />
        <Route path={path + "/sitePump"} component={SitePump} />
        <Route path={path + "/siteDict"} component={BaseDict} />
        <Route path={path + "/siteWaterPonit"} component={SiteWaterPonit} />
        <Route path={path + "/siteDike"} component={SiteDike} />
        <Route path={path + "/siteReservoir"} component={SiteReservoir} />
        <Route path={path + "/siteGate"} component={SiteGate} />
        <Route path={path + "/chartGroup"} component={ChartGroup} />
        {/* // )} */}
        {/* )} */}
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
export default ContentRouter;
