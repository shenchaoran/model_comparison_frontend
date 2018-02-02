import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { MockService } from "../../mock/mock.service";
import { Model } from "../../mock/model.model";

const MockTags = ['All', 'Carbon', 'Nature', 'Math', 'Etc'];

@Component({
  selector: 'ogms-cmp-issue-list',
  templateUrl: './cmp-issue-list.component.html',
  styleUrls: ['./cmp-issue-list.component.scss']
})
export class CmpIssueListComponent implements OnInit {
  models: Model[];

  public tags = MockTags;
  public selectedTags = []; 
  searchOptions = [
    { value: 'OpenGMS', label: 'OpenGMS' },
    { value: 'ZhongShan', label: 'ZhongShan' },
    { value: 'Other', label: 'Other' }
  ];
  selectedMultipleOption = [this.searchOptions[ 0 ] ];

  constructor(
    private mockService: MockService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.models = mockService.getModels();
  }

  ngOnInit() {
  }

  goToDetail() {
    this.router.navigate([`${this.models[0].modelId}`], {
      relativeTo: this.route
    })
  }

  handleChange(checked: boolean, tag: string): void {
    if(checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
  }

}
