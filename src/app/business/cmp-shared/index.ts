import { NgModule } from '@angular/core';
import { 
    MatCascaderModule,
    NgxSharedModule,
    FileUploaderModule,
    FormControlItemModule,
} from '@shared';
import {
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatDialogModule,
} from '@angular/material';
// import {
//     NzGridModule,
//     NzTableModule,
// NzCollapseModule
// } from 'ng-zorro-antd';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CalcuCfgComponent, SiteDialog } from './calcu-cfg/calcu-cfg.component';
import { CalcuResultComponent } from './calcu-result/calcu-result.component';
import { StdDataBaseComponent } from './std-data-base/std-data-base.component';
import { CmpMethodCfgComponent } from './cmp-method-cfg/cmp-method-cfg.component';
import { OlModule } from '../ol';
import { CmpSlnOutlineComponent } from './cmp-sln-outline/cmp-sln-outline.component';

const modules = [
    NgxSharedModule,
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatCascaderModule,
    // NzCollapseModule,
    // NzGridModule,
    // NzTableModule,
    NgZorroAntdModule,
    MatDialogModule,
    OlModule,
    FileUploaderModule,
    FormControlItemModule,
];
const components = [
    CalcuCfgComponent,
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
