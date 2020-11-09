/* eslint-disable complexity */

// import { formatDegree } from "../../../../../util/common.js";
import {fromLonLat, get, transform} from 'ol/proj.js';
import Olmap from 'ol/Map.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import CircleStyle from 'ol/style/Circle';
import ImageStyle from 'ol/style/Image';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import Polygon from 'ol/geom/Polygon';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import Cluster from 'ol/source/Cluster';
import Draw from 'ol/interaction/Draw';
import {createBox} from 'ol/interaction/Draw';
import Collection from 'ol/Collection';
import Modify from 'ol/interaction/Modify';
import { shiftKeyOnly, singleClick } from 'ol/events/condition';
import { unByKey } from 'ol/Observable';
import TileWMS from 'ol/source/TileWMS';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import {WFS, GeoJSON} from 'ol/format';
import Heatmap from 'ol/layer/Heatmap';
import {
  equalTo as equalToFilter,
  like as likeFilter,
  and as andFilter
} from 'ol/format/filter';
import MousePosition from 'ol/control/MousePosition';
import { defaults } from 'ol/control';
import "ol/ol.css";
import ImageLayer from 'ol/layer/Image';
import { ImageWMS } from 'ol/source';

export function formatDegree(value) {
  value = Math.abs(value);
  var v1 = Math.floor(value);//度
  var v2 = Math.floor((value - v1) * 60);//分
  v2 < 10 ? (v2 = "0"+v2) : v2;
  var v3 = Math.round((value - v1) * 3600 % 60);//秒
  v3 < 10 ? (v3 = "0"+v3) : v3;
  return v1 + '°' + v2 + '\'' + v3 + '"';
}
export default (function(window) {
    var projection = get("EPSG:3857");
    var sprojection = get('EPSG:4326');
    var Map = function(opt) {
        //地图divID
        /*传入参数的样子
        	{
        		target:"ubiMap",
        		center:[121,29],
        		zoom:1
        	}
         */
        this.target = opt.target ? opt.target : "ubiMap";
        this.map = null;
        this.layers = {};
        this.layerStyle = {};
        this.showTextLayer = {};
        this.overlay = {};
        this.controls = {};
        this.hlLayers = []; // 启用高亮
        this.sfLayers = [] ; // 启用的点击交互图层
        this.tagLayers = []; // 开启有tag的layer
        this.tagLayerEvent = {} //
        this.clusterLayer = {};
        this.callbacks = {
          onFeatureClicked: null,
        };
        this._init.call(this, opt);
    };
    //初始化map
    Map.prototype._init = function(opt) {
        this.map = new Olmap({
            view: new View({
                center: transform(opt.center, get('EPSG:4326'), get('EPSG:3857')),
                zoom: opt.zoom,
                maxZoom: opt.maxZoom ? opt.maxZoom: 28,
                minZoom: opt.minZoom ? opt.minZoom: 0
            }),
            target: this.target,
            controls: [
              new MousePosition({
                coordinateFormat:  (cood) => {
                  cood = transform(cood, 'EPSG:3857', 'EPSG:4326');
                  if (this._format) {
                      return formatDegree(cood[0])+ ',' + formatDegree(cood[1]);
                  }
                  return cood[0].toFixed(6) + ',' + cood[1].toFixed(6);
                }
              })
            ],
            // controls: defaults().extend([new MousePosition({
            //     coordinateFormat:  (cood) => {
            //         cood = transform(cood, 'EPSG:3857', 'EPSG:4326');
            //         if (this._format) {
            //             return formatDegree(cood[0])+ ',' + formatDegree(cood[1]);
            //         }
            //         return cood[0].toFixed(6) + ',' + cood[1].toFixed(6);
            //     }

            // })])
        });
    };
    //转换坐标
    Map.prototype._transformLonlat = function(lonlat, reverse) {
        if (!lonlat) return;
        if (reverse) {
            return transform(lonlat, get('EPSG:3857'), get('EPSG:4326'));
        } else {
            return transform(lonlat, get('EPSG:4326'), get('EPSG:3857'));
        }

    };
    //根据key 删除layer
    Map.prototype._removeLayer = function(key) {
        if (!this.layers[key]) return;
        this.map.removeLayer(this.layers[key]);
        delete this.layers[key];

    };
    //生成点的样式
    Map.prototype._createPointStyle = function(style, obj) {
        if (!style) return;
        var heading = null,
            src = null,
            opacity = null;
        if (typeof style.heading === 'function') {
            heading = style.heading(obj);
        } else {
            heading = style.heading;
        }
        if (typeof style.src === 'function') {
            src = style.src(obj);
        } else {
            src = style.src;
        }
        if (typeof style.opacity === 'function') {
            opacity = style.opacity(obj);
        } else {
            opacity = style.opacity;
        }
        return new Style({
            image: new Icon({
                opacity: opacity == null ? 1: opacity,
                rotation: heading,
                size: style.size,
                // imgSize: [24,24],
                src: src ? src: undefined,
                img: style.img ? style.img :undefined,
                imgSize: style.imgSize ? style.imgSize: undefined,
                anchor: style.anchor ? style.anchor : [0.5, 0.5],
                offset: style.offset ? style.offset : [0,0],
                offsetOrigin: style.offsetOrigin ? style.offset: "top-left"
            })
        });
    };
    //构建点的features
    Map.prototype._createPointFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        return array.map(function(obj) {
            var geoPoint = new Point(obj.lonlat);
            geoPoint.transform(sprojection, projection);
            var feature = new Feature({
                geometry: geoPoint
            });

            var nowStyle = obj.style || this.layerStyle[key];
            if (nowStyle) {
                var style = this._createPointStyle(nowStyle, obj);
                feature.setStyle(style);
            }

            feature.setId(obj.id);
            feature.set('attr', obj);
            return feature;
        }.bind(this));
    };

    //添加点的feature
    Map.prototype._addPointFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var features = this._createPointFeatures(key, [obj]);
        this.layers[key].getSource().addFeature(features[0]);
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].getSource().getSource().addFeature(features[0]);
        }
    };
    //添加点的features
    Map.prototype._addPointFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        var features = this._createPointFeatures(key, array);
        this.layers[key].getSource().addFeatures(features);
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].getSource().getSource().addFeatures(features);
        }
    };
    //修改点的feature
    Map.prototype._updatePointFeature = function(key, obj) {
        if (!this.layers[key] || obj == null || !obj.id) return;
        var feature = this.layers[key].getSource().getFeatureById(obj.id);
        if (!feature) return;

        feature.set('attr', obj);
        if (obj.lonlat) {
            feature.getGeometry().setCoordinates(transform(obj.lonlat, get('EPSG:4326'), get('EPSG:3857')));
        }
        var nowStyle = obj.style || this.layerStyle[key];
        if (nowStyle) {
            var style = this._createPointStyle(nowStyle, obj);
            // 放入text
            let text = feature.getStyle().getText();
            style.setText(text);
            feature.setStyle(style);
        }
    };
    //批量修改点的features
    Map.prototype._updatePointFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        array.forEach(function(obj) {
            this._updatePointFeature(key, obj);
        }.bind(this));
    };
    //生成线的样式
    Map.prototype._createLineStyle = function(style, obj) {
        var text = null;
        if (typeof style.fontText === 'function') {
            text = style.fontText(obj);
        } else {
            text = style.fontText;
        }
        return new Style({
            stroke: new Stroke({
                color: style.strokeColor ? style.strokeColor : "#aaee77",
                width: style.width ? style.width : 2,
            }),
            //默认填充样式
            fill: new Fill({
                color: style.fillColor ? style.fillColor : "rgba(114,151,59,0.4)",
            }),
            //默认文字样式
            text: new Text({
                font: style.font ? style.font : '10px sans-serif',
                // text: text,
                fill: new Fill({
                    color: style.fontColor ? style.fontColor : "#000000"
                })
            })
        });
    };
    //构建线的features
    Map.prototype._createLineFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        return array.map(function(obj) {
            var geoLine = null;
            if (obj.isMuti) {
        //       let geom = new MultiLineString(coords);
        // geom.rotate(10, [150, 50]);
        // geom.translate(coord[0], coord[1]);
              if (obj.coords) {
                let lonlats = fromLonLat(obj.lonlats, 'EPSG:3857');
                geoLine = new MultiLineString(obj.coords);
                geoLine.rotate(obj.rotate, obj.rotateAnchor, 'EPSG:3857');
                geoLine.translate(lonlats[0], lonlats[1]);
                geoLine.translate(-150, -50);
                // geoLine.transform(sprojection, projection);
              }else {
                geoLine = new MultiLineString(obj.lonlats);
                geoLine.transform(sprojection, projection);
              }

            }else {
              geoLine = new LineString(obj.lonlats);
              geoLine.transform(sprojection, projection);
            }

            var feature = new Feature({
                geometry: geoLine
            });
            var nowStyle = obj.style || this.layerStyle[key];
            if (nowStyle) {
                var style = this._createLineStyle(nowStyle, obj);
                feature.setStyle(style);
            }
            feature.set('attr', obj);
            feature.setId(obj.id);
            return feature;
        }.bind(this));
    };
    //添加线的feature
    Map.prototype._addLineStringFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var features = this._createLineFeatures(key, [obj]);
        this.layers[key].getSource().addFeature(features[0]);
    };
    //添加线的features
    Map.prototype._addLineStringFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        var features = this._createLineFeatures(key, array);
        this.layers[key].getSource().addFeatures(features);
    };
    //修改线的feature
    Map.prototype._updateLineStringFeature = function(key, obj) {
        if (!this.layers[key] || obj == null || !obj.id) return;
        var feature = this.layers[key].getSource().getFeatureById(obj.id);
        if (!feature) return;

        feature.set('attr', obj);
        if (obj.lonlats && obj.lonlats.length) {
            feature.getGeometry().setCoordinates(obj.lonlats.map(function(lonlat) {
                return transform(lonlat, get('EPSG:4326'), get('EPSG:3857'));
            }));
        }
        var nowStyle = obj.style || this.layerStyle[key];
        if (nowStyle) {
            var style = this._createLineStyle(nowStyle, obj);
            feature.setStyle(style);
        }
    };
    //批量修改线的features
    Map.prototype._updateLineStringFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        array.forEach(function(obj) {
            this._updateLineStringFeature(key, obj);
        }.bind(this));
    };
    //生成面的样式
    Map.prototype._createPolygonStyle = function(style, obj) {
        var text = null;
        if (typeof style.fontText === 'function') {
            text = style.fontText(obj);
        } else {
            text = style.fontText;
        }
        return new Style({
            stroke: new Stroke({
                color: style.strokeColor ? style.strokeColor : "#aaee77",
                width: style.width ? style.width : 2,
            }),
            //默认填充样式
            fill: new Fill({
                color: style.fillColor ? style.fillColor : "rgba(114,151,59,0.4)",
            }),
            //默认文字样式
            text: new Text({
                font: style.font ? style.font : '10px sans-serif',
                text: text,
                fill: new Fill({
                    color: style.fontColor ? style.fontColor : "#000000"
                })
            })
        });
    };
    //构建面的features
    Map.prototype._createPolygonFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        return array.map(function(obj) {
            var geoPolygon = new Polygon([obj.lonlats], 'XY');
            geoPolygon.transform(sprojection, projection);
            var polygonFeature = new Feature({
                geometry: geoPolygon
            });
            var nowStyle = obj.style || this.layerStyle[key];
            if (nowStyle) {
                var style = this._createPolygonStyle(nowStyle, obj);
                polygonFeature.setStyle(style);
            }

            polygonFeature.setId(obj.id);
            polygonFeature.set("attr", obj);
            return polygonFeature;
        }.bind(this));
    };
    //添加面的feature
    Map.prototype._addPolygonFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var features = this._createPolygonFeatures(key, [obj]);
        this.layers[key].getSource().addFeature(features[0]);
    };
    //添加面的feature
    Map.prototype._addPolygonFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        var features = this._createPolygonFeatures(key, array);
        this.layers[key].getSource().addFeatures(features);
    };
    //修改面的feature
    Map.prototype._updatePolygonFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var feature = this.layers[key].getSource().getFeatureById(obj.id);
        if (!feature) return;

        feature.set('attr', obj);
        if (obj.lonlats && obj.lonlats.length) {
            feature.getGeometry().setCoordinates([obj.lonlats.map(function(lonlat) {
                return transform(lonlat, get('EPSG:4326'), get('EPSG:3857'));
            })]);
        }
        var nowStyle = obj.style || this.layerStyle[key];
        if (nowStyle) {
            var style = this._createPolygonStyle(nowStyle, obj);
            feature.setStyle(style);
        }
    };
    //批量修改面的features
    Map.prototype._updatePolygonFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        array.forEach(function(obj) {
            this._updatePolygonFeature(key, obj);
        }.bind(this));
    };
    /****Map暴露API*/
    //添加瓦片图层
    Map.prototype.addTile = function(param, urlFunc) {
        if (!param || !param.key) return;

        var oneurl = urlFunc ? urlFunc() : param.url;
        var tilelayer = new TileLayer({
            className: param.className || undefined,
            visible: param.visible == null ? true : param.visible,
            opacity:param.opacity == null ? 1: param.opacity,
            source: new XYZ({
                tileLoadFunction: param.tileLoadFunction ? param.tileLoadFunction: undefined,
                url: oneurl ? oneurl: undefined,
                projection: param.projection ? sprojection : projection,
                transition: param.transition || 0
            })
        });
        tilelayer.set("id", param.key);
        tilelayer.set("type", "tile");
        this.map.addLayer(tilelayer);
        this.layers[param.key] = tilelayer;

    };
    //删除瓦片图层
    Map.prototype.removeTile = function(key) {
        this._removeLayer(key);
    };
    //添加高分影像图层
    Map.prototype.addGis = function(param, urlFunc) {
        if (!param || !param.key) return;
        var oneurl = param.url;
        var tilelayer = new TileLayer({
            visible: param.visible == null ? true : param.visible,
            zIndex: param.zIndex ? param.zIndex : 0,
            source: (function(url) {
                var convert16 = function(length, value) {
                    var v = Math.abs(value);
                    var s = v.toString(16);
                    var len = length - s.length;
                    var tmp = "";
                    for (var i = 0; i < len; i++) {
                        tmp += "0";
                    }
                    return tmp + s;
                };
                return new XYZ({
                    projection: projection,
                    tileUrlFunction: function(xyz, a, b) {
                        if (urlFunc) return urlFunc(xyz);
                        var x = 'C' + convert16(8, (xyz[1]));
                        var y = 'R' + convert16(8, xyz[2] + 1);
                        var z = 'L' + (xyz[0] < 10 ? '0' + xyz[0] : xyz[0]);
                        return url + z + '/' + y + '/' + x + '.png';
                    }
                });
            })(oneurl)
        });
        this.map.addLayer(tilelayer);
        this.layers[param.key] = tilelayer;

    };
    //添加高分影像图层
    Map.prototype.setGisUrl = function(key, oneurl) {
        if (!this.layers[key]) return;
        var source = (function(url) {
            var convert16 = function(length, value) {
                var v = Math.abs(value);
                var s = v.toString(16);
                var len = length - s.length;
                var tmp = "";
                for (var i = 0; i < len; i++) {
                    tmp += "0";
                }
                return tmp + s;
            };
            return new XYZ({
                projection: projection,
                tileUrlFunction: function(xyz, a, b) {
                    var x = 'C' + convert16(8, xyz[1]);
                    var y = 'R' + convert16(8, xyz[2] + 1);
                    var z = 'L' + (xyz[0] < 10 ? '0' + xyz[0] : xyz[0]);
                    return url + z + '/' + y + '/' + x + '.png';
                }
            });
        })(oneurl)
        this.layers[key].setSource(source);

    };
    //删除高分影像图层
    Map.prototype.removeGis = function(key) {
        this._removeLayer(key);
  };

  //添加图片图层
  Map.prototype.addImageTile = function (param, urlFunc) {
    if (!param || !param.key) return;
    var oneurl = param.url;
    var tilelayer = new ImageLayer({
      visible: param.visible == null ? true : param.visible,
      zIndex: param.zIndex ? param.zIndex : 0,
      source: new ImageWMS({
        url: oneurl,
        params: param.params,
        serverType: 'geoserver'
      })
    });
    this.map.addLayer(tilelayer);
    this.layers[param.key] = tilelayer;

  };
    //添加高分影像图层
    Map.prototype.addGeo = function(param, urlFunc) {
        if (!param || !param.key) return;
        var oneurl = param.url;
        var tilelayer = new TileLayer({
            visible: param.visible === null ? true : param.visible,
            zIndex: param.zIndex ? param.zIndex : 0,
            opacity: param.opacity === null ? 1 : param.opacity,
            source: new TileWMS({ // wfs
              url: oneurl,
              params: param.params,
              serverType: 'geoserver'
            })
        });
        this.map.addLayer(tilelayer);
        this.layers[param.key] = tilelayer;

    };
    Map.prototype.addWFS = function(param, urlFunc) {
      var vectorSource = new VectorSource({
        format: new GeoJSON(),
        url: function(extent) {
          var prj = 'EPSG:3857';
          return param.url + '?service=WFS&' +
          'version=1.1.0&request=GetFeature&typename=' + param.typename +
          '&outputFormat=application/json&srsname=' + prj +
          '&bbox=' + extent.join(',') + ',' + prj;
        },
        strategy: bboxStrategy
      });
      vectorSource.on("addfeature", function({feature}) {
        feature.set("attr", feature.getProperties());
      });
      var vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: param.zIndex,
        style: function(feature) {
          let isEnter = feature.get("mEnter");
          return new Style({
              stroke: new Stroke({
                color: isEnter ? 'rgba(255,0,0,1.0)' : 'rgba(0, 0, 255, 1.0)',
                width: isEnter ? 5 : 2
              })
            })
        }
        //
      });
      var cachFeature = null;
      // 等到下一次事件循环再加
      window.setTimeout(() => {
        this._pointermoveWFSKey = this.map.on('pointermove', function(e) {
            var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if (feature && layer) {
                  if (cachFeature) {
                    cachFeature.set("mEnter", false);
                  }
                  feature.set("mEnter", true);
                  cachFeature = feature;
                }
            }.bind(this), {hitTolerance:5, layerFilter: function(layer) {
              return layer === vectorLayer;
            }});
        });
        this._pointermoveWFSKey = this.map.on('click', function(e) {
            var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if (feature && layer) {
                  let coord = this.getCoordinateFromPixel(e.pixel);
                  let lonlat = coord;
                  lonlat = transform(lonlat, projection, sprojection);
                  param.onClick && param.onClick({...feature.getProperties(), lonlat });
                }
            }.bind(this), {hitTolerance:5, layerFilter: function(layer) {
              return layer === vectorLayer;
            }});
        });
      }, 0)

      vectorLayer.set("key", param.key);
      this.map.addLayer(vectorLayer);
      this.layers[param.key] = vectorLayer;

    };
    Map.prototype.addHeatmap = function(param, urlFunc) {
      var vectorSource = new VectorSource({
        format: new GeoJSON(),
        url: function(extent) {
          var prj = 'EPSG:3857';
          return param.url + '?service=WFS&' +
          'version=1.1.0&request=GetFeature&typename=' + param.typename +
          '&outputFormat=application/json&srsname=' + prj +
          '&bbox=' + extent.join(',') + ',' + prj;
        },
        strategy: bboxStrategy
      });
      var vectorLayer = new Heatmap({
        gradient: param.gradient,
        source: vectorSource,
        blur: 8,
        radius: 8,
        weight: function(feature) {
          var w = feature.get('降雨量');
          return 1;
        }
      });

      vectorLayer.set("key", param.key);
      this.map.addLayer(vectorLayer);
      this.layers[param.key] = vectorLayer;

    };
    //添加矢量图
    Map.prototype.addTraffic = function(param) {
        if (!param || !param.key) return;
        var _this = this;
        var vectorLayer = new VectorLayer({
            source: new VectorSource(),
            visible: param.visible == null ? true : param.visible,
            zIndex: param.zIndex ? param.zIndex : 0,

            style: function(feature) {
              let traffic = feature.get("attr") && feature.get("attr").traffic;
              let zoom = _this.getZoom();
              return new Style({
                stroke: new Stroke({
                    color: traffic === 1 ? "#aaee77" : "#ff0000",
                    width: 8 + (zoom - 11),
                }),
              });
            }
        });
        vectorLayer.set("key", param.key);
        this.map.addLayer(vectorLayer);
        this.layers[param.key] = vectorLayer;
        if (param.style) {
            this.layerStyle[param.key] = param.style;
        }
    };
    Map.prototype.addGate = function(param) {
      if (!param || !param.key) return;
      var vectorLayer = new VectorLayer({
          source: new VectorSource(),
          visible: param.visible == null ? true : param.visible,
          zIndex: param.zIndex ? param.zIndex : 0,
          style: typeof param.style === "function" ? param.style : undefined
      });
      vectorLayer.set("key", param.key);
      this.map.addLayer(vectorLayer);
      this.layers[param.key] = vectorLayer;
      if (param.style && typeof param.style !== "function") {
          this.layerStyle[param.key] = param.style;
      }
      // let coord = [118.67, 37.43];
      // let coord = fromLonLat([118.67, 37.43], 'EPSG:3857');


      // let coords = [
      //   [[0, 0], [118.67, 37.43], [118.67, 37.43], [118.67, 37.430], [0, 0]],
      //   [[0, 0], [118.67, 37.43]],
      //   [[0, 0], [118.67, 37.43]]
      // ];
      // let coords = [
      //   [[0, 0], [0, 100], [300, 100], [300, 0], [0, 0]],
      //   [[0, 100], [300, 0]],
      //   [[0, 0], [300, 100]]];

      // // let coords = [
      // //   [[0, 0],[118.67, 37.43],[118.37, 37.43]],
      // //   [[118.67, 37.43],[118.37, 38.43]]
      // // ];
      //   let geom = new MultiLineString(coords);
      //   geom.rotate(10, [150, 50]);
      //   geom.translate(coord[0], coord[1]);
      //   // geom.transform(sprojection, projection);
      //   let feature = new Feature({
      //       id: "123",
      //       geometry: geom,
      //   });
      //   feature.setId("123");
      //   vectorLayer.getSource().addFeature(feature);
    }
    //添加矢量图
    Map.prototype.addVector = function(param) {
        if (!param || !param.key) return;
        let source = new VectorSource()
        var vectorLayer = new VectorLayer({
            source: source,
            visible: param.visible == null ? true : param.visible,
            zIndex: param.zIndex ? param.zIndex : 0,
            style: typeof param.style === "function" ? param.style : undefined
        });
        vectorLayer.set("key", param.key);
        this.map.addLayer(vectorLayer);
        this.layers[param.key] = vectorLayer;
        if (param.style && typeof param.style !== "function") {
            this.layerStyle[param.key] = param.style;
        }
        // source.on("addfeature", (e) => {
        //   if (param.key === "water") {
        //     let feature = e.feature;
        //     let featureStyle = feature.getStyle();
        //     var nowStyle = feature.get("attr").style || this.layerStyle[vectorLayer.get("key")];
        //     var font = this.layerStyle[param.key] && this.layerStyle[param.key].font || "14px";
        //     var text = new Text({
        //         text: typeof nowStyle.fontText === "function" ? nowStyle.fontText(feature.get("attr")) : nowStyle.fontText,
        //         offsetX: nowStyle.fontOffset && nowStyle.fontOffset[0] != null ? nowStyle.fontOffset[0] : 10,
        //         offsetY: nowStyle.fontOffset && nowStyle.fontOffset[1] != null ? nowStyle.fontOffset[1] : -10,
        //         textAlign: "left",
        //         fill: new Fill({
        //             color: nowStyle.fontColor
        //         }),
        //         font: font
        //     });
        //     featureStyle.setText(text);
        //     feature.setStyle(featureStyle);
        //   }
        // })
    };
    //删除矢量图层
    Map.prototype.removeVector = function(key) {
        this._removeLayer(key);
    };
    //增加overlay
    Map.prototype.addOverlay = function(id, opt, dom) {
        if (!id || !opt) return;
        if (this.overlay[id]) return;
        var overlay = new Overlay({
              id:id,
              offset: opt.offset ? opt.offset : [0, -20],
              stopEvent: opt.stopEvent != null ? opt.stopEvent : true,
              className:opt.className,
              // autoPan:true,
              positioning: opt.positioning ? opt.positioning: 'left',
              position: transform(opt.Coordinate ? opt.Coordinate:[0,0], sprojection, projection),
        });
        overlay.setElement(dom);
        this.map.addOverlay(overlay);
        this.overlay[id] = overlay;

    };
    Map.prototype.removeOverlay = function(id) {
        if (!id || !this.overlay[id]) return;
        this.map.removeOverlay(this.overlay[id]);
        delete this.overlay[id];
    };
    Map.prototype.getOverlay = function(id) {
      return this.overlay[id];
    };
    Map.prototype.getAllOverlays = function() {
      return Object.values(this.overlay);
    };
    Map.prototype.addOverlayClass = function(id, clazz) {
        if (!id || !this.overlay[id]) return;
        var ovl = this.overlay[id];
        ovl.getElement().classList.add(clazz);
        return this;
    };
    Map.prototype.removeOverlayClass = function(id, clazz) {
        if (!id || !this.overlay[id]) return;
        var ovl = this.overlay[id];
        ovl.getElement().classList.remove(clazz);
        return this;
    };
    Map.prototype.addAlarm = function(id, coordinate, type) {

      let div = document.createElement("div");
      div.className = "ol-alarm-container";
      let w1 = document.createElement("div");
      w1.className = "ol-alarm-water1";
      let w2 = document.createElement("div");
      w2.className = "ol-alarm-water2";
      let w3 = document.createElement("div");
      w3.className = "ol-alarm-water3";
      let w4 = document.createElement("div");
      w4.className = "ol-alarm-water4";
      div.appendChild(w1);
      div.appendChild(w2);
      div.appendChild(w3);
      div.appendChild(w4);
      this.addOverlay(id, {
        Coordinate: coordinate,
        positioning: "center-center",
        offset: [0, 0],
        stopEvent: false,
      }, div);
    };
    Map.prototype.removeAlarmByString = function(str) {
      let overlays = this.overlay;
      let removeKeys = Object.keys(overlays).filter((olKey) => {
        return olKey.indexOf(str) > -1;
      });
      removeKeys.forEach((key) => {
        this.removeOverlay(key);
      })
    };
    Map.prototype.addTagBox = function(id, coordinate, model) {
      let div = document.createElement("div");
      div.className = "ol-tag-container " + model.prefix;
      let item1 = document.createElement("div");
      item1.className = "ol-tag-item";
      item1.innerHTML = model.title;
      let item2 = document.createElement("div");
      item2.className = "ol-tag-item";
      item2.innerHTML = model.subTitle;
      div.appendChild(item1);
      div.appendChild(item2);
      this.addOverlay(id, {
        Coordinate: coordinate,
        positioning: "top-left",
        offset: [14, -10],
        stopEvent: false,
      }, div);
    };
    Map.prototype.showTagBox = function(prefix) {
      let tags = document.querySelectorAll(".ol-tag-container." + prefix);
      for(let i = 0; i < tags.length; i++) {
        let tg = tags[i];
        tg.classList.add("active");
      }
    };
    Map.prototype.hideTagBox = function(prefix) {
      let tags = document.querySelectorAll(".ol-tag-container." + prefix);
      for(let i = 0; i < tags.length; i++) {
        let tg = tags[i];
        tg.classList.remove("active");
      }
    };

    Map.prototype.removeTagBox = function(id){
        this.removeOverlay(id);
    };

    //添加目标
    Map.prototype.addFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;

        switch (obj.type) {
        case "Point":
            this._addPointFeature(key, obj);
            break;
        case "LineString":
            this._addLineStringFeature(key, obj);
            break;
        case "Polygon":
            this._addPolygonFeature(key, obj);
            break;
        default:
            break;
        }

    };
    //添加多目标
    Map.prototype.addFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length == 0) return;
        var types = {};
        for (var i = 0; i < array.length; i++) {
            var data = array[i];
            if (!data.type || !data.id) continue; //没有类型就不要
            if (types[data.type]) {
                types[data.type].push(data);
            } else {
                types[data.type] = [data];
            }
        }
        for (var typeKey in types) {
            switch (typeKey) {
            case "Point":
                this._addPointFeatures(key, types[typeKey]);
                break;
            case "LineString":
                this._addLineStringFeatures(key, types[typeKey]);
                break;
            case "Polygon":
                this._addPolygonFeatures(key, types[typeKey]);
                break;
            default:
                break;
            }
        }
    };
    //根据key 删除单个feature
    Map.prototype.removeFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var fId = null;
        if (typeof obj === "object") {
            fId = obj.id;
        } else if (typeof obj === 'string') {
            fId = obj;
        } else {
            return;
        }
        if (fId && typeof fId === "string") {
            var source = this.layers[key].getSource();
            var feature = source.getFeatureById(fId);
            if (feature) {
                source.removeFeature(feature);
                if (this.clusterLayer[key]) {
                    this.clusterLayer[key].getSource().getSource().removeFeature(feature);
                }
            }

        }
    };
    //根据key, 删除多个features
    Map.prototype.removeFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length == 0) return;
        for (var i = 0; i < array.length; i++) {
            var d = array[i];
            this.removeFeature(key, d);
        }
    };

    //修改feature
    Map.prototype.updateFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        switch (obj.type) {
        case "Point":
            this._updatePointFeature(key, obj);
            break;
        case "LineString":
            this._updateLineStringFeature(key, obj);
            break;
        case "Polygon":
            this._updatePolygonFeature(key, obj);
            break;
        default:
            break;
        }
    };
    //修改features
    Map.prototype.updateFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length == 0) return;
        var types = {};
        for (var i = 0; i < array.length; i++) {
            var data = array[i];
            if (!data.type || !data.id) continue; //没有类型就不要
            if (types[data.type]) {
                types[data.type].push(data);
            } else {
                types[data.type] = [data];
            }
        }
        for (var typeKey in types) {
            switch (typeKey) {
            case "Point":
                this._updatePointFeatures(key, types[typeKey]);
                break;
            case "LineString":
                this._updateLineStringFeatures(key, types[typeKey]);
                break;
            case "Polygon":
                this._updatePolygonFeatures(key, types[typeKey]);
                break;
            default:
                break;
            }
        }
    };
    //清除所有feature
    Map.prototype.clear = function(key) {
        if (!this.layers[key]) return;
        this.layers[key].getSource().clear();
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].getSource().getSource().clear();
        }
    };
    //隐藏和显示feature
    Map.prototype.setVisibleFeatures = function(key, obj, visible) {
        if (!this.layers[key] || obj == null) return;
        if (typeof obj === "string") {
            obj = {
                id: obj
            };
        }
        var source = this.layers[key].getSource();
        var feature = source.getFeatureById(obj.id);
        if (!feature) return;
        if (!visible) {
            feature.setStyle(new ImageStyle({
                opacity: 0
            }));
        } else {
            var type = feature.get("attr").type,
                style = null;
            switch (type) {
            case "Point":
                this._createPointStyle(key, types[typeKey]);
                break;
            case "LineString":
                this._createLineStyle(key, types[typeKey]);
                break;
            case "Polygon":
                this._createPolygonStyle(key, types[typeKey]);
                break;
            default:
                break;
            }
        }

    };
    //开启高亮
    Map.prototype.startHighlightFeatureonLayer = function(key) {
        if (!this.layers[key]) return;
        this.hlLayers.push(this.layers[key]);
        if (this.hlLayers.length > 1) return;
        var _this = this,
            hlFeature = null;
        var font = this.layerStyle[key] && this.layerStyle[key].font || "14px";
        var target = document.querySelectorAll("#"+this.target)[0];
        this._pointermoveEKey = this.map.on('pointermove', function(e) {
            var flag = false;
            var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if (this.tagLayers.indexOf(layer) > -1 && feature.getStyle().getText() && feature.getStyle().getText().getText() !== "") return;
                if (hlFeature) {
                    var hlfeatureStyle = hlFeature.getStyle();
                    hlfeatureStyle.setText(null);
                    hlFeature.setStyle(hlfeatureStyle);
                    hlFeature = null;
                }
                if (feature && layer && feature.get("attr") && (feature.get("attr").type === "Point" || feature.get("attr").type === "LineString") &&
                        this.hlLayers.indexOf(layer) > -1) {

                    var featureStyle = feature.getStyle();
                    var nowStyle = feature.get("attr").style || this.layerStyle[layer.get("key")];
                    let textWord = typeof nowStyle.fontText === "function" ? nowStyle.fontText(feature.get("attr")) : nowStyle.fontText;
                    if (featureStyle.getText()) {
                      featureStyle.getText().setText(textWord);
                    }else {
                      var text = new Text({
                          text: textWord,
                          offsetX: nowStyle.fontOffset && nowStyle.fontOffset[0] != null ? nowStyle.fontOffset[0] : 10,
                          offsetY: nowStyle.fontOffset && nowStyle.fontOffset[1] != null ? nowStyle.fontOffset[1] : -10,
                          textAlign: "left",
                          fill: new Fill({
                              color: nowStyle.fontColor
                          }),
                          font: font
                      });
                      featureStyle.setText(text);
                    }

                    feature.setStyle(featureStyle);
                    hlFeature = feature;
                    flag = true;
                    return;
                }

            }.bind(_this), {hitTolerance:5, layerFilter: function(layer) {
              if (_this.hlLayers && _this.hlLayers.indexOf(layer) > -1) {
                return true;
              }
              return false;

            }});
            if (flag) {
                target.style.cursor = "pointer";
            }else{
                target.style.cursor = "inherit";
            }

        });
    };
    //关闭高亮
    Map.prototype.stopHighlightFeatureonLayer = function(key) {
        if (!this.layers[key]) return;
        var index = this.hlLayers.indexOf(this.layers[key]);
        if (index > -1) {
            this.hlLayers.splice(index, 1);
        }
        if (!this.hlLayers.length) {
            unByKey(this._pointermoveEKey);
            this._pointermoveEKey = null;
        }
    };
    Map.prototype.startTagOnLayer = function(key) {
      if (!this.layers[key]) return;
      this.tagLayers.push(this.layers[key]);

      let layer = this.layers[key];
      let func = (e) => {
      // layer.getSource().getFeatures().forEach((feature) => {
        let feature = e.feature;
        var featureStyle = feature.getStyle();
        var nowStyle = feature.get("attr").style || this.layerStyle[layer.get("key")];
        var font = this.layerStyle[key] && this.layerStyle[key].font || "14px";
        var text = new Text({
            // text: typeof nowStyle.fontText === "function" ? nowStyle.fontText(feature.get("attr")) : nowStyle.fontText,
            text: "",
            offsetX: nowStyle.fontOffset && nowStyle.fontOffset[0] != null ? nowStyle.fontOffset[0] : 10,
            offsetY: nowStyle.fontOffset && nowStyle.fontOffset[1] != null ? nowStyle.fontOffset[1] : -10,
            textAlign: "left",
            fill: new Fill({
                color: nowStyle.fontColor
            }),
            font: font
        });
        featureStyle.setText(text);
        feature.setStyle(featureStyle);
      }
      this.tagLayerEvent[key] = layer.getSource().on('addfeature', func);
      // layer.getSource().on('changefeature', func);
    }
    Map.prototype.hideTagOnLayer = function(key) {
      if (!this.layers[key]) return;
      var index = this.tagLayers.indexOf(this.layers[key]);
      if (index > -1) {
        this.layers[key].getSource().getFeatures().forEach((feature) => {
          let style = feature.getStyle();
          if (style.getText()) {
            style.getText().setText("");
          }
          feature.setStyle(style);
        });
      }
    };
    Map.prototype.showTagOnLayer = function(key) {
      if (!this.layers[key]) return;
      var index = this.tagLayers.indexOf(this.layers[key]);
      if (index > -1) {
        this.layers[key].getSource().getFeatures().forEach((feature) => {
          var nowStyle = feature.get("attr").style || this.layerStyle[key];
          var style = feature.getStyle();
          if (style.getText()) {
            style.getText().setText(typeof nowStyle.fontText === "function" ? nowStyle.fontText(feature.get("attr")) : nowStyle.fontText);
          }
          feature.setStyle(style);
        });
      }
    };
    Map.prototype.stopTagOnLayer = function(key) {
      if (!this.layers[key]) return;
      var index = this.tagLayers.indexOf(this.layers[key]);
      if (index > -1) {
          this.tagLayers.splice(index, 1);
      }
      this.layers[key].getSource().getFeatures().forEach((feature) => {
        let style = feature.getStyle();
        style.setText(null);
        feature.setStyle(style);
      });
      unByKey(this.tagLayerEvent[key]);
    }
    Map.prototype.showTextonLayer = function(key, isShow) {
        if (!this.layers[key]) return;
        if (this.showTextLayer[key] === isShow) return;

        var features = this.layers[key].getSource().getFeatures();
        if (features && features.length) {
            var _this = this;
            features.forEach(function(f) {
                var featureStyle = f.getStyle();
                var nowStyle = f.get("attr").style || _this.layerStyle[key];
                if (isShow) {
                    if (!featureStyle.getText()) {
                        var text = new Text({
                            text: typeof nowStyle.fontText === "function" ? nowStyle.fontText(f.get("attr")) : nowStyle.fontText,
                            offsetX: 10,
                            offsetY: 10,
                            textAlign: "left",
                            fill: new Fill({
                                color: nowStyle.fontColor
                            })
                        });
                        featureStyle.setText(text);
                    }

                }else{
                    if (featureStyle.getText()) {
                        featureStyle.setText(null);
                    }

                }
                f.setStyle(featureStyle);
            });
        }
        this.showTextLayer[key] = isShow;

    }
    //开启点击features
    Map.prototype.startSelectFeature = function(key, callback, eleTempFunc, eleTempEvent) {
        if (!this.layers[key]) return;
        this.sfLayers.push({
            layer: this.layers[key],
            eleTempFunc: eleTempFunc,
            eleTempEvent: eleTempEvent,
            callback: callback
        });
        if (this.sfLayers.length > 1) return;
        var overlay = new Overlay({
            id: "pop",
            offset: [0, -20],
            stopEvent: true,
            // autoPan:true,
            positioning: 'bottom-center'
        });
        var hideOverlay = function() {
            if (this.map.getOverlayById('pop')) {
                this.map.removeOverlay(overlay);
            }
        }.bind(this);
        var _this = this;
        this._clickKey = this.map.on("click", function(e) {
            var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                return {feature, layer};
                if (feature && layer && feature.get("attr") && feature.get("attr").type === "Point") {


                    // for (var i = 0; i < this.sfLayers.length; i++) {
                    //     var item = this.sfLayers[i];
                    //     if (item.layer === layer) {
                    //         hideOverlay();
                    //         var emptyDiv = document.createElement("div");emptyDiv.innerHTML = "未定义创建模板";
                    //         var ele = item.eleTempFunc ? item.eleTempFunc(feature.get('attr')) : emptyDiv;
                    //         overlay.setElement(ele);
                    //         this.map.addOverlay(overlay);
                    //         overlay.setPosition(feature.getGeometry().getCoordinates());
                    //         //绑定事件
                    //         item.eleTempEvent && item.eleTempEvent.call(overlay, feature.get('attr'), hideOverlay);
                    //         break;
                    //     }
                    // }
                }
            }.bind(_this),{hitTolerance:5,layerFilter: function(layer) {
              if (_this.hlLayers && _this.hlLayers.indexOf(layer) > -1) {
                return true;
              }
              return false;

            }});
            if (_this.callbacks.onFeatureClicked) {
              _this.callbacks.onFeatureClicked.call(_this, feature);
            }
            if (!feature) return;
            for (var i = 0; i < _this.sfLayers.length; i++) {
                var sflayer = _this.sfLayers[i];
                if (sflayer.layer === feature.layer) {
                    sflayer.callback(feature.feature.get("attr"));
                    break;
                }
            }
        });

    };
    //关闭点击features
    Map.prototype.stopSelectFeature = function(key) {
        if (!this.layers[key]) return;

        for (var i = 0; i < this.sfLayers.length; i++) {
            var item = this.sfLayers[i];
            if (item.layer === this.layers[key]) {
                this.sfLayers.splice(i, 1);
                break;
            }
        }
        if (!this.sfLayers.length) {
            unByKey(this._clickKey);
            this._clickKey = null;
        }
    };
    //开启聚合
    Map.prototype.startCluster = function(key, isSimple) {
        if (!this.layers[key] || this.clusterLayer[key]) return;
        var features = this.layers[key].getSource().getFeatures();
        var clusterSource = new Cluster({
            distance: isSimple? 0:30,
            source: new VectorSource(),

        });
        var clusterLayer = new VectorLayer({
        	zIndex: 21,
            source: clusterSource,
            visible: this.layers[key].getVisible(),
            style: function(feature) {
                var style = null;
                if (!style) {
                    var nowStyle = this.layerStyle[key];
                    var text = null;
                    return new Style({
                        image: new CircleStyle({
                            radius: isSimple ? 3 : 10,
                            stroke: new Stroke({
                                color: nowStyle.strokeColor ? nowStyle.strokeColor : "#aaee77",
                            }),
                            fill: new Fill({
                                color: nowStyle.fillColor ? nowStyle.fillColor : "rgba(114,151,59,0.4)",
                            })
                        }),
                        stroke: new Stroke({
                            color: nowStyle.strokeColor ? nowStyle.strokeColor : "#aaee77",
                            width: nowStyle.width ? nowStyle.width : 2,
                        }),
                        //默认填充样式
                        fill: new Fill({
                            color: nowStyle.fillColor ? nowStyle.fillColor : "rgba(114,151,59,0.4)",
                        }),
                        //默认文字样式
                        text: new Text({
                            font: nowStyle.font ? nowStyle.font : '10px sans-serif',
                            text: isSimple ? "" :feature.get('features').length + "",
                            fill: new Fill({
                                color: nowStyle.fontColor ? nowStyle.fontColor : "#000000"
                            })
                        })
                    });
                }
                return style;
            }.bind(this)
        });

        this.map.addLayer(clusterLayer);
        this.clusterLayer[key] = clusterLayer;
        clusterLayer.getSource().getSource().addFeatures(features);
        this.layers[key].setVisible(false);

    };
    //停止聚合
    Map.prototype.stopCluster = function(key) {
        if (!this.layers[key]) return;
        if (!this.clusterLayer[key]) return;
        this.map.removeLayer(this.clusterLayer[key]);
        if (this.clusterLayer[key].getVisible() === true) {
            this.layers[key].setVisible(true);
        }else {
            this.layers[key].setVisible(false);
        }
        delete this.clusterLayer[key];
    };
    //切换图层
    Map.prototype.activeTileLayer = function(key) {
        if (!this.layers[key]) return;
        for (var lkey in this.layers) {
            if (this.layers[lkey] && this.layers[lkey].get("type") === "tile") {
                this.layers[lkey].setVisible(key === lkey);
            }
        }
    };
    //启动测量功能
    Map.prototype.activeMeasure = function(measureType) {
        this.stopMeasure();



        var source = new VectorSource();

        var vector = new VectorLayer({
            source: source,
            zIndex: 80,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        this._measureLayer = vector;
        this.map.addLayer(vector);


        /**
         * Currently drawn feature.
         * @type {ol.Feature}
         */
        var sketch;


        /**
         * The help tooltip element.
         * @type {Element}
         */
        var helpTooltipElement;


        /**
         * Overlay to show the help messages.
         * @type {ol.Overlay}
         */
        var helpTooltip;


        /**
         * The measure tooltip element.
         * @type {Element}
         */
        var measureTooltipElement;


        /**
         * Overlay to show the measurement.
         * @type {ol.Overlay}
         */
        var measureTooltip;


        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = "点击继续测量面积";


        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = '点击继续测量距离';


        /**
         * Handle pointer move.
         * @param {ol.MapBrowserEvent} evt The event.
         */
        var pointerMoveHandler = function(evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '点击开始测量';

            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };




        this._measureEKey = this.map.on('pointermove', pointerMoveHandler);

        this.map.getViewport().addEventListener('mouseout', function() {
            helpTooltipElement.classList.add('hidden');
        });

        // var typeSelect = document.getElementById('type');
        // var geodesicCheckbox = document.getElementById('geodesic');

        var draw; // global so we can remove it later


        /**
         * Format length output.
         * @param {ol.geom.LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function(line) {
            var length;
            if (false) {

            } else {
                length = Math.round(line.getLength() * 100) / 100;
            }
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return output;
        }.bind(this);


        /**
         * Format area output.
         * @param {ol.geom.Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function(polygon) {
            var area;
            if (false) {

            } else {
                area = polygon.getArea();
            }
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
            }
            return output;
        }.bind(this);

        var addInteraction = function() {
            var type = (measureType == 'Polygon' ? 'Polygon' : 'LineString');
            draw = new Draw({
                source: source,
                type: /** @type {ol.geom.GeometryType} */ (type),
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new CircleStyle({
                        radius: 5,
                        stroke: new Stroke({
                            color: 'rgba(0, 0, 0, 0.7)'
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            this.map.addInteraction(draw);

            createMeasureTooltip();
            createHelpTooltip();

            var listener;
            draw.on('drawstart', function(evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            draw.on('drawend', function() {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                unByKey(listener);
            });
            this._draw = draw;
        }.bind(this);


        /**
         * Creates a new help tooltip
         */
        var createHelpTooltip = function() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip hidden';
            helpTooltip = new Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            this.map.addOverlay(helpTooltip);
        }.bind(this);


        /**
         * Creates a new measure tooltip
         */
        var createMeasureTooltip = function() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            this.map.addOverlay(measureTooltip);
        }.bind(this);
        addInteraction();
    };
    //停止测量功能
    Map.prototype.stopMeasure = function() {
        if (this._draw && this._measureLayer) {
            this.map.removeInteraction(this._draw);
            this.map.removeLayer(this._measureLayer);
            var arr = [].concat(this.map.getOverlays().getArray());
            for (var i = 0; i < arr.length; i++) {
                this.map.removeOverlay(arr[i]);
            }
            unByKey(this._measureEKey);
            this._draw = null;
            this._measureLayer = null;
            this._helpTooltip = null;
            this._measureTooltip = null;
            this._measureEKey = null;
            delete this._draw;
            delete this._measureLayer;
            delete this._helpTooltip;
            delete this._measureTooltip;
            delete this._measureEKey;
        }
    };
    //开启搜索type:Rect||Circle||Polygon
    Map.prototype.startSearch = function(type, callback) {
        this.stopSearch();
        var _this = this;
        var source = new VectorSource({
            wrapX: false
        });

        var vector = new VectorLayer({
            source: source
        });
        this._searchlayer = vector;
        this.map.addLayer(vector);
        var draw = new Draw({
            source: source,
            type: type === 'Rect' ? 'Circle' : type,
            geometryFunction: type === 'Rect' ? createBox() : undefined
        });
        ;
        this._searchDraw = draw;
        draw.on("drawend", function(e) {
            // var extent = type == 'Circle' ? e.feature.getGeometry().getExtent() : e.feature.getGeometry().getCoordinates();
            // var extent = e.feature.getGeometry().getExtent();
            var timer = window.setTimeout(function() {
                _this.stopSearch();
                window.clearTimeout(timer);
            }, 200);
            if (callback) {
                // var features = _this.getShipFeaturesByExtent(extent);
                var param = {};
                if (type == 'Circle') {
                    var c = transform(e.feature.getGeometry().getCenter(), 'EPSG:3857', 'EPSG:4326');
                    param.type = "Circle";
                    param.center = c;
                    param.radius = e.feature.getGeometry().getRadius();
                } else {
                    var mapPoints = e.feature.getGeometry().getCoordinates()[0].map(function(item) {
                        return transform(item, 'EPSG:3857', 'EPSG:4326');
                    });
                    param.type = 'Polygon';
                    param.points = mapPoints;
                }
                callback(param);
            }
        });
        this.map.addInteraction(draw);
    };
    Map.prototype.stopSearch = function() {
        if (this._searchDraw && this._searchlayer) {
            this.map.removeLayer(this._searchlayer);
            this.map.removeInteraction(this._searchDraw);
            delete this._searchlayer;
            delete this._searchDraw;
        }
    };
    Map.prototype.startEditablePolygon = function(callback) {
        this.stopEditablePolygon();
        var features = new Collection();
        var featureOverlay = new VectorLayer({
            source: new VectorSource({
                features: features
            }),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        featureOverlay.setMap(this.map);
        this._searchEdlayer = featureOverlay;
        var modify = new Modify({
            features: features,
            // the SHIFT key must be pressed to delete vertices, so
            // that new vertices can be drawn at the same position
            // of existing vertices
            deleteCondition: function(event) {
                return shiftKeyOnly(event) && singleClick(event);
            }
        });
        modify.on("modifyend", function(e) {
            var points = e.features.getArray()[0].getGeometry().getCoordinates()[0];
            return callback && callback(points);
        });
        modify.on("modifystart", function(e) {
            console.log(e);
        });
        this._modifyDraw = modify;
        this.map.addInteraction(modify);




        var draw = new Draw({
            features: features,
            type: "Polygon"
        });
        draw.on("drawend", function(e) {
            var mapPoints = e.feature.getGeometry().getCoordinates()[0].map(function(item) {
                return transform(item, 'EPSG:3857', 'EPSG:4326');
            });
            return callback && callback(mapPoints);
        });
        draw.on("drawstart", function(e) {
            e.stopPropagation();
            // window.setTimeout(function() {
            //     featureOverlay.getSource().clear();
            // }, 0);
        });
        this._edDraw = draw;
        this.map.addInteraction(draw);
        // return {
        // 	prev:function(){
    // 	}
    // };
    };
    Map.prototype.stopEditablePolygon = function() {
        if (this._edDraw && this._modifyDraw && this._searchEdlayer) {
            this._searchEdlayer.getSource().clear();
            // this._edDraw.unByKey([this._drawstartEKey,this._drawendEKey]);
            // this._modifyDraw.unByKey([this._modifyendEKey,this._modifystartEKey]);
            this.map.removeInteraction(this._modifyDraw);
            this.map.removeInteraction(this._edDraw);
            this.map.removeLayer(this._searchEdlayer);
            delete this._searchEdlayer;
            delete this._edDraw;
            delete this._modifyDraw;
        }
    };
    Map.prototype.startEditablePolygonInLayerFeature = function(key, featureId, callback) {
		if (!this.layers[key]) return;
		var layer = this.layers[key];
		var featrue = layer.getSource().getFeatureById(featureId);
		if (!featrue) return;
		var features = new Collection();
		features.push(featrue);
		var modify = new Modify({
            features: features,
            // the SHIFT key must be pressed to delete vertices, so
            // that new vertices can be drawn at the same position
            // of existing vertices
            deleteCondition: function(event) {
                return shiftKeyOnly(event) && singleClick(event);
            }
        });
        modify.on("modifyend", function(e) {
            var points = e.features.getArray()[0].getGeometry().getCoordinates()[0];
            return callback && callback(points);
        });
        modify.on("modifystart", function(e) {
            console.log(e);
        });
        this._modifyDraw = modify;
        this.map.addInteraction(modify);

    };
    Map.prototype.stopEditablePolygonInLayerfeature = function() {
        this._modifyDraw && this.map.removeInteraction(this._modifyDraw);
        this._edDraw && this.map.removeInteraction(this._edDraw);
        delete this._edDraw;
        delete this._modifyDraw;
    };
    Map.prototype.showFormatDegree = function(format) {
        this._format = format;
    };
    //设置中心点
    Map.prototype.animate = function(param, callback) {
        if (!param) return;
        this.map.getView().animate({
            center: transform(param.center, get('EPSG:4326'), get('EPSG:3857')),
            zoom: param.zoom,
            duration: param.duration
        }, callback);
    };
    //设置中心点
    Map.prototype.setCenter = function(center) {
        if (!center) return;
        center = this._transformLonlat(center);
        this.map.getView().setCenter(center);

    };
    //获得中心点
    Map.prototype.getCenter = function() {
        var center = this.map.getView().getCenter();
        return this._transformLonlat(center, true);
    };
    //设置缩放级别
    Map.prototype.setZoom = function(zoom) {
        if (!zoom) return;
        this.map.getView().setZoom(zoom);

    };
    //获得缩放级别
    Map.prototype.getZoom = function() {
        return this.map.getView().getZoom();
    };
    //绑定事件
    Map.prototype.on = function(eventType, func) {
        return this.map.on(eventType, func);
    };
    //注销事件
    Map.prototype.un = function(eventType, func) {
        return this.map.un(eventType, func);
    };
    Map.prototype.updateSize = function() {
        return this.map.updateSize();
    };
    // 设置图层可见性
    Map.prototype.setVisible = function(key, value) {
        if (!this.layers[key]) return;
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].setVisible(value);
        }else{
            this.layers[key].setVisible(value);
        }
    };
    //绑定事件
    Map.prototype.onView = function(eventType, func) {
        return this.map.getView().on(eventType, func);
    };
    //解绑视图事件
    Map.prototype.unView = function(eventType, func){
        return this.map.getView().un(eventType, func);
    };
    //
    Map.prototype.getView = function() {
        return this.map.getView();
    };

    Map.prototype.getMap = function() {
      return this.map;
    };
    Map.prototype.onFeatureClicked = function(callback) {
      this.callbacks.onFeatureClicked = callback;
    }

    return Map;
})(window);


