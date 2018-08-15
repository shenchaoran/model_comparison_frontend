import { NgModule } from '@angular/core';
import { NgxSharedModule } from '@common/ngx-shared';
import { PasswordResetComponent } from '@common/feature/password-reset/password-reset.component';
import { PasswordResetRoutingModule } from '@common/feature/password-reset/password-reset-routing.module';

@NgModule({
    imports: [
        NgxSharedModule,
        PasswordResetRoutingModule
    ],
    declarations: [PasswordResetComponent]
})
export class PasswordResetModule { }
