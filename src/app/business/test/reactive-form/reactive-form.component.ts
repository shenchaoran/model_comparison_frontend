import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'ogms-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

    validateForm: FormGroup;
    submitForm = ($event, value) => {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        // console.log(value);
        console.log(this.validateForm.controls["obj"]);
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }

    validateConfirmPassword(): void {
        setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
    }

    userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            if (control.value === 'JasonWood') {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 1000);
    })

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

    constructor(private fb: FormBuilder) {
        this.validateForm = this.fb.group({
            userName: ['scr', [Validators.required], [this.userNameAsyncValidator]],
            email: ['', [Validators.email]],
            password: ['', [Validators.required]],
            confirm: ['', [this.confirmValidator]],
            comment: ['', [Validators.required]],
            obj: this.fb.group({
                prop1: ['prop1',[Validators.required]],
                prop2: ['prop2',[Validators.required]],
                nested: [{
                    a:1,
                    b:2
                }]
            }),
            array: this.fb.array([
                this.fb.group({
                    prop1: ['', [Validators.required]],
                    prop2: ['', [Validators.required]]
                }),
                this.fb.group({
                    prop1: ['', [Validators.required]],
                    prop2: ['', [Validators.required]]
                }),
            ])
        });
        // console.log(this.validateForm.get["obj"]);
        console.log(this.validateForm.controls["obj"]);
        // console.log(this.validateForm.get["userName"]);
    }

    ngOnInit() {

    }

}
