import { OgmsBaseComponent } from './../../../../common/shared/components/ogms-base/ogms-base.component';
import { TaskService } from '@services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ogms-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent extends OgmsBaseComponent implements OnInit {

  results:any[];
  result_type="comparison";
  constructor(
    private service:TaskService,
  ) { 
    super();
  }

  ngOnInit() {
    //* 获取的所有 task 的数据 -->并不是该用户的数据
    this._subscriptions.push(this.service.findAll({})
      .subscribe(response => {
          if (response.error) {
              return Promise.reject(response.error);
          } else {
              this.results = response.data.docs;
          }
      }));
  }

}
