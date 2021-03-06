/**
 * map 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/rain";
import UbiMap from "../../monitor/map/ubimap";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import emitter from "@app/utils/emitter.js";

import "./style.scss";
import VideoControl from "@app/components/video/VideoControl";

import Person from "./overlays/Person";
import Rain from "./overlays/Rain";
import Water from "./overlays/Water";
import Ponding from "./overlays/Ponding";
import Video from "./overlays/Video";
import Gate from "./overlays/Gate";
import Pump from "./overlays/Pump";
import WfsRiver from "./overlays/WfsRiver";
import Warehouse from "./overlays/Warehouse";
class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      overlays: {},
    };
    this.type = [
      Person,
      Rain,
      Water,
      Video,
      Gate,
      Pump,
      WfsRiver,
      Ponding,
      Warehouse,
    ];
    this.type.forEach((Ovl) => {
      this.state.overlays[Ovl.type] = {};
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
        <div id="map" className={"display-map"}></div>
        {domArr}
      </>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    let { layerVisible, rainData, stations } = this.props;
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

    if ((rainData, stations)) {
      this.drawFeatures(rainData?.data);
    }
  }
  componentDidMount() {
    this.createMap();
    this.setVisible();
    this.addEvent();
    // this.loadData();
    this.videoControl.login();
  }
  componentWillUnmount() {
    this._resizeToken.remove();
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    this.map.stopSelectFeature("video");
    this.map.stopSelectFeature("ponding");
    this.map.stopSelectFeature("rain");
    this.map.stopSelectFeature("water");
    this.map.stopSelectFeature("gate");
    this.map.stopSelectFeature("pump");
    this.map.stopSelectFeature("person");
    this.map.stopSelectFeature("warehouse");
    // this.map.getMap().un("movestart");
    // this.map.getMap().un("moveend");
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
    const { rainData } = this.props;
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
      className: "ol-layer-tiandi",
      opacity: 1,
      key: "tiandi",
      //projection: true,
    });
    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      className: "ol-layer-tiandi",

      key: "tiandi2",
      //projection: true,
    });
    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:DYWater",
        TILED: true,
      },
      zIndex: 10,
      key: "river",
    });
    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:河流40",
        TILED: true,
      },
      zIndex: 10,
      key: "river2",
    });

    //加入交通实况图
    // this.map.addGeo({
    //   url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
    //   params: {
    //     'LAYERS': 'dy:traffic',
    //     'TILED': true
    //   },
    //   zIndex: 11,
    //   key: 'traffic'
    // });

    // this.flood = new FloodAnimation({
    //   map: this.map.getMap(),
    //   url: 'http://code.tuhuitech.cn:10012/geoserver/dy/ows?service=WFS',
    //   srsName: 'EPSG:4326', ns: 'www.gcspace.com', ws: 'dy',
    //   layerName: 'River',
    //   colorTable: [
    //     { min: 0, max: 0.1, color: '#00ff00' },
    //     {min: 0.1, max: 0.5, color: '#eee538'},
    //     {min: 0.5, max: 0.75, color: '#ffa500'},
    //     {min: 0.75, max: 1000, color: '#ff0000'}
    //   ]
    // });
    // this.flood.on("click", this.onFloodClick);
    // this.map.addWFS({
    //   zIndex: 11,
    //   key: "wfsRiver",
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs",
    //   typename: "dy:河流40",
    //   onClick: (props) => {
    //     if (props && props.NAME) {
    //       // 下2次事件循环
    //       //console.log('addwfs',this._isClickInfoBox);
    //       if (this._isClickInfoBox) return;
    //       this.onWfsRiverClick(props);
    //
    //     }
    //   }
    // });
    // this.map.addHeatmap({
    //   key: "heatmap",
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs",
    //   typename: "dy:雨情测站",
    //   gradient: ["#A6F28F", "#3DBA3D", "#61B8FF", "#0000E1", '#FA00FA', "#800040"]
    //   // url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=dy:DYWater&outputFormat=application/json&srsname=EPSG:4326%27"
    // });
    // this.map.addTile({
    //   key: "traffic",
    //   url: 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=longTime',
    //   projection: true,
    // });
    // this.map.addTraffic({
    //   key: "traffic",
    //   zIndex: 19,
    // });
    // this.map.addVector({
    //   key: "person",
    //   zIndex: 20,
    //   style: {
    //     heading: function(featureObj) {
    //         return featureObj.heading;
    //     },
    //     src: function(featureObj) { //
    //         return require("../../../resource/icon/person.svg")["default"];
    //     },
    //     anchor: [0.5, 1],
    //     strokeColor: "#1890ff",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontText: function(featureObj) {
    //         return featureObj.id + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    // this.map.addVector({
    //   key: "video",
    //   zIndex: 20,
    //   style: {
    //     src: function (featureObj) { //
    //       return require("../../../resource/icon/camera.svg")["default"];
    //     },
    //     anchor: [0.5, 0.5],
    //     strokeColor: "#1890ff",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontOffset: [10, 0],
    //     fontText: function (featureObj) {
    //       return featureObj.sitename + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    this.map.addVector({
      key: "rain",
      zIndex: 20,
      style: {
        src: function (featureObj) {
          const type = rainData?.type;
          let drp = 0;
          if (featureObj?.avgDrp) {
            drp = featureObj?.avgDrp;
          } else {
            drp = 0.0;
          }
          // try {
          //   drp = parseFloat(featureObj?.avgDrp );
          // } catch (e) {
          //   drp = 0.0;
          // }
          if (drp === 0) {
            return require("../../../resource/icon/1.svg")["default"];
          } else if (drp > 0 && drp <= 10) {
            return require("../../../resource/icon/2.svg")["default"];
          } else if (drp > 10 && drp <= 25) {
            return require("../../../resource/icon/3.svg")["default"];
          } else if (drp > 25 && drp <= 50) {
            return require("../../../resource/icon/4.svg")["default"];
          } else if (drp > 50 && drp <= 100) {
            return require("../../../resource/icon/5.svg")["default"];
          } else if (drp > 100 && drp <= 250) {
            return require("../../../resource/icon/6.svg")["default"];
          } else if (drp > 250) {
            return require("../../../resource/icon/7.svg")["default"];
          }
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "red",
        fontOffset: [10, 0],
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    // this.map.addVector({
    //   key: "water",
    //   zIndex: 20,
    //   style: {
    //     src: function (featureObj) { //
    //       // if (featureObj.warningOver) {
    //       //   return require("../../../resource/icon/water_warning.svg")["default"];
    //       // } else {
    //       //   return require("../../../resource/icon/water.svg")["default"];
    //       // }
    //       return require("../../../resource/icon/water.svg")["default"];
    //     },
    //     anchor: [0.5, 0.5],
    //     strokeColor: "#1890ff",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontOffset: [10, 0],
    //     fontText: function (featureObj) {
    //       return featureObj.name + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    // this.map.addVector({
    //   key: "ponding",
    //   zIndex: 20,
    //   style: {
    //     src: function (featureObj) { //
    //       return require("../../../resource/icon/ponding.svg")["default"];
    //     },
    //     anchor: [0.5, 0.5],
    //     strokeColor: "#1890ff",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontOffset: [10, 0],
    //     fontText: function (featureObj) {
    //       return featureObj.name + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    // this.map.addVector({
    //   key: "gate",
    //   zIndex: 30,
    //   style: {
    //     anchor: [0.5, 0.5],
    //     strokeColor: "#ff0000",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontOffset: [0, 0],
    //     fontText: function (featureObj) {
    //       return featureObj.name + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    // this.map.addVector({
    //   key: "pump",
    //   zIndex: 30,
    //   style: {
    //     anchor: [0.5, 0.5],
    //     strokeColor: "#ff0000",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontOffset: [0, 0],
    //     src: function (featureObj) {
    //       return require("../../../resource/pump.svg")["default"];
    //
    //     },
    //     fontText: function (featureObj) {
    //       return featureObj.name + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    // this.map.addVector({
    //   key: "warehouse",
    //   zIndex: 30,
    //   style: {
    //     anchor: [0.5, 0.5],
    //     strokeColor: "#ff0000",
    //     width: 1,
    //     fillColor: "#1890ff",
    //     fontColor: "#82B2FF",
    //     fontOffset: [20, 0],
    //     src: function (featureObj) {
    //       return require("../../../resource/icon/warehouse.svg")["default"];
    //     },
    //     fontText: function (featureObj) {
    //       return featureObj.name + "";
    //     },
    //     font: '16px sans-serif'
    //   }
    // });
    // this.map.addGate({
    //   key: "gata1"
    // })
    // this.map.startHighlightFeatureonLayer("person");
    // this.map.startHighlightFeatureonLayer("video");
    this.map.startHighlightFeatureonLayer("rain");
    // this.map.startHighlightFeatureonLayer("water");
    // this.map.startHighlightFeatureonLayer("ponding");
    // this.map.startHighlightFeatureonLayer("gate");
    // this.map.startHighlightFeatureonLayer("pump");
    // this.map.startHighlightFeatureonLayer("wfsRiver");
    // this.map.startHighlightFeatureonLayer("warehouse");
    // this.map.startTagOnLayer("water");
    // this.map.startTagOnLayer("rain");
    // this.map.startSelectFeature("person", (param) => {
    //   this.addOverlay(Person.type, param);
    //   // this.map.addOverlay(param.id, { Coordinate: param.lonlat, offset: [13, -25] }, createPersonDom(param, {
    //   //   onVideoClick: () => {
    //   //   },
    //   //   onClose: () => {
    //   //     this.map.removeOverlay(param.id);
    //   //   }
    //   // }));
    // });
    this.map.startSelectFeature("rain", (param) => {
      param = { ...param, dict: this.props.dict };
      if (this.props.onFeatureClick) {
        this.props.onFeatureClick(param);
      } else {
        param = { ...param, dict: this.props.dict };
        this.addOverlay(Rain.type, param);
      }

      // let { stations } = this.props;
      // if (stations[param.stcd]) {
      // // if (false) {
      // //   this.addOverlay(Rain.type, { ...param, ...details.rain[param.stcd] });
      // // } else {
      //   getRainRealTime({ stcd: param.stcd, current: 1, size: 1 })
      //     .then((res) => {
      //       if (res.code === 200) {
      //         let record = res.data.records && res.data.records[0] || null;
      //         // this.props.actions.setDetailData({
      //         //   key: "rain",
      //         //   value: record
      //         // });
      //         this.addOverlay(Rain.type, record ? { ...param, ...record } : param);
      //       } else {
      //         return Promise.reject(res.msg || "未知错误");
      //       }
      //     })
      //     .catch((e) => {
      //       message.error("获取雨晴详情失败");
      //     });
      // }
    });
    // this.map.startSelectFeature("water", (param) => {
    //   let { details } = this.props;
    //   //if (details.water[param.stcd]) {
    //   //phz 修改，所有的水位都从接口获取
    //   if (false) {
    //     this.addOverlay(Water.type, { ...param, ...details.water[param.stcd] });
    //   } else {
    //     //查询实时水位
    //     let queryWater = getWaterRealTime({ stcd: param.stcd, current: 1, size: 1 });
    //     //查询站点视频信息
    //     let queryVideo = getVideosByCode({ code: param.code });
    //     //getWaterRealTime({stcd: param.stcd, current: 1, size: 1})
    //     let endTime = new moment().format('YYYY-MM-DD HH:mm:ss');
    //     let beginTime = moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
    //     //查询24小时水位
    //     let queryWaterHistory = getWaterHistory({ stcd: param.stcd, current: 1, size: 10000, starttm: beginTime, endtm: endTime })
    //     Promise.all([queryWater, queryVideo, queryWaterHistory])
    //       .then((result) => {
    //         let res = result[0];
    //         if (res.code === 200) {
    //           let records = res.data.records && res.data.records[0] || null;
    //           this.props.actions.setDetailData({
    //             key: "water",
    //             value: records
    //           });
    //           let videoObject = result[1].data;
    //           let waterLevels = result[2].data.records;
    //           let newParam = records ? { ...param, ...records } : param;
    //           newParam = videoObject ? { ...newParam, videos: [...videoObject] } : newParam;
    //           newParam = waterLevels ? { ...newParam, waters: [...waterLevels] } : newParam;
    //           newParam.videoControl = this.videoControl;
    //           this.addOverlay(Water.type, newParam);
    //         } else {
    //           return Promise.reject(res.msg || "未知错误");
    //         }
    //       })
    //       .catch((e) => {
    //         message.error("获取水位详情失败");
    //       });
    //   }
    // });
    // this.map.startSelectFeature("ponding", (param) => {
    //   let queryWater = getWaterRealTime({ stcd: param.stcd, current: 1, size: 1 });
    //   let queryVideo = getVideosByCode({ code: param.code });
    //   //getWaterRealTime({stcd: param.stcd, current: 1, size: 1})
    //   let endTime = new moment().format('YYYY-MM-DD HH:mm:ss');
    //   let beginTime = moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
    //   let queryWaterHistory = getWaterHistory({ stcd: param.stcd, current: 1, size: 10000, starttm: beginTime, endtm: endTime })
    //   Promise.all([queryWater, queryVideo, queryWaterHistory])
    //     .then((result) => {
    //       let res = result[0];
    //       if (res.code === 200) {
    //         let records = res.data.records && res.data.records[0] || null;
    //         this.props.actions.setDetailData({
    //           key: "water",
    //           value: records
    //         });
    //         let videoObject = result[1].data;
    //         let waterLevels = result[2].data.records;
    //         let newParam = records ? { ...param, ...records } : param;
    //         newParam = videoObject ? { ...newParam, videos: [...videoObject] } : newParam;
    //         newParam = waterLevels ? { ...newParam, waters: [...waterLevels] } : newParam;
    //         newParam.videoControl = this.videoControl;
    //         this.addOverlay(Water.type, newParam);
    //       } else {
    //         return Promise.reject(res.msg || "未知错误");
    //       }
    //     })
    //     .catch((e) => {
    //       message.error("获取水位详情失败");
    //     });
    // });
    // this.map.startSelectFeature("video", (param) => {
    //   //查询站点的水位
    //   getWaterStationByVideoCode({ code: param.code })
    //     .then(result => {
    //       //查询失败
    //       if (result.code !== 200) {
    //         message.error('查询水位站点失败');
    //       } else if (!result.data || result.data.length === 0) {
    //         //没有水位信息时，仅显示视频
    //         let newParam = { ...param };
    //         newParam.videoControl = this.videoControl;
    //         this.addOverlay(Video.type, newParam);
    //       } else {
    //         //有水位站点，则查询该水位站点24小时水位数据
    //         let waterStation = result.data[0];
    //         let stcd = waterStation.stcd;
    //         let endTime = new moment().format('YYYY-MM-DD HH:mm:ss');
    //         let beginTime = moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
    //         getWaterHistory({ stcd: stcd, current: 1, size: 10000, starttm: beginTime, endtm: endTime })
    //           .then(res => {
    //             if (res.code === 200) {
    //               let newParam = { ...waterStation };
    //               newParam.videoControl = this.videoControl;
    //               newParam.videos = [param];
    //               newParam.waters = res.data.records;
    //               this.addOverlay(Water.type, newParam);
    //             }
    //           })
    //           .catch(e => {
    //             message.error('查询历史水位数据错误');
    //           });
    //       }
    //     })
    //     .catch(e => {
    //       message.error('查询水位站点数据错误');
    //       //没有水位信息时，仅显示视频
    //       let newParam = { ...param };
    //       newParam.videoControl = this.videoControl;
    //       this.addOverlay(Video.type, newParam);
    //     });
    //
    // });
    // this.map.startSelectFeature("gate", (param) => {
    //   let newParam = { ...param };
    //   this.addOverlay(Gate.type, newParam);
    // });
    // this.map.startSelectFeature("pump", (param) => {
    //   let newParam = { ...param };
    //   this.addOverlay(Pump.type, newParam);
    // });
    // this.map.startSelectFeature("warehouse", (param) => {
    //   // return emitter.emit("map-move-focus", [118.333, 37.333], 3000);
    //   let { details } = this.props;
    //   if (details.warehouse[param.id]) {
    //     this.addOverlay(Warehouse.type, { ...param, ...details.warehouse[param.id] });
    //   } else {
    //     getWarehouseMt({ materialWarehouseId: param.id })
    //       .then((res) => {
    //         if (res.code === 200) {
    //           let record = res.data || [];
    //           this.props.actions.setDetailData({
    //             key: "warehouse",
    //             value: { materials: record, id: param.id },
    //             idKey: 'id'
    //           });
    //           this.addOverlay(Warehouse.type, record ? { ...param, materials: record, id: param.id } : param);
    //         } else {
    //           return Promise.reject(res.msg || "未知错误");
    //         }
    //       })
    //       .catch((e) => {
    //         message.error("获取仓库详情失败");
    //       });
    //   }
    // });
    // this.map.activeMeasure();
    this.map.on("moveend", () => {
      let a = this.map.getView().calculateExtent();
    });
    this.map.onFeatureClicked((feature) => {
      if (feature) {
        this._isClickInfoBox = true;

        this.addWindowCloseEvent();
      }
      // 下一次事件循环去掉
      window.setTimeout(() => {
        this._isClickInfoBox = false;
      }, 0);
    });
    // 缩放事件
    this.map.onView("change:resolution", () => {
      this.mapViewChanged();
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
    this.toggleTagByMapZoom();
  }
  toggleTagByMapZoom() {
    let zoom = this.map.getView().getZoom();
    let { layerVisible } = this.props;
    if (zoom >= 11) {
      if (this._zoom && this._zoom >= 11) return;
      // if (layerVisible.water) {
      //   this.map.showTagBox("water_tag");
      // } else {
      //   this.map.hideTagBox("water_tag");
      // }
      if (layerVisible.rain) {
        this.map.showTagBox("rain_tag");
      } else {
        this.map.hideTagBox("rain_tag");
      }

      // if (layerVisible.ponding) {
      //   this.map.showTagBox('ponding_tag');
      // } else {
      //   this.map.hideTagBox('ponding_tag');
      // }

      // this.map.showTagOnLayer("water");
      // this.map.showTagOnLayer("rain");
    } else {
      if (this._zoom && this._zoom < 11) return;
      // this.map.hideTagBox("water_tag");
      this.map.hideTagBox("rain_tag");
      // this.map.hideTagBox("ponding_tag");
    }
    this._zoom = zoom;
  }
  // onWfsRiverClick(props) {
  //   props.id = props.NAME;
  //   let { details } = this.props;
  //   if (details.wfsRiver[props.NAME]) {
  //     this.addOverlay(WfsRiver.type, { ...props, ...details.wfsRiver[props.NAME] });
  //   } else {
  //     getWfsRiver({ name: props.NAME })
  //       .then((res) => {
  //         if (res.code === 200) {
  //           let record = res.data && res.data[0] || null;
  //           this.props.actions.setDetailData({
  //             key: "wfsRiver",
  //             value: record,
  //             idKey: "name"
  //           });
  //           this.addOverlay(WfsRiver.type, record ? { ...props, ...record } : props);
  //         } else {
  //           return Promise.reject(res.msg || "未知错误");
  //         }
  //       })
  //       .catch((e) => {
  //         message.error("获取河流详情失败");
  //       });
  //   }
  // }
  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    let elements = overlays[key];
    // if (elements[id]) return;
    // 查询该key是否只能显示一个overlay
    let isSingle = this.type.some((Overlay) => {
      if (Overlay.type === key) {
        return Overlay.single;
      }
      return false;
    });
    // if (isSingle) {
    overlays[key] = {
      [id]: param,
    };
    // } else {
    //   elements[id] = param;
    // }
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
      // 特殊几个layer, 如洪水
      // this.flood.setVisible(layerVisible.flood);
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
      if (!this._windowCloseFlag) return;
      if (this._isMapMoved) return;
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

  loadData() {
    //   // 加载雨量站和水位站,水位站报警信息
    //   let warningPro = getWaterWarning({});
    //   let allPro = getAll();
    //   let _this = this;
    //   Promise.all([allPro, warningPro]).then((res) => {
    //     if (res[0].code === 200) {
    //       let data = this.transformData(res[0].data);
    //
    //       this.props.actions.initBaseData(data);
    //       //如果显示报警
    //       if (_this.props.layerVisible.waterWarning === true) {
    //         this.props.actions.setMutiDetailData({
    //           key: "water",
    //           value: res[1] && res[1].data || []
    //         });
    //       }
    //
    //       this.drawFeatures(data);
    //     }
    //   })
    //     .catch((e) => {
    //       message.error('获取基础资料失败');
    //     });
    // // 加载视频数据
    // getAllVideo({}).then((res) => {
    //   if (res.code === 200) {
    //     this.props.actions.addVideos(res.data);
    //     this.map.addFeatures("video", res.data.map((item) => {
    //       return {
    //         ...item,
    //         type: "Point",
    //         id: item.radioID + "",
    //         lonlat: [item.lon, item.lat],
    //
    //       };
    //     }));
    //   }
    // })
    //   .catch((e) => {
    //   });
    // 加载水闸数据
    // getGate({}).then((res) => {
    //   if (res.code === 200) {
    //     this.props.actions.addGates(res.data);
    //     this.map.addFeatures("gate", res.data.filter((item) => { return item.lat > 3 && item.lat < 53 }).map((item) => {
    //       return {
    //         ...item,
    //         type: "LineString",
    //         id: item.gateID + "",
    //         name: item.name,
    //         rivername: item.rivername,
    //         management: item.management,
    //         isMuti: true,
    //         rotate: 0,
    //         rotateAnchor: [150, 50],
    //         lonlats: [item.lon, item.lat],
    //         coords: [
    //           [[0, 0], [0, 100], [300, 100], [300, 0], [0, 0], [0, 100], [300, 0], [0, 0], [300, 100]]
    //
    //         ]
    //       };
    //     }));
    //   }
    // }).catch((e) => {
    // });
    // 加载水泵数据
    // getPump({}).then((res) => {
    //   if (res.code === 200) {
    //     this.props.actions.addPumps(res.data);
    //     this.map.addFeatures("pump", res.data.map((item) => {
    //       return {
    //         ...item,
    //         type: "Point",
    //         id: item.pumpID + "",
    //         name: item.name,
    //         lonlat: [item.lon, item.lat]
    //       };
    //     }));
    //   }
    // })
    //   .catch((e) => {
    //   });
    // // 防汛物资仓库
    // getWarehouse({}).then((res) => {
    //   if (res.code === 200) {
    //     this.props.actions.addWarehouse(res.data);
    //     this.map.addFeatures("warehouse", templateWareHouse(res.data));
    //   }
    // })
    //   .catch(() => {
    //   });
    // 轮询预警更新
    // if (this.props.layerVisible.waterWarning === true)
    //   this.alarmTimer = window.setInterval(() => {
    //     getWaterWarning({})
    //       .then((res) => {
    //         if (res.code === 200) {
    //           //res.data.records[0].stcd = "31106670";
    //           this.props.actions.setMutiDetailData({
    //             key: "water",
    //             value: res && res.data || []
    //           });
    //           let { water, details } = this.props;
    //           this.map.updateFeatures("water", templateWater(water, details.water));
    //           this.addWaterWaring(res.data);
    //         }
    //       });
    //   }, 30000);
    // // 模拟洪水
    // setInterval(() => {
    //   let data = [];
    //   for (let i = 0; i < 195; i++){
    //     let r = 'R' + i;
    //     data.push({ r: r, d: Math.random() });
    //   }
    //   this.flood.updateData(data)
    // }, 1000);
    // this.map.addAlarm("alarm001", [118.67, 37.43]);
    // this.map.addFeatures("person", [
    //   {
    //     type: "Point",
    //     id: "person001",
    //     lonlat: [118.67, 37.43],
    //     heading: 0
    //   },
    //   {
    //     type: "Point",
    //     id: "person002",
    //     lonlat: [118.37, 37.43],
    //     heading: 0
    //   },
    // ]);
  }
  drawFeatures(data) {
    // data 实时雨量
    const { stations } = this.props;
    let list = [];
    stations?.map((item) => {
      data?.map((st) => {
        if (item.stcd == st.stcd) {
          item = { ...item, ...st, lonlat: [item.lon, item.lat] };
        }
      });
      list.push(item);
    });
    if (stations) {
      for (let key in stations) {
        stations[key].data = null;
      }
    }

    if (data && stations) {
      data.forEach((item) => {
        const { stcd } = item;
        let station = stations[stcd];
        if (station) {
          station.data = item;
        }
      });
    }

    let features = [];

    for (let key in list) {
      let station = list[key];
      features.push({
        type: "Point",
        id: station.stcd,
        lonlat: [station.lon, station.lat],
        data: { ...(data || []) },
        ...station,
      });
    }
    this.map.removeFeatures("rain", features);
    this.map.addFeatures("rain", features);
    // this.map.removeFeatures("rain", list);
    // this.map.addFeatures("rain", list);
    this.addRainTagBox(list);
    // 计算是或否显示tagbox
    this._zoom = null;
    this.toggleTagByMapZoom();
  }
  addRainTagBox(rain) {
    const { stations } = this.props;
    if (stations) {
      for (let key in stations) {
        let r = stations[key];
        let station = stations[r.stcd];
        let name = r.aliasNme || r.name;
        const { lon, lat, stcd } = r;
        let avgDrp = r.drp;
        let tagId = "rain_tag_" + stcd;
        let tagContent =
          avgDrp === null || avgDrp === undefined
            ? "--"
            : (avgDrp * 1).toFixed(1) + "mm";
        this.map.removeTagBox(tagId);
        this.map.addTagBox(tagId, [lon, lat], {
          title: name,
          subTitle: tagContent,
          prefix: "rain_tag",
        });
      }
    }
  }
  addWaterTagBox(water) {
    if (water && water.length) {
      water.forEach((r) => {
        let name = r.aliasNme ? r.aliasNme : r.name;
        this.map.addTagBox("water_tag_" + r.stcd, [r.lon, r.lat], {
          title: name,
          subTitle:
            r.z === null || r.z === undefined
              ? "--"
              : (r.z * 1).toFixed(2) + "m",
          prefix: "water_tag",
        });
      });
    }
  }

  addPondingTagBox(water) {
    if (water && water.length) {
      water.forEach((r) => {
        let name = r.aliasNme ? r.aliasNme : r.name;
        this.map.addTagBox("ponding_tag_" + r.stcd, [r.lon, r.lat], {
          title: name,
          subTitle:
            r.z === null || r.z === undefined
              ? "--"
              : (r.z * 100).toFixed(1) + "cm",
          prefix: "ponding_tag",
        });
      });
    }
  }
  addWaterWaring(warningWater) {
    this.map.removeAlarmByString("alarm_water_");
    if (!warningWater || !warningWater.length) return;
    if (this.props.layerVisible.waterWarning === true) {
      warningWater.forEach((w) => {
        this.map.addAlarm("alarm_water_" + w.stcd, [w.lon, w.lat]);
      });
    }
  }
  transformData(data) {
    if (!data || !data.length) return {};
    let obj = {
      rain: [],
      water: [],
      ponding: [],
    };
    data.forEach((item) => {
      //雨量站点
      if ([3, 5, 6, 10].indexOf(item.indtype) > -1) {
        obj.rain.push(item);
      }
      // //水位站点
      // if ([1, 2, 7, 8, 11].indexOf(item.indtype) > -1) {
      //   obj.water.push(item);
      // }
      // //积水点站点
      // if ([9, 11].indexOf(item.indtype) > -1) {
      //   obj.ponding.push(item);
      // }
    });
    return obj;
  }
  onOverlayClose(id, type) {
    let { overlays } = this.state;
    let obj = overlays[type];
    if (!obj || !obj[id]) return;
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
  // onFloodClick(featureProp) {
  //   console.log(featureProp);
  // }
}
function mapStateToProps(state) {
  return {
    dict: state.currency.dict,
    rainData: state.rain.rainData,
    stations: state.rain.stations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
