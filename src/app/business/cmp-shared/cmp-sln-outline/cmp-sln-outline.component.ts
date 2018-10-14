import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Solution } from '@models';
import { MatTable } from '@angular/material';

@Component({
    selector: 'ogms-cmp-sln-outline',
    templateUrl: './cmp-sln-outline.component.html',
    styleUrls: ['./cmp-sln-outline.component.scss']
})
export class CmpSlnOutlineComponent implements OnInit {
    displayedColumns = ['msName', 'eventName', 'field'];
    _cmpSln;
    @ViewChildren(MatTable) tableComponents: QueryList<MatTable<any>>;
    @Input() 
    set cmpSln(v: Solution) {
        this._cmpSln = v;
    }
    get cmpSln() {
        return this._cmpSln;
    }

    constructor() { }

    ngOnInit() {
    }

}
