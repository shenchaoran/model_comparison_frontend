import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ogms-contour-map-result',
    templateUrl: './contour-map-result.component.html',
    styleUrls: ['./contour-map-result.component.scss']
})
export class ContourMapResultComponent implements OnInit {
    _v;
    _imgSrcs;
    @Input() 
    set data(v) {
        this._v = v;
        this.regions = new Array(this.data.regionLength).fill(0).map((v, i) => `R${i+1}`);
        this._imgSrcs = this.regions.map((region, i) => `/api/images/plots/${this.data.imgPrefix}-${this.data.timeLabels[this.selectedTime-1]}-${region}.png`)
    }
    get data() {return this._v;}
    selectedTime = 1;
    showAnimation = false;
    regions = [];
    timer;
    get imgSrcs() { return this._imgSrcs; }
    updateImgSrcs() { 
        this._imgSrcs = this.regions.map((region, i) => {
            if(this.showAnimation)
                return `/api/images/plots/${this.data.imgPrefix}-${region}.gif`
            else 
                return `/api/images/plots/${this.data.imgPrefix}-${this.data.timeLabels[this.selectedTime-1]}-${region}.png`
        })
    }

    constructor() { }

    ngOnInit() {
    }

    onShowAnimationChange() {
        this.updateImgSrcs()
        // this.showAnimation = !this.showAnimation
        // if(this.showAnimation) {
        //     this.timer = setInterval(() => {
        //         this.selectedTime += 1;
        //         this.selectedTime %= this.data.timeLabels.length + 1;
        //     }, 1000);
        // }
        // else {
        //     clearInterval(this.timer);
        // }
    }

}
