import { Injectable, Inject } from '@angular/core';

import { MAP_MODULES_CONFIG, MAP_TOOLBAR_CONFIG } from '@config/map.config';
import { MapToolBarItemType, MapToolbarItemCfg } from '@feature/ol-map/models';
import { OlMapService } from '@feature/ol-map/services/ol-map.service';
import { Observable } from 'rxjs';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;
declare var ol: any;

@Injectable()
export class ToolbarService {
  private olMap;
  private mainBar;
  private toolbarCfg;
  private olMapService;

  constructor() {}

  public init(olMapService, toolbarCfg) {
    if (toolbarCfg.load === true) {
      // TODO 此处的olMapService应为使用DI，但要保证service和component中的依赖是同一个实例
      this.olMapService = olMapService;
      this.olMap = this.olMapService.selectedMap;

      this.mainBar = new ol.control.Bar();
      if (toolbarCfg.position) {
        this.mainBar.setPosition(toolbarCfg.position);
      } else {
        this.mainBar.setPosition('top-left');
      }
      this.olMap.addControl(this.mainBar);
      this.toolbarCfg = toolbarCfg;
      this.addEditorCtrl();
    }
  }

  private addEditorCtrl() {
    if (this.toolbarCfg) {
      const pointLayer = this.olMapService.getLayer('draw-point');
      //   const polylineLayer = this.olMapService.getLayer('draw-polyline');
      //   const polygonLayer = this.olMapService.getLayer('draw-polygon');

      const editSubCtrl = new ol.control.Bar({
        toggleOne: true,
        group: false
      });
      const selectCtrl = new ol.control.Toggle({
        html: '<i class="fa fa-hand-pointer-o"></i>',
        title: 'Select',
        interaction: new ol.interaction.Select(),
        bar: new ol.control.Bar({
          controls: [
            new ol.control.TextButton({
              html: '<i class="fa fa-times"></i>',
              title: 'Delete',
              handleClick: function() {
                let features = selectCtrl.getInteraction().getFeatures();
                if (!features.getLength()) {
                  console.log('Select an object first...');
                } else {
                  console.log(features.getLength() + ' object(s) deleted.');
                }
                for (let i = 0, f; (f = features.item(i)); i++) {
                  pointLayer.getSource().removeFeature(f);
                  //   polylineLayer.getSource().removeFeature(f);
                  //   polygonLayer.getSource().removeFeature(f);
                }
                selectCtrl
                  .getInteraction()
                  .getFeatures()
                  .clear();
              }
            }),
            new ol.control.TextButton({
              html: '<i class="fa fa-info"></i>',
              title: 'Show informations',
              handleClick: function() {
                switch (selectCtrl
                  .getInteraction()
                  .getFeatures()
                  .getLength()) {
                  case 0:
                    console.log('Select an object first...');
                    break;
                  case 1:
                    var f = selectCtrl
                      .getInteraction()
                      .getFeatures()
                      .item(0);
                    console.log('Selection is a ' + f.getGeometry().getType());
                    break;
                  default:
                    console.log(
                      selectCtrl
                        .getInteraction()
                        .getFeatures()
                        .getLength() + ' objects seleted.'
                    );
                    break;
                }
              }
            })
          ]
        }),
        active: false
      });
      editSubCtrl.addControl(selectCtrl);
      const editCtrlBar = new ol.control.Bar({
        controls: [
          new ol.control.Toggle({
            html: 'e',
            title: 'Draw Point, Polyline, Polygon',
            // handleClick: () => {}
            bar: editSubCtrl
          })
        ]
      });
      this.mainBar.addControl(editCtrlBar);

      const pointEdit = new ol.control.Toggle({
        html: '<i class="fa fa-map-marker" ></i>',
        title: 'Point',
        interaction: new ol.interaction.Draw({
          type: 'Point',
          source: pointLayer.getSource()
        })
      });
      editSubCtrl.addControl(pointEdit);

      const polylineEdit = new ol.control.Toggle({
        html: '<i class="fa fa-share-alt" ></i>',
        title: 'LineString',
        interaction: new ol.interaction.Draw({
          type: 'LineString',
          source: pointLayer.getSource(),
          // Count inserted points
          geometryFunction: function(coordinates, geometry) {
            if (geometry) geometry.setCoordinates(coordinates);
            else geometry = new ol.geom.LineString(coordinates);
            this.nbpts = geometry.getCoordinates().length;
            return geometry;
          }
        }),
        // Options bar associated with the control
        bar: new ol.control.Bar({
          controls: [
            new ol.control.TextButton({
              html: 'undo',
              title: 'Delete last point',
              handleClick: function() {
                if (polylineEdit.getInteraction().nbpts > 1)
                  polylineEdit.getInteraction().removeLastPoint();
              }
            }),
            new ol.control.TextButton({
              html: 'Finish',
              title: 'finish',
              handleClick: function() {
                // Prevent null objects on finishDrawing
                if (polylineEdit.getInteraction().nbpts > 2)
                  polylineEdit.getInteraction().finishDrawing();
              }
            })
          ]
        })
      });
      editSubCtrl.addControl(polylineEdit);

      const polygonEdit = new ol.control.Toggle({
        html: '<i class="fa fa-bookmark-o fa-rotate-270" ></i>',
        title: 'Polygon',
        interaction: new ol.interaction.Draw({
          type: 'Polygon',
          source: pointLayer.getSource(),
          // Count inserted points
          geometryFunction: function(coordinates, geometry) {
            this.nbpts = coordinates[0].length;
            if (geometry)
              geometry.setCoordinates([
                coordinates[0].concat([coordinates[0][0]])
              ]);
            else geometry = new ol.geom.Polygon(coordinates);
            return geometry;
          }
        }),
        // Options bar ssociated with the control
        bar: new ol.control.Bar({
          controls: [
            new ol.control.TextButton({
              html: 'undo', //'<i class="fa fa-mail-reply"></i>',
              title: 'undo last point',
              handleClick: function() {
                if (polygonEdit.getInteraction().nbpts > 1)
                  polygonEdit.getInteraction().removeLastPoint();
              }
            }),
            new ol.control.TextButton({
              html: 'finish',
              title: 'finish',
              handleClick: function() {
                // Prevent null objects on finishDrawing
                if (polygonEdit.getInteraction().nbpts > 3)
                  polygonEdit.getInteraction().finishDrawing();
              }
            })
          ]
        })
      });
      editSubCtrl.addControl(polygonEdit);

      const drawRectInter = new ol.interaction.DrawRegular({
        source: pointLayer.getSource(),
        sides: 4,
        canRotate: false
      });
      drawRectInter.on('drawstart', function(e) {
        e.feature.on('change', function() {
        //   console.log('change');
        });
      });
      drawRectInter.on('drawing', function(e) {
        if (e.feature.getGeometry().getArea)
          jQuery('#info').html(
            (e.feature.getGeometry().getArea() / 1000000).toFixed(2) +
              ' km<sup>2</sup>'
          );
      });
      drawRectInter.on('drawend', function(e) {
        // jQuery('#info').text('');
        postal
            .channel('MAP_CHANNEL')
            .publish('draw.rect.end', undefined);
      });
      const drawRect = new ol.control.Toggle({
        html: '<i class="fa fa-square-o" aria-hidden="true"></i>',
        title: 'Draw Rectangle',
        interaction: drawRectInter
      });
      editSubCtrl.addControl(drawRect);
    }
  }

  public onDrawRecEnd(): Observable<any> {
    return Observable.create(observer => {
        postal
            .channel('MAP_CHANNEL')
            .subscribe('draw.rect.end', (data, envelope) => {
                observer.next();
            });
    });
  }

  public saveFeatures(spatial?: string) {
    const pointLayer = this.olMapService.getLayer('draw-point');
    // 默认geojson为4326坐标系（wgs84球面坐标系）
    let dr = 'EPSG:4326';
    if(spatial) {
        dr = spatial;
    }
    return new ol.format.GeoJSON().writeFeatures(pointLayer.getSource().getFeatures(),  {featureProjection: dr});
  }

  private set item(v) {
    _.map(this.toolbarCfg, item => {
      if (item.id === v.id) {
        item = v;
      }
    });
  }

  publishClickEvent(item): MapToolbarItemCfg {
    if (item.type === MapToolBarItemType.TOGGLE) {
      item.activated = !item.activated;
    }
    this.item = item;

    switch (item.id) {
      case 'pan':
        this.olMapService.pan();
        break;
      case 'fullExtent':
        this.olMapService.fullExtent();
        break;
      case 'zoomIn':
        this.olMapService.zoomIn();
        break;
      case 'zoomOut':
        this.olMapService.zoomOut();
        break;
      case 'measureLength':
        this.olMapService.measureLength();
        break;
      case 'measureArea':
        this.olMapService.measureArea();
        break;
      case 'drawPoint':
        this.olMapService.drawPoint();
        break;
      case 'drawLine':
        this.olMapService.drawLine();
        break;
      case 'drawPolygon':
        this.olMapService.drawPolygon();
        break;
      case 'selectByCircle':
        this.olMapService.selectByCircle();
        break;
      case 'selectByRectangle':
        this.olMapService.selectByRectangle();
        break;
      case 'selectByPolygon':
        this.olMapService.selectByPolygon();
      case 'clearGraphics':
        this.olMapService.clearDraw();
        break;
    }
    console.log(`toolbar: jQuery{item.id}, activated: jQuery{item.activated}`);
    return item;
  }
}
