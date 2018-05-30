import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ogms-biome-std-data',
    templateUrl: './biome-std-data.component.html',
    styleUrls: ['./biome-std-data.component.scss']
})
export class BiomeStdDataComponent implements OnInit {
    @Input() std;
    @Input() selectedEvent;

    constructor() { }

    ngOnInit() {
    }

}
