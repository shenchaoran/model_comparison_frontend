import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'color-scale',
	templateUrl: './colorScale.component.html',
    styleUrls: ['./colorScale.component.scss'],
})
export class ColorScale implements OnInit {
	@Input() imgs:any;

	constructor() {
		
	}

	ngOnInit() {
	}

}