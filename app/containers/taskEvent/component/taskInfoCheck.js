import React, { useState } from "react";
import { Col, Checkbox } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/taskEvent";
import "../task.scss";

const TaskInfoCheck = (props) => {
  const { setMapUserPosition } = props.actions;
  const { floodRankAddress, userPosition, floodExpertAddress, style } = props;

  const [user, setUser] = useState({
    市级防汛应急抢险队: false,
    东营区防汛应急抢险队: false,
    垦利区防汛应急抢险队: false,
    利津县防汛应急抢险队: false,
    河口区防汛应急抢险队: false,
    广饶县防汛应急抢险队: false,
    市级: false,
    县级: false,
    乡镇: false,
  });

  const expertList = [
    { name: "市级", userList: floodExpertAddress?.city },
    { name: "县级", userList: floodExpertAddress?.county },
    { name: "乡镇", userList: floodExpertAddress?.town },
  ];

  const filterList = (item) => {
    let list = [];
    userPosition.forEach((t) => {
      if (item.indexOf(t) == -1) {
        list.push(t);
      }
    });
    return list;
  };
  // useEffect(() => {
  //   getFloodExpert(); //防汛专家分类
  // }, []);
  return (
    <div className="task-info-checkbox" style={style}>
      <div className="ranSwitch">
        <div className="switch-border">
          抢险队
          {floodRankAddress?.rankUser?.map((item) => {
            return (
              <Col span={24} key={item.floodRanksId}>
                <Checkbox
                  className="switch-checkout"
                  value="fRain"
                  checked={user[item.name]}
                  onChange={(e) => {
                    setUser({ ...user, [item.name]: e.target.checked });
                    e.target.checked
                      ? setMapUserPosition([...userPosition, ...item.userList])
                      : setMapUserPosition(filterList(item.userList));
                  }}
                >
                  <div className="switch-ponding-flex">
                    <div className="switch-rain"></div>
                    <div>{item.name.split("防汛")[0]}</div>
                  </div>
                </Checkbox>
              </Col>
            );
          })}
          专家
          {expertList.map((item) => (
            <Col span={24} key={item.name}>
              <Checkbox
                className="switch-checkout"
                value="fRain"
                checked={user[item.name]}
                onChange={(e) => {
                  setUser({ ...user, [item.name]: e.target.checked });
                  e.target.checked
                    ? setMapUserPosition([...userPosition, ...item.userList])
                    : setMapUserPosition(filterList(item.userList));
                }}
                // onChange={(e) => {
                //   setUser({ ...user, [item.name]: e.target.checked });
                // }}
              >
                <div className="switch-ponding-flex">
                  <div className="switch-rain"></div>
                  <div>{item.name}</div>
                </div>
              </Checkbox>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    // floodRanks: state.mapAboutReducers.floodRanks,
    // expert: state.mapAboutReducers.expert,
    userPosition: state.taskReducers.userPosition,
    floodRankAddress: state.currency.floodRankAddress,
    floodExpertAddress: state.currency.floodExpertAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoCheck);
