/**
 * map 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/monitor";
import UbiMap from "../../monitor/map/ubimap";
import FloodAnimation from "./FloodAnimation";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import emitter from "@app/utils/emitter.js";

import "./style.scss";
import {
  templateWater,
  templateRain,
  templatePonding,
  templateWareHouse,
} from "./template";
import {
  getAll,
  getRainRealTime,
  getWaterRealTime,
  getAllVideo,
  getWaterWarning,
  getGate,
  getPump,
  getWfsRiver,
  getWarehouse,
  getWarehouseMt,
} from "@app/data/request";
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
import { message } from "antd";
class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      test: 1,
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
                ></Comp>
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
        <div id="map" className={'display-map'}/>
        {domArr}
      </>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    let { layerVisible } = this.props;
    if (layerVisible !== prevProps.layerVisible) {
      this.setVisible();
    }
  }
  componentDidMount() {
    this.createMap();
    this.setVisible();
    this.addEvent();
    this.loadData();
    this.videoControl.login();
  }
  componentWillUnmount() {
    this._resizeToken.remove();
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }
    this._mapMove && this._mapMove.remove();
    this.flood && this.flood.destroy();
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
      url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      key: "tiandi",
      className: "ol-layer-tiandi",
      projection: true,
    });
    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      key: "tiandi2",
      className: "ol-layer-tiandi",
      projection: true,
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

    this.flood = new FloodAnimation({
      map: this.map.getMap(),
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/ows?service=WFS",
      srsName: "EPSG:4326",
      ns: "www.gcspace.com",
      ws: "dy",
      layerName: "River",
      colorTable: [
        { min: 0, max: 0.1, color: "#00ff00" },
        { min: 0.1, max: 0.5, color: "#eee538" },
        { min: 0.5, max: 0.75, color: "#ffa500" },
        { min: 0.75, max: 1000, color: "#ff0000" },
      ],
    });
    this.flood.on("click", this.onFloodClick);
    this.map.addWFS({
      zIndex: 11,
      key: "wfsRiver",
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs",
      typename: "dy:河流40",
      onClick: (props) => {
        if (props && props.NAME) {
          this.onWfsRiverClick(props);
        }
      },
    });
    this.map.addVector({
      key: "video",
      zIndex: 20,
      style: {
        src: function (featureObj) {
          //
          return require("../../../resource/icon/camera.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function (featureObj) {
          return featureObj.sitename + "";
        },
        font: "16px sans-serif",
      },
    });
    this.map.addVector({
      key: "rain",
      zIndex: 20,
      style: {
        src: function (featureObj) {
          //
          return require("../../../resource/icon/rain.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    this.map.addVector({
      key: "water",
      zIndex: 20,
      style: {
        src: function (featureObj) {
          //
          if (featureObj.warningOver) {
            return require("../../../resource/icon/water_warning.svg")[
              "default"
            ];
          } else {
            return require("../../../resource/icon/water.svg")["default"];
          }
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    this.map.addVector({
      key: "ponding",
      zIndex: 20,
      style: {
        src: function (featureObj) {
          //
          return require("../../../resource/icon/ponding.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    this.map.addVector({
      key: "gate",
      zIndex: 30,
      style: {
        anchor: [0.5, 0.5],
        strokeColor: "#ff0000",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [0, 0],
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    this.map.addVector({
      key: "pump",
      zIndex: 30,
      style: {
        anchor: [0.5, 0.5],
        strokeColor: "#ff0000",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [0, 0],
        src: function (featureObj) {
          return require("../../../resource/pump.svg")["default"];
        },
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    this.map.addVector({
      key: "warehouse",
      zIndex: 30,
      style: {
        anchor: [0.5, 0.5],
        strokeColor: "#ff0000",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#f5222d",
        fontOffset: [20, 0],
        src: function (featureObj) {
          return require("../../../resource/icon/warehouse.svg")["default"];
        },
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });
    // this.map.addGate({
    //   key: "gata1"
    // })
    this.map.startHighlightFeatureonLayer("person");
    this.map.startHighlightFeatureonLayer("video");
    this.map.startHighlightFeatureonLayer("rain");
    this.map.startHighlightFeatureonLayer("water");
    this.map.startHighlightFeatureonLayer("ponding");
    this.map.startHighlightFeatureonLayer("gate");
    this.map.startHighlightFeatureonLayer("pump");
    this.map.startHighlightFeatureonLayer("wfsRiver");
    this.map.startHighlightFeatureonLayer("warehouse");
    this.map.startSelectFeature("person", (param) => {
      this.addOverlay(Person.type, param);
      // this.map.addOverlay(param.id, { Coordinate: param.lonlat, offset: [13, -25] }, createPersonDom(param, {
      //   onVideoClick: () => {
      //     console.log(param.id);
      //   },
      //   onClose: () => {
      //     this.map.removeOverlay(param.id);
      //   }
      // }));
    });
    this.map.startSelectFeature("rain", (param) => {
      let { details } = this.props;
      //if (details.rain[param.stcd]) {
      if (false) {
        this.addOverlay(Rain.type, { ...param, ...details.rain[param.stcd] });
      } else {
        getRainRealTime({ stcd: param.stcd, current: 1, size: 1 })
          .then((res) => {
            if (res.code === 200) {
              let record = (res.data.records && res.data.records[0]) || null;
              this.props.actions.setDetailData({
                key: "rain",
                value: record,
              });
              this.addOverlay(
                Rain.type,
                record ? { ...param, ...record } : param
              );
            } else {
              return Promise.reject(res.msg || "未知错误");
            }
          })
          .catch((e) => {
            message.error("获取雨晴详情失败");
          });
      }
    });
    this.map.startSelectFeature("water", (param) => {
      let { details } = this.props;
      //if (details.water[param.stcd]) {
      //phz 修改，所有的水位都从接口获取
      if (false) {
        this.addOverlay(Water.type, { ...param, ...details.water[param.stcd] });
      } else {
        getWaterRealTime({ stcd: param.stcd, current: 1, size: 1 })
          .then((res) => {
            if (res.code === 200) {
              let record = (res.data.records && res.data.records[0]) || null;
              this.props.actions.setDetailData({
                key: "water",
                value: record,
              });
              this.addOverlay(
                Water.type,
                record ? { ...param, ...record } : param
              );
            } else {
              return Promise.reject(res.msg || "未知错误");
            }
          })
          .catch((e) => {
            message.error("获取水位详情失败");
          });
      }
    });
    this.map.startSelectFeature("ponding", (param) => {
      this.addOverlay(Ponding.type, { ...param });
    });
    this.map.startSelectFeature("video", (param) => {
      //this.addOverlay(Video.type, param);
      let newParam = { ...param };
      newParam.videoControl = this.videoControl;
      this.addOverlay(Video.type, newParam);
    });
    this.map.startSelectFeature("gate", (param) => {
      let newParam = { ...param };
      this.addOverlay(Gate.type, newParam);
    });
    this.map.startSelectFeature("pump", (param) => {
      let newParam = { ...param };
      this.addOverlay(Pump.type, newParam);
    });
    this.map.startSelectFeature("warehouse", (param) => {
      let { details } = this.props;
      console.log(1);
      if (details.warehouse[param.id]) {
        this.addOverlay(Warehouse.type, {
          ...param,
          ...details.warehouse[param.id],
        });
      } else {
        getWarehouseMt({ materialWarehouseId: param.id })
          .then((res) => {
            if (res.code === 200) {
              let record = res.data || [];
              this.props.actions.setDetailData({
                key: "warehouse",
                value: { materials: record, id: param.id },
                idKey: "id",
              });
              this.addOverlay(
                Warehouse.type,
                record ? { ...param, materials: record, id: param.id } : param
              );
            } else {
              return Promise.reject(res.msg || "未知错误");
            }
          })
          .catch((e) => {
            message.error("获取仓库详情失败");
          });
      }
    });
    // this.map.activeMeasure();
    this.map.on("moveend", () => {
      let a = this.map.getView().calculateExtent();
      // console.log(a);
    });
  }
  onWfsRiverClick(props) {
    props.id = props.NAME;
    let { details } = this.props;
    if (details.wfsRiver[props.NAME]) {
      this.addOverlay(WfsRiver.type, {
        ...props,
        ...details.wfsRiver[props.NAME],
      });
    } else {
      getWfsRiver({ name: props.NAME })
        .then((res) => {
          if (res.code === 200) {
            let record = (res.data && res.data[0]) || null;
            this.props.actions.setDetailData({
              key: "wfsRiver",
              value: record,
              idKey: "name",
            });
            this.addOverlay(
              WfsRiver.type,
              record ? { ...props, ...record } : props
            );
          } else {
            return Promise.reject(res.msg || "未知错误");
          }
        })
        .catch((e) => {
          message.error("获取河流详情失败");
        });
    }
  }
  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    let elements = overlays[key];
    if (elements[id]) return;
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
      // 特殊几个layer, 如洪水
      this.flood.setVisible(layerVisible.flood);
    }
  }
  addEvent() {
    this._resizeToken = addEventListener(window, "resize", () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
      }
      // this._resizeTimeout = setTimeout(() => {
      //   this.map.updateSize();
      // }, 300);
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
  }
  loadData() {
    // 加载雨量站和水位站,水位站报警信息
    // let warningPro = getWaterWarning({});
    // let allPro = getAll();
    // Promise.all([allPro, warningPro])
    //   .then((res) => {
    //     if (res[0].code === 200) {
    //       let data = this.transformData(res[0].data);

    //       this.props.actions.initBaseData(data);
    //       this.props.actions.setMutiDetailData({
    //         key: "water",
    //         value: (res[1] && res[1].data && res[1].data.records) || [],
    //       });
    //       this.drawFeatures(data);
    //     }
    //   })
    //   .catch((e) => {
    //     message.error("获取基础资料失败");
    //   });
    // 加载视频数据
    // getAllVideo({})
    //   .then((res) => {
    //     if (res.code === 200) {
    //       this.props.actions.addVideos(res.data);
    //       this.map.addFeatures(
    //         "video",
    //         res.data.map((item) => {
    //           return {
    //             ...item,
    //             type: "Point",
    //             id: item.radioID + "",
    //             lonlat: [item.lon, item.lat],
    //           };
    //         })
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // 加载水闸数据
    // getGate({})
    //   .then((res) => {
    //     if (res.code === 200) {
    //       this.props.actions.addGates(res.data);
    //       this.map.addFeatures(
    //         "gate",
    //         res.data
    //           .filter((item) => {
    //             return item.lat > 3 && item.lat < 53;
    //           })
    //           .map((item) => {
    //             return {
    //               ...item,
    //               type: "LineString",
    //               id: item.gateID + "",
    //               name: item.name,
    //               rivername: item.rivername,
    //               management: item.management,
    //               isMuti: true,
    //               rotate: 0,
    //               rotateAnchor: [150, 50],
    //               lonlats: [item.lon, item.lat],
    //               coords: [
    //                 [
    //                   [0, 0],
    //                   [0, 100],
    //                   [300, 100],
    //                   [300, 0],
    //                   [0, 0],
    //                   [0, 100],
    //                   [300, 0],
    //                   [0, 0],
    //                   [300, 100],
    //                 ],
    //               ],
    //             };
    //           })
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // 加载水泵数据
    // getPump({})
    //   .then((res) => {
    //     if (res.code === 200) {
    //       this.props.actions.addPumps(res.data);
    //       this.map.addFeatures(
    //         "pump",
    //         res.data.map((item) => {
    //           return {
    //             ...item,
    //             type: "Point",
    //             id: item.pumpID + "",
    //             name: item.name,
    //             lonlat: [item.lon, item.lat],
    //           };
    //         })
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // 防汛物资仓库
    getWarehouse({})
      .then((res) => {
        if (res.code === 200) {
          this.props.actions.addWarehouse(res.data);
          this.map.addFeatures("warehouse", templateWareHouse(res.data));
        }
      })
      .catch(() => {
        console.log(e);
      });
    // 轮询预警更新
    // window.setTimeout(() => {
    //   getWaterWarning({}).then((res) => {
    //     if (res.code === 200) {
    //       //res.data.records[0].stcd = "31106670";
    //       this.props.actions.setMutiDetailData({
    //         key: "water",
    //         value: (res && res.data && res.data.records) || [],
    //       });
    //       let { water, details } = this.props;
    //       this.map.updateFeatures("water", templateWater(water, details.water));
    //     }
    //   });
    // }, 3000);

    // 模拟洪水
    // setInterval(() => {
    //   let data = [];
    //   for (let i = 0; i < 195; i++) {
    //     let r = "R" + i;
    //     data.push({ r: r, d: Math.random() });
    //   }
    //   this.flood.updateData(data);
    // }, 1000);
    //this.map.addAlarm("alarm001", [118.67, 37.43]);
    this.map.addFeatures("person", [
      {
        type: "Point",
        id: "person001",
        lonlat: [118.67, 37.43],
        heading: 0,
      },
      {
        type: "Point",
        id: "person002",
        lonlat: [118.37, 37.43],
        heading: 0,
      },
    ]);
  }
  drawFeatures(data) {
    let { rain, water, details, ponding } = this.props;
    if (!data) return;
    if (rain && rain.length) {
      this.map.addFeatures("rain", templateRain(rain, details.rain));
    }
    if (water && water.length) {
      this.map.addFeatures("water", templateWater(water, details.water));
    }
    if (ponding && ponding.length) {
      this.map.addFeatures("ponding", templatePonding(ponding, details.water));
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
      if ([3, 5, 6, 10].indexOf(item.indtype) > -1) {
        obj.rain.push(item);
      } else if ([1, 2, 7, 8].indexOf(item.indtype) > -1) {
        obj.water.push(item);
      } else if ([9].indexOf(item.indtype) > -1) {
        obj.ponding.push(item);
      }
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
  onFloodClick(featureProp) {
    console.log(featureProp);
  }
}
function mapStateToProps(state) {
  return {
    water: state.monitor.water,
    rain: state.monitor.rain,
    ponding: state.monitor.ponding,
    details: state.monitor.details,
    warehouse: state.monitor.warehouse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
