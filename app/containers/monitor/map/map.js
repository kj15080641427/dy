/**
 * map 2020-05-12
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/monitor';
import UbiMap from "./ubimap";
import  FloodAnimation from "./FloodAnimation";
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import emitter from "@app/utils/emitter.js";

import "./style.scss";
import { templateWater, templateRain } from "./template";
import { getAll, getRainRealTime, getWaterRealTime, getAllVideo, getWaterWarning } from "@app/data/request";
import Person from "./overlays/Person";
import Rain from "./overlays/Rain";
import Water from "./overlays/Water";
import Video from "./overlays/Video";
import { message } from 'antd';
import TileSource from 'ol/source/Tile';
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
    this._mapMove && this._mapMove.remove();
    this.flood && this.flood.destroy();
  }
  createMap() {
    this.map = new UbiMap({
      target: 'map',
      center: [118.67, 37.43],
      zoom: 11,
      minZoom: 3,
      maxZoom: 18,
      mouseControl: false
    });
    this.flood = new FloodAnimation({
      map: this.map.getMap(),
      url: 'http://code.tuhuitech.cn:10012/geoserver/dy/ows?service=WFS',
      srsName: 'EPSG:4326', ns: 'www.gcspace.com', ws: 'dy',
      layerName: '河流',
      colorTable: [{ min: 0, max: 0.1, color: '#ccbbff' },
      { min: 0.1, max: 0.5, color: '#9f88ff' },
      { min: 0.5, max: 0.75, color: '#5500ff' },
      { min: 0.75, max: 10000, color: '#0000cc' }]
    });
    this.flood.on("click", this.onFloodClick);
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
    // this.map.addWFS({
    //   key: "wfsRiver",
    //   url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs",
    //   typename: "dy:河流"
    //   // url: "http://code.tuhuitech.cn:10012/geoserver/dy/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=dy:DYWater&outputFormat=application/json&srsname=EPSG:4326%27"
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
    //   url: 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=longTime'
    // });
    // this.map.addTraffic({
    //   key: "traffic",
    //   zIndex: 19,
    // });
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
            return featureObj.sitename + "";
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
            return featureObj.name + "";
        },
        font: '16px sans-serif'
      }
    });
    this.map.addVector({
      key: "water",
      zIndex: 20,
      style: {
        src: function(featureObj) { //
          if (featureObj.warningOver) {
            return require("../../../resource/icon/water_warning.svg")["default"];
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
        fontText: function(featureObj) {
            return featureObj.name + "";
        },
        font: '16px sans-serif'
      }
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
        fontOffset: [10, 0],
        
        font: '16px sans-serif'
      }
    });
    // this.map.addGate({
    //   key: "gata1"
    // })
    this.map.startHighlightFeatureonLayer("person");
    this.map.startHighlightFeatureonLayer("video");
    this.map.startHighlightFeatureonLayer("rain");
    this.map.startHighlightFeatureonLayer("water");
    this.map.startHighlightFeatureonLayer("wfsRiver");
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
      if (details.rain[param.stcd]) {
        this.addOverlay(Rain.type, {...param, ...details.rain[param.stcd]});
      }else {
        getRainRealTime({stcd: param.stcd, current: 1, size: 1})
        .then((res) => {
          if (res.code === 200) {
            let record = res.data.records && res.data.records[0] || null;
            this.props.actions.setDetailData({
              key: "rain",
              value: record
            });
            this.addOverlay(Rain.type, record ? {...param, ...record} : param);
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
      if (details.water[param.stcd]) {
        this.addOverlay(Water.type, {...param, ...details.water[param.stcd]});
      }else {
        getWaterRealTime({stcd: param.stcd, current: 1, size: 1})
        .then((res) => {
          if (res.code === 200) {
            let record = res.data.records && res.data.records[0] || null;
            this.props.actions.setDetailData({
              key: "water",
              value: record
            });
            this.addOverlay(Water.type, record ? {...param, ...record} : param);
          } else {
            return Promise.reject(res.msg || "未知错误");
          }
        })
        .catch((e) => {
          message.error("获取雨晴详情失败");
        });
      }
    });
    this.map.startSelectFeature("video", (param) => {
      this.addOverlay(Video.type, param);
    });
    // this.map.activeMeasure();
    this.map.on("moveend", () => {
      let a = this.map.getView().calculateExtent();
      // console.log(a);
    })
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
      // 特殊几个layer, 如洪水
      this.flood.setVisible(layerVisible.wfsRiver);
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
      this.map && this.map.animate({
        center: lonlat,
        duration: 250,
      }, () => {
        onMoveEnd && onMoveEnd();
      });
    });

  }
  loadData() {
    let warningPro = getWaterWarning({});
    let allPro = getAll();
    Promise.all([allPro, warningPro]).then((res) => {
      if (res[0].code === 200) {
        let data = this.transformData(res[0].data);

        this.props.actions.initBaseData(data);
        this.props.actions.setMutiDetailData({
          key: "water",
          value: res[1] && res[1].data && res[1].data.records || []
        });
        this.drawFeatures(data);
      }
    })
    .catch((e) => {
      message.error('获取基础资料失败');
    });
    getAllVideo().then((res) => {
      if (res.code === 200) {
        this.props.actions.addVideos(res.data);
        this.map.addFeatures("video", res.data.map((item) => {
          return {
            type: "Point",
            id: item.radioID + "",
            lonlat: [item.lon, item.lat],
            ...item
          };
        })) ;
      }
    })
    .catch((e) => {
      console.log(e);
    });
    // 轮询预警更新
    window.setTimeout(() => {
      getWaterWarning({})
      .then((res) => {
        if (res.code === 200) {
          res.data.records[0].stcd = "31106670";
          this.props.actions.setMutiDetailData({
            key: "water",
            value: res && res.data && res.data.records || []
          });
          let { water, details } = this.props;
          this.map.updateFeatures("water", templateWater(water, details.water));
        }
      });
    }, 3000);
    
    // 模拟洪水
    setInterval(() => {
      let data = [];
      for (let i = 0; i < 536; i++){
        let r = 'R' + i;
        data.push({ r: r, d: Math.random() });
      }
      this.flood.updateData(data)
    }, 1000);
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
    this.map.addFeatures("gate", [
      {
        type: "LineString",
        id: "gate001",
        isMuti: true,
        rotate: Math.PI/2,
        rotateAnchor: [150, 50],
        lonlats: [118.67, 37.43],
        coords: [
          [[0, 0], [0, 100], [300, 100], [300, 0], [0, 0]],
          [[0, 100], [300, 0]],
          [[0, 0], [300, 100]]
        ]
      }
    ])
  }
  drawFeatures(data) {
    let { rain, water, details } = this.props;
    if (!data) return;
    if (rain && rain.length) {
      this.map.addFeatures("rain", templateRain(rain, details.rain));
    }
    if (water && water.length) {
      this.map.addFeatures("water", templateWater(water, details.water));
    }
  }
  transformData(data) {
    if (!data || !data.length) return {};
    let obj = {
      rain: [],
      water: []
    };
    data.forEach((item) => {
      if ([3, 5, 6].indexOf(item.sttype) > -1) {
        obj.rain.push(item);
      } else if ([7, 8].indexOf(item.sttype) > -1) {
        obj.water.push(item);
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
      overlays: {...overlays}
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
    details: state.monitor.details
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

