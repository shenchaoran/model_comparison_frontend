import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ResourceSrc } from '@models';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ogms-create-doc',
    templateUrl: './create-doc.component.html',
    styleUrls: ['./create-doc.component.scss']
})
export class CreateDocComponent implements OnInit {
    @Input() title: string;
    @Input() headerMeta: string;
    @Input() submitText: string;
    @Output() onSubmit = new EventEmitter<any>();
    docFG: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.docFG = this.fb.group({
            name: ['', [Validators.required,]],
            desc: ['', [Validators.required,]],
            auth: [ResourceSrc.PUBLIC, [Validators.required,]]
        });
    }

    ngOnInit() {}

    onSubmitClick() {
        this.onSubmit.emit(this.docFG.value);
    }
}
