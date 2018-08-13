import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@common/ngx-shared';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetRoutingModule } from './password-reset-routing.module';

@NgModule({
    imports: [
        NgxSharedModule,
        PasswordResetRoutingModule
    ],
    declarations: [PasswordResetComponent]
})
export class PasswordResetModule { }
