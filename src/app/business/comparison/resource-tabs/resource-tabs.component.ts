/**
 * 笨组件：事件和属性都由外部控制
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';

@Component({
    selector: 'ogms-resource-tabs',
    templateUrl: './resource-tabs.component.html',
    styleUrls: ['./resource-tabs.component.scss']
})
export class ResourceTabsComponent implements OnInit {
    @ViewChildren(jqxTreeComponent) jqTrees: QueryList<jqxTreeComponent>;
    @ViewChild('jqTree') jqTree: jqxTreeComponent;
    @Input() tabs: Array<{
        id: string,
        name: string,
        data: any
    }>;
    @Output() onSelect = new EventEmitter<any>();

    selectedTabIndex: number = 0;
    constructor() {}

    ngOnInit() {}

    onTreeItemSelected(e) {
        let args = e.args;
        const jqTree = _.find(this.jqTrees.toArray(), jqTree => jqTree.elementRef.nativeElement.id === ('jqxTree-' + this.selectedTabIndex));
        // console.log(this.jqTree);
        // console.log(this.jqTrees);
        let item = jqTree.getItem(args.element);
        this.onSelect.emit(item);
    }
}
