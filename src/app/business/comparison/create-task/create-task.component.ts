import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService } from "../services/cmp-sln.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { DocBaseComponent } from '@common/shared';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CmpTask, CalcuTask } from '@models';


@Component({
  selector: 'ogms-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent extends DocBaseComponent implements OnInit {
    sln;
    taskFG;
    _selectedTabIndex = 0;
    _tabLabelCfg: {
        id:any,
        name: string,
        index: number,
        useDefault?: boolean,
        label: string
    }[] = [];
    _tabName = [];

    get calTasksCtrl() {
        return (this.taskFG.get('calcuTasks') as FormArray);
    }

    getTabId(i) {
    }

    constructor(
        public route: ActivatedRoute,
        public service: CmpSlnService,
        public title: DynamicTitleService,
        private fb: FormBuilder
    ) { 
        super(route, service, title);

        this.taskFG = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
            desc: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(140)]],
            auth: ['Public', [Validators.required]],
            calcuTasks: this.fb.array([], Validators.required)
        });

        this.taskFG.statusChanges
            .subscribe(status => {
                if(status === 'VALID') {
                    // console.log(this.taskFG.value);
                }
            })
    }

    ngOnInit() {
        super.ngOnInit();
        this.doc.subscribe(doc => {
            this.sln = doc;
        });
    }

    addInstance(ms) {
        let newCalTask = new CalcuTask(ms);
        this.calTasksCtrl.push(new FormControl(newCalTask))
        this.calTasksCtrl.updateValueAndValidity();

        this._selectedTabIndex = this.calTasksCtrl.controls.length - 1;
        this._tabLabelCfg.push({
            id: ms._id,
            name: ms.MDL.meta.name,
            index: 0,
            label: ''
        });
        this.updateTabLabel();
    }

    changeTabName(v, i) {
        this._tabLabelCfg[i].useDefault = false;
        this._tabLabelCfg[i].label = v;
    }

    updateTabLabel() {
        let map = {};
        _.map(this._tabLabelCfg, tabLabel => {
            if(!map[tabLabel.id])
                map[tabLabel.id] = 1;
            else {
                map[tabLabel.id]++;
            }
            tabLabel.index = map[tabLabel.id];
            if(tabLabel.useDefault !== false)
                tabLabel.label = `${tabLabel.name} (instance ${tabLabel.index})`;
        });
    }

    delInstance(i) {
        this.calTasksCtrl.removeAt(i);
        this.calTasksCtrl.updateValueAndValidity();
        this._tabLabelCfg.splice(i, 1);
        this.updateTabLabel();
    }
}
