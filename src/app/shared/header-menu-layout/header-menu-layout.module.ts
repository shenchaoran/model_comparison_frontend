import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
} from '@angular/material';

import { FooterComponent } from './footer/footer.component';
import { HeaderMenuLayoutComponent } from './header-menu-layout/header-menu-layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        OverlayModule,
        NgxSharedModule,
        NgZorroAntdModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
    declarations: [
        HeaderMenuLayoutComponent,
        FooterComponent,
        HeaderComponent,
    ],
    providers: [],
    exports: [
        HeaderMenuLayoutComponent,
        FooterComponent,
    ]
})
export class HeaderMenuLayoutModule { }
