
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { TileWMS, Vector as VectorSource, XYZ } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { Style } from 'ol/style';
import Stroke from 'ol/style/Stroke';
import { unByKey } from 'ol/Observable';
/**
 * 实现对洪水区的模拟.
 * 
 * 输入参数有：
 *  url: {string} wfs服务地址
 *  srsName:{string} 坐标系
 *  ns:{string} 命名空间
 *  ws:{string} 工作空间
 *  layerName: {string} 图层名称
 *  
 *  map: {ol/map} 地图对象
 *  
 *  colortable:{array} 配色规则表，包含：
 *                 min: {number} 最小值
 *                 max: {number} 最大值
 *                 color: {string} 如 '#e0e1e3'
 *              
 */
export default class FloodAnimation {
    constructor(opt_options) {
        this.olMap_ = opt_options.map;
        this.cachedStyles_ = [];
        let style = this.createStyle_(opt_options);
        this.layer_ = this.createLayer_(opt_options);
        this.layer_.setStyle(style);
        this.olMap_.addLayer(this.layer_);
        this.install();
        this._cachHLFeature = null;
        this.callback = {
          'click': null
        };
    }

    /**
     * 更新数据数组
     * @param {*} data
     *      r: {string} 唯一编码，河流名
     *      time: {string} yyyy-MM-dd HH:mm:ss格式的时间字符串
     *      f: {number} 数值 
     *      v:{number}速度
     *      d:{number}深度
     *      q:{number}流量
     */
    updateData(data) {
        let srs = this.layer_.getSource();
        data.forEach(item => {
            let f = srs.getFeatureById(item.r);
            if (f) {
                f.set('d', item.d);
            }
        });

        // srs.getFeatureByAtt
    }

    /**
     * 创建图层样式函数
     * @param {}} opt_options 
     */
    createStyle_(opt_options) {
        // 根据外部传入的参数，构建样式数组。
        // 为了提高样式表的索引速度，在对水位数据分层设色时，按水位区间值从小到大的顺序排列样式
        const colorTable = opt_options.colorTable;
        colorTable.forEach(t => {
            let style = new Style({
                stroke: new Stroke({
                    color: t.color,
                    width: 4
                })
            });
            this.cachedStyles_.push(style)
        });
        // 存储一个默认样式
        this.cachedStyles_.push(new Style({
            stroke: new Stroke({
                color: '#ff0000',
                width: 2
            })
        }));
        this.cachMovedStyle = new Style({
            stroke: new Stroke({
                color: '#ffff00',
                width: 5
            })
        });

        /**
         * 根据要素当前值，返回要素所使用的样式
         */
        return (f, r) => {
            let d = f.get('d');
            let moved = f.get('moved');
            if (moved) {
              return this.cachMovedStyle;
            }
            
            let hitIdx = -1;
            for (let i = 0; i < colorTable.length; i++) {
                if (d >= colorTable[i].min && d <= colorTable[i].max) {
                    hitIdx = i;
                    break;
                }
            }
            if (hitIdx > -1) {
                return this.cachedStyles_[hitIdx];
            }
            return this.cachedStyles_[this.cachedStyles_.length - 1];
        };
    }



    /**
     * 创建模拟图层。
     * @param {*} opt_options 
     */
    createLayer_(opt_options) {
        this.wfsOption_ = {
            url: opt_options.url,
            srsName: opt_options.srsName || "EPSG:3857",
            featureNS: opt_options.ns,
            featurePrefix: opt_options.ws,
            featureTypes: [opt_options.layerName],
            outputFormat: 'application/json'
        };
        let url = opt_options.url + "&version=1.1.0&request=GetFeature&typename=" +
            opt_options.ws + ":" + opt_options.layerName +
            "&outputFormat=application/json&srsname=" + opt_options.srsName;
        let vectorSource = new VectorSource({
            format: new GeoJSON(),
            url: url
        });

        let layer = new VectorLayer({
            source: vectorSource,
            zIndex: 19,
            visible: opt_options.visible || true,
            className: 'st-style-0'
        });
        /**
         * 在数据加载时，设置要素的id为河流编码，
         * 方便后续数据更新时根据id获取feature用
         */
        let index = 0;
        vectorSource.on('addfeature', (e) => {
          e.feature.setId("R" + index);
          index++;
        });

        return layer;
    }
    setVisible(flag) {
      this.layer_.setVisible(flag);
    }
    install() {
      let _this = this;
      this._pointermoveEKey = this.olMap_.on('pointermove', function(e) {
          var flag = false;
          var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
              if (feature) {
                if (feature.get("moved")) return;
                if (_this._cachHLFeature && feature !== _this._cachHLFeature) {
                  _this._cachHLFeature.set("moved", false);
                };
                feature.set("moved", true);
                _this._cachHLFeature = feature;
              }
              
          }.bind(this), {hitTolerance:0, layerFilter: (layer) => {
            return layer === _this.layer_;
          }});
      });
      this._clickEKey = this.olMap_.on('click', function(e) {
          var flag = false;
          var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
              if (feature) {
                if (_this.callback["click"]) {
                  _this.callback["click"](feature.getProperties());
                }
              }
              
          }.bind(this), {hitTolerance:0, layerFilter: (layer) => {
            return layer === _this.layer_;
          }});
      });
    }
    destroy() {
      unByKey(this._pointermoveEKey);
      unByKey(this._clickEKey);
    }
    on(key, callback) {
      if (!this.callback[key]) {
        this.callback[key] = callback;
      }
    }
}