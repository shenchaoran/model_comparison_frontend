import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    Validators,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { UserService } from '../../services';

@Component({
    selector: 'ogms-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpFG: FormGroup;
    hide = true;
    hideRepeat = true;
    errorInfo: {
        show: boolean,
        message?: string
    } = {
            show: false
        };

    constructor(
        private fb: FormBuilder,
        private service: UserService
    ) {}

    ngOnInit() {
        this.signUpFG = this.fb.group({
            username: [_.get(this.service, 'jwt.user.username'), [Validators.required, Validators.minLength(4)]],
            email: [_.get(this.service, 'jwt.user.email'), [Validators.required, Validators.email]],
            password: this.fb.group(
                {
                    value: ['', [Validators.required, Validators.minLength(6)]],
                    repeat: ['', [Validators.required, Validators.minLength(6)]]
                },
                {
                    validator: this.equalValidator
                }
            )
        });
    }

    onSubmit() {
        this.errorInfo = { show: false };
        var signUpData = this.signUpFG.value;
        signUpData.password = this.signUpFG.get('password').get('value').value;
        this.service.signUp(signUpData)
            .subscribe({
                next: res => {
                    if (res.error) {
                        this.errorInfo = {
                            show: true,
                            message: res.error.desc
                        };
                    }
                },
                error: e => {
                    console.log(e);
                }
            })
    }

    equalValidator(ctrl) {
        // console.log('this in customer-validator: ', this)
        if (ctrl.value.value === ctrl.value.repeat) {
            return null;
        }
        else {
            return {
                passwordEqual: true
            };
        }
    }

    // TODO async validator and customized validaotr
}
