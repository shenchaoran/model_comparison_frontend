import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var ol: any;
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'ogms-geo-data',
    templateUrl: './geo-data.component.html',
    styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {
    _modalType;
    _isVisible = false;

    stdList: any[];
    stdCount: number;

    selectedSTD: any;

    previewCfg = {
        method: 'map',
        lat: '',
        long: '',
        row: '',
        col: '',
        geojson: {}
    };
    downloadCfg = {
        method: 'map',
        startRow: '',
        startCol: '',
        startLat: '',
        startLong: '',
        endRow: '',
        endCol: '',
        endLat: '',
        endLong: '',
        geojson: {}
    };
    isPreviewBtnLoading = false;
    isDownloadBtnLoading = false;

    constructor(
        private service: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.service.findAll()
            .subscribe(response => {
                if (!response.error) {
                    this.stdList = response.data.docs;
                    this.stdCount = response.data.count;

                    if (this.stdCount > 0) {
                        this.selectedSTD = this.stdList[0];
                    }
                }
            });
    }

    select(std) {
        this.selectedSTD = std;
    }

    onDrawFinished(e, type) {
        const geometry = e.feature.getGeometry();
        let geojson;
        if(geometry) {
            geojson = new ol.format.GeoJSON().writeGeometryObject(geometry, {
                dataProjection: 'EPSG:3857'
            });
        }
        if(type === 'download') {
            this._modalType = 'download';
            this.previewCfg.geojson = geojson;
        }
        else if(type === 'preview') {
            this._modalType = 'preview';
            this.downloadCfg.geojson = geojson;
        }
        console.log(geojson);
    }

    preview() {
        this.isPreviewBtnLoading = true;
        this.service.preview(this.selectedSTD._id, {
            cfg: this.previewCfg
        })
            .subscribe(response => {
                if (!response.error) {

                    this._isVisible = true;
                }
                this.isPreviewBtnLoading = false;
            });

    }

    onPreviewMethodChange() {
        if(this.previewCfg.method === 'map') {

        }
    }

    download() {
        this.isDownloadBtnLoading = true;
        this.service.download(this.selectedSTD._id, {
            cfg: this.downloadCfg
        })
            .subscribe(response => {
                if(!response.error) {}
                this.isDownloadBtnLoading = false;
            });
    }

    handleCancel() {
        this._isVisible = false;
    }

    handleOk() {
        this._isVisible = false;

    }
}
