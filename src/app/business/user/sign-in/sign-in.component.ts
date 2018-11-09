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
import { get } from 'lodash';
import { UserService } from '../../services';

@Component({
    selector: 'ogms-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signInFG: FormGroup;
    hide = true;
    isPending = false;
    errorInfo: {
        show: boolean,
        message?: string
    } = {
        show: false
    };

    constructor(
        private fb: FormBuilder,
        private service: UserService
    ) { }

    ngOnInit() {
        this.service.signOut();
        this.signInFG = this.fb.group({
            username: [get(this.service, 'jwt.user.username'), [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberAccount: [get(this.service, 'jwt.user.rememberAccount')]
        });
    }

    onSubmit() {
        this.isPending = true;
        this.errorInfo = {show: false};
        this.service.signIn(this.signInFG.value)
            .subscribe({
                next: res => {
                    this.isPending = false;
                    if(res.error) {
                        this.errorInfo = {
                            show: true,
                            message: res.error.desc
                        };
                    }
                },
                error: e => {
                    console.log(e);
                }
            });
    }
}
