import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';

////////////////////////////////////////////
import { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
import { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
import { CalcuResultComponent } from './calcu-result/calcu-result.component';
////////////////////////////////////////////
import { LoginService } from '@feature/login/login.service';
////////////////////////////////////////////
export { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
export { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
export { CalcuResultComponent } from './calcu-result/calcu-result.component';
////////////////////////////////////////////
const COMPONENTS = [
    CalcuCfgComponent,
    CmpObjCfgComponent,
    CalcuResultComponent,
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
        LoginService
    ]
})
export class CmpSharedModule { }
