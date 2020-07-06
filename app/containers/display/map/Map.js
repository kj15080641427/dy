/**
 * map 2020-05-12
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/monitor';
import UbiMap from "../../monitor/map/ubimap";

import "./style.scss";

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
  componentDidUpdate(prevProps, prevState) {
    
  }
  componentDidMount() {
    this.createMap();
  }
  componentWillUnmount() {
   
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
      url: 'http://code.tuhuitech.cn:10012/geoserver/dy/wms',
      params: {
        'LAYERS': 'dy:河流40',
        'TILED': true
      },
      zIndex: 10,
      key: "river40"
    });

    
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

