import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

////////////////////////////////////////////
import { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
import { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
////////////////////////////////////////////
export { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
export { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
////////////////////////////////////////////
import { LoginService } from '@feature/login/login.service';
////////////////////////////////////////////
const COMPONENTS = [
    CalcuCfgComponent,
    CmpObjCfgComponent,
];
////////////////////////////////////////////

@NgModule({
    imports: [
        SharedModule,
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
