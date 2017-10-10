import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
	selector: 'ba-page-top',
	templateUrl: './baPageTop.component.html',
	styleUrls: ['./baPageTop.component.scss']
})
export class BaPageTop {
	public nickname: string;
	//todo: 判断下拉是否打开的
	public menuDropDown: boolean = false;

	constructor(
		private router: Router,
	) { }

	ngOnInit() {
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
