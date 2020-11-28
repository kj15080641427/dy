/**
 * map 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/monitor";
import * as mapAction from "@app/redux/actions/map";
import UbiMap from "../../monitor/map/ubimap";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import emitter from "@app/utils/emitter.js";
import { templateRain, templatePonding } from "./template";
import { getWfsRiver } from "@app/data/request";
import VideoControl from "@app/components/video/VideoControl";
import "./style.scss";
import Person from "./overlays/Person";
import Rain from "../../rain/map/overlays/Rain";
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
      // WfsRiver,
      Ponding,
      Warehouse,
    ];
    // eslint-disable-next-line react/no-direct-mutation-state
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
              //TODO
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
    let { layerVisible, flood, floodRain } = this.props;
    if (layerVisible !== prevProps.layerVisible) {
      this.setVisible();
    }
    if (flood != prevProps.flood) {
      this.addFlood();
    }
    if (floodRain != prevProps.floodRain) {
      // console.log(floodRain, "floodRain");

      this.addFloodRain();
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
    this._resizeToken && this._resizeToken.remove();
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }
    this._mapMove && this._mapMove.remove();
    this.flood && this.flood.destroy();
  }
  createMap() {
    this.map = new UbiMap({
      target: "map",
      center: [118.62, 37.45],
      zoom: 11.8,
      minZoom: 3,
      maxZoom: 18,
      mouseControl: false,
    });

    this.map.addTile({
      // url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      key: "tiandi",
      //className: "ol-layer-tiandi",
      projection: true,
    });
    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      key: "tiandi2",
      //className: "ol-layer-tiandi",
      projection: true,
    });
    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:市界线",
        TILED: true,
      },
      zIndex: 10,
      key: "river",
    });

    // this.map.addGeo({
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
    //   params: {
    //     LAYERS: "dy:DYWater",
    //     TILED: true,
    //   },
    //   zIndex: 10,
    //   opacity: 0.1,
    //   key: "river",
    // });

    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:河流40",
        TILED: true,
      },
      zIndex: 10,
      key: "river2",
    });

    this.map.addVector({
      key: "fRain",
      zIndex: 20,
      style: {
        src: function (featureObj) {
          //
          //let drp = parseInt(featureObj.minuteAvg*1);
          const { data } = featureObj;
          let drp = 0.0;

          try {
            drp = parseFloat(data.avgDrp * 1);
          } catch (e) {
            drp = 0.0;
          }

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
        fontColor: "#f5222d",
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
        src: function () {
          //
          return require("../../../resource/icon/ponding.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#f5222d",
        fontOffset: [10, 0],
        fontText: function (featureObj) {
          return featureObj.name + "";
        },
        font: "16px sans-serif",
      },
    });

    this.map.startHighlightFeatureonLayer("fRain");
    this.map.startHighlightFeatureonLayer("ponding");

    this.map.startSelectFeature("fRain", (param) => {
      param = { ...param, dict: this.props.dict };
      this.props.mapAction.getDayRainBySite({
        id: param.stcd,
        name: param.aliasName,
      });
      this.addOverlay(Rain.type, param);
    });
    this.map.startSelectFeature("ponding", (param) => {
      //TODO
      param = { ...param, dict: this.props.dict };
      this.props.mapAction.changeFloodId(param);
      this.addOverlay(Ponding.type, param);
    });
  }

  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    let elements = overlays[key];
    // if (!elements[id]) return;
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
    //   // elements[id] = param;
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
      //this.flood.setVisible(layerVisible.flood);
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
      (lonlat, duration = 20000) => {
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
  addFloodRain() {
    const { floodRain } = this.props;
    if (floodRain && floodRain[0]) {
      this.map.addFeatures("fRain", templateRain(floodRain));
    }
  }
  addFlood() {
    const { flood } = this.props;
    if (flood && flood[0]) {
      this.map.addFeatures("ponding", templatePonding(flood));
    }
  }
  transformData(data) {
    if (!data || !data.length) {
      return {};
    }
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
    if (!obj || !obj[id]) {
      return;
    }
    delete obj[id];
    this.setState({
      overlays: { ...overlays },
    });
  }
}
function mapStateToProps(state) {
  // console.log(state, "STATE");
  return {
    // water: state.monitor.water,
    // details: state.monitor.details,
    dict: state.currency.dict,
    floodRain: state.mapAboutReducers.floodRain,
    flood: state.mapAboutReducers.flood,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    mapAction: bindActionCreators(mapAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
