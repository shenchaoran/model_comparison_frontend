import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmpMethodService } from '@services/cmp-method.service';
import { CmpMethod } from '@models';

@Component({
  selector: 'ogms-masonry-methods-list',
  templateUrl: './masonry-methods-list.component.html',
  styleUrls: ['./masonry-methods-list.component.scss']
})
export class MasonryMethodsListComponent implements OnInit {
    _loading: boolean = true;
    _withAjax: boolean = true;
    list: CmpMethod[];
    count;
    @Input() 
    set methods(v: CmpMethod[]) {
        this.list = v;
        this._withAjax = false;
    }
    @Input() mode: 'WRITE' | 'READ' = 'READ';
    @Output() valueChange = new EventEmitter<{
        value?: any,
        valid: boolean,
    }>();

    constructor(
        public service: CmpMethodService
    ) { }

    ngOnInit() {
        if(this._withAjax) {
            this.service.findAll().subscribe(res => {
                this._loading = false
                if (!res.error) {
                    this.list = res.data.docs;
                    this.count = res.data.count;
                }
            });
        }
    }

    onMethodChecked(msg, method) {
        method.checked = msg.checked;
        let selected = _.filter(this.list, method => !!method.checked);
        if(selected && selected.length) {
            this.valueChange.emit({
                valid: true,
                value: selected
            });
        }
        else {
            this.valueChange.emit({
                valid: false
            });
        }
    }
}
