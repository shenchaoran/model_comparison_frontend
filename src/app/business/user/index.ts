import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { UserRoutingModule } from './index-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PswResetComponent } from './psw-reset/psw-reset.component';

import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        UserRoutingModule,
        SharedModule,
        MatSharedModule,
    ],
    declarations: [SignInComponent, SignUpComponent, PswResetComponent, ProfileComponent],
    providers: []
})
export class UserModule { }
