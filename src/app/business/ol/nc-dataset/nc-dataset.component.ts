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
        let timeUnit = _.get(this, 'timeVariable.unit')
        if(timeUnit) 
            return this.ISOTime(this.selectedTime, timeUnit); 
        else 
            return null;
    }
    get selectedDateStr() { return format(this.selectedDate, 'YYYY-MM-DD hh:mm'); }
    @Input() 
    set dataset(v: STDData) {
        this._v = v;
        this.variables = _.chain(v)
            .get('schema.variables')
            .filter(variable => !!variable.layerId)
            .value();
        this.dimensions = _.chain(v)
            .get('schema.dimensions')
            .value();
        this.selectedVariable = _.first(this.variables);
        let variables = _.get(v, 'schema.variables'),
            latVariable = _.find(variables, variable => variable.name === 'lat'),
            longVariable = _.find(variables, variable => variable.name === 'long');
        this.timeVariable = _.find(variables, variable => variable.name === 'time');

        this.spatialResolution = `${latVariable.step} ° * ${longVariable.step} °`;

        let startTime = _.get(this, 'timeVariable.start')
        this.selectedTime = startTime;
        let timeUnit = _.get(this, 'timeVariable.unit'),
            timeStep = _.get(this, 'timeVariable.step');
        if(startTime) {
            this.startTime = this.ISOTime(_.get(this, 'timeVariable.start'), timeUnit)
            this.endTime = this.ISOTime(_.get(this, 'timeVariable.end'), timeUnit)
        }
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
                this.selectedTime += this.timeVariable.step;
                if(this.selectedTime> this.timeVariable.end) {
                    this.selectedTime = this.timeVariable.start;
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
    }

    buildMap() {
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
                // request : 'GetMap',
                // service : 'WMS',
                // version : '1.1.0',
                layers: this.selectedVariable.layerId,
                styles: '',
                bbox: this.layers.bbox,
                time: this.selectedDate,
                // 加长宽会变形
                // width : '768',
                // height : '330',
                srs: 'EPSG:4326'
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
