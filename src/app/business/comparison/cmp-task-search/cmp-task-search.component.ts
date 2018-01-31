import { Component, OnInit } from '@angular/core';
import { MockService } from "../../mock/mock.service";
import { Solution } from "../../mock/solution.model";

const MockTags = ['All', 'Carbon', 'Nature', 'Math', 'Etc'];
@Component({
  selector: 'ogms-cmp-task-search',
  templateUrl: './cmp-task-search.component.html',
  styleUrls: ['./cmp-task-search.component.scss']
})
export class CmpTaskSearchComponent implements OnInit {
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
