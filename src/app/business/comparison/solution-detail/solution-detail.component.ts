import { Component, OnInit, HostListener, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTitleService } from "@core/services/dynamic-title.service";
import { ReactiveFormsModule } from "@angular/forms";
import * as uuidv1 from 'uuid/v1';
import { ConversationService, SolutionService, UserService, MSService } from "@services";
import { Simplemde } from 'ng2-simplemde';
import { Solution, Task, Topic, MS, CmpMethod, CmpObj } from "@models";
import { MatSnackBar, MatSelectionList } from '@angular/material';
import { cloneDeep, isEqual, get, pull, } from 'lodash';

@Component({
    selector: 'ogms-solution-detail',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss']
})
export class SolutionDetailComponent implements OnInit {
    _editMode: 'READ' | 'WRITE' = 'READ';
    _ptMSEditMode: 'READ' | 'WRITE' = 'READ';
    _cmpCfgMode: 'READ' | 'WRITE' = 'READ';
    _originCmpObjs: any[];
    _originPtMSIds: string[];
    _originTitle: string;
    _originWiki: string;
    _originDesc: string;

    topicFilter;

    mdeOption = { placeholder: 'Solution description...' };
    @ViewChild(Simplemde) simpleMDE: any;
    @ViewChild(MatSelectionList) ptSelect: MatSelectionList;
    @ViewChild('menu') menuRef: ElementRef;

    solution: Solution;
    tasks: Task[];              // { _id, meta, auth }
    topic: Topic;               // { _id, meta, auth }
    mss: MS[] | any[];          // { _id, meta, auth }, 所有的 ms
    ptMSs: MS[];                // MS, 参与的 ms
    topicList: Topic[];         // { _id, meta, auth }[]
    cmpMethods: CmpMethod[];

    get user() { return this.userService.user; }
    get users() { return this.conversationService.users; }
    get couldEdit() { return this.user && this.solution && this.solution.auth.userId === this.user._id; }
    get conversation() { return this.conversationService.conversation; }
    get includeUser() { return this.solution.subscribed_uids && this.solution.subscribed_uids.findIndex(v => v === this.user._id) !== -1; }
    get cmpObjs() { return this.solution.cmpObjs; }


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
    ) { }

    ngOnInit() {
        const solutionId = this.route.snapshot.paramMap.get('id');
        this.solutionService.findOne(solutionId).subscribe(res => {
            if(!res.error) {
                this.solution = res.data.solution;
                this.tasks = res.data.tasks;
                this.topic = res.data.topic;
                this.mss = res.data.mss;
                this.ptMSs = res.data.ptMSs;
                this.cmpMethods = res.data.cmpMethods;
                this.topicList = res.data.topicList;

                this.conversationService.import(
                    res.data.conversation,
                    res.data.users,
                    res.data.commentCount,
                    this.solution.auth.userId,
                    this.solution._id
                );
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
        let ac = this.solution.topicId === topic._id? 'removeTopic': 'addTopic';
        this.solutionService.patch(this.solution._id, {
            topicId: topic._id,
            ac: ac,
            originalTopicId: get(this.topic, '_id'),
        }).subscribe(res => {
            if(!res.error) {
                this.renderer2.setStyle(this.menuRef.nativeElement, 'display', 'none');
                let i = topic.solutionIds.indexOf(this.solution._id);
                if(ac === 'removeTopic') {
                    this.solution.topicId = null;
                    this.topic = null;
                    pull(topic.solutionIds, this.solution._id);
                }
                else if(ac === 'addTopic') {
                    this.solution.topicId = topic._id;
                    pull(get(this.topic, 'solutionIds'), this.solution._id);
                    this.topic = topic;
                    i === -1 && this.topic.solutionIds.push(this.solution._id);
                }
                
            }
        })
        // ajax
    }

    onParticipantsChange() {

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
        this.solutionService.subscribeToggle(this.solution._id, ac, this.user._id).subscribe(res => {
            if(!res.error) {
                let i = this.solution.subscribed_uids.findIndex(v => v === this.user._id);
                if(ac === 'subscribe') {
                    i === -1 && this.solution.subscribed_uids.push(this.user._id);
                }
                else if(ac === 'unsubscribe') {
                    i !== -1 && this.solution.subscribed_uids.splice(i, 1);
                }
            }
        });
    }

    onPtMSEditClick() {
        this._ptMSEditMode = 'WRITE';
        this._originPtMSIds = cloneDeep(this.solution.msIds);
    }

    onPtMSEditCancel() {
        this._ptMSEditMode = 'READ';
        this.solution.msIds = cloneDeep(this._originPtMSIds);
    }

    onPtMSEditSave() {
        if(isEqual(this._originPtMSIds, this.solution.msIds))
            return;
        this.solutionService.updatePts(this.solution._id, this.solution.msIds).subscribe(res => {
            if(!res.error) {
                this.ptMSs = res.data.docs;
                this._ptMSEditMode = 'READ';
            }
        })
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
            if(!res.error) {
                this._cmpCfgMode = 'READ';
            }
        })
    }

    onCmpCfgEditCancel() {
        this._cmpCfgMode = 'READ';
        this.solution.cmpObjs = this._originCmpObjs;
    }
}
