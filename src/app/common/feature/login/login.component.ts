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
	username: AbstractControl;
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
			username: [
				'Admin',
				Validators.compose([Validators.required, Validators.minLength(4)])
			],
			password: [
				'123456',
				Validators.compose([Validators.required, Validators.minLength(4)])
			]
		});

		this.username = this.form.controls['username'];
		this.password = this.form.controls['password'];

		if (localStorage.getItem('username')) {
			this.username.setValue(localStorage.getItem('username'));
		}
	}

	public rememberAccount(): void {
		this.remembered = !this.remembered;

		if (this.remembered) {
			localStorage.setItem('username', this.username.value);
		} else {
			localStorage.removeItem('username');
		}
	}

	public onSubmit(values: Object): void {
		this.submitted = true;
		if (this.form.valid) {
			this.loginService
				.postLogin(this.username.value, this.password.value)
				.subscribe({
					next: errorInfo => {
						this.loginErrorInfo = errorInfo;
						this.submitted = false;
					}
				});

		}
	}
}
