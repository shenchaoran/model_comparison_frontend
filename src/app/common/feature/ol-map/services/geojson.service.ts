import { Injectable, Inject } from '@angular/core';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;

// @Injectable()
export class GeoJSONService {
    constructor(private geojson: any) {}

    getExtent() {
        if (this.geojson.type === 'FeatureCollection') {
            const points = _.reduce(
                this.geojson.features,
                (points, feature) => {
                    return _.concat(
                        points,
                        this.getGeometryPoints(feature.geometry)
                    );
                },
                []
            );

            const xs = [];
            const ys = [];
            _.map(points, coor => {
                xs.push(coor[0]);
                ys.push(coor[1]);
            });

            let minx = _.min(xs);
            let miny = _.min(ys);
            let maxx = _.max(xs);
            let maxy = _.max(ys);
            return [minx, miny, maxx, maxy];
        }
    }

    private getGeometryPoints(geometry: any) {
        const coors = [];
        const type = geometry.type;
        if (type === 'Point') {
            const point = proj4('EPSG:3857').forward(geometry.coordinates);
            coors.push(point);
        } else if (type === 'LineString') {
            _.map(geometry.coordinates, coor => {
                const point = proj4('EPSG:3857').forward(coor);
                coors.push(point);
            });
        } else if (type === 'Polygon') {
            _.map(geometry.coordinates, polygon => {
                _.map(polygon, (coor, i) => {
                    if (i !== polygon.length - 1) {
                        const point = proj4('EPSG:3857').forward(coor);
                        coors.push(point);
                    }
                });
            });
        }

        return coors;
    }

    private getGeometryExtent(geometry: any) {
        const coors = this.getGeometryPoints(geometry);
        const xs = [];
        const ys = [];
        _.map(coors, coor => {
            xs.push(coor[0]);
            ys.push(coor[1]);
        });

        let minx = _.min(xs);
        let miny = _.min(ys);
        let maxx = _.max(xs);
        let maxy = _.max(ys);
        return [minx, miny, maxx, maxy];
    }
}
