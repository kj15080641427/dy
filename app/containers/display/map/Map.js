/**
 * map 2020-05-12
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/monitor';
import UbiMap from "../../monitor/map/ubimap";
import { getFiveCitydata } from "../../../data/request";
import "./style.scss";

const areaNameMap = {
  '370502': '东营区(开发区）',
  "370503":'河口区(东营港)',
  '370522': '利津县',
  "370521": '垦利区',
  "370523": '广饶县(省农高区)',
};
class Map extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
    this.mapKey = "b032247838f51a57717f172c55d25894";
    this.areaLonlatMap = {
        '370502': [118.67, 37.43],
        "370503": [118.54, 37.99],
        '370522': [118.35, 37.65],
        "370521": [118.84, 37.63],
        "370523": [118.54, 37.12],
    }
  }
  render() {

    return (
      <>
        <div id="map" className='display-map'></div>
      </>
    );
  }
  componentDidUpdate(prevProps, prevState) {

  }
  componentDidMount() {
    this.createMap();
    this.loadData();
  }
  componentWillUnmount() {

  }
  createMap() {
    let coverImageUrl = require("../../../resource/tile2.png")["default"];
    this.map = new UbiMap({
      target: 'map',
      center: [118.57, 37.53],
      zoom: 9.7,
      minZoom: 3,
      maxZoom: 18,
      mouseControl: false
    });

    this.map.addTile({
      // url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      className:"ol-layer-tiandi",
      visible: true,
      opacity: 1,
      key: "tiandi",
      projection: true
    });

    this.map.addTile({
      url: `https://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${this.mapKey}`,
      className:"ol-layer-tiandi",
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
    this.map.addImageTile({
      url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
      params: {
        'LAYERS': 'dy:河流40',
        'TILED': false
      },
      zIndex: 11,
      key: "river40"
    });
    // this.map.addGeo({
    //   url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
    //   params: {
    //     'LAYERS': 'dy:河流40',
    //     'TILED': true
    //   },
    //   zIndex: 10,
    //   key: "river40"
    // });
    this.map.onView("change:resolution", () => {
      this.mapViewChanged();
    });
    this.mapViewChanged();
  }
  mapViewChanged() {
    this.toggleRainBox();
  }
  loadData() {
    getFiveCitydata({type:2}).then((res) => {
      if (res.code === 200) {
        this._zoom = null;
        this.addRainBoxes(res.data);
        this.toggleRainBox();
      }else {
        return Promise.reject(res.msg || "未知错误")
      }
    }).catch(() => {
      console.log("获取区县降水量失败");
    });

    this.toggleRainBox();
  }
  addRainBoxes(data) {
    if (!data || !data.length) return;
    data.forEach((rain) => {
      if (this.areaLonlatMap[rain.areaId]) {
        let areaName = areaNameMap[rain.areaId];

        if(!areaName){
          areaName = rain.areaName;
        }
        this.addRainBox("rain_box_" +rain.areaId, this.areaLonlatMap[rain.areaId], {title: areaName,subtitle: (rain.prd *1).toFixed(1)+"mm" });
      }
    });

  }
  toggleRainBox() {
    let zoom = this.map.getView().getZoom();
    if (zoom >= 9) {
      if (this._zoom && this._zoom >= 9) return;
      this.showRainBox();
      // this.map.showTagOnLayer("water");
      // this.map.showTagOnLayer("rain");
    } else {
      if ( this._zoom && this._zoom < 9) return;
      this.hideRainBox();
    }
    this._zoom = zoom;
  }
  addRainBox(id, coordinate, model) {
    let div = document.createElement("div");
    div.className = "ol-rain-container ";
    let item1 = document.createElement("div");
    item1.innerHTML = model.title;
    let item2 = document.createElement("div");
    item2.innerHTML = model.subtitle;
    div.appendChild(item1);
    div.appendChild(item2);
    this.map.addOverlay(id, {
      Coordinate: coordinate,
      positioning: "center-center",
      offset: [0, 0],
      stopEvent: false,
    }, div);
  }
  showRainBox() {
    let tags = document.querySelectorAll(".ol-rain-container");
    for(let i = 0; i < tags.length; i++) {
      let tg = tags[i];
      tg.classList.add("active");
    }
  }
  hideRainBox() {
    let tags = document.querySelectorAll(".ol-rain-container");
    for(let i = 0; i < tags.length; i++) {
      let tg = tags[i];
      tg.classList.remove("active");
    }
  }
}
function mapStateToProps(state) {
  return {
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

