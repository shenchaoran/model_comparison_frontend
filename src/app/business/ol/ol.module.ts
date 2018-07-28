import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlService } from './services/ol.service'

import { GlobalSiteComponent } from './global-site/global-site.component';
////////////////////////////////////////////////////////////////////////////////
export * from './services/ol.service'
export * from './global-site/global-site.component'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GlobalSiteComponent
    ],
    providers: [
        OlService,
    ]
})
export class OlModule { }
