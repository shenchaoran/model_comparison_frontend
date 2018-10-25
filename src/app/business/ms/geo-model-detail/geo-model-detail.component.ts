import { Component, OnInit, HostListener } from "@angular/core";
import { MSService } from "../../services/ms.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DocBaseComponent } from '@common/shared';

@Component({
    selector: 'ogms-geo-model-detail',
    templateUrl: './geo-model-detail.component.html',
    styleUrls: ['./geo-model-detail.component.scss']
})
export class GeoModelDetailComponent extends DocBaseComponent implements OnInit {
    model: any;
    solutions: any[];

    _isLoading = true;

    _allChecked = false;
    _disabledButton = true;
    _checkedNumber = 0;
    _displayData: Array<any> = [];
    _operating = false;
    _ioDataset = [];
    _paramsDataSet = [];
    _indeterminate = false;

    constructor(
        public route: ActivatedRoute,
        public solutionService: MSService,
//private _notice: NzNotificationService,
        public title: DynamicTitleService
    ) {
        super(route, solutionService, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this._subscriptions.push(this.doc.subscribe(doc => {
            this.model = doc;
            this.title.setTitle(this.model.MDL.meta.name);

            const schemaStructure = _.get(this.model, 'MDL.IO.schemas[0].structure');
            if (schemaStructure) {
                //add io table dataset
                for (let i = 0; i < schemaStructure.length; i++) {
                    this._ioDataset.push(schemaStructure[i]);
                }
            }
            const params = _.get(this.model, 'MDL.params');
            if (params) {
                for (let i = 0; i < params.length; i++) {
                    this._paramsDataSet.push(params[i]);
                }
            }
        }));
    }

    _displayDataChange($event) {
        this._displayData = $event;
    }

    _refreshStatus(dataset) {
        const allChecked = this._displayData.every(
            value => value.checked === true
        );
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = !allChecked && !allUnChecked;
        this._disabledButton = dataset ? !dataset.some(value => value.checked) : false;
        this._checkedNumber = dataset ? dataset.filter(
            value => value.checked
        ).length : 0;
    }

    _checkAll(value, dataset) {
        if (value) {
            this._displayData.forEach(data => (data.checked = true));
        } else {
            this._displayData.forEach(data => (data.checked = false));
        }
        this._refreshStatus(dataset);
    }

    _operateData(dataset) {
        this._operating = true;
        setTimeout(_ => {
            dataset.forEach(value => (value.checked = false));
            this._refreshStatus(dataset);
            this._operating = false;
        }, 1000);
    }

    @HostListener("scroll")
    onScroll(event: any) {
        // console.log('onScroll');
        // const scrollH = Math.max(
        //     window.pageYOffset,
        //     window.scrollY,
        //     document.documentElement.scrollTop,
        //     document.body.scrollTop
        // );
        const scrollH = jQuery("#root-container")[0].scrollTop;
        const h = jQuery("#separator")[0].offsetTop - scrollH;
        console.log(h);
        if (h < -50) {
            jQuery(".side-catalog").css("visibility", "visible");
        } else {
            jQuery(".side-catalog").css("visibility", "hidden");
        }
    }
}
