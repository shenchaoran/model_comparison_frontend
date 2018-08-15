import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { RouterModule, Routes } from '@angular/router';

//////////////////// component ////////////////////////
import { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
import { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
import { CalcuResultComponent } from './calcu-result/calcu-result.component';
import { StdDataBaseComponent } from './std-data-base/std-data-base.component';
import { CmpMethodCfgComponent } from './cmp-method-cfg/cmp-method-cfg.component';
import { OlModule } from '../ol/ol.module'
//////////////////// service ////////////////////////
import { LoginService } from '@common/feature/login/login.service';
import { StdDataService } from '../datasets/services/std-data.service';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
////////////////////// export //////////////////////
export { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
export { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
export { CalcuResultComponent } from './calcu-result/calcu-result.component';
export { StdDataBaseComponent } from './std-data-base/std-data-base.component';
export { CmpMethodCfgComponent } from './cmp-method-cfg/cmp-method-cfg.component';
////////////////////////////////////////////
const COMPONENTS = [
    CalcuCfgComponent,
    CmpObjCfgComponent,
    CalcuResultComponent,
    StdDataBaseComponent,
    CmpMethodCfgComponent,
];
const SERVICES = [
    LoginService,
    NzNotificationService,
    StdDataService,
]
////////////////////////////////////////////

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        OlModule,
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    providers: [
        ...SERVICES
    ]
})
export class CmpSharedModule { }
