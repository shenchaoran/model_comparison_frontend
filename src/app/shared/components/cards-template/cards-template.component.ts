import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListTemplateComponent } from '@shared/components/list-template/list-template.component';
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ActivatedRoute } from "@angular/router";
import { OgmsBaseComponent } from '@shared/components/ogms-base/ogms-base.component';

@Component({
    selector: 'ogms-cards-template',
    templateUrl: './cards-template.component.html',
    styleUrls: ['./cards-template.component.scss']
})
export class CardsTemplateComponent extends OgmsBaseComponent implements OnInit {
    _loading = true;
    @Input() list: any[];
    @Input() count: number;
    @Input() template: any;
    @Input() pageSize: number;
    @Input() pageIndex: number;
    @Output() onPageChange = new EventEmitter<{
        pageIndex: number,
        pageSize: number
    }>();

    constructor(
        public route: ActivatedRoute,
        public title: DynamicTitleService
    ) { 
        super()
    }

    ngOnInit() {
        
    }
}
