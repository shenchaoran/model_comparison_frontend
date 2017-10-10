import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class Login {
	form: FormGroup;
	account: AbstractControl;
	password: AbstractControl;
	remembered: boolean = false;
	submitted: boolean = false;
	loginErrorInfo: string;

	constructor(
		fb: FormBuilder,
		private route: ActivatedRoute,
		private loginService: LoginService
	) {
		this.form = fb.group({
			account: [
				'System',
				Validators.compose([Validators.required, Validators.minLength(4)])
			],
			password: [
				'123456',
				Validators.compose([Validators.required, Validators.minLength(4)])
			]
		});

		this.account = this.form.controls['account'];
		this.password = this.form.controls['password'];

		if (localStorage.getItem('account')) {
			this.account.setValue(localStorage.getItem('account'));
		}
	}

	public rememberAccount(): void {
		this.remembered = !this.remembered;

		if (this.remembered) {
			localStorage.setItem('account', this.account.value);
		} else {
			localStorage.removeItem('account');
		}
	}

	public onSubmit(values: Object): void {
		this.submitted = true;
		if (this.form.valid) {
			// setTimeout(()=>{
			this.loginService
				.verifyLogin(this.account.value, this.password.value)
				.subscribe({
					next: errorInfo => {
						this.loginErrorInfo = errorInfo;
						this.submitted = false;
					}
				});
			// }, 100000)

		}
	}
}
