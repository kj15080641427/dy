/**
 * ContentRouter 2020-05-26
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Video from "./subpages/media/Video";
import MaterialsMange from "./subpages/materials/MaterialsMange";
import StoreManage from "./subpages/materials/StoreManage";
import Expert from "./subpages/personnel/Expert";
import FloodPrevention from "./subpages/personnel/FloodPrevention";
import waterCondition from "./subpages/waterCondition/water";
import rwvData from "./subpages/dataMonitoring/rwvData";
import LoginLog from "./subpages/System/LoginLog";
import User from "./subpages/System/User";
import Login from "../Login";
import Jurisdiction from "./subpages/System/Jurisdiction"
import Role from "./subpages/System/Role"
import Model from "./subpages/media/Model"
import Home from "./subpages/Home/Home"
import VideoBasic from "./subpages/BasicData/VideoBasic/VideoBasic"
import StationBasic from "./subpages/BasicData/StationBasic/StationBasic"
import VideoStation from "./subpages/BasicData/VideoandStation/VideoStation"
import RiverAnnunciate from "./subpages/DataMonitoring/RiverAnnunciate"
import WaterAnnunciate from "./subpages/DataMonitoring/WaterAnnunciate"
import RainrAnnunciate from "./subpages/DataMonitoring/RainrAnnunciate"

const NoMatch = () => {
    return (
        <div>
            没有找到该路由
        </div>
    );
};
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
                <Route exact path={path} component={Home} />
                {/* <Route path={path + "/test"} component={Test} /> */}
                <Route path={"/#/"} component={Login} />
                {localStorage.getItem("token") === null ? null :
                    <>
                        {localStorage.getItem("username") === "admin1" ? null :
                            <>
                                <Route path={path + "/video"} component={Video} />
                                <Route path={path + "/storemanage"} component={StoreManage} />
                                <Route path={path + "/materialsmange"} component={MaterialsMange} />
                                <Route path={path + "/expert"} component={Expert} />
                                <Route path={path + "/floodprevention"} component={FloodPrevention} />
                                <Route path={path + "/water"} component={waterCondition} />
                                <Route path={path + "/loginlog"} component={LoginLog} />
                                <Route path={path + "/user"} component={User} />
                                <Route path={path + "/role"} component={Role} />
                                <Route path={path + "/jurisdiction"} component={Jurisdiction} />
                                <Route path={path + "/rwvdata"} component={rwvData} />
                                <Route path={path + "/model"} component={Model} />
                                <Route path={path + "/videoBasic"} component={VideoBasic} />
                                <Route path={path + "/stationBasic"} component={StationBasic} />
                                <Route path={path + "/videoStation"} component={VideoStation} />
                                <Route path={path + "/riverAnnunciate"} component={RiverAnnunciate} />
                                <Route path={path + "/waterAnnunciate"} component={WaterAnnunciate} />
                                <Route path={path + "/rainAnnunciate"} component={RainrAnnunciate} />
                            </>
                        }
                    </>
                }
                <Route component={NoMatch} />
            </Switch>

        );
    }
    componentDidMount() { }
}
export default ContentRouter;