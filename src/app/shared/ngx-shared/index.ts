import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
]
@NgModule({
    declarations: [
    ],
    imports: [
        ...modules
    ],
    exports: [
        ...modules
    ],
    providers: []
})
export class NgxSharedModule {}
