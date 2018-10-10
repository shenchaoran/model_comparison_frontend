import { NgModule } from '@angular/core';
import { SharedModule } from '@common/shared';
import { MatSharedModule } from '@common/mat-shared';

import { UserRoutingModule } from './user-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PswResetComponent } from './psw-reset/psw-reset.component';

import { UserService } from './user.service';

@NgModule({
    imports: [
        UserRoutingModule,
        SharedModule,
        MatSharedModule,
    ],
    declarations: [SignInComponent, SignUpComponent, PswResetComponent],
    providers: [
        UserService
    ]
})
export class UserModule { }
