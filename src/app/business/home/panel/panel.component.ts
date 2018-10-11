import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'ogms-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
    @Input() title: {
        label: string,
        url: string
    }
    @Input() template: any;
    @Input() list: {
        count: number,
        docs: any[]
    };
    @Input() set gutter(v: number) {
        this.listItemStyle.padding = `0 ${v/2}px`;
    };
    listItemStyle: any = {
        padding: '0 15px'
    };

    constructor() { }

    ngOnInit() {
    }

}
