import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import moment from 'moment';

import * as action from "../../redux/actions/taskEvent";
import * as mapAction from "../../redux/actions/map";
import { bindActionCreators } from "redux";

import Map from "./map/map";
import { Input, Modal, Button, DatePicker} from "antd";
import { createHashHistory } from "history";
import trackQuery from "@app/resource/icon/trackQuery.svg";
import TaskTimeLine from "./taskTimeLine";
import TaskUpdate from "./taskUpdate";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
import TaskInfoNavi from "./component/taskInfoNavi";
import TaskInfoCard from "./component/taskInfoCard";
import TaskInfoCheck from "./component/taskInfoCheck";
import checkImg from "@app/resource/图层.svg";
import "./task.scss";
const hashHistory = createHashHistory();
const { Search } = Input;

const TaskInfo = (props) => {
    const {
        taskInfo,
        floodUser,
        floodAddress,
        expert,
        userPosition,
        taskList,
        selectedPersonTrack,

    } = props;
    const formRef = useRef(null);
    const {
        getFloodAddress,
        getAllFloodUser,
        //setMapUserPosition, //设置人员定位
        getTaskList,
        setTaskInfo,
    } = props.actions;
    const {getFloodRankUser, getFloodExpert} = props.mapActions;

    const [text, setText] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [personInfoVisible, setPersonInfoVisible] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedBeginTime, setSelectedBeginTime] = useState(moment()
        .subtract(3, 'hour'));
    const [selectedEndTime, setSelectedEndTime] = useState(moment());
    //图层得可见性
    const [layerVisible, setLayerVisible] = useState({
       track: true,
       person: true,
        warehouse: true,
        rank: true,
    });

    useEffect(() => {
        getTaskList({
            current: 1,
            size: 10,
        });
        getFloodAddress(); //人员定位
        getAllFloodUser(); //防汛人员
        getFloodRankUser(); //防汛队伍
        getFloodExpert(); //防汛专家
    }, []);
    useEffect(() => {
        console.log(props);
        if (props?.location?.query?.info) {
            setTaskInfo(props?.location?.query?.info);
        } else {
            if (taskList) {
                setTaskInfo(taskList?.records[0]);
            }
        }
    }, [taskList]);
    let init = [...floodUser, ...expert?.all];
    // let init = [];

    useEffect(() => {
        let timer = setInterval(()=>{
            getFloodAddress();
        }, 30000);

        return () => {
          clearInterval(timer);
        };
    }, []);

    const onSearch = (value) => {
        if (value) {
            let filteredList = init.filter((item) => {
                return item.name.indexOf(value) !== -1;
            });
            //setMapUserPosition(filteredList);
        } else {
            //setMapUserPosition(init);
        }
    };
    const onPersonClick = (person) => {
        setPersonInfoVisible(true);
        setSelectedPerson(person);
    };

    const onQueryPersonPath = (personInfo, beginTime, endTime) => {
        setPersonInfoVisible(false);
        const {actions} = props;
        actions.getPersonTrack({
            beginTime,
            endTime,
            userId: personInfo.userid
        });
    };

    return (
        <div style={{height: "100%"}}>
            <div style={{height: "90px", background: "#003366", zIndex: 99}}/>
            <div
                style={{
                    height: "100%",
                    width: "100px",
                    background: "#003366",
                    position: "absolute",
                    right: "0px",
                    zIndex: "9",
                }}
            />
            <Map layerVisible={layerVisible}
                 //person={floodUser}
                person={floodAddress.records}
                 trackList ={selectedPersonTrack}
                 onPersonClick={onPersonClick}/>
            <Head titleImg={titleImg}/>
            <RouterList/>
            <div
                className="track-query-body"
                onMouseOver={() => setShowSearch(true)}
                onMouseLeave={() => {
                    setShowSearch(false);
                }}
            >
                {showSearch ? (
                    <Search
                        placeholder="请输入查询人名称"
                        onSearch={onSearch}
                        onChange={(e) => setText(e.target.value)}
                        suffix={
                            <img
                                style={{cursor: "pointer"}}
                                src={trackQuery}
                                onClick={() => {
                                    onSearch(text);
                                }}
                            />
                        }
                    />
                ) : null}
                {showSearch ? null : <img src={trackQuery}/>}
            </div>
            <div
                className="task-checkbox-img"
                onMouseOver={() => setShowCheck(true)}
                onMouseLeave={() => {
                    setShowCheck(false);
                }}>

                <img src={checkImg}/>
                {showCheck ? <TaskInfoCheck/> : null}
            </div>
            <TaskTimeLine>/</TaskTimeLine>
            <TaskUpdate formRef={formRef}/>
            <TaskInfoNavi formRef={formRef}/>
            <TaskInfoCard/>
            <Modal
                visible={personInfoVisible}
                onCancel={() => setPersonInfoVisible(false)}
                footer={
                    (
                        <div style={{display: 'flex', flexDirection: 'row'}} className={'person-info-line'}>
                            <DatePicker.RangePicker
                                showTime
                                defaultValue={[selectedBeginTime, selectedEndTime]} onChange={(dates) => {
                                setSelectedBeginTime(dates[0]);
                                setSelectedEndTime(dates[1]);
                            }}/>
                            <Button
                                type={'link'}
                                onClick={() => onQueryPersonPath(selectedPerson?.tag?.personInfo, selectedBeginTime, selectedEndTime)}>
                                {'查询轨迹'}
                            </Button>
                        </div>
                    )
                }
                centered={true}
                title={'人员详情'}>
                <div className={'person-info-line'}>
                    <span>姓名: {selectedPerson?.tag?.personInfo?.name}</span>
                </div>
                <div className={'person-info-line'}>
                    <span>工作单位: {selectedPerson?.tag?.personInfo?.unit}</span>
                </div>
                <div className={'person-info-line'}>
                    <span>隶属关系: {selectedPerson?.tag?.personInfo?.remark}</span>
                </div>
                <div className={'person-info-line'}>
                    <span>电话号码: {selectedPerson?.tag?.personInfo?.phone}</span>
                    {/*<span className="iconfont iconshipin m-ovl-video"/>*/}
                </div>
                <div className={'person-info-line'}>
                    <span>定位时间: {selectedPerson?.tag?.dynamicInfo?.reportTime}</span>
                </div>
            </Modal>
        </div>
    );

};
const mapStateToProps = (state) => {
    // console.log(state, "S");
    return {
        floodAddress: state.taskReducers.floodAddress,
        taskInfo: state.taskReducers.taskInfo,
        selectedPersonTrack: state.taskReducers.selectedPersonTrack,
        floodUser: state.mapAboutReducers.floodUser,
        expert: state.mapAboutReducers.expert,
        userPosition: state.taskReducers.userPosition,
        taskList: state.taskReducers.taskList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(action, dispatch),
        mapActions: bindActionCreators(mapAction, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
