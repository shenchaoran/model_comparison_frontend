import { Component, OnInit } from '@angular/core';
import { CmpMethodService } from '../../services/cmp-method.service';

@Component({
    selector: 'ogms-method-list',
    templateUrl: './method-list.component.html',
    styleUrls: ['./method-list.component.scss']
})
export class MethodListComponent implements OnInit {
    _loading: boolean = true;
    list;
    count;

    constructor(
        public service: CmpMethodService
    ) { }

    ngOnInit() {
        this.service.findAll({}).subscribe(response => {
            this._loading = false
            if (!response.error) {
                this.list = response.data.docs;
                this.count = response.data.count;
            }
        });
    }

    onPageChange(e) {
        this.service.findAll(e).subscribe(res => {
            if(!res.error) {
                this.list = res.data.docs;
                this.count = res.data.count;
            }
        });
    }
}
