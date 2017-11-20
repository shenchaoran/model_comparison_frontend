import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

import { LoginService } from './login.service';
import { ErrorHandle } from '../../core/base/error-handle';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class Login extends ErrorHandle {
	form: FormGroup;
	username: AbstractControl;
	password: AbstractControl;
	remembered: boolean = false;
	submitted: boolean = false;
	loginErrorInfo: string;

	constructor(
		fb: FormBuilder,
		private route: ActivatedRoute,
		private loginService: LoginService,
        private _notification: NzNotificationService
	) {
        super();
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
        this.loginErrorInfo = undefined;
		if (this.form.valid) {
			this.loginService
				.postLogin(this.username.value, this.password.value)
				.subscribe({
					next: err => {
                        if(err) {
                            this._notification.create(
                                'warning',
                                'Warning:',
                                'login failed, please retry later!'
                            );
                            // this.loginErrorInfo = JSON.stringify(err);
                            this.loginErrorInfo = 'login failed, please retry later!';
						    this.submitted = false;
                        }
                    },
                    error: err => {
                        this._notification.create(
                            'warning',
                            'Warning:',
                            'login failed, please retry later!'
                        );
                        this.handleError(err)
                    }
				});

		}
	}
}
