import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
    selector: 'ogms-contour-map-result',
    templateUrl: './contour-map-result.component.html',
    styleUrls: ['./contour-map-result.component.scss']
})
export class ContourMapResultComponent implements OnInit {
    _v;
    _imgSrc;
    @Input() 
    set data(v) {
        this._v = v;
        this._imgSrc = `${this.api.backend}/images/plots/${this.data.imgPrefix}-${this.data.timeLabels[this.selectedTime-1]}.png`
    }
    get data() {return this._v;}
    selectedTime = 1;
    showAnimation = false;
    get imgSrc() { return this._imgSrc; }
    updateImgSrc() { 
        if(this.showAnimation)
            this._imgSrc = `${this.api.backend}/images/plots/${this.data.imgPrefix}.gif`
        else 
            this._imgSrc = `${this.api.backend}/images/plots/${this.data.imgPrefix}-${this.data.timeLabels[this.selectedTime-1]}.png`
    }

    constructor(
        @Inject('API') private api,
    ) { }

    ngOnInit() {
    }

    onShowAnimationChange() {
        this.updateImgSrc()
    }
}
