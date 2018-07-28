import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';

import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
////////////////////////////////////////////
import { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
import { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
import { CalcuResultComponent } from './calcu-result/calcu-result.component';
import { StdDataBaseComponent } from './std-data-base/std-data-base.component';
////////////////////////////////////////////
import { LoginService } from '@feature/login/login.service';
import { StdDataService } from '../datasets/services/std-data.service';
////////////////////////////////////////////
export { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
export { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
export { CalcuResultComponent } from './calcu-result/calcu-result.component';
export { StdDataBaseComponent } from './std-data-base/std-data-base.component';
////////////////////////////////////////////
const COMPONENTS = [
    CalcuCfgComponent,
    CmpObjCfgComponent,
    CalcuResultComponent,
    StdDataBaseComponent,
];
////////////////////////////////////////////

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    providers: [
        LoginService,
        NzNotificationService,
        StdDataService
    ]
})
export class CmpSharedModule { }
