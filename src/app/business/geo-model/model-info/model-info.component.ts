import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";
import { Data } from "../../mock/data.model";
import { Solution } from "../../mock/solution.model";
import { Task } from "../../mock/task.model";

@Component({
  selector: 'ogms-model-info',
  templateUrl: './model-info.component.html',
  styleUrls: ['./model-info.component.scss']
})
export class ModelInfoComponent implements OnInit {
  _isLoading = true;

  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _dataSet = [];
  _indeterminate = false;

  model: Model;
  models: Model[];
  datas: Data[];
  solutions: Solution[];
  tasks: Task[];

  constructor(
    private mockService: MockService,
    private route: ActivatedRoute
  ) { 
    this.models = mockService.getModels();
    this.model = this.models[1];
    this.datas = mockService.getDatas();
    this.solutions = mockService.getSolutions();
    this.tasks = mockService.getTask();
  }

  ngOnInit() {
    this._isLoading = false;

    this.route.params
      .subscribe((params: Params) => {

      });

    //temp mock
    for (let i = 0; i < 46; i++) {
      this._dataSet.push({
        key    : i,
        name   : `NPP ${i}`,
        unit    : 'km/s',
        desc: `This is very detail description. ${i}`,
      });
    }
  }

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  @HostListener('scroll')
  onScroll(event: any) {
      // console.log('onScroll');
      // const scrollH = Math.max(
      //     window.pageYOffset,
      //     window.scrollY,
      //     document.documentElement.scrollTop,
      //     document.body.scrollTop
      // );
      const scrollH = jQuery('#root-container')[0].scrollTop;
      const h = jQuery('#separator')[0].offsetTop - scrollH;
      console.log(h);
      if (h < -50) {
          jQuery('.side-catalog').css('visibility', 'visible');
      } else {
          jQuery('.side-catalog').css('visibility', 'hidden');
      }
  }
}
