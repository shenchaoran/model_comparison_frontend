import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ogms-cmp-tags-view',
    templateUrl: './cmp-tags-view.component.html',
    styleUrls: ['./cmp-tags-view.component.scss']
})
export class CmpTagsViewComponent implements OnInit {

    @Input() tabTemplates: {
        splitOrder: number,
        tabOrder: number,
        bodyTemplate: any,
        headerTemplate: any
    }[];

    @Output() onChange = new EventEmitter<any>();
    @Output() onAddTab = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

}
