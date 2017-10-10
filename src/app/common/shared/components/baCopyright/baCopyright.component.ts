import { Component, Input } from '@angular/core';

@Component({
	selector: 'ba-copyright',
	templateUrl: './baCopyright.component.html',
	styleUrls: ['./baCopyright.component.scss']
})
export class BaCopyright {
	@Input() year: string;
	@Input() company: string;

	ngOnInit() {
		
	}

}
