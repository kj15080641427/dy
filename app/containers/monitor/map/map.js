/**
 * map 2020-05-12
 */
import React from 'react';
import UbiMap from "./ubimap";
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import "./style.scss";
import { createPersonDom } from "./template";
import Person from "./overlays/Person";
import Rain from "./overlays/Rain";
import Water from "./overlays/Water";
import Video from "./overlays/Video";
class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      overlays: {
        [Person.type]: {},
        [Rain.type]: {},
        [Water.type]: {},
        [Video.type]: {}
      }
    };
    this.type = [Person, Rain, Water, Video];
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
              return <Comp key={key} map={this.map} model={overlays[type][key]} onClose={this.onOverlayClose}></Comp>;
            });
            domArr = domArr.concat(comps);
            break;
          }
        }
      });
    }
    return (
      <>
        <div id="map"></div>
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
  }
  
  componentWillUnmount() {
    this._resizeToken.remove();
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }
  }
  createMap() {
    this.map = new UbiMap({
      target: 'map',
      center: [118.67, 37.43],
      zoom: 11,
      minZoom: 9,
      maxZoom: 19,
      mouseControl: false
    });
    this.map.addTile({
      // url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      key: "tiandi",
      projection: true
    });
    // this.map.addTile({
    //   url: require("../../../resource/tile2.png")["default"],
    //   visible: true,
    //   opacity: 0.5,
    //   key: "opacityTile",
    //   transition: 1,
    // });
    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      visible: true,
      opacity: 1,
      key: "tiandi2",
      projection: true
    });
    // this.map.addGeo({
    //   url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
    //   params: {
    //     'LAYERS': 'dy:DYWater',
    //     'TILED': true
    //   },
    //   zIndex: 10,
    //   key: "river"
    // });
    this.map.addWFS({
      key: "wfsRiver",
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs",
      typename: "dy:河流"
      // url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=dy:DYWater&outputFormat=application/json&srsname=EPSG:4326%27"
    });
    this.map.addHeatmap({
      key: "heatmap",
      url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs",
      typename: "dy:雨情测站"
      // url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=dy:DYWater&outputFormat=application/json&srsname=EPSG:4326%27"
    });
    // this.map.addTile({
    //   key: "traffic",
    //   url: 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=longTime'
    // });
    this.map.addTraffic({
      key: "traffic",
      zIndex: 19,
    });
    this.map.addVector({
      key: "person",
      zIndex: 20,
      style: {
        heading: function(featureObj) {
            return featureObj.heading;
        },
        src: function(featureObj) { //
            return require("../../../resource/icon/person.svg")["default"];
        },
        anchor: [0.5, 1],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontText: function(featureObj) {
            return featureObj.id + "";
        },
        font: '16px sans-serif'
      }
    });
    this.map.addVector({
      key: "video",
      zIndex: 20,
      style: {
        src: function(featureObj) { //
            return require("../../../resource/icon/camera.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function(featureObj) {
            return featureObj.id + "";
        },
        font: '16px sans-serif'
      }
    });
    this.map.addVector({
      key: "rain",
      zIndex: 20,
      style: {
        src: function(featureObj) { //
            return require("../../../resource/icon/rain.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function(featureObj) {
            return featureObj.id + "";
        },
        font: '16px sans-serif'
      }
    });
    this.map.addVector({
      key: "water",
      zIndex: 20,
      style: {
        src: function(featureObj) { //
            return require("../../../resource/icon/water.svg")["default"];
        },
        anchor: [0.5, 0.5],
        strokeColor: "#1890ff",
        width: 1,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontOffset: [10, 0],
        fontText: function(featureObj) {
            return featureObj.id + "";
        },
        font: '16px sans-serif'
      }
    });
    this.map.startHighlightFeatureonLayer("person");
    this.map.startHighlightFeatureonLayer("video");
    this.map.startHighlightFeatureonLayer("rain");
    this.map.startHighlightFeatureonLayer("water");
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
      this.addOverlay(Rain.type, param);
    });
    this.map.startSelectFeature("water", (param) => {
      this.addOverlay(Water.type, param);
    });
    this.map.startSelectFeature("video", (param) => {
      this.addOverlay(Video.type, param);
    });
    // this.map.activeMeasure();
  }
  addOverlay(key, param) {
    let id = param.id;
    let { overlays } = this.state;
    let elements = overlays[key];
    if (elements[id]) return;
    elements[id] = param;
    this.setState({
      overlays: {...overlays}
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
  }
  loadData() {
    this.map.addAlarm("alarm001", [118.67, 37.43]);
    this.map.addFeatures("person", [
        {
            type: "Point",
            id: "person001",
            lonlat: [118.67, 37.43],
            heading: 0
        },
        {
            type: "Point",
            id: "person002",
            lonlat: [118.37, 37.43],
            heading: 0
        },
    ]);
    this.map.addFeatures("video", [
        {
            type: "Point",
            id: "video001",
            lonlat: [118.47, 37.43],
            heading: 0
        },
        {
            type: "Point",
            id: "video002",
            lonlat: [118.57, 37.53],
            heading: 0
        },
    ]);
    this.map.addFeatures("rain", [
        {
            type: "Point",
            id: "rain001",
            lonlat: [118.47, 37.63],
            heading: 0
        },
        {
            type: "Point",
            id: "rain002",
            lonlat: [118.67, 37.33],
            heading: 0
        },
    ]);
    this.map.addFeatures("water", [
        {
            type: "Point",
            id: "water001",
            lonlat: [118.63, 37.73],
            heading: 0
        },
        {
            type: "Point",
            id: "water002",
            lonlat: [118.45, 37.63],
            heading: 0
        },
    ]);
    this.map.addFeatures("traffic", [
        {
            type: "LineString",
            id: "LineString001",
            traffic: 1,
            lonlats: [[118.63, 37.73], [118.45, 37.63]],
        },
        {
            type: "LineString",
            id: "LineString002",
            traffic: 2,
            lonlats: [[118.45, 37.63], [118.67, 37.43]],
        },
    ]);
  }
  onOverlayClose(id, type) {
    let { overlays } = this.state;
    let obj = overlays[type];
    if (!obj || !obj[id]) return;
    delete obj[id];
    this.setState({
      overlays: {...overlays}
    });
  }
  
  
}
export default Map;

