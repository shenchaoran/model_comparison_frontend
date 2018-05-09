import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "table-feature",
    templateUrl: "./table-feature.component.html",
    styleUrls: ["./table-feature.component.scss"]
})
export class TableFeatureComponent implements OnInit {
    @Input() dataset: any;

    _allChecked = false;
    _disabledButton = true;
    _checkedNumber = 0;
    _displayData: Array<any> = [];
    _operating = false;
    _indeterminate = false;

    constructor() {}

    ngOnInit() {
      console.log(this.dataset);
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
        this._disabledButton = dataset?!dataset.some(value => value.checked):false;
        this._checkedNumber = dataset.filter(value => value.checked).length;
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
}
