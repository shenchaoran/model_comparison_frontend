import { Component, OnInit, AfterViewInit, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as uuidv1 from 'uuid/v1';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Solution, Task, Topic, MS, CmpMethod, CmpObj } from "@models";
import { Simplemde } from 'ng2-simplemde';
import { MatSnackBar, MatSelectionList } from '@angular/material';
import { cloneDeep, isEqual, get, pull, findIndex, indexOf } from 'lodash';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
    providers: [ConversationService]
})
export class SolutionDetailComponent implements OnInit {
    _editMode: 'READ' | 'WRITE' = 'READ';
    _ptMSEditMode: 'READ' | 'WRITE' = 'READ';
    _cmpCfgMode: 'READ' | 'WRITE' = 'WRITE';
    _originCmpObjs: any[];
    _originPtMSIds: string[];
    _originTitle: string;
    _originWiki: string;
    _originDesc: string;
    hadTriggeredConversation: boolean = false;

    topicFilter;

    mdeOption = { placeholder: 'Solution description...' };
    @ViewChild(Simplemde) simpleMDE: any;
    @ViewChild(MatSelectionList) ptSelect: MatSelectionList;
    @ViewChild('menu') menuRef: ElementRef;

    solution: Solution;
    tasks: Task[];              // { _id, meta, auth }
    attached_topics: Topic[];               // { _id, meta, auth }
    mss: MS[] | any[];          // { _id, meta, auth }, 所有的 ms
    topicList: Topic[];         // { _id, meta, auth }[]
    cmpMethods: CmpMethod[];
    ptMsFC;
    cmpCfgFC;
    cmpMethodsFC;

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return findIndex(get(this, 'solution.subscribed_uids'), v => v === this.user._id) !== -1; }
    get cmpObjs() { return this.solution.cmpObjs; }
    get myPgGrid() { return $('#grid-table').pqGrid; }
    get ptMSs() { return _.chain(this.mss).filter(ms => !!ms.selected).value(); }
    get isPtMsFCInvalid() { return !this.ptMsFC.get('msIds').pristine && this.ptMsFC.get('msIds').invalid;}
    get isCmpCfgInvalid() { return !this.cmpCfgFC.get('cmpCfg').pristine && this.cmpCfgFC.get('cmpCfg').invalid;}
    

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
        this.ptMsFC = this.fb.group({
            msIds: [[], [Validators.required]]
        });
        this.cmpCfgFC = this.fb.group({
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
                // this.topic = res.data.topic;
                this.mss = res.data.mss;
                this.cmpMethods = res.data.cmpMethods;
                this.topicList = res.data.topicList;

                this.onParticipantsChange(this.mss[3])
                this.onParticipantsChange(this.mss[4])

                if (this.couldEdit && !this.solution.meta.wikiMD) {
                    this._editMode = 'WRITE';
                    this.snackBar.open('please improve the wiki documentation as soon as possible!', null, {
                        duration: 2000,
                        verticalPosition: 'top',
                        horizontalPosition: 'end',
                    });
                }
            }
        });
    }

    onAttachTopic(topic) {
        let ac = indexOf(this.solution.topicIds, topic._id) !== -1 ? 'removeTopic' : 'addTopic';
        this.solutionService.patch(this.solution._id, {
            topicId: topic._id,
            ac: ac,
        }).subscribe(res => {
            if (!res.error) {
                this.renderer2.setStyle(this.menuRef.nativeElement, 'display', 'none');
                if (ac === 'removeTopic') {
                    pull(this.solution.topicIds, topic._id)
                    pull(this.attached_topics, topic);
                }
                else if (ac === 'addTopic') {
                    if (indexOf(this.solution.topicIds, topic._id) === -1) {
                        !this.solution.topicIds && (this.solution.topicIds = []);
                        this.solution.topicIds.push(topic._id)
                        this.attached_topics.push(topic);
                    }
                }

            }
        })
        // ajax
    }

    onParticipantsChange(ms) {
        ms.selected = !ms.selected;
        let ptMSIds = _.chain(this.mss).filter(ms => !!ms.selected).map(ms => ms._id ).value();
        this.ptMsFC.get('msIds').value = ptMSIds;
        this.ptMsFC.get('msIds').updateValueAndValidity();
    }

    onCmpCfgChange(cmpObjs) {
        this.solution.cmpObjs = cmpObjs;
        this.cmpCfgFC.get('cmpCfg').value = cmpObjs;
        this.cmpCfgFC.get('cmpCfg').updateValueAndValidity();
    }

    onCmpCfgValidChange(valid) {
        if(!valid) {
            this.cmpCfgFC.get('cmpCfg').markAsTouched();
            this.cmpCfgFC.get('cmpCfg').markAsDirty();
        }
    }

    onStepperNext(stepIndex) {
        if(stepIndex === 0) {
            this.ptMsFC.get('msIds').markAsTouched();
            this.ptMsFC.get('msIds').markAsDirty();
        }
        else if(stepIndex === 1) {
            this.cmpCfgFC.get('cmpCfg').markAsTouched();
            this.cmpCfgFC.get('cmpCfg').markAsDirty();

        }
        else if(stepIndex === 2) {

        }
    }

    fetchCmpMethods() {

    }

    addCmpObj() {
        this.solution.cmpObjs.push(new CmpObj());
    }

    removeCmpObj(i) {
        this.solution.cmpObjs.splice(i, 1);
    }

    onEditClick() {
        this._editMode = 'WRITE';
        this._originDesc = this.solution.meta.desc;
        this._originWiki = this.solution.meta.wikiMD;
        this._originTitle = this.solution.meta.name;
    }

    onEditSave() {
        this.solution.meta.wikiHTML = this.simpleMDE.simplemde.markdown(this.solution.meta.wikiMD || '');
        this.solutionService.patch(this.solution._id, { solution: this.solution }).subscribe(res => { this._editMode = 'READ'; });
    }

    onEditCancel() {
        this.solution.meta.wikiMD = this._originWiki;
        this.solution.meta.desc = this._originDesc;
        this.solution.meta.name = this._originTitle;
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

    onCmpCfgEditClick() {
        this._cmpCfgMode = 'WRITE';
        this._originCmpObjs = cloneDeep(this.solution.cmpObjs);
    }

    // onCmpCfgChange(cmpCfg) {
    //     console.log(this.cmpObjs === cmpCfg, cmpCfg, this.cmpObjs);   
    // }

    onCmpCfgEditSave() {
        this.solutionService.patch(this.solution._id, {
            ac: 'updateCmpObjs',
            solution: this.solution
        }).subscribe(res => {
            if (!res.error) {
                this._cmpCfgMode = 'READ';
            }
        })
    }

    onCmpCfgEditCancel() {
        this._cmpCfgMode = 'READ';
        this.solution.cmpObjs = this._originCmpObjs;
    }

    onTabChange(index) {
        if (index === 3 && !this.hadTriggeredConversation) {
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
}
