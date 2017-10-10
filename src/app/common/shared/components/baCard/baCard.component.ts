import { Component, Input } from '@angular/core';

@Component({
	selector: 'ba-card',
	templateUrl: './baCard.component.html',
    styleUrls: ['./baCard.component.scss'],
})
export class BaCard {
	@Input() title: String;
	@Input() baCardClass: String;
	@Input() cardType: String;

	isFullScreen: boolean = false;

	private toggleFullScreen(): void {
		this.isFullScreen = !this.isFullScreen;

		if(this.isFullScreen){
			jQuery('.card').addClass('full-screen');
		} else {
			jQuery('.card').removeClass('full-screen');
		}
		
		// this._renderer.setElementClass(this._ele.nativeElement.children[0], 'full-screen', this.isFullScreen);
		// this._renderer.setElementClass(this._ele.nativeElement.children[0].children[1], 'background', this.isFullScreen);

		// let btnFunc = {
		// 	'fullScreen': this.isFullScreen
		// };
		// this.getBtnFunc.emit(btnFunc);
	}
}
