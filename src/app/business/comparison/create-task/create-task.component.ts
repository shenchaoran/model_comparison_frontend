import { Component, OnInit, HostListener } from "@angular/core";
import { CmpSlnService, CmpTaskService } from "../../services";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@common/core/services/dynamic-title.service";
import { DocBaseComponent } from '@common/shared';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CmpTask, CalcuTask, ResourceSrc, CmpState, CalcuTaskState } from '@models';



@Component({
  selector: 'ogms-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent extends DocBaseComponent implements OnInit {
    sln;
    cmpTask;
    calcuTasks = [];
    cmpTaskFG;

    _selectedTabIndex = 0;
    _tabLabelCfg: {
        id: any,
        name: string,
        index: number,
        useDefault?: boolean,
        label: string
    }[] = [];

    get calTasksCtrl() {
        return (this.cmpTaskFG.get('calcuTasks') as FormArray);
    }

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public cmpSlnService: CmpSlnService,
        public title: DynamicTitleService,
        private fb: FormBuilder,
        public cmpTaskService: CmpTaskService,
    ) { 
        super(route, cmpSlnService, title);
        this.cmpTask = new CmpTask();

        this.cmpTaskFG = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
            desc: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
            auth: [ResourceSrc.PUBLIC, [Validators.required]],
            // TODO validator
            calcuTasks: this.fb.array([], Validators.required)
        });

        this.cmpTaskFG.statusChanges
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

    submitTask(type) {
        if(type === 'save') {
            this.cmpTask.state = CmpState.INIT;
        }
        else if(type === 'run') {
            this.cmpTask.state = CmpState.COULD_START;
        }
        this.cmpTask.meta.name = this.cmpTaskFG.value.name;
        this.cmpTask.meta.desc = this.cmpTaskFG.value.desc;
        this.cmpTask.auth.src = this.cmpTaskFG.value.auth;
        this.cmpTask.solutionId = this.sln._id;
        this.cmpTask.issueId = this.sln.issueId;
        this.cmpTask.calcuTaskIds = [];
        _.map(this.cmpTaskFG.value.calcuTasks, (calcuTask, i) =>{
            this.cmpTask.calcuTaskIds.push({
                _id: calcuTask._id,
                progress: 0
            });

            calcuTask.meta.name = this._tabLabelCfg[i].label;
            if(type==='save') {
                calcuTask.state = CalcuTaskState.COULD_START;
            }
            this.calcuTasks.push(calcuTask);
        })
        this.cmpTaskService.insert({
            cmpTask: this.cmpTask,
            calcuTasks: this.calcuTasks
        })
            .subscribe(response => {
                if(!response.error) {
                    this.router.navigate(['/results/comparison', response.data]);
                }
            })
    }

    onCalcuValidChange(valid) {
        if(!valid)
            this.cmpTaskFG.setErrors({});
    }

    addInstance(ms) {
        let newCalTask = new CalcuTask(ms);
        this.calTasksCtrl.push(new FormControl(newCalTask, Validators.required))
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
