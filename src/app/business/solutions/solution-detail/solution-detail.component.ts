import { Component, OnInit, AfterViewInit, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj, Metric, STDData } from "@models";
import { Simplemde } from 'ng2-simplemde';
import { MatSnackBar, MatSelectionList } from '@angular/material';
import { Observable, BehaviorSubject, of, Observer } from 'rxjs';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
    providers: [ConversationService]
})
export class SolutionDetailComponent implements OnInit {
    _editMode: 'READ' | 'WRITE' = 'READ';
    _oldSolution: Solution;
    hadTriggeredConversation: boolean = false;

    topicFilter;

    mdeOption = { placeholder: 'Solution description...' };
    @ViewChild(Simplemde) simpleMDE: any;
    @ViewChild(MatSelectionList) ptSelect: MatSelectionList;
    @ViewChild('menu') menuRef: ElementRef;

    cmpMethods: CmpMethod[] | any[];
    solution: Solution;
    tasks: Task[];              // { _id, meta, auth }
    metrics: Metric[];
    attached_topics: Topic[];               // { _id, meta, auth }
    mss: MS[] | any[];          // { _id, meta, auth }, 所有的 ms
    topicList: Topic[];         // { _id, meta, auth }[]
    observations: STDData[] | any[];
    ptObs: STDData[] | any[];
    ptMSs;

    slnFG;
    // ptMSs$: BehaviorSubject<MS[]> = new BehaviorSubject(null);

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return _.findIndex(_.get(this, 'solution.subscribed_uids'), v => v === this.user._id) !== -1; }
    get cmpObjs() { return this.solution.cmpObjs; }
    get myPgGrid() { return $('#grid-table').pqGrid; }
    // get ptMSs() { return _.chain(this.mss).filter(ms => !!ms.selected).value(); }
    get step1FG() { return this.slnFG.get('step1'); }
    get step2FG() { return this.slnFG.get('step2'); }
    get step3FG() { return this.slnFG.get('step3'); }
    get isPtMsFCInvalid() {
        let fc = this.slnFG.get('step1').get('msIds')
        return !fc.pristine && fc.invalid;
    }
    get isPtObsFCInvalid() { 
        let fc = this.slnFG.get('step1').get('obsIds')
        return !fc.pristine && fc.invalid;
    }
    get isCmpCfgInvalid() {
        let fc = this.slnFG.get('step2').get('cmpCfg')
        return !fc.pristine && fc.invalid;
    }
    get isCmpMethodsInvalid() {
        let fc = this.slnFG.get('step3').get('methods')
        return !fc.pristine && fc.invalid;
    }
    get methods() {
        let selectedMethods = _.get(this, 'solution.cmpMethods');
        if(selectedMethods)
            return _.filter(this.cmpMethods, method => {
                return _.find(selectedMethods, selected => selected.id === method._id)
            })
        else 
            return []
    }

    constructor(
        public route: ActivatedRoute,
        public solutionService: SolutionService,
        public title: DynamicTitleService,
        public conversationService: ConversationService,
        public userService: UserService,
        private snackBar: MatSnackBar,
        public msService: MSService,
        private cdRef: ChangeDetectorRef,
        private renderer2: Renderer2,
        public router: Router,
        public fb: FormBuilder,
    ) {
        this.slnFG = this.fb.group({
            step1: this.fb.group({
                msIds: [[], [Validators.required]],
                obsIds: [[], [Validators.required]],
            }),
            step2: this.fb.group({
                cmpCfg: [[], [Validators.required]],
                temporal: [[], [Validators.required]],
            }),
            step3: this.fb.group({
                methods: [[], [Validators.required]]
            })
        })
    }

    ngOnInit() {
        const solutionId = this.route.snapshot.paramMap.get('id');
        this.solutionService.findOne(solutionId).subscribe(res => {
            if (!res.error) {
                this.solution = res.data.solution;
                this.tasks = res.data.tasks;
                this.attached_topics = res.data.attached_topics;
                this.cmpMethods = res.data.cmpMethods;
                // this.topic = res.data.topic;
                this.mss = res.data.mss;
                this.topicList = res.data.topicList;
                this.metrics = res.data.metrics;
                this.observations = res.data.obs;

                this.slnFG.get('step2')

                _.map(this.mss, ms => {
                    if(_.find(this.solution.msIds, id => id === ms._id.toString())) {
                        ms.selected = true;
                        let msIdsFC = this.slnFG.get('step1').get('msIds')
                        msIdsFC.value.push(ms._id);
                        msIdsFC.updateValueAndValidity();
                        // this.ptMsFG.get('msIds').value.push(ms._id);
                        // this.ptMsFG.get('msIds').updateValueAndValidity()
                    }
                })
                _.map(this.observations, obs => {
                    if(_.find(this.solution.observationIds, id => id === obs._id.toString())) {
                        obs.selected = true;
                        let ptObsFC = this.slnFG.get('step1').get('obsIds')
                        ptObsFC.value.push(obs._id);
                        ptObsFC.updateValueAndValidity();
                    }
                })
                this.ptMSs = _.filter(this.mss, ms => ms.selected);
                this.ptObs = _.filter(this.observations, obs => obs.selected);
                
                let methods = _.get(this, 'solution.cmpMethods')
                if(methods) {
                    methods.forEach((method) => {
                        let cmpMethod = _.find(this.cmpMethods, cmpMethod => cmpMethod._id === method.id)
                        if(cmpMethod) {
                            cmpMethod.checked = true;
                        }
                    })
                    let fc = this.slnFG.get('step3').get('methods');
                    fc.value = _.filter(this.cmpMethods, cmpMethod => cmpMethod.checked);
                    fc.updateValueAndValidity();
                }
            }
        });
    }

    onObservationChange(obs) {
        obs.selected = !obs.selected;
        let ptObsIds = _.chain(this.observations).filter(obs => !!obs.selected).map(obs => obs._id.toString()).value();
        let ptObsFC = this.slnFG.get('step1').get('obsIds')
        ptObsFC.value = ptObsIds;
        ptObsFC.updateValueAndValidity();
        this.ptObs = _.cloneDeep(_.filter(this.observations, obs => !!obs.selected))
    }

    onParticipantsChange(ms) {
        ms.selected = !ms.selected;
        let ptMSIds = _.chain(this.mss).filter(ms => !!ms.selected).map(ms => ms._id ).value();
        let msIdsFC = this.slnFG.get('step1').get('msIds')
        msIdsFC.value = ptMSIds;
        msIdsFC.updateValueAndValidity();
        this.ptMSs = _.cloneDeep(_.filter(this.mss, ms => !!ms.selected));
    }

    onTemporalChange(temporal) {
        let fc = this.slnFG.get('step2').get('temporal')
        fc.value = temporal;
        fc.updateValueAndValidity();
    }

    onCmpCfgChange(cmpObjsFC) {
        let fc = this.slnFG.get('step2').get('cmpCfg');
        if(cmpObjsFC.valid) {
            fc.value = cmpObjsFC.value;
            fc.updateValueAndValidity();
        }
        else {
            fc.setErrors({ invalid: true });
        }
    }

    onMethodsChange(cmpMethodsFC) {
        let fc = this.slnFG.get('step3').get('methods');
        if(cmpMethodsFC.valid) {
            fc.value = cmpMethodsFC.value;
            fc.updateValueAndValidity();
        }
        else {
            fc.setErrors({ invalid: true });
        }
    }

    onStepperNext(stepIndex) {
        let fgs = [];
        if(stepIndex === 0) {
            let ptMsIdFC = this.slnFG.get('step1').get('msIds')
            let ptObsIdFC = this.slnFG.get('step1').get('obsIds')
            fgs.push(ptMsIdFC);
            fgs.push(ptObsIdFC);

            let msNames, obsNames;
            msNames = ptMsIdFC.value.map(id => {
                let ms = _.find(this.mss, ms => ms._id.toString() === id)
                return ms.MDL.meta.name
            })
            obsNames = ptObsIdFC.value.map(id => {
                let ob = _.find(this.observations, ob => ob._id.toString() === id)
                return ob.meta.name
            })
            this.solutionService.setValidTemporalOptions(msNames, obsNames)
        }
        else if(stepIndex === 1) {
            fgs.push(this.slnFG.get('step2').get('cmpCfg'));
            fgs.push(this.slnFG.get('step2').get('temporal'));
        }
        else if(stepIndex === 2) {
            fgs.push(this.slnFG.get('step3').get('methods'))
        }
        fgs.forEach(fg => {
            fg.markAsTouched();
            fg.markAsDirty();
            if(fg.invalid)
                fg.setErrors({ invalid: true });
        })
    }

    onEditClick() {
        this._editMode = 'WRITE';
        this._oldSolution = _.cloneDeep(this.solution)
    }

    onEditSave() {
        this.solution.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.solution.meta.wikiMD || '');
        this.solution.msIds = this.slnFG.value.step1.msIds;
        this.solution.observationIds = this.slnFG.value.step1.obsIds;
        this.solution.cmpObjs = this.slnFG.value.step2.cmpCfg;
        this.solution.temporal = this.slnFG.value.step2.temporal;
        let methods = this.slnFG.value.step3.methods;
        // _.map(this.solution.cmpObjs, cmpObj => {
        this.solution.cmpMethods = methods.map(method => {
            return {
                id: method._id,
                name: method.meta.name,
            }
        })
        // })
        this.solutionService.patch(this.solution._id, { solution: this.solution }).subscribe(res => { this._editMode = 'READ'; });
    }

    onEditCancel() {
        this.solution = this._oldSolution;
        this._editMode = 'READ';
    }

    onSubscribeToggle() {
        let ac = this.includeUser ? 'unsubscribe' : 'subscribe';
        this.userService.toggleSubscribe('solution', ac, this.solution._id).subscribe(res => {
            if (!res.error) {
                let i = this.solution.subscribed_uids.findIndex(v => v === this.user._id);
                if (ac === 'subscribe') {
                    i === -1 && this.solution.subscribed_uids.push(this.user._id);
                }
                else if (ac === 'unsubscribe') {
                    i !== -1 && this.solution.subscribed_uids.splice(i, 1);
                }
            }
        });
    }

    onAttachTopic(topic) {
        let ac = _.indexOf(this.solution.topicIds, topic._id) !== -1 ? 'removeTopic' : 'addTopic';
        this.solutionService.patch(this.solution._id, {
            topicId: topic._id,
            ac: ac,
        }).subscribe(res => {
            if (!res.error) {
                this.renderer2.setStyle(this.menuRef.nativeElement, 'display', 'none');
                if (ac === 'removeTopic') {
                    _.pull(this.solution.topicIds, topic._id)
                    _.pull(this.attached_topics, topic);
                }
                else if (ac === 'addTopic') {
                    if (_.indexOf(this.solution.topicIds, topic._id) === -1) {
                        !this.solution.topicIds && (this.solution.topicIds = []);
                        this.solution.topicIds.push(topic._id)
                        this.attached_topics.push(topic);
                    }
                }

            }
        })
        // ajax
    }

    onTabChange(index) {
        if (index === 2 && !this.hadTriggeredConversation) {
            this.conversationService.findOneByWhere({
                pid: this.solution._id
            }).subscribe(res => {
                if (!res.error) {
                    this.hadTriggeredConversation = true;
                    this.conversationService.import(
                        res.data.conversation,
                        res.data.users,
                        res.data.commentCount,
                        this.solution.auth.userId,
                        this.solution._id,
                        'solution'
                    );
                }
            })
        }
    }

    createSolution() {
        if (this.userService.isLogined) {
            this.router.navigate(['../create'], { relativeTo: this.route});
        } else {
            this.userService.redirectIfNotLogined();
        }
    }

    createTask() {
        if (this.userService.isLogined) {
            this.router.navigate(["invoke"], {relativeTo: this.route});
        } else {
            this.userService.redirectIfNotLogined();
        }
    }

    onDeleteClick() {
        this.solutionService.delete(this.solution._id).subscribe(res => {
            if(!res.error) {
                this.router.navigate(['/solutions']);
            }
        })
    }
}
