import { Component, OnInit, HostListener } from "@angular/core";
import { SolutionService, TaskService, UserService, } from "../../services";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { OgmsBaseComponent } from '@shared';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Task, CalcuTask, ResourceSrc, CmpState, CalcuTaskState, MS, Solution,  } from '@models';
import { MatSnackBar } from '@angular/material';
import { map, filter, includes,  } from 'lodash';

@Component({
    selector: 'ogms-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent extends OgmsBaseComponent implements OnInit {
    sln: Solution;
    ptMSs: MS[];
    stds;

    task;
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
        public solutionService: SolutionService,
        public title: DynamicTitleService,
        private fb: FormBuilder,
        public taskService: TaskService,
        public snackBar: MatSnackBar,
        private userService: UserService,
    ) {
        super();
        this.task = this.taskService.create();

        this.cmpTaskFG = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            desc: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
            auth: [ResourceSrc.PUBLIC, [Validators.required]],
            // TODO validator
            calcuTasks: this.fb.array([], Validators.required)
        });

        this.cmpTaskFG.statusChanges.subscribe(status => {
            if (status === 'VALID') {
                // console.log(this.taskFG.value);
            }
        })
    }

    ngOnInit() {
        this.solutionService.createTask(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if (!res.error) {
                this.sln = res.data.solution;
                this.ptMSs = res.data.ptMSs;
                this.stds = res.data.stds;
            }
        });
    }

    submitTask(type) {
        this.calcuTasks = [];
        if (type === 'save') {
            this.task.state = CmpState.INIT;
        }
        else if (type === 'run') {
            this.task.state = CmpState.COULD_START;
        }
        this.task.meta.name = this.cmpTaskFG.value.name;
        this.task.meta.desc = this.cmpTaskFG.value.desc;
        this.task.auth.src = this.cmpTaskFG.value.auth;
        this.task.solutionId = this.sln._id;
        this.task.topicId = this.sln.topicId;
        this.task.calcuTaskIds = [];
        this.task.schemas = [];
        this.ptMSs.map(ms => ms.MDL.IO.schemas.map(schema => {
            schema.msId = ms._id;
            this.task.schemas.push(schema);
        }));
        map(this.cmpTaskFG.value.calcuTasks as any[], (calcuTask, i) => {
            this.task.calcuTaskIds.push(calcuTask._id);

            calcuTask.meta.name = this._tabLabelCfg[i].label;
            if (type === 'save') {
                calcuTask.state = CalcuTaskState.INIT;
            }
            else {
                calcuTask.state = CalcuTaskState.COULD_START;
            }
            this.calcuTasks.push(calcuTask);
        });
        this.task.cmpObjs = this.sln.cmpObjs
        this.task.cmpObjs.map(cmpObj => {
            let slnDataRefers = cmpObj.dataRefers;
            cmpObj.dataRefers = [];
            this.calcuTasks.map(msr => {
                let dr = slnDataRefers.find(dr => dr.msId === msr.msId);
                cmpObj.dataRefers.push({
                    ...dr,
                    msrId: msr._id,
                    msrName: msr.meta.name
                })
            });
            // cmpObj.dataRefers.map((dataRefer, i) => {
            //     dataRefer.msrName = this.calcuTasks[i].meta.name;
            // })
        });
        this.taskService.insert({
            task: this.task,
            calcuTasks: this.calcuTasks,
            conversation: this.taskService.conversation
        }).subscribe(res => {
            if (!res.error) {
                if (type === 'run' && res.data.code === 200) {
                    this.snackBar.open(res.data.desc, null, { duration: 500 });
                }
                this.router.navigate(['/results/comparison', res.data._id]);
            }
        })
    }

    onCalcuValidChange(valid) {
        if (!valid)
            this.cmpTaskFG.setErrors({});
    }

    addInstance(ms) {
        let newCalTask = new CalcuTask(this.userService.user, ms);
        let matchedSTDs = filter(this.stds as any[], std => {
            return includes(std.models, newCalTask.msId);
        });
        newCalTask.stds = matchedSTDs;
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

    onSiteSelected(site, i) {
        let tabLabel = this._tabLabelCfg[i];
        if (tabLabel.useDefault !== false) {
            tabLabel.useDefault = false;
            tabLabel.label = `${tabLabel.name}: ${site.coor}`;
        }
    }

    changeTabName(v, i) {
        this._tabLabelCfg[i].useDefault = false;
        this._tabLabelCfg[i].label = v;
    }

    updateTabLabel() {
        let tmp = {};
        map(this._tabLabelCfg as any[], tabLabel => {
            if (!tmp[tabLabel.id])
                tmp[tabLabel.id] = 1;
            else {
                tmp[tabLabel.id]++;
            }
            tabLabel.index = tmp[tabLabel.id];
            if (tabLabel.useDefault !== false)
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
