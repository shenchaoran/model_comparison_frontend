import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Data } from "../../mock/data.model";

const MockTags = ['All', 'Asia', 'America', 'Africa', 'Australia'];

@Component({
  selector: 'ogms-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss']
})
export class DataSearchComponent implements OnInit {
  public datas: Data[];
  public tags = MockTags;
  public selectedTags = [];
  searchOptions = [
    { value: 'OpenGMS', label: 'OpenGMS' },
    { value: 'ZhongShan', label: 'ZhongShan' },
    { value: 'Other', label: 'Other' }
  ];
  selectedMultipleOption = [this.searchOptions[ 0 ] ];

  constructor(private mockService: MockService) { 
    this.datas = mockService.getDatas();
  }

  ngOnInit() {
    setTimeout(_ => {
      this.selectedMultipleOption = [];
    }, 2000)
  }

  handleChange(checked: boolean, tag: string): void {
    if(checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
  }

}
