import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { DirectivesModule } from '../directives';
import {
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatRippleModule,
} from '@angular/material';
import { CardsTemplateComponent } from './cards-template/cards-template.component';
import { ListTemplateComponent,} from './list-template/list-template.component';
import { SidebarSectionComponent, } from './sidebar-section/sidebar-section.component';

const components = [
    CardsTemplateComponent,
    ListTemplateComponent,
    SidebarSectionComponent,
]

@NgModule({
    imports: [
        NgxSharedModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        DirectivesModule,
        MatRippleModule,
    ],
    declarations: [...components],
    exports: [...components]
})
export class CustomTemplateModule { }
