import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  declarations: [
    MatCascaderComponent
  ],
  exports: [
    MatCascaderComponent,
  ],
})
export class MatCascaderModule { }
