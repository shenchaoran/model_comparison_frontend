import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@feature/login/login.service';
import { CmpSolution, CmpTask, ResourceSrc, MS, CmpMethod, SchemaName } from '@models';
import { CmpSlnService } from '../services/cmp-sln.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from '@shared';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
    selector: 'ogms-sln-detail',
    templateUrl: './sln-detail.component.html',
    styleUrls: ['./sln-detail.component.scss']
})
export class SlnDetailComponent implements OnInit {
    cmpSolution: any;
    @Input() set cmpSln(v) {
        if(v) {
            this.cmpSolution = _.cloneDeep(v);
            this.cmpSolution.cmpCfg.keynote.attached = {
                solutionMeta: {
                    name: this.cmpSolution.meta.name,
                    desc: this.cmpSolution.meta.desc
                }
            };
            _.map(this.cmpSolution.cmpCfg.cmpObjs, (cmpObj, i) => {
                const methods = CmpMethod.find(cmpObj.schemaName);
                _.map(methods, method => {
                    _.map(cmpObj.methods, method2 => {
                        if(method.value === method2) {
                            method.checked = true;
                        }
                    });
                });
                cmpObj.attached = {
                    active: (i===0)? true: false,
                    methods: methods
                };
            });
        }
    };

    @Input() mode: 'write' | 'read' = 'read';

    schemaNames: Array<string> = [];
    methods: Array<any> = [];

    __currentStep = 0;
    __nextDisabled: boolean = false;
    __doneDisabled: boolean = true;
    __isConfirmVisible: boolean = false;

    constructor(
        private service: CmpSlnService,
        private _notice: NzNotificationService,
        private modalService: NzModalService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        _.forIn(SchemaName, (v, k) => {
            if (!/\d/.test(k)) {
              this.schemaNames.push(k);
            }
          });
    }

    ngOnInit() {}

    onSchemaChange(e, cmpObjId) {
        this.methods = CmpMethod.find(e);
        _.map(this.cmpSolution.cmpCfg.cmpObjs, cmpObj => {
          if (cmpObjId === cmpObj.id) {
            cmpObj.schemaName = e;
            cmpObj.methods = [];
          }
        });
      }

    changeStep(newStep) {
        if(this.__currentStep < newStep) {
            this.__nextDisabled = true;
            // this.__nextDisabled = false;
        }
        else if(this.__currentStep > newStep) {
            this.__nextDisabled = false;
        }
        this.__currentStep = newStep;
    }

    done() {
        console.log(this.cmpSolution);
        this.service.insertSln(this.cmpSolution)
            .subscribe(response => {
                if(response.error) {
                    this._notice.warning('Warning', 'create comparison solution failed!');
                }
                else {
                    this._notice.success('Success', 'create comparison solution succeed!');
                    this.cmpSolution._id = response.data.doc._id;
                    this.__isConfirmVisible = true;
                }
            });
    }

    handleCancel(e) {
        this.__isConfirmVisible = false;
    }

    handleOk(e) {
        this.__isConfirmVisible = true;
    }
}
