import { Component, OnInit } from '@angular/core';
const MockTags = ['All', 'Carbon', 'Nature', 'Math', 'Etc'];

@Component({
    selector: 'ogms-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {
    public tags = MockTags;
    public selectedTags = [];
    searchOptions = [
        { value: 'OpenGMS', label: 'OpenGMS' },
        { value: 'ZhongShan', label: 'ZhongShan' },
        { value: 'Other', label: 'Other' }
    ];
    selectedMultipleOption = [this.searchOptions[0]];

    constructor() {}

    ngOnInit() {
        setTimeout(_ => {
            this.selectedMultipleOption = [];
        }, 2000);
    }

    handleChange(checked: boolean, tag: string): void {
        if (checked) {
            this.selectedTags.push(tag);
        } else {
            this.selectedTags = this.selectedTags.filter(t => t !== tag);
        }
    }
}
