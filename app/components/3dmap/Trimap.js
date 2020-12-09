import React, { Component } from 'react';
import 'cesium/Source/Widgets/widgets.css';
import * as cesium from 'cesium';

//天地图key
const mapKey = 'b032247838f51a57717f172c55d25894';
//天地图url
const tdtUrl = 'https://t{s}.tianditu.gov.cn/';
//天地图子域名
const subDomains = [0, 1, 2, 5, 6, 7];

class Trimap extends Component {
  constructor(props) {
    super(props);

    cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZmJiMTQzMC0xYjFlLTRlZDktYjI5ZS1mOGIxMzY2ZDQ1NTciLCJpZCI6ODYwOCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjM3OTcyN30.MSLoEjzlm83XTm1qRlt521SlgoU2jsthi566S6-9m_w';
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.addOrUpdatePoints();
  }

  componentDidMount() {
    this.viewer = new cesium.Viewer(this.cesiumContainer, {
      animation: false,
      baseLayerPicker: false,
      sceneModePicker: true, //是否显示投影方式控件
      geocoder: true, //是否显示地名查找控件
      shouldAnimate: true,
      selectionIndicator: true,
      infoBox: true,
      // imageryProvider: new cesium.WebMapTileServiceImageryProvider({
      //   url: `https://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${mapKey}`,
      //   layer: "tdtVecBasicLayer",
      //   style: "default",
      //   format: "image/jpeg",
      //   tileMatrixSetID: "GoogleMapsCompatible",
      //   show: false
      // })
      imageryProvider: new cesium.UrlTemplateImageryProvider({
       url: `${tdtUrl}DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
       subdomains: subDomains,
       tilingScheme: new cesium.WebMercatorTilingScheme(),
      })
    });


    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 600;
    //this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 2500;


    //国界图层
    let iboLayer = new cesium.UrlTemplateImageryProvider({
      url: `${tdtUrl}DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
      subdomains: subDomains,
      tilingScheme: new cesium.WebMercatorTilingScheme(),
    });

    //注记图层
    let labelLayer = new cesium.UrlTemplateImageryProvider({
      url: `${tdtUrl}DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${mapKey}`,
      subdomains: subDomains,
      tilingScheme: new cesium.WebMercatorTilingScheme(),
    });

    //this.viewer.imageryLayers.addImageryProvider(imageLayer);
    this.viewer.imageryLayers.addImageryProvider(iboLayer);
    this.viewer.imageryLayers.addImageryProvider(labelLayer);

    this.viewer.camera.flyTo({
      destination: cesium.Cartesian3.fromDegrees(118.58, 37.53, 4000),
      orientation: {
        heading: cesium.Math.toRadians(348.4202942851978),
        pitch: cesium.Math.toRadians(-89.74026687972041),
        roll: cesium.Math.toRadians(0)
      },
    });

    this.addOrUpdatePoints();

  }
  render() {
    return (
      <div id="cesiumContainer" ref={ele => this.cesiumContainer = ele} />
    );
  }

  addOrUpdatePoints() {
    this.viewer.entities.removeAll();
    const {points} = this.props;

    if (points && points.length > 0) {
      points.forEach(item => this.addTagToMap(item));
    }
  }

  addTagToMap(tag) {
    const {position, point, label, distanceDisplayCondition, ...other} = tag;
    const {lon, lat} = position;
    let newPosition = new cesium.Cartesian3.fromDegrees(lon, lat);
    let newTag = {...other};
    newTag.position = newPosition;

    let newLabel = {...label};

    if(distanceDisplayCondition) {
      newTag.distanceDisplayCondition = new cesium.DistanceDisplayCondition(distanceDisplayCondition[0], distanceDisplayCondition[1]);
    }

    if(label) {
      const {pixelOffset, distanceDisplayCondition} = label;

      if(pixelOffset) {
        newLabel.pixelOffset = new cesium.Cartesian2(pixelOffset[0], pixelOffset[1]);
      }

      if(distanceDisplayCondition) {
        newLabel.distanceDisplayCondition = new cesium.DistanceDisplayCondition(distanceDisplayCondition[0], distanceDisplayCondition[1]);
      }

      newTag.label = newLabel;
    }

    this.viewer.entities.add(newTag);
  }
}

export default Trimap;
