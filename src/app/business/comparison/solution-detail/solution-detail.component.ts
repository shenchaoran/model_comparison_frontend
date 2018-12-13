import { Component, OnInit, AfterViewInit, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj, Metric } from "@models";
import { Simplemde } from 'ng2-simplemde';
import { MatSnackBar, MatSelectionList } from '@angular/material';

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

    cmpMethods: CmpMethod[];
    solution: Solution;
    tasks: Task[];              // { _id, meta, auth }
    metrics: Metric[];
    attached_topics: Topic[];               // { _id, meta, auth }
    mss: MS[] | any[];          // { _id, meta, auth }, 所有的 ms
    topicList: Topic[];         // { _id, meta, auth }[]
    ptMsFG;
    cmpObjsFG;
    cmpMethodsFC;

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return _.findIndex(_.get(this, 'solution.subscribed_uids'), v => v === this.user._id) !== -1; }
    get cmpObjs() { return this.solution.cmpObjs; }
    get myPgGrid() { return $('#grid-table').pqGrid; }
    get ptMSs() { return _.chain(this.mss).filter(ms => !!ms.selected).value(); }
    get isPtMsFCInvalid() { return !this.ptMsFG.get('msIds').pristine && this.ptMsFG.get('msIds').invalid;}
    get isCmpCfgInvalid() { return !this.cmpObjsFG.get('cmpCfg').pristine && this.cmpObjsFG.get('cmpCfg').invalid;}
    get isCmpMethodsInvalid() { return !this.cmpMethodsFC.get('methods').pristine && this.cmpMethodsFC.get('methods').invalid;}
    get methods() {
        let selectedMethods = _.get(this, 'solution.cmpObjs[0].methods');
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
        this.ptMsFG = this.fb.group({
            msIds: [[], [Validators.required]]
        });
        this.cmpObjsFG = this.fb.group({
            cmpCfg: [[], [Validators.required]]
        });
        this.cmpMethodsFC = this.fb.group({
            methods: [[], [Validators.required]]
        });
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


                _.map(this.mss, ms => {
                    if(_.find(this.solution.msIds, id => id === ms._id)) {
                        ms.selected = true;
                        this.ptMsFG.get('msIds').value.push(ms._id);
                        this.ptMsFG.get('msIds').updateValueAndValidity()
                    }
                })
                let methods = _.get(this, 'solution.cmpObjs[0].methods')
                if(methods) {
                    methods.forEach((method) => {
                        let cmpMethod = _.find(this.cmpMethods, cmpMethod => cmpMethod._id === method.id)
                        if(cmpMethod) {
                            cmpMethod.checked = true;
                        }
                    })
                    this.cmpMethodsFC.get('methods').value = _.filter(this.cmpMethods, cmpMethod => cmpMethod.checked);
                    this.cmpMethodsFC.get('methods').updateValueAndValidity();
                }

                // if (this.couldEdit && !this.solution.meta.wikiMD) {
                //     this._editMode = 'WRITE';
                //     this.snackBar.open('please improve the wiki documentation as soon as possible!', null, {
                //         duration: 2000,
                //         verticalPosition: 'top',
                //         horizontalPosition: 'end',
                //     });
                // }
            }
        });
    }

    onParticipantsChange(ms) {
        ms.selected = !ms.selected;
        let ptMSIds = _.chain(this.mss).filter(ms => !!ms.selected).map(ms => ms._id ).value();
        this.ptMsFG.get('msIds').value = ptMSIds;
        this.ptMsFG.get('msIds').updateValueAndValidity();
        this.solution.cmpObjs = [];
    }

    onCmpCfgChange(cmpObjsFC) {
        if(cmpObjsFC.valid) {
            this.cmpObjsFG.get('cmpCfg').value = cmpObjsFC.value;
            this.cmpObjsFG.get('cmpCfg').updateValueAndValidity();
        }
        else {
            let cmpCfgFC = this.cmpObjsFG.get('cmpCfg');
            cmpCfgFC.setErrors({
                invalid: true
            });
        }
    }

    onMethodsChange(cmpMethodsFC) {
        if(cmpMethodsFC.valid) {
            this.cmpMethodsFC.get('methods').value = cmpMethodsFC.value;
            this.cmpMethodsFC.get('methods').updateValueAndValidity();
        }
        else {
            let cmpMethodsFC = this.cmpMethodsFC.get('methods');
            cmpMethodsFC.setErrors({
                invalid: true
            });
        }
    }

    onStepperNext(stepIndex) {
        let fg;
        if(stepIndex === 0) {
            fg = this.ptMsFG.get('msIds');
        }
        else if(stepIndex === 1) {
            fg = this.cmpObjsFG.get('cmpCfg');
        }
        else if(stepIndex === 2) {
            fg = this.cmpMethodsFC.get('methods');
        }
        fg.markAsTouched();
        fg.markAsDirty();
        if(fg.invalid)
            fg.setErrors({
                invalid: true
            });
    }

    onEditClick() {
        this._editMode = 'WRITE';
        this._oldSolution = _.cloneDeep(this.solution)
    }

    onEditSave() {
        this.solution.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.solution.meta.wikiMD || '');
        this.solution.msIds = this.ptMsFG.get('msIds').value;
        this.solution.cmpObjs = this.cmpObjsFG.get('cmpCfg').value;
        let methods = this.cmpMethodsFC.get('methods').value
        _.map(this.solution.cmpObjs, cmpObj => {
            cmpObj.methods = methods.map(method => {
                return {
                    id: method._id,
                    name: method.meta.name,
                }
            })
        })
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
            this.router.navigate(['/comparison/solutions/create']);
        } else {
            this.userService.redirectIfNotLogined();
        }
    }

    createTask() {
        if (this.userService.isLogined) {
            this.router.navigate(["/comparison/solutions", this.solution._id, "invoke"]);
        } else {
            this.userService.redirectIfNotLogined();
        }
    }

    onDeleteClick() {
        this.solutionService.delete(this.solution._id).subscribe(res => {
            if(!res.error) {
                this.router.navigate(['/comparison/solutions']);
            }
        })
    }
}
