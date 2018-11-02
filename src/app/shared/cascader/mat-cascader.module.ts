import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

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
    OverlayModule,
  ],
  declarations: [
    MatCascaderComponent
  ],
  exports: [
    MatCascaderComponent,
  ],
})
export class MatCascaderModule { }
