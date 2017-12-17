import { Injectable, Inject } from '@angular/core';

import { MAP_MODULES_CONFIG, MAP_TOOLBAR_CONFIG } from '@config/map.config';
import { MapToolBarItemType, MapToolbarItemCfg } from '../models';
import { OlMapService } from '../services/ol-map.service';
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
      const polylineLayer = this.olMapService.getLayer('draw-polyline');
      const polygonLayer = this.olMapService.getLayer('draw-polygon');

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
                  polylineLayer.getSource().removeFeature(f);
                  polygonLayer.getSource().removeFeature(f);
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
        active: true
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
          source: polylineLayer.getSource(),
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
          source: polygonLayer.getSource(),
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
    }
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
    console.log(`toolbar: ${item.id}, activated: ${item.activated}`);
    return item;
  }
}
