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

import { CalcuCfgComponent, SiteDialog } from './calcu-cfg/calcu-cfg.component';
import { CalcuResultComponent } from './calcu-result/calcu-result.component';
import { OlModule } from '../ol';

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
    MatDialogModule,
    OlModule,
    FileUploaderModule,
    FormControlItemModule,
];
const components = [
    CalcuCfgComponent,
    CalcuResultComponent,
    SiteDialog,
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
