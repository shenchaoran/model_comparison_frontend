import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'ba-title-top',
	templateUrl: './baTitleTop.component.html',
	styleUrls: ['./baTitleTop.component.scss']
})
export class BaTitleTop {
	@Input() title: string;
	public nickname: string;
	public menuDropDown: boolean = false;

	constructor(
		private router: Router,
	) { }

	ngOnInit() {
		if (this.title === undefined) {
			this.title = JSON.parse(sessionStorage.getItem('appMetaInfo')).name;
		}
		this.nickname = JSON.parse(sessionStorage.getItem('authInfo')).nickname;
	}
	showUserOperation($event) {
		this.menuDropDown = !this.menuDropDown;
		jQuery($event.currentTarget).toggleClass('user-info-active');
		jQuery('.user-operation').slideToggle(300);
	}

	logout() {
		sessionStorage.clear();
		this.router.navigate(["./login"]);
	}
	
}
