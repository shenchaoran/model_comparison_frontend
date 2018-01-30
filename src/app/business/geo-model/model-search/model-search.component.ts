import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";

const MockTags = ['All', 'Carbon', 'Nature', 'Math', 'Etc'];

@Component({
  selector: 'ogms-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.scss']
})
export class ModelSearchComponent implements OnInit {
  public models:Model[];
  public tags = MockTags;
  public selectedTags = []; 
  searchOptions = [
    { value: 'OpenGMS', label: 'OpenGMS' },
    { value: 'ZhongShan', label: 'ZhongShan' },
    { value: 'Other', label: 'Other' }
  ];
  selectedMultipleOption = [this.searchOptions[ 0 ] ];

  constructor(private mockService: MockService) { 
    this.models = mockService.getModels();
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
