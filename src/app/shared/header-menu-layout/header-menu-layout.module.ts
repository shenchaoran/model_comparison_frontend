import { NgModule } from '@angular/core';
import { NgxSharedModule } from '../ngx-shared';
import {
    // NzMenuModule,
    // NzBackTopModule,
    NgZorroAntdModule,
} from 'ng-zorro-antd';

import { FooterComponent } from './footer/footer.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderMenuLayoutComponent } from './header-menu-layout/header-menu-layout.component';
import { SubMenuComponent } from './subMenu/subMenu.component';
import { HeaderMenuService } from './header-menu.service';

@NgModule({
    imports: [
        NgxSharedModule,
        NgZorroAntdModule,
        // NzMenuModule,
        // NzBackTopModule,
    ],
    declarations: [
        HeaderMenuComponent,
        SubMenuComponent,
        HeaderMenuLayoutComponent,
        FooterComponent,
    ],
    providers: [
        HeaderMenuService
    ],
    exports: [
        HeaderMenuComponent,
        SubMenuComponent,
        HeaderMenuLayoutComponent,
        FooterComponent,
    ]
})
export class HeaderMenuLayoutModule { }
