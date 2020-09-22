/**
 * map 2020-05-12
 */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@app/redux/actions/monitor";
import * as mapAction from "@app/redux/actions/map";
import UbiMap from "../../monitor/map/ubimap";
import FloodAnimation from "./FloodAnimation";
import addEventListener from "rc-util/lib/Dom/addEventListener";
import emitter from "@app/utils/emitter.js";
import { templateRain, templatePonding } from "./template";
import { getWfsRiver } from "@app/data/request";
import VideoControl from "@app/components/video/VideoControl";
import "./style.scss";
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
    // eslint-disable-next-line react/no-direct-mutation-state
    this.type.forEach((Ovl) => {
      // this.state.overlays[Ovl.type] = {};
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
      // url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      className: "ol-layer-tiandi",
      key: "tiandi",
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
    // this.map.addImageTile({
    //   url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
    //   params: {
    //     'LAYERS': 'dy:河流40',
    //     'TILED': false
    //   },
    //   zIndex: 11,
    //   key: "river40"
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
        src: function () {
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

    this.map.startHighlightFeatureonLayer("fRain");
    this.map.startHighlightFeatureonLayer("ponding");

    this.map.startSelectFeature("fRain", (param) => {
      this.addOverlay(Rain.type, { ...param });
    });
    this.map.startSelectFeature("ponding", (param) => {
      //TODO
      this.props.mapAction.changeFloodId(param);
      this.addOverlay(Ponding.type, { ...param });
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
      this.flood.setVisible(layerVisible.flood);
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
  // console.log(state, "STATE");
  return {
    // water: state.monitor.water,
    // details: state.monitor.details,
    // warehouse: state.monitor.warehouse,
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
