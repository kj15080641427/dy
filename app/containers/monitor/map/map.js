/**
 * map 2020-05-12
 */
import React from 'react';
import UbiMap from "./ubimap";
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import "./style.scss";
import { createPersonDom } from "./template";
class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.mapKey = "b032247838f51a57717f172c55d25894";
  }
  render() {
    return (
      <>
        <div id="map"></div>
      </>
    );
  }
  componentDidMount() {
    this.createMap();
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
    this.map.addGeo({
      url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
      params: {
        'LAYERS': 'dy:DYWater',
        'TILED': true
      },
      zIndex: 10,
      key: "river"
    });
    // http:?service=WMS&version=1.1.0&request=GetMap&layers=tiger-ny&styles=&bbox=-74.047185,40.679648,-73.907005,40.882078&width=531&height=768&srs=EPSG:4326&format=application/openlayers
    // http:?service=WMS&version=1.1.0&request=GetMap&layers=dy%3ADYWater&bbox=118.1063114%2C36.93597828%2C119.3020755%2C38.14744953&width=758&height=768&srs=EPSG%3A4326&format=application/openlayers
    // http:?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&WIDTH=512&HEIGHT=512&CRS=EPSG%3A3857&STYLES=&FORMAT_OPTIONS=dpi%3A180&BBOX=12758257.26513534%2C4618019.500877209%2C12836528.78209936%2C4696291.017841229
    this.map.addVector({
      key: "ship",
      zIndex: 20,
      style: {
        heading: function(featureObj) {
            return featureObj.heading;
        },
        src: function(featureObj) { //
            return require("../../../resource/marker-blue.png")["default"];
        },
        anchor: [0.5, 1],
        strokeColor: "#1890ff",
        width: 3,
        fillColor: "#1890ff",
        fontColor: "#82B2FF",
        fontText: function(featureObj) {
            return featureObj.id + "";
        },
        font: '16px sans-serif'
      }
    });
    this.map.startHighlightFeatureonLayer("ship");
    this.map.startSelectFeature("ship", (param) => {
      this.map.addOverlay(param.id, { Coordinate: param.lonlat }, createPersonDom(param, {
        onVideoClick: () => {
          console.log(param.id);
        },
        onClose: () => {
          this.map.removeOverlay(param.id);
        }
      }));
    });
    // this.map.activeMeasure();
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
    this.map.addFeatures("ship", [
        {
            type: "Point",
            id: "ship002",
            lonlat: [118.67, 37.43],
            heading: 0
        },
        {
            type: "Point",
            id: "ship003",
            lonlat: [118.37, 37.43],
            heading: 0
        },
    ]);
  }
  
  
}
export default Map;

