import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlService } from './services/ol.service'
import { GlobalSiteComponent } from './global-site/global-site.component';
////////////////////////////////////////////////////////////////////////////////
export * from './services/ol.service'
export * from './global-site/global-site.component'

const COMPONENTS = [
    GlobalSiteComponent
]

const SERVICES = [
    OlService
]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    providers: [
        ...SERVICES,
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class OlModule { }
