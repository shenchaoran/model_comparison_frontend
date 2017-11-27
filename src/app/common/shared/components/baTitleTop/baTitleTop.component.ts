import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { APP_CONFIG } from '@config/app.config';

@Component({
	selector: 'ba-title-top',
	templateUrl: './baTitleTop.component.html',
	styleUrls: ['./baTitleTop.component.scss']
})
export class BaTitleTop {
	@Input() title: string;
	public username: string;
	public menuDropDown: boolean = false;

	constructor(
		private router: Router,
	) { }

	ngOnInit() {
		if (this.title === undefined) {
			this.title = APP_CONFIG.name;
		}
		this.username = JSON.parse(localStorage.getItem('jwt')).username;
	}
	showUserOperation($event) {
		this.menuDropDown = !this.menuDropDown;
		jQuery($event.currentTarget).toggleClass('user-info-active');
		jQuery('.user-operation').slideToggle(300);
	}

	logout() {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}
	
}
