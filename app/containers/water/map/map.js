/**
 * map 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/monitor";
import * as mapActions from "@app/redux/actions/map";
import * as stateActions from "@app/redux/actions/handState";
import UbiMap from "../../monitor/map/ubimap";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import emitter from "@app/utils/emitter.js";
import "./style.scss";
import { templateWater } from "./template";
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
      // this.state.overlays[Ovl.type] = {};
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
        <div id="map" className={"display-map"} />
        {domArr}
      </>
    );
  }
  componentDidUpdate(prevProps) {
    let { layerVisible, water } = this.props;
    if (layerVisible !== prevProps.layerVisible) {
      this.setVisible();
    }
    if (layerVisible.water !== prevProps.layerVisible.water) {
      this._zoom = null;
      this.toggleTagByMapZoom();
    }
    if (water) {
      this.drawFeatures(water);
    }
  }
  componentDidMount() {
    this.createMap();
    this.setVisible();
    this.addEvent();
    this.videoControl.login();
  }
  componentWillUnmount() {
    this._resizeToken.remove();
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    this.map.stopSelectFeature("water");
    this.map.unView("change:resolution", this.mapViewChanged.bind(this));

    this._mapMove && this._mapMove.remove();
    this._mapMoveFocus && this._mapMoveFocus.remove();
    this.flood && this.flood.destroy();

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
      url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      className: "ol-layer-tiandi",
      opacity: 1,
      key: "tiandi",
      projection: true,
    });
    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      className: "ol-layer-tiandi",
      key: "tiandi2",
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
      key: "river40",
    });

    //加入交通实况图
    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:traffic",
        TILED: true,
      },
      zIndex: 11,
      key: "traffic",
    });

    this.map.addVector({
      key: "water",
      zIndex: 20,
      style: {
        src: function () {
          return require("../../../resource/icon/water.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
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

    this.map.startHighlightFeatureonLayer("water");
    // this.map.startSelectFeature("person", (param) => {
    //   this.addOverlay(Person.type, param);
    // });
    this.map.startSelectFeature("water", (param) => {
      // this.props.mapActions.changeWaterId(param.id);
      // this.addOverlay(Water.type, { ...param });

      if (this.props.onFeatureClick) {
        this.props.onFeatureClick(param);
      } else {
        this.props.mapActions.changeWaterId(param);
        // this.addOverlay('water', { ...param });
      }
    });
    this.map.on("moveend", () => {
      // let a = this.map.getView().calculateExtent();
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
    this.map.onView("change:resolution", this.mapViewChanged.bind(this));
    this.mapViewChanged(); // 初始化完成调一下,根据zoom隐藏相关图层
    // 地图拖动事件
    this.map.getMap().on("movestart", () => {
      this._isMapMoved = true;
    });
    this.map.getMap().on("moveend", () => {
      window.setTimeout(() => {
        this._isMapMoved = false;
      }, 0);
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
      if (this._zoom && this._zoom >= 11) {
        return;
      }
      if (layerVisible.water) {
        this.map.showTagBox("water_tag");
      } else {
        this.map.hideTagBox("water_tag");
      }
    } else {
      if (this._zoom && this._zoom < 11) {
        return;
      }
      this.map.hideTagBox("water_tag");
    }
    this._zoom = zoom;
  }

  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    let elements = overlays[key];
    // if (!elements) {
    //   return;
    // }
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
  drawFeatures() {
    const { water, alarmData } = this.props;
    if (water && water[0]) {
      this.map.addFeatures("water", templateWater(water, {}));
      this.addWaterWaring(alarmData);
      this.addWaterTagBox(water);
    }

    // 计算是或否显示tagbox
    this._zoom = null;
    this.toggleTagByMapZoom();
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

  addWaterWaring(warningWater) {
    this.map.removeAlarmByString("alarm_water_");
    if (!warningWater || !warningWater.length) {
      return;
    }
    if (this.props.layerVisible.waterWarning === true) {
      warningWater.forEach((w) => {
        this.map.addAlarm("alarm_water_" + w.stcd, [w.lon, w.lat]);
      });
    }
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
    alarmData: state.currency.alarmData,
    water: state.mapAboutReducers.water,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mapActions: bindActionCreators(mapActions, dispatch),
    stateActions: bindActionCreators(stateActions, dispatch),
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
