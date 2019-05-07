import { Component, OnInit, AfterViewInit, Input, Output,
    EventEmitter, HostListener, Inject, ElementRef, ViewChild, } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { API } from '@config';
import { OlService } from '../services/ol.service';
import { defaults as defaultControls } from 'ol/control/util';
import { STDData, ObsSite } from '@models';
import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import Map from 'ol/Map';
import View from 'ol/View';
import Group from 'ol/layer/Group';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { addYears, addDays, format, parse, addHours } from 'date-fns';
import { listTimeZones } from 'timezone-support';
import { parseFromTimeZone, formatToTimeZone } from 'date-fns-timezone';

@Component({
    selector: 'ogms-nc-dataset',
    templateUrl: './nc-dataset.component.html',
    styleUrls: ['./nc-dataset.component.scss']
})
// 可以选择时间维度，动静图，子区域
export class NcDatasetComponent implements OnInit, AfterViewInit {
    timeSeries;
    timeSeriesNum;
    _v;
    variables;
    dimensions;
    selectedVariable;
    timeVariable;
    startTime;
    endTime;
    timeResolution;
    spatialResolution;
    selectedTime;
    showAnimation = false;
    timer;
    get selectedDate() {
        return this.timeSeries[this.selectedTime - this.startTime]
        // let timeUnit = _.get(this, 'timeVariable.unit')
        // if(timeUnit)
        //     return this.ISOTime(this.selectedTime, timeUnit);
        // else
        //     return null;
    }
    // get selectedDateStr() { return format(this.selectedDate, 'YYYY-MM-DD hh:mm'); }
    @Input()
    set dataset(v: STDData) {
        let schemaId = _.get(v, 'schema.id')
        if(schemaId === 'mod17a2-nc') {
            this.timeSeries = [ '2000-01-01T00:00:00.000Z', '2000-12-31T00:00:00.000Z', '2001-12-31T00:00:00.000Z', '2002-12-31T00:00:00.000Z', '2003-12-31T00:00:00.000Z', '2004-12-30T00:00:00.000Z', '2005-12-30T00:00:00.000Z', '2006-12-30T00:00:00.000Z', '2007-12-30T00:00:00.000Z', '2008-12-29T00:00:00.000Z', '2009-12-29T00:00:00.000Z', '2010-12-29T00:00:00.000Z', '2011-12-29T00:00:00.000Z', '2012-12-28T00:00:00.000Z', '2013-12-28T00:00:00.000Z', '2014-12-28T00:00:00.000Z',]
            this.timeSeriesNum = new Array(16).fill(2000).map((v, i) => v+i)
            this.startTime = 2000
            this.endTime = 2015
        }
        else {
            this.timeSeries = [ '1982-01-01T00:00:00.000Z', '1983-01-01T00:00:00.000Z', '1984-01-01T00:00:00.000Z', '1984-12-31T00:00:00.000Z', '1985-12-31T00:00:00.000Z', '1986-12-31T00:00:00.000Z', '1987-12-31T00:00:00.000Z', '1988-12-30T00:00:00.000Z', '1989-12-30T00:00:00.000Z', '1990-12-30T00:00:00.000Z', '1991-12-30T00:00:00.000Z', '1992-12-29T00:00:00.000Z', '1993-12-29T00:00:00.000Z', '1994-12-29T00:00:00.000Z', '1995-12-29T00:00:00.000Z', '1996-12-28T00:00:00.000Z', '1997-12-28T00:00:00.000Z', '1998-12-28T00:00:00.000Z', '1999-12-28T00:00:00.000Z', '2000-12-27T00:00:00.000Z', '2001-12-27T00:00:00.000Z', '2002-12-27T00:00:00.000Z', '2003-12-27T00:00:00.000Z', '2004-12-26T00:00:00.000Z', '2005-12-26T00:00:00.000Z', '2006-12-26T00:00:00.000Z', '2007-12-26T00:00:00.000Z', '2008-12-25T00:00:00.000Z', '2009-12-25T00:00:00.000Z', '2010-12-25T00:00:00.000Z', '2011-12-25T00:00:00.000Z', '2012-12-24T00:00:00.000Z',];
            this.timeSeriesNum = new Array(32).fill(1982).map((v, i) => v+i)
            this.startTime = 1982
            this.endTime = 2013
        }
        this._v = v;
        this.variables = _.chain(v)
            .get('schema.structure.variables')
            .filter(variable => !!variable.layerId)
            .value();
        this.dimensions = _.chain(v)
            .get('schema.structure.dimensions')
            .value();
        this.selectedVariable = _.first(this.variables);
        let variables = _.get(v, 'schema.structure.variables'),
            latVariable = _.find(variables, variable => variable.name === 'lat'),
            longVariable = _.find(variables, variable => variable.name === 'long');
        this.timeVariable = _.find(variables, variable => variable.name === 'time');

        this.spatialResolution = `${latVariable.step} ° * ${longVariable.step} °`;

        // let startTime = _.get(this, 'timeVariable.start')
        this.selectedTime = this.startTime;
        let timeUnit = _.get(this, 'timeVariable.unit'),
            timeStep = _.get(this, 'timeVariable.step');
        // if(startTime) {
        //     this.startTime = this.ISOTime(_.get(this, 'timeVariable.start'), timeUnit)
        //     this.endTime = this.ISOTime(_.get(this, 'timeVariable.end'), timeUnit)
        // }
        if(timeStep) {
            if(_.startsWith(timeUnit, 'days since')) {
                let yearStep = timeStep/365
                if(yearStep%1 === 0) {
                    this.timeResolution = yearStep + (yearStep>1? ' years': ' year')
                }
                else {
                    this.timeResolution = timeStep + (timeStep>1? ' days': ' day')
                }
            }
            else if(_.startsWith(timeUnit, 'hours since')) {
                this.timeResolution = timeStep + (timeStep>1?' hours': ' hour');
            }
        }

        if(this.map) {
            this.updateMapSource();
        }
    }
    get dataset() {return this._v;}
    @Input() couldSwitchVariable: boolean = true;

    targetId;
    map;
    layer;
    source;
    view;
    @ViewChild('mapEl') mapEl: ElementRef;
    legendUrl = ''

    constructor(
        private olService: OlService,
        @Inject('GEOSERVER_LAYER_WS') private layers,
    ) {
        this.targetId = uuidv1();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.buildMap();
        }, 110);
    }

    onShowAnimationChange() {
        if(this.showAnimation) {
            this.timer = setInterval(() => {
                this.selectedTime += 1;
                if(this.selectedTime> this.endTime) {
                    this.selectedTime = this.startTime;
                }
                this.updateMapSource();
            }, 1000);
        }
        else {
            clearInterval(this.timer)
            this.selectedTime = this.timeVariable.start;
            this.updateMapSource();
        }
    }

    updateMapSource() {
        this.source.updateParams({
            layers: this.selectedVariable.layerId,
            time: this.selectedDate
        })
        this.legendUrl = `${this.layers.url}?request=GetLegendGraphic&format=image/png&layer=${this.selectedVariable.layerId}&legend_options=forceRule:True;dx:0;dy:0;mx:0.2;my:0.2;fontSize:12;labelMargin:10px;forceLabels:on;border:false`
    }

    buildMap() {
        this.legendUrl = `${this.layers.url}?request=GetLegendGraphic&format=image/png&layer=${this.selectedVariable.layerId}&legend_options=forceRule:True;dx:0;dy:0;mx:0.2;my:0.2;fontSize:12;labelMargin:10px;forceLabels:on;border:false`

        if(!this.selectedVariable && !!this.mapEl.nativeElement)
            return;
        let baseLayerGroup = new Group({
            layers: [
                new Tile({
                    title: 'OSM',
                    visible: true,
                    source: new OSM()
                } as any)
            ]
        });
        this.source = new TileWMS({
            crossOrigin: 'anonymous',
            serverType: 'geoserver',
            url: this.layers.url,
            params: {
                request : 'GetMap',
                service : 'WMS',
                version : '1.1.1',
                transparent: true,
                format: 'image/gif',
                // format_options: 'layout:legend',
                // legend_options: 'forceRule:True;dx:0;dy:0;mx:0.2;my:0.2;fontSize:12;labelMargin:10px;forceLabels:on;border:false'
                layers: this.selectedVariable.layerId,
                styles: '',
                bbox: this.layers.bbox,
                time: this.selectedDate,
                tiled: false,
                // 加长宽会变形
                // width : '768',
                // height : '330',
                srs: 'EPSG:4326',
                // 加下面的不允许跨域
                // format : 'application/openlayers'
            }
        });
        this.layer = new Tile({
            title: this.dataset.meta.name,
            source: this.source
        } as any);

        this.view = new View({
            center: [0, 0],
            zoom: 1
        });
        this.map = new Map({
            target: this.targetId,
            layers: [
                baseLayerGroup,
                this.layer
            ],
            view: this.view,
            controls: new defaultControls({
                // attribution: false,
                rotate: false,
                zoom: false
            }).extend([new FullScreen(), new ScaleLine()])
        } as any);

        this.resize();
    }

    @HostListener('window:resize')
    resize() {
        this.map.updateSize();
    }

    ISOTime(time, unit) {
        let endDate;
        let startDate = parse(unit + ' GMT+0')
        // const timeZones = listTimeZones()
        // const date = parseFromTimeZone('1982-01-01', { timeZone: 'Africa/Abidjan' })
        if(_.startsWith(unit, 'days since')) {
            let deltaYears = time/365;
            let deltaDays = time;
            if(deltaYears%1 === 0)
                endDate = addYears(startDate, deltaYears)
            else
                endDate = addDays(startDate, deltaDays)
        }
        else if(_.startsWith('hours since')) {
            let deltaHours = time;
            endDate = addHours(startDate, deltaHours)
        }
        return endDate.toISOString();
    }
}
