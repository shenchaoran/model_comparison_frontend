import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { MSService } from '../../geo-model/services/model.service';
import { 
    ResourceSrc, 
    CalcuTask, 
    CmpTask, 
    CmpSolution,
    DataRefer,
    CmpObj,
 } from '@models';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@feature/login/login.service';
import { NzStepsComponent } from 'ng-zorro-antd';
import * as ObjectID from 'objectid';
import { CmpTaskService } from '../../cmp-task/services';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'ogms-new-sln',
    templateUrl: './new-sln.component.html',
    styleUrls: ['./new-sln.component.scss']
})
export class NewSlnComponent implements OnInit, AfterViewInit {
    cmpTask: CmpTask;
    msInstances: CalcuTask[] = [];
    msAll = [];
    msSelected = [];
    msAdding;
    addingName: string;
    addingDesc: string;
    msCount;
    msPageNum = 1;

    currentStep = 0;
    doneDisabled = false;
    nextDisabled = false;
    __isMSModalVisible = false;
    __isCmpObjModalVisible = false;

    selectedComputeLayout = 'Tab';
    computeLayout = [
        {
            label: 'Collapse',
            value: 'Collapse',
            checked: true
        },
        {
            label: 'Tab',
            value: 'Tab',
            checked: false
        }
    ];

    constructor(
        private msService: MSService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private cmpTaskservice: CmpTaskService,
        private _notice: NzNotificationService
    ) {
        
        const token = this.loginService.getToken();
        const user = this.loginService.getUser();

        if(!user) {
            this.router.navigate(['../..', 'login'], {
                relativeTo: this.route,
                queryParams: {
                    redirect: (window as any).location.hash
                }
            });
            return;
        }

        this.cmpTask = new CmpTask();
        this.init();
    }

    init() {
        this.currentStep = 3;
        const taskI = JSON.parse('{"meta":{"time":1521210836912},"auth":{"src":3,"userName":"Admin","userId":"5a290f90dda5de93f925111e"},"progress":0,"cmpObjs":[{"id":"5aabde2ef48a8ef18b000001","meta":{"name":"xx","desc":"x"},"methods":[{"label":"Chart","value":"Chart"}],"dataRefers":[{"msId":"5a1122b1a5559025a032b39a","msName":"IBIS-point","eventName":"output","dataId":"","schemaId":"table column","field":"jd"},{"msId":"5a1122b1a5559025a032b39a","msName":"IBIS-point","eventName":"output","dataId":"","schemaId":"table column","field":"jd"}],"schemaId":"table column"}],"calcuTaskIds":["5aabd8626570a475af000005","5aabd86e6570a475af000006"]}');
        const msIs = JSON.parse('[{"meta":{"name":"IBIS-point param 1","desc":"x","time":1521211490949},"_id":"5aabd8626570a475af000005","state":0,"auth":{"userId":"5a290f90dda5de93f925111e","userName":"Admin","src":2},"msId":"5a1122b1a5559025a032b39a","msName":"IBIS-point","nodeName":"scr","IO":{"schemas":[{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"input_table_raw","id":"input_table_raw","src":0},{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"output_table_raw","id":"output_table_raw","src":0},{"structure":{"temporal":{"scale":"string","end":"string","start":"string"},"spatial":{"unit":"string","NODATA_value":"number","nrows":"number","ncols":"number","ysize":"number","xsize":"number","yllcorner":"number","xllcorner":"number"}},"description":"","schemaName":"ASCII_GRID_RAW","id":"ASCII_GRID_RAW","src":0},{"structure":{"options":["DAY","MONTH","YEAR"],"type":"radio"},"description":"","schemaName":"time_scale","id":"time_scale","src":0},{"structure":{"options":["NPP","GPP","NEE","ayco2mic","aycsoi","totnsoi","NO3inc","NH4soil","NH3","N2","N2O","NO","cton_pro","cc","ftemp","N_uptake_capacity","wfps/100","NO3inc","N_availability","N_stress"],"type":"checkbox"},"description":"","schemaName":"output_list","id":"output_list","src":0},{"structure":{"type":"date"},"description":"","schemaName":"Date","id":"Date","src":0},{"structure":{"type":"coordinate"},"description":"","schemaName":"Coordinate","id":"Coordinate","src":0}],"data":[{"description":"","schemaId":"input_table_raw","type":"input","id":"input","schema":{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"input_table_raw","id":"input_table_raw","src":0}},{"description":"","schemaId":"ASCII_GRID_RAW","type":"input","id":"sand","schema":{"structure":{"temporal":{"scale":"string","end":"string","start":"string"},"spatial":{"unit":"string","NODATA_value":"number","nrows":"number","ncols":"number","ysize":"number","xsize":"number","yllcorner":"number","xllcorner":"number"}},"description":"","schemaName":"ASCII_GRID_RAW","id":"ASCII_GRID_RAW","src":0}},{"description":"","schemaId":"ASCII_GRID_RAW","type":"input","id":"clay","schema":{"structure":{"temporal":{"scale":"string","end":"string","start":"string"},"spatial":{"unit":"string","NODATA_value":"number","nrows":"number","ncols":"number","ysize":"number","xsize":"number","yllcorner":"number","xllcorner":"number"}},"description":"","schemaName":"ASCII_GRID_RAW","id":"ASCII_GRID_RAW","src":0}},{"description":"","schemaId":"output_table_raw","type":"output","id":"output","schema":{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"output_table_raw","id":"output_table_raw","src":0},"value":"output"},{"description":"","schemaId":"time_scale","type":"parameter","id":"time_scale","schema":{"structure":{"options":["DAY","MONTH","YEAR"],"type":"radio"},"description":"","schemaName":"time_scale","id":"time_scale","src":0},"value":"DAY"},{"description":"","schemaId":"output_list","type":"parameter","id":"output_list","schema":{"structure":{"options":["NPP","GPP","NEE","ayco2mic","aycsoi","totnsoi","NO3inc","NH4soil","NH3","N2","N2O","NO","cton_pro","cc","ftemp","N_uptake_capacity","wfps/100","NO3inc","N_availability","N_stress"],"type":"checkbox"},"description":"","schemaName":"output_list","id":"output_list","src":0},"value":["NPP","totnsoi","N2O","N_uptake_capacity"]}],"std":[{"description":"","schemaId":"Date","type":"input","id":"Date start","schema":{"structure":{"type":"date"},"description":"","schemaName":"Date","id":"Date","src":0},"value":322012800000},{"description":"","schemaId":"Date","type":"input","id":"Date end","schema":{"structure":{"type":"date"},"description":"","schemaName":"Date","id":"Date","src":0},"value":479779200000},{"description":"","schemaId":"Coordinate","type":"input","id":"Coordinate","schema":{"structure":{"type":"coordinate"},"description":"","schemaName":"Coordinate","id":"Coordinate","src":0},"value":"[     119.407653808594,     32.1430599999884 ]"}],"dataSrc":"STD"}},{"meta":{"name":"IBIS-point param 2","desc":"x","time":1521211502970},"_id":"5aabd86e6570a475af000006","state":0,"auth":{"userId":"5a290f90dda5de93f925111e","userName":"Admin","src":2},"msId":"5a1122b1a5559025a032b39a","msName":"IBIS-point","nodeName":"scr","IO":{"schemas":[{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"input_table_raw","id":"input_table_raw","src":0},{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"output_table_raw","id":"output_table_raw","src":0},{"structure":{"temporal":{"scale":"string","end":"string","start":"string"},"spatial":{"unit":"string","NODATA_value":"number","nrows":"number","ncols":"number","ysize":"number","xsize":"number","yllcorner":"number","xllcorner":"number"}},"description":"","schemaName":"ASCII_GRID_RAW","id":"ASCII_GRID_RAW","src":0},{"structure":{"options":["DAY","MONTH","YEAR"],"type":"radio"},"description":"","schemaName":"time_scale","id":"time_scale","src":0},{"structure":{"options":["NPP","GPP","NEE","ayco2mic","aycsoi","totnsoi","NO3inc","NH4soil","NH3","N2","N2O","NO","cton_pro","cc","ftemp","N_uptake_capacity","wfps/100","NO3inc","N_availability","N_stress"],"type":"checkbox"},"description":"","schemaName":"output_list","id":"output_list","src":0},{"structure":{"type":"date"},"description":"","schemaName":"Date","id":"Date","src":0},{"structure":{"type":"coordinate"},"description":"","schemaName":"Coordinate","id":"Coordinate","src":0}],"data":[{"description":"","schemaId":"input_table_raw","type":"input","id":"input","schema":{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"input_table_raw","id":"input_table_raw","src":0}},{"description":"","schemaId":"ASCII_GRID_RAW","type":"input","id":"sand","schema":{"structure":{"temporal":{"scale":"string","end":"string","start":"string"},"spatial":{"unit":"string","NODATA_value":"number","nrows":"number","ncols":"number","ysize":"number","xsize":"number","yllcorner":"number","xllcorner":"number"}},"description":"","schemaName":"ASCII_GRID_RAW","id":"ASCII_GRID_RAW","src":0}},{"description":"","schemaId":"ASCII_GRID_RAW","type":"input","id":"clay","schema":{"structure":{"temporal":{"scale":"string","end":"string","start":"string"},"spatial":{"unit":"string","NODATA_value":"number","nrows":"number","ncols":"number","ysize":"number","xsize":"number","yllcorner":"number","xllcorner":"number"}},"description":"","schemaName":"ASCII_GRID_RAW","id":"ASCII_GRID_RAW","src":0}},{"description":"","schemaId":"output_table_raw","type":"output","id":"output","schema":{"structure":{"type":"table","columns":[{"unit":"","description":"","type":"string[]","id":"Site"},{"unit":"","description":"","type":"number[]","id":"year"},{"unit":"","description":"","type":"number[]","id":"month"},{"unit":"","description":"","type":"number[]","id":"day"},{"unit":"","description":"","type":"number[]","id":"jd"},{"unit":"","description":"","type":"number[]","id":"ta"},{"unit":"","description":"","type":"number[]","id":"tmin"},{"unit":"","description":"","type":"number[]","id":"tmax"},{"unit":"","description":"","type":"number[]","id":"SW-Pot"},{"unit":"","description":"","type":"number[]","id":"Sw"},{"unit":"","description":"","type":"number[]","id":"Cloud"},{"unit":"","description":"","type":"number[]","id":"Lw"},{"unit":"","description":"","type":"number[]","id":"rh"},{"unit":"","description":"","type":"number[]","id":"ps"},{"unit":"","description":"","type":"number[]","id":"Prec"},{"unit":"","description":"","type":"number[]","id":"Ws"},{"unit":"","description":"","type":"number[]","id":"PAR"},{"unit":"","description":"","type":"number[]","id":"TS"},{"unit":"","description":"","type":"number[]","id":"LE"},{"unit":"","description":"","type":"number[]","id":"H"},{"unit":"","description":"","type":"number[]","id":"ER"},{"unit":"","description":"","type":"number[]","id":"GPP"}]},"description":"","schemaName":"output_table_raw","id":"output_table_raw","src":0},"value":"output"},{"description":"","schemaId":"time_scale","type":"parameter","id":"time_scale","schema":{"structure":{"options":["DAY","MONTH","YEAR"],"type":"radio"},"description":"","schemaName":"time_scale","id":"time_scale","src":0},"value":"DAY"},{"description":"","schemaId":"output_list","type":"parameter","id":"output_list","schema":{"structure":{"options":["NPP","GPP","NEE","ayco2mic","aycsoi","totnsoi","NO3inc","NH4soil","NH3","N2","N2O","NO","cton_pro","cc","ftemp","N_uptake_capacity","wfps/100","NO3inc","N_availability","N_stress"],"type":"checkbox"},"description":"","schemaName":"output_list","id":"output_list","src":0},"value":["N_uptake_capacity","N2O","totnsoi","NPP"]}],"std":[{"description":"","schemaId":"Date","type":"input","id":"Date start","schema":{"structure":{"type":"date"},"description":"","schemaName":"Date","id":"Date","src":0},"value":322012800000},{"description":"","schemaId":"Date","type":"input","id":"Date end","schema":{"structure":{"type":"date"},"description":"","schemaName":"Date","id":"Date","src":0},"value":479779200000},{"description":"","schemaId":"Coordinate","type":"input","id":"Coordinate","schema":{"structure":{"type":"coordinate"},"description":"","schemaName":"Coordinate","id":"Coordinate","src":0},"value":"[     119.407653808594,     32.1430599999884 ]"}],"dataSrc":"STD"}}]');
        _.assign(this.cmpTask, taskI);
        _.assign(this.msInstances, msIs);
    }

    ngOnInit() {

        this.msService.findAll({})
            .subscribe(response => {
                if (response.error) {

                }
                else {
                    this.msAll = response.data.docs;
                    this.msCount = response.data.count;
                }
            });
    }

    ngAfterViewInit() {
    }

    changeStep(v) {
        this.currentStep = v;
        this.validateStepy();
    }

    validateStepy() {
        // if(this.currentStep === 0) {

        // }
        // else if(this.currentStep === 1) {
        //     if(this.msSelected.length === 0) {
        //         this.nextDisabled = true;
        //     }
        //     else {
        //         this.nextDisabled = false;
        //     }
        // }
        // else if(this.currentStep === 2) {
        //     if(this.msInstances.length === 0) {
        //         this.nextDisabled = true;
        //     }
        //     else {
        //         // validate for ms instances
                
        //         this.nextDisabled = false;
        //     }
        // }
        // else if(this.currentStep === 3) {

        // }
    }

    done() {
        console.log(this.cmpTask);
        console.log(this.msInstances);
        this.cmpTask.calcuTaskIds = [];
        _.map(this.msInstances, msInstance => {
            this.cmpTask.calcuTaskIds.push(msInstance._id);
        });
        _.map(this.cmpTask.cmpObjs, cmpObj => {
            _.map(cmpObj.methods, method => {
                method = method.value;
            });
        });
        
        const msInstances = _
            .chain(this.msInstances)
            .cloneDeep()
            .map(msInstance => {
                delete msInstance.options;
                return msInstance;
            })
            .value();

        this.cmpTaskservice.insert({
            calcuTasks: msInstances,
            cmpTask: this.cmpTask
        })
            .subscribe(response => {
                if(response.error) {
                    this._notice.warning('Warning', 'Create comparison task failed!');
                }
                else {
                    this._notice.success('Success', 'Create comparison task success!');
                    this.router.navigate(['../../tasks', response.data], {
                        relativeTo: this.route
                    });
                }
            });
    }

    onMSChecked(ms) {
        if(ms.checked) {
            ms.checked = false;
            _.remove(this.msSelected, ms);
        }
        else {
            this.msSelected.push(ms);
            ms.checked = true;
        }
        this.validateStepy();
    }

    addInstance(ms) {
        this.msAdding = ms;
        this.__isMSModalVisible = true;
    }

    addCmpObj() {
        this.__isCmpObjModalVisible = true;
    }

    removeMSInstance(ms) {
        _.remove(this.msInstances, ms);
        this.validateStepy();
    }

    onComputeLayoutChange(item) {
        _.map(this.computeLayout, item => item.checked = false);
        item.checked = true;
        this.selectedComputeLayout = item.value;
    }

    onInstanceChange(msInstance) {
        // 引用传递，所以不用做任何操作
        // console.log(msInstance);
    }

    onCmpObjChange(cmpObj) {

    }

    onCmpObjCompleted(e) {}

    // valid of instance
    onValidationChange(e: {
        _id: any,
        valid: boolean
    }) {
        if(!e.valid) {
            this.nextDisabled = false;
        }
        else {
            // TODO
            // _.map(this.ms)
        }
    }

    msCancel(e) {
        this.__isMSModalVisible = false;
    }

    msOK(e) {
        const msInstance = this.msService.newInstance(this.msAdding);
        msInstance.meta.name = this.addingName;
        msInstance.meta.desc = this.addingDesc;
        this.msInstances.push(msInstance);

        this.addingDesc = '';
        this.addingName = '';
        this.__isMSModalVisible = false;
        this.validateStepy();
    }

    cmpObjOK(e) {
        const cmpObj = new CmpObj();
        cmpObj.meta.name = this.addingName;
        cmpObj.meta.desc = this.addingDesc;
        this.cmpTask.cmpObjs.push(cmpObj);

        this.addingDesc = '';
        this.addingName = '';
        this.__isCmpObjModalVisible = false;
        this.validateStepy();
    }

    cmpObjCancel(e) {
        this.__isCmpObjModalVisible = false;
    }
}
