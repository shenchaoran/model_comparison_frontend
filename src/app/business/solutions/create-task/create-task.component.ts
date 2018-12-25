import { Component, OnInit, HostListener } from "@angular/core";
import { SolutionService, TaskService, UserService, } from "@services";
import { Task, CalcuTask, ResourceSrc, OGMSState, MS, Solution,  } from '@models';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { OgmsBaseComponent } from '@shared';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { map, filter, includes,  } from 'lodash';
import * as ObjectID from 'objectid';

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
    spatialType: 'site' | 'region';
    
    get siteDataset() {
        return _.find(this.stds, {_id: '5b9012e4c29ca433443dcfab'})
    }
    get multipleSite() {
        return !(this.ptMSs.length>1)
    }
    get metaFG() { return this.cmpTaskFG.get('meta'); }
    get authFC() { return this.cmpTaskFG.get('auth'); }
    get calcuTasksFC() { return this.cmpTaskFG.get('calcuTasks'); }
    get regionsFC() { return this.cmpTaskFG.get('regions'); }
    get sitesFC() { return this.cmpTaskFG.get('sites'); }

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
            sites: [[], Validators.required],
        });

        // this.cmpTaskFG.statusChanges.subscribe(status => {})
    }

    ngOnInit() {
        this.solutionService.createTask(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            if (!res.error) {
                this.sln = res.data.solution;
                this.ptMSs = res.data.ptMSs;
                this.stds = res.data.stds;

                this.calcuTasksFC.value = this.ptMSs.map(ms => {
                    return new CalcuTask(this.userService.user, ms)
                });
                this.calcuTasksFC.updateValueAndValidity();
                this.calcuTasksFC.markAsPristine();

                _.map(this.sln.cmpObjs, cmpObj => {
                    _.map(cmpObj.methods, method => {
                        if(method.name === 'Sub-region bias contour map' || method.name === 'Heat map' || method.name === 'Sub-region line chart') {
                            this.spatialType = 'region';
                        }
                        else if(method.name === "table series visualization" || method.name === "Line chart") {
                            this.spatialType = 'site';
                        }
                    })
                })
                if(this.spatialType === 'region') {
                    this.sitesFC.clearValidators();
                    this.regionsFC.setValidators(Validators.required);
                }
                else if(this.spatialType === 'site') {
                    this.regionsFC.clearValidators();
                    this.sitesFC.setValidators(Validators.required);
                }
                this.sitesFC.updateValueAndValidity();
                this.regionsFC.updateValueAndValidity();
            }
        });
    }

    onInputTableChange(calcuTasksChange: {
        value?: CalcuTask[],
        valid: boolean,
    }) {
        if(calcuTasksChange.valid) {
            this.calcuTasksFC.value = calcuTasksChange.value;
            this.calcuTasksFC.updateValueAndValidity();
        }
        else {
            this.calcuTasksFC.setErrors({
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
            fg = this.calcuTasksFC;
        }
        else if(step === 2) {
            fg = this.regionsFC;
        }
        fg.markAsTouched();
        fg.markAsDirty();
        if(fg.invalid) {
            fg.setErrors({
                invalid: true
            });
        }
    }

    onRegionsChange(regions) {
        if(regions.valid) {
            this.regionsFC.value = regions.value;
            this.regionsFC.updateValueAndValidity();
        }
        else {
            this.regionsFC.setErrors({
                invalid: true
            });
        }
    }

    onSitesChange(sites) {
        if(sites.valid) {
            this.sitesFC.value = sites.value;
            this.sitesFC.updateValueAndValidity();
        }
        else {
            this.sitesFC.setErrors({
                invalid: true
            });
        }
    }

    submitTask(type) {
        if (type === 'save') {
            this.task.state = OGMSState.INIT;
        }
        else if (type === 'run') {
            this.task.state = OGMSState.COULD_START;
        }
        let formData = this.cmpTaskFG.value;
        this.task.meta.name = formData.meta.name;
        this.task.meta.desc = formData.meta.desc;
        this.task.auth.src = formData.auth;
        this.task.regions = formData.regions;
        this.task.sites = formData.sites;
        this.task.solutionId = this.sln._id;
        this.task.topicId = this.sln.topicId;
        this.task.calcuTaskIds = [];
        
        this.task.schemas = [];
        this.ptMSs.map(ms => ms.MDL.IO.schemas.map(schema => {
            schema.msId = ms._id;
            this.task.schemas.push(schema);
        }));

        let calcuTasks = [];
        if(formData.calcuTasks.length > 1) {
            // n 个模型，1 个站点
            map(formData.calcuTasks as any[], (calcuTask, i) => {
                if(this.spatialType === 'site') {
                    // 把 site input 给 std data
                    let site = formData.sites[0]
                    let event = _.find(calcuTask.IO.std, {id: '--index'})
                    event.value = site.index
                }
                else {
                    // 不用选 regions
                }
                
                calcuTask.meta.name = '';
                if (type === 'save') {
                    calcuTask.state = OGMSState.INIT;
                }
                else {
                    calcuTask.state = OGMSState.COULD_START;
                }
                this.task.calcuTaskIds.push(calcuTask._id);
                calcuTasks.push(calcuTask);
            });
        }
        else {
            // 1 个模型，n 个站点
            let calcuTask = formData.calcuTasks[0]
            formData.sites.map(site => {
                let tmp = _.cloneDeep(calcuTask)
                if(this.spatialType === 'site') {
                    let event = _.find(tmp.IO.std, {id: '--index'})
                    event.value = site.index;
                }
                tmp._id = ObjectID().toString()
                this.task.calcuTaskIds.push(tmp._id);
                console.log(this.task.calcuTaskIds)
                calcuTasks.push(tmp)
            })
        }
        
        
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
