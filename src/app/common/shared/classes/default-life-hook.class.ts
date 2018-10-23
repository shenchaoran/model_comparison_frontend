import {
    OnInit,
    DoCheck,
    OnDestroy,
    OnChanges,
    AfterViewInit,
    AfterViewChecked,
    AfterContentInit,
    AfterContentChecked,
} from '@angular/core'

export class DefaultLifeHook implements OnDestroy {
    constructor(public _service: any) {}
    
    ngOnDestroy() {
        this._service.clear();
    }
}
