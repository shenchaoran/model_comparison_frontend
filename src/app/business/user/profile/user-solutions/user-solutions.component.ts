import { Solution } from './../../../models/solution.class';
import { OgmsBaseComponent } from './../../../../common/shared/components/ogms-base/ogms-base.component';
import { SolutionService } from './../../../services/sln.service';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'ogms-user-solutions',
  templateUrl: './user-solutions.component.html',
  styleUrls: ['./user-solutions.component.scss']
})
export class UserSolutionsComponent extends OgmsBaseComponent implements OnInit {
  slns:any[];
  get slnList(): Solution[] {
    return this.service.solutionList;
  }

  constructor(
    private service: SolutionService,
  ) { 
    super();
  }

  ngOnInit() {
    //* 并不是该用户的数据  获取的所有 solutions 的数据 
    // this._subscriptions.push(this.service.findAll({})
    //   .subscribe(response => {
    //       if (response.error) {
    //           return Promise.reject(response.error);
    //       } else {
    //           this.slns = response.data.docs;
    //       }
    //   }));
  }

}
