import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    forwardRef,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { BACKEND } from '@config';

@Component({
    selector: 'ogms-calcu-result',
    templateUrl: './calcu-result.component.html',
    styleUrls: ['./calcu-result.component.scss']
})
export class CalcuResultComponent implements OnInit {
    @Input() set msr(v) {
        this.msrId = v._id
        this.IO = v.IO
        this.std = v.std
    }

    width = '350px';
    IO
    std
    msrId

    constructor() { }

    ngOnInit() {

    }

    download(event) {
        let url = `http://${BACKEND.host}:${BACKEND.port}${BACKEND.API_prefix}/data/download?msrId=${this.msrId}&eventId=${event.id}`
        window.open(url)
    }
}
