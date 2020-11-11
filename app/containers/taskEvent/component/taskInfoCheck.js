import React, { useState, useEffect } from "react";
import { Col, Checkbox, Button, Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/taskEvent";
import {DeleteOutlined} from '@ant-design/icons';
import "../task.scss";


//按钮命令
export const ButtonCommands = {ClearTrack: 'ClearTrack'};


const TaskInfoCheck = (props) => {
  const {layerStatus, onLayerChange, onCommandClick} = props;

  const layerVisible = {
    person: {label: '人员定位', value: layerStatus?.person},
    warehouse: {label: '物资仓库', value: layerStatus?.warehouse},
    rank: {label: '防汛队伍', value: layerStatus?.rank},
    river40: {label: '水系图', value: layerStatus?.river40},
    traffic: {label: '实时交通', value: layerStatus?.traffic}
  };

  let checkBox = Object.keys(layerVisible).map((key, index) => {
    let item = layerVisible[key];
    return (
        <Col span={24} key={index.toString()}>
          <Checkbox
              className="switch-checkout"
              onChange={(e) => {
                let value = e.target.checked;
                onLayerChange &&
                    onLayerChange(key, value);
              }}
              checked={item.value}
          >
            <div className="switch-ponding-flex">
              <div className="switch-rain"/>
              <div>{item.label}</div>
            </div>
          </Checkbox>
        </Col>
    );
  });

  return (
      <div className="task-info-checkbox" style={{display: props.visible ? 'block' : 'none'}}>
        <div className="ranSwitch">
            <div className={'switch-border'}>
              <Col span={24}>
                <Divider className={'divider'}>{'图层控制'}</Divider>
              </Col>
              {checkBox}
              <Col span={24}>
                <Divider className={'divider'}>{'地图操作'}</Divider>
              </Col>
              <Col span={24} key={'clearTrackLine'}>
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => onCommandClick && onCommandClick(ButtonCommands.ClearTrack)}>
                  {'清除轨迹'}
                </Button>
              </Col>
            </div>
        </div>
      </div>
  );
};

const TaskInfoCheck_old = (props) => {
  const { setMapUserPosition } = props.actions;
  const { floodRanks, expert, userPosition } = props;

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
    { name: "市级", userList: expert?.city },
    { name: "县级", userList: expert?.county },
    { name: "乡镇", userList: expert?.town },
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
    <div className="task-info-checkbox">
      <div className="ranSwitch">
        <div className="switch-border">
          抢险队
          {floodRanks?.map((item) => {
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
    floodRanks: state.mapAboutReducers.floodRanks,
    expert: state.mapAboutReducers.expert,
    userPosition: state.taskReducers.userPosition,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoCheck);
