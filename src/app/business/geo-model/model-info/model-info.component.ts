import { Component, OnInit, HostListener } from "@angular/core";
import { MSService } from "../services";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from "@core/services/dynamic-title.service";

@Component({
    selector: "ogms-model-info",
    templateUrl: "./model-info.component.html",
    styleUrls: ["./model-info.component.scss"]
})
export class ModelInfoComponent implements OnInit {
    modelId: string;
    model: any;
    solutions: any[];

    _isLoading = true;

    _allChecked = false;
    _disabledButton = true;
    _checkedNumber = 0;
    _displayData: Array<any> = [];
    _operating = false;
    _dataSet = [];
    _indeterminate = false;

    constructor(
        private service: MSService,
        private route: ActivatedRoute,
        private _notice: NzNotificationService,
        private title: DynamicTitleService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
          this.modelId = params['id'];
          this.service.findOne(this.modelId)
            .subscribe(response => {
              if(response.error) {
                this._notice.warning('Warning:', 'Get model failed');
              }
              else {
                this.model = response.data;
                this.title.setTitle(this.model.MDL.meta.name);
              }
            })
        });

        this._isLoading = false;

        //temp mock
        for (let i = 0; i < 46; i++) {
            this._dataSet.push({
                key: i,
                name: `NPP ${i}`,
                unit: "km/s",
                desc: `This is very detail description. ${i}`
            });
        }
    }

    _displayDataChange($event) {
        this._displayData = $event;
    }

    _refreshStatus() {
        const allChecked = this._displayData.every(
            value => value.checked === true
        );
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = !allChecked && !allUnChecked;
        this._disabledButton = !this._dataSet.some(value => value.checked);
        this._checkedNumber = this._dataSet.filter(
            value => value.checked
        ).length;
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => (data.checked = true));
        } else {
            this._displayData.forEach(data => (data.checked = false));
        }
        this._refreshStatus();
    }

    _operateData() {
        this._operating = true;
        setTimeout(_ => {
            this._dataSet.forEach(value => (value.checked = false));
            this._refreshStatus();
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
