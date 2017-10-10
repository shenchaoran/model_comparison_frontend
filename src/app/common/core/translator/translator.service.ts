import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslatorService {
    private _langs = ['en-US', 'zh-CN'];
	private _default: string = 'en-US';
	
	constructor(private translate: TranslateService) {
		translate.addLangs(this._langs);
		translate.setDefaultLang(translate.getBrowserCultureLang() || this._default);
    }
	
	use(lang: string = null) {
		this.translate.use(lang || this.translate.getDefaultLang());
	}

	get langs() {
		return this._langs;
	}
}