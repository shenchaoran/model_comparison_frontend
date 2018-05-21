import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListBaseService } from '../../services';
import { ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { Observable } from 'rxjs/Observable';

/**
 * doc 详情页的基类，能够处理数据请求
 * 
 * @export
 * @class DocBaseComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'ogms-doc-base',
    templateUrl: './doc-base.component.html',
    styleUrls: ['./doc-base.component.scss']
})
export class DocBaseComponent implements OnInit, OnDestroy {
    protected _isLoading = true;
    protected doc: Observable<any>;
    protected _subscriptions = [];

    constructor(
        protected route: ActivatedRoute,
        protected service: ListBaseService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { }

    ngOnInit() {
        this.doc = Observable.create(observer => {
            this._subscriptions.push(this.route.params.subscribe((params: Params) => {
                const docId = params['id'];
                this.service.findOne(docId)
                    .subscribe(response => {
                        if (!response.error) {
                            this._isLoading = false;
                            observer.next(response.data);
                            observer.complete();
                        }
                    });
            }));
        });
        this._isLoading = true;
    }

    ngOnDestroy() {
        _.map(this._subscriptions, subscription => {
            subscription.unsubscribe();
        });
    }
}
