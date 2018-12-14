import { Component, OnInit, HostListener } from "@angular/core";
import { SolutionService, TaskService, UserService, } from "@services";
import { Task, CalcuTask, ResourceSrc, CmpState, CalcuTaskState, MS, Solution,  } from '@models';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { OgmsBaseComponent } from '@shared';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
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
    cmpTaskFG;
    hasSubRegion = false;

    get metaFG() { return this.cmpTaskFG.get('meta'); }
    get authFC() { return this.cmpTaskFG.get('auth'); }
    get calcuTasksFG() { return this.cmpTaskFG.get('calcuTasks'); }
    get regionsFG() { return this.cmpTaskFG.get('regions'); }

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
            meta: this.fb.group({
                name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
                desc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(140)]],
            }),
            auth: [ResourceSrc.PUBLIC, [Validators.required]],
            calcuTasks: [[], Validators.required],
            regions: [[], Validators.required],
        });

        // this.cmpTaskFG.statusChanges.subscribe(status => {})
    }

    ngOnInit() {
        this.solutionService.createTask(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if (!res.error) {
                this.sln = res.data.solution;
                this.ptMSs = res.data.ptMSs;
                this.stds = res.data.stds;

                this.calcuTasksFG.value = this.ptMSs.map(ms => {
                    return new CalcuTask(this.userService.user, ms)
                });
                this.calcuTasksFG.updateValueAndValidity();
                this.calcuTasksFG.markAsPristine();

                _.map(this.sln.cmpObjs, cmpObj => {
                    _.map(cmpObj.methods, method => {
                        if(method.name === 'Sub-region bias contour map' || method.name === 'Heat map' || method.name === 'Sub-region line chart') {
                            this.hasSubRegion = true;
                        }
                    })
                })
            }
        });
    }

    onInputTableChange(calcuTasksChange: {
        value?: CalcuTask[],
        valid: boolean,
    }) {
        if(calcuTasksChange.valid) {
            this.calcuTasksFG.value = calcuTasksChange.value;
            this.calcuTasksFG.updateValueAndValidity();
        }
        else {
            this.calcuTasksFG.setErrors({
                invalid: true,
            })
        }
    }

    onStepperNext(step) {
        let fg;
        if(step === 0) {
            fg = this.metaFG;
        }
        else if(step === 1) {
            fg = this.calcuTasksFG;
        }
        else if(step === 2) {
            fg = this.regionsFG;
        }
        fg.markAsTouched();
        fg.markAsDirty();
        if(fg.invalid) {
            fg.setErrors({
                invalid: true
            });
        }
    }

    onCalcuValidChange(valid) {
        if (!valid)
            this.cmpTaskFG.setErrors({});
    }

    onRegionsChange(regions) {
        if(regions.length) {
            this.regionsFG.value = regions;
            this.regionsFG.updateValueAndValidity();
        }
        else {
            this.regionsFG.setErrors({
                invalid: true
            });
        }
    }

    onSiteSelected(site, i) {
    }

    submitTask(type) {
        if (type === 'save') {
            this.task.state = CmpState.INIT;
        }
        else if (type === 'run') {
            this.task.state = CmpState.COULD_START;
        }
        let formData = this.cmpTaskFG.value;
        this.task.meta.name = formData.meta.name;
        this.task.meta.desc = formData.meta.desc;
        this.task.auth.src = formData.auth;
        this.task.regions = formData.regions;
        this.task.solutionId = this.sln._id;
        this.task.topicId = this.sln.topicId;
        this.task.calcuTaskIds = [];
        
        this.task.schemas = [];
        this.ptMSs.map(ms => ms.MDL.IO.schemas.map(schema => {
            schema.msId = ms._id;
            this.task.schemas.push(schema);
        }));

        let calcuTasks = [];
        map(formData.calcuTasks as any[], (calcuTask, i) => {
            this.task.calcuTaskIds.push(calcuTask._id);

            calcuTask.meta.name = '';
            if (type === 'save') {
                calcuTask.state = CalcuTaskState.INIT;
            }
            else {
                calcuTask.state = CalcuTaskState.COULD_START;
            }
            calcuTasks.push(calcuTask);
        });
        
        this.task.cmpObjs = this.sln.cmpObjs
        this.task.cmpObjs.map(cmpObj => {
            let slnDataRefers = cmpObj.dataRefers;
            cmpObj.dataRefers = [];
            calcuTasks.map(msr => {
                let dr = slnDataRefers.find(dr => dr.msId === msr.msId);
                cmpObj.dataRefers.push({
                    ...dr,
                    msrId: msr._id,
                    msrName: msr.meta.name
                })
            });
        });
        this.taskService.insert({
            task: this.task,
            calcuTasks: calcuTasks,
            conversation: this.taskService.conversation
        }).subscribe(res => {
            if (!res.error) {
                if (type === 'run' && res.data.code === 200) {
                    this.snackBar.open(res.data.desc, null, { duration: 500 });
                }
                this.router.navigate(['/results', res.data._id]);
            }
        })
    }
}
