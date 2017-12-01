import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import * as ol from "openlayers";

@Injectable()
export class OLSymbolService {
  constructor() {}

  public static getSymbol(
    geometryType: string,
    symbolName: string,
    index?: number
  ): any {
    let symbol: ol.style.Style;
    let iconPath: string;
    let symbolId = _.snakeCase(geometryType) + "_" + symbolName;

    switch (symbolId) {
      /** default symbol */
      case "point_default_symbol":
      case "multipoint_default_symbol":
        // symbol = new SimpleMarkerSymbol();
        break;
      case "polyline_default_symbol":
        // symbol = new SimpleLineSymbol();
        break;
      case "polygon_default_symbol":
        symbol = new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 1,
            color: [255, 0, 0, 1]
          })
        });
        break;

      case "point_highlight_symbol":
        // iconPath = `assets/img/map/poi/icon_dibiao_${index}.png`;
        // symbol = new PictureMarkerSymbol(iconPath, 30, 30);
        break;
      case "polygon_highlight_symbol":
      case "multi_polygon_highlight_symbol":
        symbol = new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 3,
            color: [255, 0, 0, 1]
          }),
          fill: new ol.style.Fill({
            color: [0, 0, 255, 0.6]
          })
        });
        break;
      /** custom symbol */
      case "point_index_picture_marker_symbol":
        symbol = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            size: [32, 32],
            scale: 1,
            color: "#ff0000",
            src: "./assets/img/map/poi/icon_dibiao.png"
          }),
          fill: new ol.style.Fill({
            color: "#ff0000"
          }),
          stroke: new ol.style.Stroke({
            color: "#ff0000"
          }),
          text: new ol.style.Text({
            font: "12px serif",
            text: index.toString(),
            textAlign: "center",
            offsetX: 0,
            offsetY: -3,
            scale: 1,
            fill: new ol.style.Fill({
              color: "#fff"
            }),
            stroke: new ol.style.Stroke({
              color: "#fff"
            })
          })
        });
		break;
		
		case "point_dk_yellow_symbol": 
		symbol = new ol.style.Style({
			image: new ol.style.Icon({
			  anchor: [0.5, 0.5],
			  anchorXUnits: "fraction",
			  anchorYUnits: "fraction",
			  size: [30, 30],
			  scale: 1,
			  color: "#ffffff",
			  src: "./assets/img/map/icon_zu.png"
			})
		  });
		  break;

		  case "point_dk_blue_symbol": 
		  symbol = new ol.style.Style({
			  image: new ol.style.Icon({
				anchor: [0.5, 0.5],
				anchorXUnits: "fraction",
				anchorYUnits: "fraction",
				size: [30, 30],
				scale: 1,
				color: "#ffffff",
				src: "./assets/img/map/icon_chi.png"
			  })
			});
			break;

		  case "polygon_dk_yellow_symbol": 
		  case "multi_polygon_dk_yellow_symbol": 
		  symbol = new ol.style.Style({
			stroke: new ol.style.Stroke({
			  width: 2,
			  color: [255, 0, 0, 1]
			}),
			fill: new ol.style.Fill({
			  color: [33,112,193, 0.5]
			})
		  });
		  break;

		  case "polygon_dk_blue_symbol": 
		  case "multi_polygon_dk_blue_symbol": 
		  symbol = new ol.style.Style({
			stroke: new ol.style.Stroke({
			  width: 2,
			  color: [132,123,0, 1]
			}),
			fill: new ol.style.Fill({
			  color: [255,234,0, 0.5]
			})
		  });
		  break;
    }

    return symbol;
  }

  public static getColorRamps(name?: string) {
    switch (name) {
      case "blue":
        return ["#87CEFA", "#00BFFF", "#1E90FF", "#0000FF", "#0000CD"];
      case "gray":
        return ["#F5F5F5", "#DCDCDC", "#C0C0C0", "#808080", "#696969"];
      case "orange":
        return ["#DAA520", "#F4A460", "#FFA500", "#FF8C00", "#D2691E"];
      default:
        return ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];
    }
  }
}
