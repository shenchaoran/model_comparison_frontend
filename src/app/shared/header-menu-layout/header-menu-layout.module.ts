import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
} from '@angular/material';
import { GoTopButtonModule } from 'ng2-go-top-button';

import { FooterComponent } from './footer/footer.component';
import { HeaderMenuLayoutComponent } from './header-menu-layout/header-menu-layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        OverlayModule,
        NgxSharedModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatRippleModule,
        GoTopButtonModule,
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
