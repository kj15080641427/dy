/**
 * map 2020-05-12
 * update: 2020-11-11
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/monitor";
import UbiMap from "../../monitor/map/ubimap";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import emitter from "@app/utils/emitter.js";
import { getWarehouse, getWarehouseMt } from "@app/data/request";

import "./style.scss";

import VideoControl from "@app/components/video/VideoControl";

import Person from "./Person";

import { message } from "antd";
class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      overlays: {},
    };
    this.type = [
      Person,
      // Rain,
      // Water,
      // Video,
      // Gate,
      // Pump,
      // WfsRiver,
      // Ponding,
      // Warehouse,
    ];
    // eslint-disable-next-line react/no-direct-mutation-state
    let _this = this;
    this.type.forEach((Ovl) => {
      _this.state.overlays[Ovl.type] = {};
    });
    this.mapKey = "b032247838f51a57717f172c55d25894";
    this._windowCloseFlag = true; // window关闭事件是否开启
    this.onOverlayClose = this.onOverlayClose.bind(this);
    this.videoControl = new VideoControl();
  }
  render() {
    let { overlays } = this.state;
    let domArr = [];
    if (this.map) {
      Object.keys(overlays).forEach((type) => {
        for (let i = 0; i < this.type.length; i++) {
          let Comp = null;
          if (this.type[i].type === type) {
            Comp = this.type[i];
            let comps = Object.keys(overlays[type]).map((key) => {
              return (
                <Comp
                  key={key}
                  map={this.map}
                  model={overlays[type][key]}
                  onClose={this.onOverlayClose}
                />
              );
            });
            domArr = domArr.concat(comps);
            break;
          }
        }
      });
    }
    return (
      <>
        {/* <div id="map"></div> */}
        <div id="map" className={"display-map"} />
        {domArr}
      </>
    );
  }
  componentDidUpdate(prevProps) {
    let { layerVisible, person, floodRanks, trackList } = this.props;
    if (person !== prevProps.person) {
      this.loadData();
    }
    if (floodRanks) {
      this.addFloodRank();
    }
    if (layerVisible !== prevProps.layerVisible) {
      this.setVisible();
    }
    if (
      layerVisible.water !== prevProps.layerVisible.water ||
      layerVisible.rain !== prevProps.layerVisible.rain
    ) {
      this._zoom = null;
      this.toggleTagByMapZoom();
    }

    // this.loadData();

    if (trackList !== prevProps.trackList) {
      this.map.clear("track");
      if (trackList) {
        let mapPoints = trackList.map((item) => {
          return [item.longitude, item.latitude];
        });

        this.map.addFeature("track", {
          type: "LineString",
          lonlats: mapPoints,
        });
      }
    }
  }
  componentDidMount() {
    this.createMap();
    this.setVisible();
    this.addEvent();
    this.getWarehouseData();
    // this.loadData();
    // this.videoControl.login();
  }
  componentWillUnmount() {
    this._resizeToken.remove();
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    this.map.stopSelectFeature("person");
    this.map.unView("change:resolution", this.mapViewChanged.bind(this));

    this._mapMove && this._mapMove.remove();
    this._mapMoveFocus && this._mapMoveFocus.remove();
    this.flood && this.flood.destroy();
    // this._clickToken.remove();

    if (this.alarmTimer) {
      clearInterval(this.alarmTimer);
    }
  }
  createMap() {
    this.map = new UbiMap({
      target: "map",
      center: [118.67, 37.6],
      zoom: 9.7,
      minZoom: 3,
      maxZoom: 18,
      mouseControl: false,
    });

    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      key: "tiandi",
      // className: "ol-layer-tiandi",
      //projection: true,
    });
    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      key: "tiandi2",
      // className: "ol-layer-tiandi",
      //projection: true,
    });
    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:市界线",
        TILED: true,
      },
      zIndex: 10,
      key: "city",
    });

    this.map.addImageTile({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:河流40",
        TILED: false,
      },
      zIndex: 11,
      key: "river40",
    });

    // 加入交通实况图;
    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:traffic",
        TILED: true,
      },
      zIndex: 11,
      key: "traffic",
    });

    //轨迹图层
    this.map.addVector({
      key: "track",
      zIndex: 21,
      style: {
        strokeColor: "red",
        width: 3,
      },
      visible: true,
    });

    //防汛人员图层
    this.map.addVector({
      key: "person",
      zIndex: 20,
      style: {
        heading: function (featureObj) {
          return featureObj.heading;
        },
        src: function (feature) {
          return require("@app/resource/人员定位.svg")["default"];
        },
        // anchor: [0.5, 1],
        offset: [0, 0],
        strokeColor: "#1890ff",
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
        width: "20px",
        height: "20px",
      },
    });

    //防汛物资仓库图层
    this.map.addVector({
      key: "warehouse",
      zIndex: 30,
      style: {
        anchor: [0.5, 0.5],
        strokeColor: "#ff0000",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [20, 0],
        src: function (featureObj) {
          return require("@app/resource/icon/warehouse.svg")["default"];
        },
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    //防汛队伍图层
    this.map.addVector({
      key: "rank",
      zIndex: 30,
      style: {
        anchor: [0.5, 0.5],
        strokeColor: "#ff0000",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [20, 0],
        src: function (featureObj) {
          return require("@app/resource/抢险队伍.svg")["default"];
        },
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });

    this.map.startHighlightFeatureonLayer("person");
    this.map.startHighlightFeatureonLayer("rank");
    this.map.startHighlightFeatureonLayer("warehouse");

    this.map.startSelectFeature("person", (param) => {
      if (this.props.onPersonClick) {
        console.log(param, "PARAM");
        this.props.onPersonClick(param);
      } else {
        this.addOverlay(Person.type, param);
      }
    });
    this.map.startSelectFeature("rank", (param) => {
      // this.addOverlay(Person.type, param);
    });
    this.map.startSelectFeature("warehouse", (param) => {
      let { details } = this.props;
      //console.log(1);
      if (details.warehouse[param.id]) {
        this.addOverlay(Warehouse.type, {
          ...param,
          ...details.warehouse[param.id],
        });
      } else {
        // getWarehouseMt({ materialWarehouseId: param.id })
        //   .then((res) => {
        //     if (res.code === 200) {
        //       let record = res.data || [];
        //       this.props.actions.setDetailData({
        //         key: "warehouse",
        //         value: { materials: record, id: param.id },
        //         idKey: "id",
        //       });
        //       this.addOverlay(
        //         Warehouse.type,
        //         record ? { ...param, materials: record, id: param.id } : param
        //       );
        //     } else {
        //       return Promise.reject(res.msg || "未知错误");
        //     }
        //   })
        //   .catch((e) => {
        //     message.error("获取仓库详情失败");
        //   });
      }
    });

    this.map.onFeatureClicked((feature) => {
      // console.log("featureclick", feature);
      if (feature) {
        //console.log('onFeatureClicked', this._isClickInfoBox);
        this._isClickInfoBox = true;

        this.addWindowCloseEvent();
      }
      // 下一次事件循环去掉
      window.setTimeout(() => {
        this._isClickInfoBox = false;
      }, 0);
    });
    this.map.onView("change:resolution", this.mapViewChanged.bind(this));
    this.mapViewChanged(); // 初始化完成调一下,根据zoom隐藏相关图层
    // 地图拖动事件
    this.map.getMap().on("movestart", () => {
      this._isMapMoved = true;
      // this.mapViewChanged();
    });
    this.map.getMap().on("moveend", () => {
      window.setTimeout(() => {
        this._isMapMoved = false;
      }, 0);
      // this.mapViewChanged();
    });
  }
  mapViewChanged() {
    let zoom = this.map.getView().getZoom();
    let { onZoomChanged } = this.props;
    onZoomChanged && onZoomChanged(zoom);
  }

  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    let elements = overlays[key];
    if (elements[id]) {
      return;
    }
    // 查询该key是否只能显示一个overlay
    let isSingle = this.type.some((Overlay) => {
      if (Overlay.type === key) {
        return Overlay.single;
      }
      return false;
    });
    if (isSingle) {
      overlays[key] = {
        [id]: param,
      };
    } else {
      elements[id] = param;
    }
    this.setState({
      overlays: { ...overlays },
    });
  }
  setVisible() {
    let { layerVisible } = this.props;
    if (layerVisible) {
      Object.keys(layerVisible).forEach((layerKey) => {
        let show = layerVisible[layerKey];
        this.map.setVisible(layerKey, show);
      });
    }
  }
  addEvent() {
    this._resizeToken = addEventListener(window, "resize", () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
      }
      this._resizeTimeout = setTimeout(() => {
        this.map.updateSize();
      }, 300);
    });
    this._mapMove = emitter.addListener("map-move", (lonlat, onMoveEnd) => {
      this.map &&
        this.map.animate(
          {
            center: lonlat,
            duration: 250,
          },
          () => {
            onMoveEnd && onMoveEnd();
          }
        );
    });
    this._mapMoveFocus = emitter.addListener(
      "map-move-focus",
      (lonlat, duration = 2000) => {
        this.map &&
          this.map.animate(
            {
              center: lonlat,
              duration: 250,
            },
            () => {
              this.addFocusBox(lonlat, duration);
            }
          );
      }
    );
  }
  addWindowCloseEvent() {
    this._windowCloseFlag = false;
    if (this._clickToken) {
      this._clickToken.remove();
    }

    this._clickToken = addEventListener(window, "click", () => {
      if (!this._windowCloseFlag) {
        return;
      }
      if (this._isMapMoved) {
        return;
      }
      let obj = {};
      this.type.forEach((Ovl) => {
        obj[Ovl.type] = {};
      });
      this.setState({
        overlays: obj,
      });
      this._clickToken.remove();
    });
    setTimeout(() => {
      this._windowCloseFlag = true;
    }, 0);
  }
  getWarehouseData() {
    getWarehouse({})
      .then((res) => {
        if (res.code === 200) {
          this.props.actions.addWarehouse(res.data);
          this.map.addFeatures(
            "warehouse",
            res.data.map((item) => {
              return {
                type: "Point",
                id: item.materialWarehouseId,
                lonlat: [item.lon, item.lat],
                ...item,
              };
            })
            //  templateWareHouse(res.data)
          );
        }
      })
      ["catch"](() => {
        console.log(e);
      });
  }
  loadData() {
    const { person, floodUserMap, expertMap } = this.props;
    console.log(person, "person--", floodUserMap, expertMap);

    this.map.clear("person");
    let personFeatures = [];
    if (!person || !person.length || person.length === 0) {
      return;
    }
    for (let index = 0; index < person.length; index++) {
      let item = person[index];
      // if (!item.userid) {
      //   item.userid = item.userId;
      // }
      let personInfo = null;
      let personType = item.typeCode;

      //103是防汛人员
      //104是防汛专家
      // if (personType === 103) {
      //   personInfo = floodUserMap[item.userId];
      // } else if (personType === 104) {
      //   personInfo = expertMap[item.userId];
      // }
      if (item.lon && item.lat) {
        personFeatures.push({
          type: "Point",
          id: item.name,
          name: item.name,
          lonlat: [item.lon, item.lat],
          tag: { personInfo: { ...item }, dynamicInfo: { ...item } },
        });
      }
    }
    this.map.addFeatures("person", personFeatures);
    // this.map.addFeatures(
    //   "person",
    //   person.map((item) => {
    //     return {
    //       ...item,
    //       type: "Point",
    //       id: item.userid,
    //       lonlat: [item.lon, item.lat],
    //       tag: { ...item, dynamicInfo: { ...item } },
    //     };
    //   })
    // );
  }

  addFloodRank() {
    const { floodRanks } = this.props;
    this.map.addFeatures(
      "rank",
      floodRanks.map((item) => {
        return {
          ...item,
          type: "Point",
          id: item.name,
          lonlat: [item.longitude, item.latitude],
        };
      })
    );
  }
  onOverlayClose(id, type) {
    let { overlays } = this.state;
    let obj = overlays[type];
    if (!obj || !obj[id]) {
      return;
    }
    delete obj[id];
    this.setState({
      overlays: { ...overlays },
    });
  }
  addFocusBox(lonlat, duration = 2000) {
    let div = document.createElement("div");
    div.className = "ol-focus-container";
    let div1 = document.createElement("div");
    div1.className = "ol-focus-box";
    let div2 = document.createElement("div");
    div2.className = "ol-focus-box";
    let div3 = document.createElement("div");
    div3.className = "ol-focus-box";
    let div4 = document.createElement("div");
    div4.className = "ol-focus-box";
    div.append(div1, div2, div3, div4);
    this.map.removeOverlay("focus");
    this.map.addOverlay(
      "focus",
      {
        Coordinate: lonlat,
        positioning: "center-center",
        offset: [0, 0],
        stopEvent: false,
      },
      div
    );
    if (this._focusToken) {
      clearTimeout(this._focusToken);
    }
    this._focusToken = window.setTimeout(() => {
      this.map.removeOverlay("focus");
    }, duration);
  }
}
function mapStateToProps(state) {
  return {
    water: state.monitor.water,
    rain: state.monitor.rain,
    ponding: state.monitor.ponding,
    details: state.monitor.details,
    warehouse: state.monitor.warehouse,
    floodUser: state.mapAboutReducers.floodUser,
    //防汛人员表
    floodUserMap: state.mapAboutReducers.floodUserMap,
    //防汛专家表
    expertMap: state.mapAboutReducers.expertMap,
    //防汛队伍表
    floodRanks: state.mapAboutReducers.floodRanks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
