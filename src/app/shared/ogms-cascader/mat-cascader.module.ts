import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSharedModule } from '../../mat-shared';

// material
import {
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from '@angular/material';

import { MatCascaderComponent } from './mat-cascader.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSharedModule,
  ],
  declarations: [
    MatCascaderComponent
  ],
  exports: [
    MatCascaderComponent,
  ],
})
export class MatCascaderModule { }
