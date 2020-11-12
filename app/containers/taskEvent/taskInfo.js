import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import emitter from "../../utils/emitter";
import * as action from "../../redux/actions/taskEvent";
import * as mapAction from "../../redux/actions/map";
import { bindActionCreators } from "redux";
// <<<<<<< HEAD
import Map from "./map/map";
// import { Input } from "antd";
import trackQuery from "@app/resource/icon/trackQuery.svg";
// =======
import moment from 'moment';
// import Map from "./map/map";
import { Modal, DatePicker, Button, TreeSelect,Input } from "antd";
// >>>>>>> c8cd550299825242c8af38c6acf816b56258f26f
import TaskTimeLine from "./taskTimeLine";
import TaskUpdate from "./taskUpdate";
import Head from "../../components/head/head";
import titleImg from "@app/resource/title/rwdd.png";
import RouterList from "../../components/routerlist";
import TaskInfoNavi from "./component/taskInfoNavi";
import TaskInfoCard from "./component/taskInfoCard";
import TaskInfoCheck, {ButtonCommands} from "./component/taskInfoCheck";
import checkImg from "@app/resource/图层.svg";
import "./task.scss";
// <<<<<<< HEAD
// const { Search } = Input;

// const TaskInfo = (props) => {
//   const {
//     floodRanks,
//     floodAddress,
//     expert,
//     userPosition,
//     taskList,
//     floodRankAddress,
//     floodExpertAddress,
//   } = props;
//   const formRef = useRef(null);
//   const {
//     getFloodAddress,
//     getAllFloodUser,
//     setMapUserPosition, //设置人员定位
//     getTaskList,
//     setTaskInfo,
//     getFlooodUserExpert, //专家/人员定位
//   } = props.actions;
//   const { getFloodRankUser, getFloodExpert } = props.mapActions;

//   const [text, setText] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [showCheck, setShowCheck] = useState(false);
//   useEffect(() => {
//     getTaskList({
//       current: 1,
//       size: 10,
//     });
//     getFloodAddress(); //人员定位
//     getAllFloodUser(); //防汛人员
//     getFloodRankUser(); //防汛队伍
//     getFloodExpert(); //防汛专家
//     getFlooodUserExpert();
//   }, []);
//   useEffect(() => {
//     if (props?.location?.query?.info) {
//       setTaskInfo(props?.location?.query?.info);
//     } else {
//       if (taskList) {
//         setTaskInfo(taskList?.records[0]);
//       }
//     }
//   }, [taskList]);
//   // let init = [...floodExpertAddress, ...floodRankAddress.allRankUser];
//   let init = [];

//   useEffect(() => {
//     return () => {
//       setMapUserPosition([]);
//     };
//   }, [floodRanks, floodAddress]);

//   const onSearch = (value) => {
//     if (value) {
//       let filteredList = [
//         ...floodExpertAddress.all,
//         ...floodRankAddress.allRankUser,
//       ].filter((item) => {
//         return item.name.indexOf(value) !== -1;
//       });
//       setMapUserPosition(filteredList);
//     } else {
//       setMapUserPosition(init);
//     }
//   };
//   return (
//     <div style={{ height: "100%", marginTop: "-90px", background: "#003366" }}>
//       {/* <div style={{ height: "90px" }}></div> */}
//       <div style={{ height: "90px", background: "#003366", zIndex: 99 }}></div>
//       <div
//         style={{
//           height: "100%",
//           width: "100px",
//           background: "#003366",
//           position: "absolute",
//           right: "0px",
//           zIndex: "9",
//         }}
//       ></div>
//       <Map layerVisible={{}} person={userPosition}></Map>
//       <Head titleImg={titleImg} groundColor="#003366" />
//       <RouterList />
//       <div
//         className="track-query-body"
//         onMouseOver={() => setShowSearch(true)}
//         onMouseLeave={() => {
//           setShowSearch(false);
//         }}
//       >
//         {showSearch ? (
//           <Search
//             placeholder="请输入查询人名称"
//             onSearch={onSearch}
//             onChange={(e) => setText(e.target.value)}
//             suffix={
//               <img
//                 style={{ cursor: "pointer" }}
//                 src={trackQuery}
//                 onClick={() => {
//                   onSearch(text);
//                 }}
//               ></img>
//             }
//           ></Search>
//         ) : null}
//         {showSearch ? null : <img src={trackQuery}></img>}
//       </div>
//       <div
//         className="task-checkbox-img"
//         onMouseOver={() => setShowCheck(true)}
//         onMouseLeave={() => {
//           setShowCheck(false);
//         }}
//       >
//         <img src={checkImg}></img>
//         {showCheck ? <TaskInfoCheck /> : <div></div>}
//       </div>
//       <TaskTimeLine></TaskTimeLine>
//       <TaskUpdate formRef={formRef}></TaskUpdate>
//       <TaskInfoNavi formRef={formRef} />
//       <TaskInfoCard />
//     </div>
//   );
// };
// const mapStateToProps = (state) => {
//   // console.log(state, "S");
//   return {
//     floodAddress: state.taskReducers.floodAddress,
//     taskInfo: state.taskReducers.taskInfo,
//     // floodUser: state.mapAboutReducers.floodUser,
//     expert: state.mapAboutReducers.expert,
//     userPosition: state.taskReducers.userPosition,
//     taskList: state.taskReducers.taskList,
//     floodRanks: state.mapAboutReducers.floodRanks,

//     floodRankAddress: state.currency.floodRankAddress,
//     floodExpertAddress: state.currency.floodExpertAddress,
//   };
// =======
// const hashHistory = createHashHistory();
// const { Search } = Input;

const TaskInfo = (props) => {
    const {
        floodAddress,
        taskList,
        selectedPersonTrack,
        floodUserMap,
        expertMap,

    } = props;
    const formRef = useRef(null);
    const {
        getFloodAddress,
        getAllFloodUser,
        getTaskList,
        setTaskInfo,
        updateTrackData,
    } = props.actions;
    const {getFloodRankUser, getFloodExpert} = props.mapActions;

    //搜索框数据源
    const [searchList, setSearchList] = useState([]);
    //是否显示图层控制框
    const [showCheck, setShowCheck] = useState(false);
    //是否显示用户信息框
    const [personInfoVisible, setPersonInfoVisible] = useState(false);
    //当前鼠标选择的人员
    const [selectedPerson, setSelectedPerson] = useState(null);
    //当前历史路径选择的开始时间和结束时间
    const [selectedBeginTime, setSelectedBeginTime] = useState(moment()
        .subtract(3, 'hour'));
    const [selectedEndTime, setSelectedEndTime] = useState(moment());
    //图层可见性
    const [layerVisible, setLayerVisible] = useState({
       //轨迹图层
        track: true,
        //人员定位图层
       person: true,
        //防汛物资仓库图层
        warehouse: true,
        //队伍图层
        rank: true,
        //交通图层
        traffic: false,
        //水系图
        river40: true,
    });
    //设置搜索框数据源
    useEffect(() => {
        const {records} = floodAddress;
        let personList = [];
        let expertList = [];

        if (records && records.length > 0) {
            records.forEach(item => {
                let userId = item.userId;
                if (userId) {
                    if (item.typeCode === 103) {
                        let name = floodUserMap?.[userId]?.name;
                        personList.push({title: name, value: userId, tag: item});
                    } else if (item.typeCode === 104) {
                        let name = expertMap?.[userId]?.name;
                        expertList.push({title: name, value: userId, tag: item});
                    }
                }
            });
        }

        setSearchList([
            {
                title: '防汛人员',
                selectable: false,
                value: '防汛人员',
                children: personList
            },
            {
                title: '防汛专家',
                selectable: false,
                value: '防汛专家',
                children: expertList
            }
        ]);
    }, [floodAddress, floodUserMap, expertMap]);

    //更新数据
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
        if (props?.location?.query?.info) {
            setTaskInfo(props?.location?.query?.info);
        } else {
            if (taskList) {
                setTaskInfo(taskList?.records[0]);
            }
        }
    }, [taskList]);

    //定时从后台获取人员定位数据
    useEffect(() => {
        let timer = setInterval(()=>{
            getFloodAddress();
        }, 30000);

        return () => {
          clearInterval(timer);
        };
    }, []);

    //地图上人员点击事件
    const onPersonClick = (person) => {
        setPersonInfoVisible(true);
        setSelectedPerson(person);
    };

    //在地图上定位到选择人员的位置处
    const onPersonLocation = (userId, node) => {
        const {tag} = node;

        if (tag) {
            const {longitude, latitude} = tag;
            emitter.emit('map-move-focus', [longitude, latitude]);
        }
    };

    //查询人员得历史路径
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
                person={floodAddress.records}
                 trackList ={selectedPersonTrack}
                 onPersonClick={onPersonClick}/>
            <Head titleImg={titleImg}/>
            <RouterList/>
            <div className="track-query-body">
                <TreeSelect
                    showSearch
                    placeholder="人员名称"
                    style={{width: '100%'}}
                    treeData={searchList}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    //value={text}
                    treeNodeFilterProp={'title'}
                    //onChange={setText}
                    //treeDefaultExpandedKeys
                    treeDefaultExpandAll
                    onSelect={onPersonLocation}
                />
            </div>
            <div
                className="task-checkbox-img"
                onMouseOver={() => setShowCheck(true)}
                onMouseLeave={() => {
                    setShowCheck(false);
                }}>

                <img src={checkImg}/>
                <TaskInfoCheck
                    visible={showCheck}
                    layerStatus={layerVisible}
                    onLayerChange={(key, value) =>{
                        let layerStatus = {...layerVisible};
                        layerStatus[key] = value;
                        setLayerVisible(layerStatus);
                    }}
                    onCommandClick={(cmd) => {
                        if (cmd === ButtonCommands.ClearTrack) {
                            //清除轨迹
                            updateTrackData([]);
                        }
                    }}/>
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
                </div>
                <div className={'person-info-line'}>
                    <span>定位时间: {selectedPerson?.tag?.dynamicInfo?.reportTime}</span>
                </div>
            </Modal>
        </div>
    );

};
const mapStateToProps = (state) => {
    return {
        floodAddress: state.taskReducers.floodAddress,
        taskInfo: state.taskReducers.taskInfo,
        selectedPersonTrack: state.taskReducers.selectedPersonTrack,
        floodUser: state.mapAboutReducers.floodUser,
        floodUserMap: state.mapAboutReducers.floodUserMap,
        expertMap: state.mapAboutReducers.expertMap,
        expert: state.mapAboutReducers.expert,
        userPosition: state.taskReducers.userPosition,
        taskList: state.taskReducers.taskList,
    };
// >>>>>>> c8cd550299825242c8af38c6acf816b56258f26f
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
    mapActions: bindActionCreators(mapAction, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
