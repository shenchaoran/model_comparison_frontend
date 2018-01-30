import { Component, OnInit } from '@angular/core';

import { MockService } from "../../mock/mock.service";
import { Solution } from "../../mock/solution.model";

const MockTags = ['All', 'Carbon', 'Nature', 'Math', 'Etc'];

@Component({
  selector: 'ogms-show-cmp-solution-search',
  templateUrl: './show-cmp-solution-search.component.html',
  styleUrls: ['./show-cmp-solution-search.component.scss']
})
export class ShowCmpSolutionSearchComponent implements OnInit {
  public solutions: Solution[];
  public tags = MockTags;
  public selectedTags = []; 
  searchOptions = [
    { value: 'OpenGMS', label: 'OpenGMS' },
    { value: 'ZhongShan', label: 'ZhongShan' },
    { value: 'Other', label: 'Other' }
  ];
  selectedMultipleOption = [this.searchOptions[ 0 ] ];

  constructor(private mockService: MockService) { 
    this.solutions = mockService.getSolutions();
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
