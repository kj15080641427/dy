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
import "./style.scss";

import Water from "./overlays/Water";

class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      test: 1,
      overlays: {},
    };
    this.type = [Water];
    let _this = this;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.type.forEach((Ovl) => {
      _this.state.overlays[Ovl.type] = {};
    });
    this.mapKey = "b032247838f51a57717f172c55d25894";
    this.onOverlayClose = this.onOverlayClose.bind(this);
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
    let { layerVisible } = this.props;
    if (layerVisible !== prevProps.layerVisible) {
      this.setVisible();
    }

    this.drawNodes(this.props.model.nodes);
  }
  componentDidMount() {
    this.createMap();
    this.setVisible();
    this.addEvent();

    this.drawNodes(this.props.model.nodes);
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
      center: [118.62, 37.45],
      zoom: 11.8,
      minZoom: 3,
      maxZoom: 18,
      mouseControl: false,
    });

    this.map.addTile({
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

    this.map.addGeo({
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
      params: {
        LAYERS: "dy:河流40",
        TILED: true,
      },
      zIndex: 10,
      key: "river2",
    });
    // this.map.addGeo({
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
    //   params: {
    //     LAYERS: "dy:Cluster",
    //     TILED: true,
    //   },
    //   zIndex: 11,
    //   key: "Cluster",
    // });
    // this.map.addGeo({
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
    //   params: {
    //     LAYERS: "dy:Link",
    //     TILED: true,
    //   },
    //   zIndex: 11,
    //   key: "link",
    // });
    // this.map.addGeo({
    //     url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
    //     params: {
    //       LAYERS: "dy:Node",
    //       TILED: true,
    //     },
    //     zIndex: 11,
    //     key: "Node",
    // });
    // this.map.addGeo({
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wms",
    //   params: {
    //     LAYERS: "dy:RiverOut",
    //     TILED: true,
    //   },
    //   zIndex: 11,
    //   key: "RiverOut",
    // });

    this.map.addVector({
      key: "water",
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

    this.map.startHighlightFeatureonLayer("water");
    this.map.startSelectFeature("water", (param) => {
      //this.addOverlay("water", {...param});
      this.props.onFeatureClick && this.props.onFeatureClick({ ...param });
    });
    // this.map.startHighlightFeatureonLayer("ponding");

    // this.map.startSelectFeature("fRain", (param) => {
    //   this.addOverlay(Rain.type, { ...param });
    // });
    // this.map.startSelectFeature("ponding", (param) => {
    //   //TODO
    //   this.props.mapAction.changeFloodId(param);
    //   this.addOverlay(Ponding.type, { ...param });
    // });
  }

  drawNodes(nodes) {
    let eleData = nodes.map((item) => {
      return {
        type: "Point",
        id: item.siteid,
        lonlat: [parseFloat(item.lgtd), parseFloat(item.lttd)],
        ...item,
      };
    });

    if (eleData && eleData[0]) {
      this.map.addFeatures("water", eleData);
    }
  }

  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    overlays[key] = {
      [id]: param,
    };
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
  onFloodClick(featureProp) {
    console.log(featureProp);
  }
}
function mapStateToProps(state) {
  return {
    model: state.floodModel,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    mapAction: bindActionCreators(mapAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);
