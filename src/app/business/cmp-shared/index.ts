import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { RouterModule, Routes } from '@angular/router';
import { MatSharedModule } from '@common/mat-shared'

//////////////////// component ////////////////////////
import { CalcuCfgComponent, SiteDialog } from './calcu-cfg/calcu-cfg.component';
import { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
import { CalcuResultComponent } from './calcu-result/calcu-result.component';
import { StdDataBaseComponent } from './std-data-base/std-data-base.component';
import { CmpMethodCfgComponent } from './cmp-method-cfg/cmp-method-cfg.component';
import { OlModule } from '../ol';
import { CmpSlnOutlineComponent } from './cmp-sln-outline/cmp-sln-outline.component';
////////////////////// export //////////////////////
export { CalcuCfgComponent } from './calcu-cfg/calcu-cfg.component';
export { CmpObjCfgComponent } from './cmp-obj-cfg/cmp-obj-cfg.component';
export { CalcuResultComponent } from './calcu-result/calcu-result.component';
export { StdDataBaseComponent } from './std-data-base/std-data-base.component';
export { CmpMethodCfgComponent } from './cmp-method-cfg/cmp-method-cfg.component';
////////////////////////////////////////////

const modules = [
    SharedModule,
    RouterModule,
    OlModule,
    MatSharedModule,
];
const components = [
    CalcuCfgComponent,
    CmpObjCfgComponent,
    CalcuResultComponent,
    StdDataBaseComponent,
    CmpMethodCfgComponent,
    SiteDialog,
    CmpSlnOutlineComponent,
];
var entryComponents = [
    SiteDialog,
];
const services = [];
var exportComponents = components;
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services],
    exports: [...exportComponents]
})
export class CmpSharedModule { }
