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

const modules = [];
const components = [
    GlobalSiteComponent
];
var entryComponents = [];
const services = [
    OlService
];
var exportComponents = [];
@NgModule({
    imports: [...modules],
    declarations: [...components],
    entryComponents: [...entryComponents],
    providers: [...services],
    exports: [...exportComponents]
})

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
