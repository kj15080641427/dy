import React, { Component, cloneElement } from 'react';
import {findDOMNode} from 'react-dom';
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
    this.state = {
      //videoElement: this.props.videoComponent
    };

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.addOrUpdatePoints();

    if(prevProps.videoCenter !== this.props.videoCenter){
      this.createVideoPlane(this.props.videoCenter);
    }
  }

  componentDidMount() {
    this.viewer = new cesium.Viewer(this.cesiumContainer, {
      animation: false,
      baseLayerPicker: false,
      sceneModePicker: false, //是否显示投影方式控件
      geocoder: false, //是否显示地名查找控件
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

    let handler = new cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    //侦听click事件
    handler.setInputAction(this.onElementClick.bind(this), cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 600;

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

    // this.viewer.camera.flyTo({
    //   destination: cesium.Cartesian3.fromDegrees(118.58, 37.53, 4000),
    //   orientation: {
    //     heading: cesium.Math.toRadians(348.4202942851978),
    //     pitch: cesium.Math.toRadians(-89.74026687972041),
    //     roll: cesium.Math.toRadians(0)
    //   },
    // });

    this.flyTo({
      lon: 118.58, lat: 37.53, height: 4000
    }, {
      heading: 348.4202942851978,
      pitch: -89.74026687972041,
      roll: 0
    });

    this.addOrUpdatePoints();

  }
  render() {
    let videoComm = cloneElement(this.props.videoComponent, {ref: ref =>{this.video=ref}, style:{display: 'none'}});

    return (
        <>
          <div id="cesiumContainer" ref={ele => this.cesiumContainer = ele}/>
          {videoComm}
        </>

    );
  }

  //地图飞到指定位置
  flyTo(destination, orientation) {
    if(this.viewer){
      let dest = new cesium.Cartesian3.fromDegrees(destination.lon, destination.lat, destination.height);
      let heading = orientation?.heading;
      if(!heading){
        heading = 0;
      }

      let pitch = orientation?.pitch;

      if(!pitch) {
        pitch = 0;
      }

      let roll = orientation?.roll;
      if(!roll) {
        roll = 0;
      }
      let orig = {
        heading: cesium.Math.toRadians(heading),
        pitch: cesium.Math.toRadians(pitch),
        roll: cesium.Math.toRadians(roll)
      };
      this.viewer.camera.flyTo({
        destination: dest,
        orientation: orig
      })
    }
  }

  onElementClick(pos) {
    let element = this.viewer.scene.pick(pos.position);

    if(element && element.id && element.id.tagType) {
      this.props.onElementClick &&
          this.props.onElementClick(element.id.tagData);
    }
  }

  createPlane(planeModelMatrix) {
    let scene = this.viewer.scene;

    //移除以前的面
    if(this.prevPrimitive) {
      scene.primitives.remove(this.prevPrimitive);
    }

    // 创建平面
    let planeGeometry = new cesium.PlaneGeometry({
      //vertexFormat : cesium.MaterialAppearance.VERTEX_FORMAT,
      vertexFormat: cesium.MaterialAppearance.POSITION_ONLY,
    });

    // // 创建平面外轮廓
    // let planeOutlineGeometry = new cesium.PlaneOutlineGeometry({
    // });

    let planeGeometryInstance = new cesium.GeometryInstance({
      geometry : planeGeometry,
      modelMatrix : planeModelMatrix
    });

    let material = cesium.Material.fromType('Image');
    material.uniforms.image = this.video.getVideoDom();

    /* Cesium 1.47 有bug，以下代码会报错
    var material = new Cesium.Material({
        fabric : {
            type : 'Image',
            uniforms : {
                image : videoElement
            }
        }
    });*/


    this.prevPrimitive = scene.primitives.add(new cesium.Primitive({
      geometryInstances : planeGeometryInstance,
      appearance : new cesium.MaterialAppearance({
        closed: false,
        //translucent: false,
        material: material
      })
    }));

    // let planeOutlineGeometryInstance = new cesium.GeometryInstance({
    //   geometry : planeOutlineGeometry,
    //   modelMatrix : planeModelMatrix,
    //   attributes : {
    //     color : cesium.ColorGeometryInstanceAttribute.fromColor(new cesium.Color(1.0, 1.0, 1.0, 1.0))
    //   }
    // });
    //
    //  scene.primitives.add(new cesium.Primitive({
    //   geometryInstances : planeOutlineGeometryInstance,
    //   appearance : new cesium.PerInstanceColorAppearance({
    //     flat : true,
    //     renderState : {
    //       lineWidth : Math.min(2.0, scene.maximumAliasedLineWidth)
    //     }
    //   })
    // }));
  }

  createVideoPlane(center) {
    let dimensions = new cesium.Cartesian3(400.0, 300.0, 1.0);
    let positionOnEllipsoid = cesium.Cartesian3.fromDegrees(center[0], center[1]);
    let translateMatrix = cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid);
    let rotationXMatrix = cesium.Matrix4.fromRotationTranslation(cesium.Matrix3.fromRotationX(cesium.Math.toRadians(-90.0)));
    let rotationYMatrix = cesium.Matrix4.fromRotationTranslation(cesium.Matrix3.fromRotationY(cesium.Math.toRadians(90.0)));
    let scaleMatrix = cesium.Matrix4.fromScale(dimensions);

    let planeZModelMatrix = new cesium.Matrix4();
    cesium.Matrix4.multiply(translateMatrix, scaleMatrix, planeZModelMatrix);

    let planeXModelMatrix = new cesium.Matrix4();
    cesium.Matrix4.multiply(translateMatrix, rotationXMatrix, planeXModelMatrix);
    cesium.Matrix4.multiply(planeXModelMatrix, scaleMatrix, planeXModelMatrix);

    this.createPlane(planeZModelMatrix, new cesium.Color(0.0, 0.0, 1.0, 1.0));
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
