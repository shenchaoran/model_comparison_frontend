import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
import * as uuidv1 from 'uuid/v1';
import { OgmsBaseComponent } from '@common/shared';

@Component({
    selector: 'ogms-handsome-table',
    templateUrl: './handsome-table.component.html',
    styleUrls: ['./handsome-table.component.scss']
})
export class HandsomeTableComponent extends OgmsBaseComponent implements OnInit, AfterViewInit {
    uuid;
    @Input() matrix;
    @Input() width = '650px';
    @Input() height = '400px';
    _style = {
        width: this.width,
        height: this.height
    };

    constructor() { 
        super();
        this.uuid = uuidv1();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // var data = [
        //     ["", "Ford", "Tesla", "Toyota", "Honda"],
        //     ["2017", 10, 11, 12, 13],
        //     ["2018", 20, 11, 14, 13],
        //     ["2019", 30, 15, 12, 13]
        // ];
        if(!this.matrix) {
            return;
        }
        setTimeout(() => {
            new Handsontable($(`#${this.uuid}`)[0], {
                data: this.matrix
            });
        }, 0);
    }

}
