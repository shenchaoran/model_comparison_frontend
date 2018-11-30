import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { CmpMethodService } from '../../services/cmp-method.service';
import { OgmsBaseComponent } from '@shared'
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import * as simplemed from 'simplemde';

@Component({
    selector: 'ogms-method-detail',
    templateUrl: './method-detail.component.html',
    styleUrls: ['./method-detail.component.scss']
})
export class MethodDetailComponent extends OgmsBaseComponent implements OnInit, AfterViewInit {
    method;
    @ViewChild('div') div: ElementRef;
    constructor(
        public route: ActivatedRoute,
        public cmpMethodService: CmpMethodService,
        public title: DynamicTitleService,
        private renderer2: Renderer2
    ) {
        super()
    }

    ngOnInit() {
        this.cmpMethodService.findOne(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if(!res.error) {
                this.method = res.data;
                let html = (simplemed as any).markdown(this.method.meta.wikiMD);
                // let converter = new showdown.Converter();
                // let html = converter.makeHtml(this.method.md);
                this.renderer2.setProperty(this.div.nativeElement, 'innerHTML', html)
            }
        });
    }

    ngAfterViewInit() {
    }
}